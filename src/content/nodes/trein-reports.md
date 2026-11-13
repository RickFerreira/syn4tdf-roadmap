---
id: trein-reports
phase: treinamento
order: 6
title: Relatórios no Reports
summary: Gerar um relatório pelo REPL e pela tela, e entender a estrutura de um relatório.
estimate: 3h
links:
  - type: wiki
    label: Relatórios no Reports
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Relat%C3%B3rios-no-Reports
  - type: video
    label: Playlist do Reports
    url: https://www.youtube.com/playlist?list=PLqJE3pvbA5xPTAfP5fEHnmEThTZln5qy7
  - type: notion
    label: "Tutoriais Syn4TDF › Relatórios no Reports"
    url: ""
checklist:
  - Gerei um relatório existente pelo REPL
  - Gerei um relatório pela tela, com o front apontando para o Reports local
  - Sei em quais arquivos se define um relatório novo
---
Esta é a base para a issue de treinamento do **Relatório de Benefícios Fiscais**.

1. Com o Reports rodando no REPL (Cursive), gere um relatório existente chamando a função de geração.
2. Configure o back para usar o Reports **local** (propriedade `report.api.endpoint` apontando para `localhost:3000`) e gere o relatório pela tela.
3. Estude o fluxo de arquivos: `web.clj` → `handler.clj` → `api.clj` → `execution_process_<modulo>.clj` → `core.clj`. Veja também `excel.clj`, `report.clj` e `repository.clj`.
4. Entenda a definição de um relatório no **core**: formatadores, metadados, informações de geração, abas e dados (geralmente vindos de uma CV).

A wiki lista **MRs de referência** de relatórios criados por outros devs. Use-os como modelo.

Não esqueça: todo MR no Reports atualiza a versão no `project.clj` e o `CHANGELOG.md`.
