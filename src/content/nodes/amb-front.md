---
id: amb-front
phase: ambiente
group: "Rodar o projeto"
order: 2
title: Front-end rodando
summary: VS Code, nvm, Node LTS, yarn e o syn4tdf-frontend no ar.
estimate: 1h
links:
  - type: wiki
    label: "Configuração de ambiente › Front-end"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#front-end
  - type: notion
    label: "Configurações de Ambiente › Configuração Inicial (extensões do VS Code)"
    url: ""
checklist:
  - nvm, Node LTS e yarn instalados
  - "`syn4tdf-frontend` clonado e `yarn` instalou as dependências sem erro"
  - ESLint e Prettier configurados no VS Code
  - "`yarn dev` sobe o front"
---
O front é uma aplicação **React** com **MobX**, gerenciada com **yarn**.

1. Instale o **VS Code** e as extensões **ESLint** e **Prettier**. O `settings.json` padrão do time está no Notion (formatar ao salvar, tab = 2 espaços).
2. Instale o **nvm** e, com ele, o **Node LTS**. Depois instale o yarn: `npm i -g yarn`.
3. Clone `componentes/syn4tdf-frontend` e rode `yarn`.
4. Rode `yarn dev`. O front sobe em **`localhost:8000`**.

Para ver dados de verdade, o back precisa estar rodando (próxima etapa). Para trabalhar só na tela, existe um **mock**: `yarn api`, que usa `db.json`.

### Erros comuns

- **Não instala ou não sobe:** confira se está usando o Node LTS e o yarn 1.22.x (classic). Tente `yarn cache clean` e rode `yarn` de novo.
