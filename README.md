<div align="center">

<img src="public/favicon.svg" width="72" alt="" />

# Trilha Synchro4TDF

**Do primeiro acesso ao primeiro MR aprovado.**

Site de onboarding do time Synchro4TDF, no estilo [roadmap.sh](https://roadmap.sh).
Sem login: o progresso de cada pessoa fica salvo no próprio navegador.

[Como rodar](#-rodando-localmente) ·
[Onde está cada coisa](#-onde-está-cada-coisa) ·
[Receitas de manutenção](#-receitas-de-manutenção) ·
[Repositório público](#%EF%B8%8F-o-repositório-é-público) ·
[Publicação](#-publicação)

</div>

---

## ✨ O que o site tem

| | |
|---|---|
| **Trilha em fases** | 9 fases, da boas-vindas às issues de treinamento. Cada etapa abre um painel com resumo, links e um checklist "Pronto quando…". |
| **Mapa da trilha** | Barra fixa no topo com o progresso de cada fase. Clicar leva até a fase. |
| **"Onde você chegou"** | Introdução à Synchro, ao Synchro4TDF, ao ciclo fiscal e a onde o código do time entra. |
| **Grupos e ramos** | Etapas paralelas aparecem lado a lado na mesma caixa (ex.: trilhas da Alura). O Aprofundamento, sem ordem fixa, se abre em ramos. |
| **Glossário fiscal** | Mais de 100 verbetes (tributos, códigos da nota, SPED, contabilidade, SAP) com busca e link direto para cada termo. |
| **Progresso local** | Salvo no `localStorage`. Exportar, importar e zerar ficam no rodapé. |
| **Temas** | Azul-escuro (padrão) e claro, com as cores e os logos da Synchro. |

Feito com **Vite + React + TypeScript**, sem framework de UI, e publicado no **GitHub Pages**.

---

## 🚀 Rodando localmente

Requisito: Node 20 ou mais novo.

```bash
npm install
npm run dev       # http://localhost:5173, recarrega a cada alteração
```

| Comando | Para quê |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run check` | Valida o conteúdo e procura dados sensíveis. **Rode antes de todo commit.** |
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o build |

---

## 🗂 Onde está cada coisa

No dia a dia, quase tudo o que você vai mexer está em **`src/content/`**.

```
src/
├── content/                    ← CONTEÚDO (é aqui que se edita)
│   ├── phases.ts               fases: ordem, título, rótulo curto do mapa, cor, descrição
│   ├── branches.ts             ramos da fase Aprofundamento
│   ├── nodes/*.md              uma etapa por arquivo
│   ├── pages/
│   │   ├── glossario.md        glossário fiscal
│   │   ├── ajuda.md            página "Travou?"
│   │   └── sobre.md            página "Sobre"
│   ├── notion-links.json       URLs do Notion, num só lugar
│   └── loadContent.ts          lê os .md (não precisa mexer)
├── components/                 componentes React
│   ├── ProjectIntro.tsx        texto e diagramas de "Onde você chegou"
│   ├── PhaseMap.tsx            mapa da trilha no topo
│   ├── PhaseSection.tsx        uma fase na espinha (e os grupos lado a lado)
│   ├── BranchHub.tsx           o Aprofundamento em ramos
│   ├── NodeDrawer.tsx          painel lateral de cada etapa
│   └── Glossary.tsx            busca e filtros do glossário
├── lib/travel.ts               animação de "pulo" entre etapas
├── state/                      progresso (localStorage) e tema
├── styles/                     CSS puro com variáveis (cores em base.css)
└── assets/ e public/brand/     logos da Synchro

scripts/check-content.mjs       validação + bloqueio de dados sensíveis
docs/PENDENCIAS.md              links e informações que ainda faltam
.github/workflows/deploy.yml    publicação automática
```

---

## 🛠 Receitas de manutenção

### Editar uma etapa

Abra o arquivo em `src/content/nodes/<id>.md`, altere e confira com `npm run dev`. O texto abaixo do cabeçalho é Markdown comum (listas, tabelas, código, links).

### Criar uma etapa

Crie `src/content/nodes/<id>.md`. Modelo comentado:

```md
---
id: amb-front                 # igual ao nome do arquivo
phase: ambiente               # id de uma fase em phases.ts
order: 2                      # posição dentro da fase
title: Front-end rodando
summary: Frase curta exibida no card e no topo do painel.
estimate: 1h                  # opcional
optional: false               # true = tracejado, não conta no progresso
group: "Rodar o projeto"      # opcional, ver "Juntar etapas numa caixa"
branch: dados                 # só na fase aprofundamento (ver branches.ts)
validate: false               # true = aviso de "resumo introdutório"
milestone: false              # true = destaque dourado (marco)
links:
  - type: wiki                # wiki | notion | alura | video | issue | site
    label: "Configuração de ambiente › Front-end"
    url: https://labgit.synchro.com.br/...
  - type: notion
    label: "Treinamento › Configuração de Ambiente de Desenvolvimento"
    url: ""                   # vazio = busca em notion-links.json
checklist:
  - "`yarn dev` sobe o front"
  - Consigo logar com um usuário mock
---
Texto da etapa em Markdown.

Link para outra etapa: [Versões e branches](#/n/proc-branches)
Link para o glossário: [ICMS-ST](#/glossario?t=icms-st)
```

> **Dica de YAML:** coloque entre aspas qualquer valor que tenha `:` ou comece com crase.

Quando todos os itens do `checklist` são marcados, a etapa vira concluída sozinha. Por isso escreva itens que o próprio novato consiga verificar.

### Juntar etapas numa caixa

Etapas **seguidas** (por `order`) da mesma fase e com o mesmo `group` aparecem juntas numa caixa, na mesma linha da trilha. Use para coisas paralelas, como as duas trilhas da Alura. Cada etapa continua tendo o seu painel e o seu checklist.

### Adicionar um ramo ao Aprofundamento

1. Crie o ramo em `src/content/branches.ts` (`id`, `title`, `description`).
2. Nas etapas da fase `aprofundamento`, use `branch: <id>`.

O `npm run check` avisa se alguma etapa do Aprofundamento ficar sem ramo.

### Criar uma fase

1. Adicione a fase em `src/content/phases.ts`. A posição no array é a ordem.
2. Se quiser uma cor nova, crie `--fase-NOME` em `src/styles/base.css`, nos dois temas (azul-escuro e claro).
3. Crie as etapas com `phase: <id>`.

### Preencher um link do Notion

O export do Notion não guarda as URLs, então os links aparecem como "Notion · em breve". Abra a página no Notion, use **Copiar link** e cole em `src/content/notion-links.json`, na chave com o **mesmo texto do `label`**. Uma chave serve para todas as etapas que citam aquela página. A lista completa está em [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

### Editar o glossário

Em `src/content/pages/glossario.md`:

- `## Assunto` agrupa verbetes e vira um filtro;
- `### Termo` é um verbete;
- comece o verbete com `**Em uma frase:**` (fica destacado);
- o link direto é `#/glossario?t=<termo sem acento, com hífens>`. Ex.: `### ICMS-ST` → `#/glossario?t=icms-st`.

### Editar a introdução, as páginas e as cores

- **"Onde você chegou"** (empresa, produto, ciclo fiscal): `src/components/ProjectIntro.tsx`.
- **"Travou?" e "Sobre"**: `src/content/pages/*.md`.
- **Cores e fontes**: variáveis no topo de `src/styles/base.css`.

---

## ⚠️ O repositório é público

O site pode ser aberto por qualquer pessoa. **Nunca** coloque nele:

- senhas, tokens ou arquivos como `profiles.clj`;
- hosts, portas e IPs internos;
- nomes de clientes;
- nomes ou e-mails de pessoas;
- links de planilhas.

Em vez disso, **aponte para a página da wiki ou do Notion** que tem a informação. Elas já exigem login e VPN.

O `npm run check` procura os padrões mais comuns em todo o conteúdo e nos componentes, e o deploy **não publica** se ele falhar. Se precisar de uma exceção legítima (texto explicativo, não um dado real), ajuste a lista `ALLOW` em `scripts/check-content.mjs`.

---

## 📦 Publicação

Todo push na `main` roda `.github/workflows/deploy.yml`: `npm ci` → `npm run check` → `npm run build` → GitHub Pages.

Configuração única no GitHub: **Settings → Pages → Source: GitHub Actions**.

O site usa `HashRouter` e `base: './'`, então funciona com qualquer nome de repositório e os links de etapa (`#/n/<id>`) podem ser compartilhados.

---

## 🤝 Contribuindo

Acabou de passar pela trilha? Sua experiência é a mais valiosa. Corrija um link, complete uma etapa ou conte o que faltou: edite o arquivo, rode `npm run check` e abra um PR.
