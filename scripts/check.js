import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { phases } from "../src/features/roadmap/data/index.ts";
import { iconPaths as icons } from "../src/components/icon-paths.ts";

const root = new URL("../", import.meta.url);

// Verifica também módulos que ainda não tenham sido importados pela aplicação.
async function checkSyntax(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? "/" : ""), directory);
    if (entry.isDirectory()) {
      await checkSyntax(url);
    } else if (entry.name.endsWith(".js")) {
      const result = spawnSync(process.execPath, ["--check", fileURLToPath(url)], { encoding: "utf8" });
      assert.equal(result.status, 0, result.stderr || `Erro de sintaxe: ${url.pathname}`);
    }
  }
}

function text(value, path) {
  assert.ok(typeof value === "string" && value.trim(), `${path}: informe um texto não vazio.`);
}

function optionalText(value, path) {
  if (value !== undefined) text(value, path);
}

function list(value, path) {
  assert.ok(Array.isArray(value), `${path}: deve ser uma lista.`);
}

function link(href, path) {
  if (href === undefined || href === "#") return;
  text(href, path);
  let url;
  try {
    url = new URL(href);
  } catch {
    assert.fail(`${path}: use uma URL completa (https://...) ou "#" para um link pendente.`);
  }
  assert.ok(["http:", "https:"].includes(url.protocol), `${path}: use http ou https.`);
}

function detail(node, path) {
  text(node.label, `${path}.label`);
  link(node.href, `${path}.href`);
  optionalText(node.description, `${path}.description`);
  optionalText(node.linkLabel, `${path}.linkLabel`);
  if (node.links !== undefined) {
    text(node.links.title, `${path}.links.title`);
    list(node.links.items, `${path}.links.items`);
    node.links.items.forEach((item, index) => {
      text(item.label, `${path}.links.items[${index}].label`);
      text(item.href, `${path}.links.items[${index}].href`);
      link(item.href, `${path}.links.items[${index}].href`);
    });
  }
  if (node.icon !== undefined) {
    assert.ok(Object.hasOwn(icons, node.icon), `${path}.icon: ícone desconhecido (${node.icon}).`);
  }
  if (node.sections !== undefined) {
    list(node.sections, `${path}.sections`);
    node.sections.forEach((section, index) => {
      const sectionPath = `${path}.sections[${index}]`;
      optionalText(section.title, `${sectionPath}.title`);
      for (const field of ["paragraphs", "items"]) {
        if (section[field] === undefined) continue;
        list(section[field], `${sectionPath}.${field}`);
        section[field].forEach((item, i) => text(item, `${sectionPath}.${field}[${i}]`));
      }
    });
  }

}

await checkSyntax(new URL("dist/assets/", root));
await checkSyntax(new URL("scripts/", root));
const css = await readFile(new URL("src/styles/global.css", root), "utf8");
const ids = new Set();
list(phases, "phases");
assert.ok(phases.length, "A trilha precisa ter pelo menos uma fase.");

phases.forEach((phase, index) => {
  const path = `phases[${index}]`;
  text(phase.id, `${path}.id`);
  assert.match(phase.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `${path}.id: use letras minúsculas, números e hífens.`);
  assert.ok(!ids.has(phase.id), `${path}.id: identificador repetido (${phase.id}).`);
  ids.add(phase.id);
  text(phase.title, `${path}.title`);
  text(phase.color, `${path}.color`);
  assert.match(phase.color, /^[a-z][a-z0-9-]*$/, `${path}.color: nome de cor inválido.`);
  for (const suffix of ["", "-soft"]) {
    assert.ok(css.includes(`--fase-${phase.color}${suffix}:`), `${path}.color: variável --fase-${phase.color}${suffix} ausente no CSS.`);
  }
  list(phase.nodes, `${path}.nodes`);
  assert.ok(phase.nodes.length, `${path}: a fase precisa ter pelo menos uma etapa.`);
  phase.nodes.forEach((node, i) => {
    const nodePath = `${path}.nodes[${i}]`;
    detail(node, nodePath);
    if (node.children !== undefined) {
      list(node.children, `${nodePath}.children`);
      assert.ok(node.children.length, `${nodePath}: o grupo precisa ter pelo menos uma etapa.`);
      node.children.forEach((child, childIndex) => {
        assert.ok(child.children === undefined, `${nodePath}.children[${childIndex}]: grupos aninhados não são suportados.`);
        detail(child, `${nodePath}.children[${childIndex}]`);
      });
    }
  });
});

console.log(`Validação concluída: sintaxe JavaScript e conteúdo de ${phases.length} fases válidos.`);
