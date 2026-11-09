import React from "react";
import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { App } from "../src/app/App";
import { phases } from "../src/features/roadmap/data";
import { StepContent } from "../src/features/roadmap/components/StepContent";
import { Icon } from "../src/components/Icon";
import { iconPaths } from "../src/components/icon-paths";
import type { IconName } from "../src/components/icon-paths";

test("cada etapa, incluindo filhos de grupos, tem um modal inicialmente fechado", () => {
  const html = renderToStaticMarkup(<App />);
  const count = phases.reduce((total, phase) => total + phase.nodes.reduce(
    (sum, step) => sum + (step.children?.length ?? 1), 0,
  ), 0);
  const dialogs = html.match(/<dialog\b[^>]*>/g) ?? [];
  assert.equal(dialogs.length, count);
  assert.equal((html.match(/aria-haspopup="dialog"/g) ?? []).length, count);
  assert.ok(dialogs.every((tag) => !/\sopen(?:=|\s|>)/.test(tag)));
  const titleIds = dialogs.map((tag) => tag.match(/aria-labelledby="([^"]+)"/)?.[1]);
  assert.equal(new Set(titleIds).size, count);
  for (const id of titleIds) {
    assert.ok(id && html.includes(`id="${id}"`));
  }
});

test("conteúdo escapa textos e omite links pendentes ou inseguros", () => {
  const html = renderToStaticMarkup(<StepContent step={{
    label: "Teste", description: "Texto <script>alert(1)</script> [Inválido](javascript:alert) [Guia](https://example.com/guia)", href: "#",
  }} />);
  assert.ok(!html.includes("<script>"));
  assert.ok(!html.includes("javascript:"));
  assert.ok(!html.includes('href="#"'));
  assert.ok(html.includes('href="https://example.com/guia"'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
});

test("etapas sem orientações exibem mensagem de conteúdo pendente", () => {
  const html = renderToStaticMarkup(<StepContent step={{ label: "Nova etapa" }} />);
  assert.ok(html.includes("As orientações desta etapa serão adicionadas em breve."));
});

test("todos os ícones do catálogo são renderizáveis", () => {
  for (const name of Object.keys(iconPaths) as IconName[]) {
    const html = renderToStaticMarkup(<Icon name={name} />);
    for (const path of iconPaths[name]) assert.ok(html.includes(`d="${path}"`));
  }
});

test("vários links aparecem na frase, nos parágrafos e nos itens, sem seção de materiais", () => {
  const text = "Abra o [guia](https://example.com/guia) e o [portal](https://example.com/portal).";
  const html = renderToStaticMarkup(<StepContent step={{
    label: "Acessos", description: text,
    sections: [{ paragraphs: [text], items: [text] }],
  }} />);
  assert.equal((html.match(/<a /g) ?? []).length, 6);
  assert.ok(html.includes("Abra o "));
  assert.ok(html.includes(" e o "));
  assert.ok(!html.includes("Materiais de apoio"));
  assert.ok(!html.includes("[guia]"));
});

test("área de links tem título e aparece depois das orientações", () => {
  const html = renderToStaticMarkup(<StepContent step={{
    label: "Acessos", description: "Orientações da etapa",
    links: { title: "Plataformas", items: [
      { label: "Zimbra", href: "https://example.com/zimbra" },
      { label: "Bitrix", href: "https://example.com/bitrix" },
      { label: "Pendente", href: "#" },
    ] },
  }} />);
  assert.ok(html.includes("<h3>Plataformas</h3>"));
  assert.equal((html.match(/<a /g) ?? []).length, 2);
  assert.ok(html.indexOf("Bitrix") > html.indexOf("Orientações da etapa"));
  assert.ok(!html.includes("Pendente"));
  const empty = renderToStaticMarkup(<StepContent step={{ label: "Teste", links: {
    title: "Oculto", items: [{ label: "Pendente", href: "#" }],
  } }} />);
  assert.ok(!empty.includes("Oculto"));
});
