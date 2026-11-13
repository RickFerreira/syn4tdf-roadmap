---
id: arq-banco
phase: arquitetura
order: 4
title: Banco HANA, tabelas e CVs
summary: Tabelas /SYN/, sequences, procedures e o coração do produto, as Calculation Views.
estimate: 45 min
links:
  - type: wiki
    label: "CRUD de Nova Tela › parte Banco"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/CRUD-de-Nova-Tela
  - type: wiki
    label: Ordem de criação dos objetos do banco
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Ordem-de-cria%C3%A7%C3%A3o-dos-objetos-do-banco-de-dados.
  - type: notion
    label: "Tutoriais Syn4TDF › Dicas Gerais CVs › Informações ESSENCIAIS de CVs"
    url: ""
checklist:
  - Sei o que é uma Calculation View e por que o projeto usa tantas
  - Conheço as convenções de nome (/SYN/TABELA, /SYN/SEQ_*, V_*)
---
O **SAP HANA** é um banco em memória e colunar, muito rápido para agregações. O produto aproveita isso colocando a lógica de dados no banco.

### Objetos e convenções

| Objeto | Convenção | Para quê |
|---|---|---|
| Tabela | `/SYN/NOME_DA_TABELA` (maiúsculas), com `ID BIGINT` | Dados próprios do Synchro4TDF |
| Sequence | `/SYN/SEQ_NOME` | Gerar IDs |
| **Calculation View** | `V_NOME` | Visões calculadas: joins, filtros, agregações, com parâmetros como `P_MANDT`, `P_EMPRESA`, `P_DT_INI`… |
| Procedure / Function | `/SYN/P_...`, `/SYN/F_...` | Processamentos (apurações, complementos) |

As **CVs** são editadas **graficamente no Eclipse** (HANA Tools). Elas leem as tabelas do **TDF** (dados do cliente) e as tabelas `/SYN/`. As telas e os relatórios consomem as CVs.

Existem dois "mundos" no banco de DEV, **evolução** e **suporte**, com schemas e pacotes separados. Toda alteração de banco precisa ser **versionada** (Liquibase), como você verá no Treinamento.
