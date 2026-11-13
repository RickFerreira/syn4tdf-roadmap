---
id: proc-code-review
phase: processo
order: 4
title: Code review
summary: Os checklists que os revisores usam. Leia antes de abrir o MR.
estimate: 30 min
links:
  - type: notion
    label: "Code Review › Frontend"
    url: ""
  - type: notion
    label: "Code Review › Backend Java"
    url: ""
  - type: notion
    label: "Code Review › Backend Clojure"
    url: ""
  - type: wiki
    label: Guia de MRs
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Guia-MRs
checklist:
  - Li os checklists de review do que vou alterar (front, Java ou Clojure)
---
O Notion tem **checklists de code review** por área. Passe por eles **antes** de pedir revisão: você economiza idas e vindas.

**Front-end**
- Evite \`if\` aninhado; use \`?.\`, \`??\` e condições extraídas para booleanos com nome.
- Use as classes do \`tdf.scss\` em vez de \`style\` inline.
- Nomes significativos, sem comentários óbvios, \`useState\` tipado.

**Back-end Java**
- Imports organizados e código formatado (no IntelliJ: \`Ctrl+Alt+O\` e \`Ctrl+Alt+L\`).
- Regra de negócio na **Service**, nunca no Resource.
- Cuidado com **SQL injection**: use parâmetros com o JDBC Template.
- Print do Liquibase (\`DATABASECHANGELOG\`) quando houver banco.

**Back-end Clojure**
- \`CHANGELOG.md\` atualizado.
- Funções curtas; prefira \`map\`, \`filter\` e \`reduce\`.
- Booleanos com sufixo \`?\`.

Também vale revisar MRs dos colegas, mesmo como novato: é uma ótima forma de aprender o código.
