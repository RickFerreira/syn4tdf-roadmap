---
id: proc-branches
phase: processo
order: 2
title: Versões e branches
summary: Evolução sai da master, suporte sai da X.Y-suporte. Errar a base é o erro clássico.
estimate: 20 min
links:
  - type: wiki
    label: "Introdução › Versões e Branches"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Introdu%C3%A7%C3%A3o-ao-Synchro4TDF#vers%C3%B5es-e-branches
  - type: wiki
    label: Builds, versões e releases
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/releases
  - type: wiki
    label: Datas e marcos das sprints
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Datas-e-marcos-das-sprints
checklist:
  - Sei descobrir pela milestone da issue de qual branch devo partir
---
A **milestone** da issue diz a versão em que ela será entregue, e isso define a **branch de origem**:

| Milestone | Tipo | Crie a branch a partir de |
|---|---|---|
| `X.Y.0` (ex.: `25.3.0`) | **Evolução**: versão nova | `master` |
| `X.Y.Z` com Z ≠ 0 (ex.: `25.2.4`) | **Suporte**: correção de versão entregue | `X.Y-suporte` (ex.: `25.2-suporte`) |

- Só o **back** (`syn4tdf`) e o **front** têm branches de suporte. Os repositórios **Clojure** sempre partem da `master` e versionam pelo `project.clj` + `CHANGELOG.md`.
- Nome da branch: `<número-da-issue>-descricao-curta`, por exemplo `10063-tela-beneficios-fiscais`.
- O MR deve apontar para a **mesma branch** de onde você partiu.

O mesmo vale para o banco: rode o back e aplique o Liquibase no ambiente (**evolucao** ou **suporte**) que corresponde à sua milestone.
