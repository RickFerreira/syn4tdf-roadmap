---
id: arq-clojure
phase: arquitetura
order: 5
title: Microsserviços em Clojure
summary: Reports, Automação, Contab4TDF, API Gateway e message-store, e como conversar com eles via REPL.
estimate: 45 min
links:
  - type: wiki
    label: "Tutoriais › Relatórios no Reports"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Relat%C3%B3rios-no-Reports
  - type: wiki
    label: "Tutoriais › Contab"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Contab
  - type: wiki
    label: api-gateway (motivação e design)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/api-gateway
  - type: site
    label: Clojure for the Brave and True (livro gratuito)
    url: https://www.braveclojure.com/clojure-for-the-brave-and-true/
checklist:
  - Sei qual serviço Clojure gera relatórios, qual orquestra processos e qual contabiliza
---
Ao redor do monólito Java existem serviços em **Clojure** (rodados com **Leiningen**, configurados por `profiles.clj`):

| Serviço | Repositório | Faz |
|---|---|---|
| **Reports** | `syn4tdf-report` | Gera relatórios Excel e PDF a partir de CVs |
| **Automação** | `poc-syn4tdf-automacao` | Orquestra processos: obrigações, complementos, conciliação |
| **Contab4TDF** | `syn4tdf-atualizacao-contabil` | Gera lançamentos contábeis dos impostos apurados (arquitetura hexagonal) |
| **API Gateway** | `syn4tdf-api-gateway` | Login (Keycloak), autorização, auditoria e proxy |
| **Message Store** | `message-store` | Biblioteca de eventos e mensagens usada pela automação |

Clojure é um Lisp funcional que roda na JVM. O fluxo de trabalho gira em torno do **REPL**: você avalia funções direto no editor (Cursive) com o serviço rodando. Se nunca viu um Lisp, a etapa opcional *Clojure básico* do Treinamento ajuda.
