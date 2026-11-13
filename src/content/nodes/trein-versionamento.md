---
id: trein-versionamento
phase: treinamento
order: 5
title: Versionamento de objetos de banco
summary: Toda mudança no HANA vira código, com changesets Liquibase, CVs exportadas e procedures em .sql.
estimate: 3h
links:
  - type: wiki
    label: Versionamento de Objetos
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Versionamento-de-Objetos
  - type: video
    label: Playlist de versionamento
    url: https://www.youtube.com/playlist?list=PLqJE3pvbA5xNzBf0lslTOctJKLZRnGrUK
  - type: wiki
    label: Ordem de criação dos objetos do banco
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Ordem-de-cria%C3%A7%C3%A3o-dos-objetos-do-banco-de-dados.
  - type: notion
    label: "Tutoriais Syn4TDF › Versionamento de Objetos"
    url: ""
checklist:
  - Sei criar um changeset com **uma instrução** e o `<rollback>` correspondente
  - Sei onde ficam os changelogs, os .sql das procedures e as CVs no repositório
  - Rodei `bb db:changes` e entendi a saída
---
O banco dos clientes é montado a partir do **repositório**, não do que está no seu DEV. Por isso **todo objeto de banco precisa ser versionado** no `syn4tdf`:

| Objeto | Como versionar |
|---|---|
| Tabela, coluna, sequence, dados | **Changeset Liquibase** em `db-changelog-vXX.X.xml`: uma instrução por changeset, **sempre com rollback** |
| Procedure / function | Arquivo `.sql` + entradas nos changelogs de procedures |
| Calculation View | Exportar do Eclipse para a pasta `CV`, trocando os nomes de schema e pacote específicos pelos genéricos |
| Complemento | Exportar e rodar o script de *split* do repositório |

- O **id** do changeset é a data e hora (`date +%Y%m%d%H%M%S`).
- Use os **placeholders** (`${synchro.schema}`…) em vez de nomes fixos de schema.
- Aplique no DEV com o **dev-tools** (`bb db:migrate`) e **anexe o print da `DATABASECHANGELOG`** no MR.

Esta é a etapa em que os novatos mais erram no primeiro MR. Leia a página inteira da wiki.
