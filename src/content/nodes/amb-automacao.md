---
id: amb-automacao
phase: ambiente
group: "Microsserviços Clojure"
order: 7
title: Automação (Clojure)
summary: Serviço que orquestra os processos (obrigações, complementos, conciliação).
estimate: 45 min
links:
  - type: wiki
    label: "Configuração de ambiente › Automação"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#automacao
  - type: notion
    label: "Configurações de Ambiente › Profiles Clojure"
    url: https://app.notion.com/p/Configura-o-de-Ambiente-de-Desenvolvimento-40ec555d5604800da11bdba24fa52638
checklist:
  - "`poc-syn4tdf-automacao` clonado, `lein deps` e `profiles.clj` configurados"
  - "`lein ring server-headless` sobe a automação"
---
A **Automação** (`componentes/poc-syn4tdf-automacao`) é o serviço Clojure que **orquestra os processos** do produto: dispara execuções, chama o motor de complementos, o Reports e os serviços do TDF.

O setup é o mesmo do Reports: importar como projeto Leiningen, `lein deps`, criar o `profiles.clj` (o modelo está na wiki) e rodar `lein ring server-headless`.

> Não confunda com os módulos Java `automacao-core` e `automacao-tech`, que ficam dentro do repositório `syn4tdf`.

**Erro comum:** "porta já em uso" porque o Reports também usa a 3000. Rode um de cada vez ou mude a porta no profile.
