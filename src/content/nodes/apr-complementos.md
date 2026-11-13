---
id: apr-complementos
phase: aprofundamento
branch: dados
order: 1
title: "Complementos"
summary: "Mapeamentos origem → destino configurados pelo usuário, que viram procedures."
optional: true
links:
  - type: wiki
    label: Entendendo Complementos
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Entendendo-Complementos
  - type: video
    label: Entendendo Complementos (introdução)
    url: https://www.youtube.com/watch?v=cZKfxlGesdY
  - type: wiki
    label: Versionamento de pacotes de complementos
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Versionamento-de-pacotes
---
Um **complemento** permite ao consultor preencher ou corrigir dados fiscais sem programar. Ele é composto por **itens** (origem e destino), **regras** (atribuições e condições) e **parâmetros**. Ao ser **ativado**, gera procedures no HANA; a **execução** é assíncrona e gera logs. Complementos podem ser agrupados em **pacotes**.
