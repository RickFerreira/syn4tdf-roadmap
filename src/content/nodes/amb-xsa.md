---
id: amb-xsa
phase: ambiente
order: 9
title: XSA (CLI xs)
summary: Ver as aplicações e os logs nos ambientes publicados.
optional: true
estimate: 30 min
links:
  - type: wiki
    label: Configuração do XSA
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-do-XSA
---
Nos ambientes DEV, QA e nos clientes, o Synchro4TDF roda no **SAP XSA** (XS Advanced). Com a CLI `xs` você lista as aplicações (`xs apps`) e lê os logs (`xs logs <app> --recent`). Isso é muito útil para investigar erros que só aparecem no ambiente.

O cliente `xs` fica na área de softwares do Bitrix. Siga a página da wiki para instalar e logar. Você só vai precisar disso quando começar a investigar bugs em QA.
