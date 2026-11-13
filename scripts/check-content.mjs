// Valida o conteúdo da trilha e bloqueia dados sensíveis (o repositório é público).
// Uso: npm run check
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fm from "front-matter";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const nodesDir = join(root, "src/content/nodes");
const pagesDir = join(root, "src/content/pages");

const phasesSrc = readFileSync(join(root, "src/content/phases.ts"), "utf8");
const PHASES = [...phasesSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

const branchesSrc = readFileSync(join(root, "src/content/branches.ts"), "utf8");
const BRANCHES = [...branchesSrc.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);

const LINK_TYPES = new Set(["wiki", "notion", "alura", "video", "issue", "site"]);

// Padrões que NUNCA devem ir para o site público
const FORBIDDEN = [
  [/password\s*[:=]/i, "senha (password)"],
  [/senha\s*[:=]/i, "senha"],
  [/client-?secret/i, "client secret"],
  [/\.oraclevcn\.com/i, "host interno OCI"],
  [/synchro\.com\.br:\d{3,5}/i, "host interno com porta"],
  [/hanasrv/i, "host HANA interno"],
  [/docs\.google\.com/i, "planilha/documento Google (pode expor dados pessoais)"],
  [/eyJ[A-Za-z0-9_-]{20,}/, "token JWT"],
  [/\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}(?:\.\d{1,3})?\b/, "IP interno"],
  [/discord\.com\/channels\//i, "link direto de canal do Discord"],
  [/@synchro\.com\.br/i, "e-mail corporativo (use o padrão genérico)"],
];
// exceções conhecidas (texto explicativo e não dados)
const ALLOW = [/nome\.sobrenome\.ext@synchro\.com\.br/, /seu\.email@synchro\.com\.br/];

const errors = [];
const warnings = [];
const ids = new Map();

function scanSensitive(file, text) {
  let clean = text;
  for (const a of ALLOW) clean = clean.replace(new RegExp(a, "g"), "");
  clean.split("\n").forEach((line, i) => {
    for (const [re, what] of FORBIDDEN) {
      if (re.test(line)) errors.push(`${file}:${i + 1} possível dado sensível (${what}): ${line.trim().slice(0, 100)}`);
    }
  });
}

for (const f of readdirSync(nodesDir).filter((f) => f.endsWith(".md"))) {
  const rel = `src/content/nodes/${f}`;
  const raw = readFileSync(join(nodesDir, f), "utf8");
  scanSensitive(rel, raw);
  let parsed;
  try {
    parsed = fm(raw);
  } catch (e) {
    errors.push(`${rel}: frontmatter inválido: ${e.message}`);
    continue;
  }
  const a = parsed.attributes;
  if (!a.id) errors.push(`${rel}: falta "id"`);
  if (a.id && `${a.id}.md` !== f) warnings.push(`${rel}: id "${a.id}" difere do nome do arquivo`);
  if (ids.has(a.id)) errors.push(`${rel}: id duplicado "${a.id}" (também em ${ids.get(a.id)})`);
  ids.set(a.id, rel);
  if (!a.title) errors.push(`${rel}: falta "title"`);
  if (!PHASES.includes(a.phase)) errors.push(`${rel}: fase "${a.phase}" não existe em phases.ts`);
  if (a.phase === "aprofundamento" && !BRANCHES.includes(a.branch))
    errors.push(`${rel}: nó do Aprofundamento precisa de "branch" (${BRANCHES.join(", ")})`);
  if (a.track) errors.push(`${rel}: "track" não existe mais (todo mundo segue a trilha completa); remova o campo`);
  if (a.group !== undefined && (typeof a.group !== "string" || !a.group.trim())) errors.push(`${rel}: "group" deve ser um texto`);
  if (a.checklist && !Array.isArray(a.checklist)) errors.push(`${rel}: checklist deve ser lista`);
  for (const l of a.links ?? []) {
    if (!LINK_TYPES.has(l.type)) errors.push(`${rel}: tipo de link inválido "${l.type}"`);
    if (!l.label) errors.push(`${rel}: link sem label`);
    if (l.url && !/^(https?:\/\/|#\/)/.test(l.url)) errors.push(`${rel}: url inválida "${l.url}"`);
  }
  if (!parsed.body.trim()) warnings.push(`${rel}: corpo vazio`);
}

// links internos #/n/<id> precisam existir
for (const dir of [nodesDir, pagesDir]) {
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(join(dir, f), "utf8");
    if (dir === pagesDir) scanSensitive(`src/content/pages/${f}`, raw);
    for (const m of raw.matchAll(/#\/n\/([a-z0-9-]+)/g)) {
      if (!ids.has(m[1])) errors.push(`${f}: link interno para nó inexistente "${m[1]}"`);
    }
  }
}


// textos escritos direto nos componentes (ex.: introdução do projeto) também são públicos
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)],
  );
}
for (const file of walk(join(root, "src")).filter((f) => /\.(tsx?|css)$/.test(f))) {
  scanSensitive(file.slice(root.length + 1), readFileSync(file, "utf8"));
}

const notionLinks = JSON.parse(readFileSync(join(root, "src/content/notion-links.json"), "utf8"));
scanSensitive("src/content/notion-links.json", JSON.stringify(notionLinks, null, 1));
for (const [k, v] of Object.entries(notionLinks)) {
  if (v && !/^https:\/\/(www\.)?notion\.(so|site)\/|^https:\/\/app\.notion\.com\//.test(v)) errors.push(`notion-links.json: url inválida para "${k}"`);
}
const pending = [];
for (const f of readdirSync(nodesDir)) {
  const a = fm(readFileSync(join(nodesDir, f), "utf8")).attributes;
  for (const l of a.links ?? []) if (!l.url && !(l.type === "notion" && notionLinks[l.label])) pending.push(`${a.id} → [${l.type}] ${l.label}`);
}

warnings.forEach((w) => console.warn("⚠️  " + w));
console.log(`✔ ${ids.size} nós em ${PHASES.length} fases · ${pending.length} links pendentes (ver docs/PENDENCIAS.md)`);
if (errors.length) {
  errors.forEach((e) => console.error("✖ " + e));
  process.exit(1);
}
