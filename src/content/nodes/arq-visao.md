---
id: arq-visao
phase: arquitetura
order: 1
title: Visão geral da arquitetura
summary: Um monólito central, um front único e serviços satélites, todos em cima do HANA.
estimate: 45 min
links:
  - type: notion
    label: "Tutoriais Syn4TDF › Arquitetura do Projeto"
    url: "https://app.notion.com/p/Arquitetura-do-Projeto-1a8c555d56048148b102cedc45215866"
  - type: wiki
    label: Home da wiki (diagrama de componentes)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/home
  - type: wiki
    label: Por que não é utilizado Hibernate no projeto?
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Por-que-n%C3%A3o-%C3%A9-utilizado-Hibernate-no-projeto%3F
  - type: wiki
    label: Componentes de terceiros
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/componentes-terceiros
checklist:
  - Consigo desenhar de cabeça o caminho tela → back → banco
  - Sei citar os serviços satélites e para que cada um serve
---
```
 Navegador
    │
 syn4tdf-frontend (React)        ── :8000
    │  REST
 [API Gateway] (login/auditoria) ── :8080, opcional local
    │
 syn4tdf (Java/Groovy, Spring)   ── monólito central
    │  JDBC                         │ HTTP
 SAP HANA                          ├─ Reports (Clojure)
  ├─ tabelas /SYN/*                ├─ Automação (Clojure)
  ├─ procedures                    ├─ Contab4TDF (Clojure)
  └─ Calculation Views (CVs)       └─ Motor de complementos
    │
 SAP TDF (dados fiscais do cliente)
```

Princípios que o time segue:

- **A transformação de dados acontece no banco.** O produto depende totalmente de dados, e o trabalho pesado fica em **CVs e procedures** no HANA. O Java orquestra.
- **O front só apresenta.** Nada de regra de negócio no front-end.
- **Sem ORM (Hibernate).** O acesso é via **JDBC Template**. A wiki explica o porquê: volume de dados, CVs com parâmetros e lógica em procedures.
- **Nomes em português** (DDD, a linguagem do negócio): `Empresa`, `Filial`, `Apuracao`…
- **Compatibilidade:** o produto roda em vários clientes. Não se apagam colunas nem se quebram contratos sem um plano.
