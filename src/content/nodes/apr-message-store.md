---
id: apr-message-store
phase: aprofundamento
branch: plataforma
order: 7
title: "Message Store"
summary: "Usar uma versão local do message-store dentro da Automação."
optional: true
links:
  - type: wiki
    label: Message Store
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Message-Store
  - type: notion
    label: Tutoriais Syn4TDF › Message-store
    url: ""
---
O **message-store** é uma biblioteca e serviço de eventos usada pela Automação. Para testar uma alteração nele, publique uma versão **SNAPSHOT** local (`lein install`), aponte a dependência da Automação para ela e rode `lein deps`.
