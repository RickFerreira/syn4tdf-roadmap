import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPage } from "../content/loadContent";
import Markdown from "./Markdown";
import { Icon } from "./Icons";

interface Term {
  id: string;
  title: string;
  body: string;
  category: string;
  haystack: string;
}
interface Category {
  id: string;
  title: string;
  intro: string;
  terms: Term[];
}

export const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** "## Categoria" agrupa termos; cada "### Termo" vira um verbete. */
function parse(md: string) {
  const lines = md.split("\n");
  let preamble = "";
  const cats: Category[] = [];
  let cat: Category | null = null;
  let term: Term | null = null;
  const flush = () => {
    if (term && cat) {
      term.body = term.body.trim();
      term.haystack = norm(`${term.title} ${term.body}`);
      cat.terms.push(term);
    }
    term = null;
  };
  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      const title = line.slice(3).trim();
      cat = { id: slug(title), title, intro: "", terms: [] };
      cats.push(cat);
    } else if (line.startsWith("### ") && cat) {
      flush();
      const title = line.slice(4).trim();
      term = { id: slug(title), title, body: "", category: cat.id, haystack: "" };
    } else if (term) {
      term.body += line + "\n";
    } else if (cat) {
      cat.intro += line + "\n";
    } else {
      preamble += line + "\n";
    }
  }
  flush();
  return { preamble: preamble.trim(), cats };
}

/** O caminho do imposto, do documento à contabilidade: atalhos para os verbetes. */
const FLOW: [string, string][] = [
  ["Documento fiscal", "documento-fiscal-nf-e-nfs-e-ct-e"],
  ["Escrituração", "escrituracao"],
  ["Apuração", "apuracao"],
  ["Obrigação acessória", "obrigacao-principal-x-obrigacao-acessoria"],
  ["Guia / recolhimento", "guias-de-recolhimento-darf-gnre-gare"],
  ["Contabilização", "contabilizacao"],
];

export default function Glossary() {
  const { preamble, cats } = useMemo(() => parse(getPage("glossario")), []);
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [only, setOnly] = useState<string>("");
  const focus = params.get("t") ?? "";

  const total = cats.reduce((n, c) => n + c.terms.length, 0);
  const needle = norm(q.trim());
  const filtered = cats
    .filter((c) => !only || c.id === only)
    .map((c) => ({ ...c, terms: needle ? c.terms.filter((t) => t.haystack.includes(needle)) : c.terms }))
    .filter((c) => c.terms.length > 0);
  const shown = filtered.reduce((n, c) => n + c.terms.length, 0);

  // ?t=icms abre direto no verbete
  useEffect(() => {
    if (!focus) return;
    const el = document.getElementById(`t-${focus}`);
    if (el) {
      el.scrollIntoView({ block: "center" });
      el.classList.add("flash");
      const t = setTimeout(() => el.classList.remove("flash"), 1600);
      return () => clearTimeout(t);
    }
  }, [focus]);

  const goTerm = (id: string) => {
    setQ("");
    setOnly("");
    setParams({ t: id }, { replace: true });
    // mesmo verbete clicado de novo: rola de novo
    setTimeout(() => document.getElementById(`t-${id}`)?.scrollIntoView({ block: "center", behavior: "smooth" }), 0);
  };

  return (
    <div className="glossary">
      <header className="glossary-head">
        <Markdown>{preamble}</Markdown>

        <nav className="tax-flow" aria-label="Do documento à contabilização">
          <p className="section-kicker">O caminho do imposto</p>
          <ol>
            {FLOW.map(([label, id]) => (
              <li key={id}>
                <button onClick={() => goTerm(id)}>{label}</button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="glossary-tools">
          <label className="search">
            <Icon name="search" size={16} />
            <input
              type="search"
              placeholder={`Buscar entre ${total} termos (ex.: ST, CFOP, apuração)`}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar no glossário"
            />
          </label>
          <div className="glossary-cats" role="group" aria-label="Filtrar por assunto">
            <button className={only === "" ? "chip active" : "chip"} onClick={() => setOnly("")}>
              Tudo
            </button>
            {cats.map((c) => (
              <button
                key={c.id}
                className={only === c.id ? "chip active" : "chip"}
                onClick={() => setOnly(only === c.id ? "" : c.id)}
              >
                {c.title} <span className="chip-n">{c.terms.length}</span>
              </button>
            ))}
          </div>
          {(needle || only) && (
            <p className="glossary-count" role="status">
              {shown} {shown === 1 ? "termo" : "termos"}
            </p>
          )}
        </div>
      </header>

      {filtered.length === 0 && (
        <p className="glossary-empty">
          Nada encontrado para “{q}”. Tente o <a href="https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Glossario-Funcional" target="_blank" rel="noopener noreferrer">Glossário Funcional da wiki</a> ou pergunte no canal do time.
        </p>
      )}

      {filtered.map((c) => (
        <section key={c.id} className="glossary-cat" id={`c-${c.id}`}>
          <h2>{c.title}</h2>
          {c.intro.trim() && !needle && (
            <div className="glossary-cat-intro">
              <Markdown>{c.intro.trim()}</Markdown>
            </div>
          )}
          <div className="terms">
            {c.terms.map((t) => (
              <article key={t.id} id={`t-${t.id}`} className={focus === t.id ? "term focused" : "term"}>
                <h3>
                  <a href={`#/glossario?t=${t.id}`} onClick={(e) => { e.preventDefault(); goTerm(t.id); }}>
                    {t.title}
                  </a>
                </h3>
                <Markdown>{t.body}</Markdown>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
