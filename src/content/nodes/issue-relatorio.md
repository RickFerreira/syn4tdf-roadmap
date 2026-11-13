---
id: issue-relatorio
phase: issues
order: 4
title: "[Treinamento] Relatório de Benefícios Fiscais"
summary: Um relatório novo no Reports (Clojure), alimentado por uma CV.
estimate: 1 semana
links:
  - type: issue
    label: "Issue #10117"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/issues/10117
  - type: wiki
    label: Relatórios no Reports (tutorial)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Relat%C3%B3rios-no-Reports
checklist:
  - Relatório gerado pela tela com os dados corretos
  - project.clj e CHANGELOG.md atualizados
  - MR aberto com evidências e revisado
---
Agora o desafio é o **Reports**: criar o relatório de benefícios fiscais, normalmente a partir dos dados da tela que você construiu.

- Defina o relatório no **core** (abas, colunas, formatadores) e a consulta que busca os dados.
- Gere pelo REPL primeiro e depois pela tela.
- Use os MRs de referência listados no tutorial como modelo.
- Atualize a versão e o `CHANGELOG.md`. Lembre que repositórios Clojure sempre partem da `master`.
