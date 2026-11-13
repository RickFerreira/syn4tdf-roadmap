---
id: apr-gateway
phase: aprofundamento
branch: plataforma
order: 8
title: "API Gateway"
summary: "Autenticação, autorização, auditoria e proxy na frente do back."
optional: true
links:
  - type: wiki
    label: api-gateway (design)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/api-gateway
  - type: wiki
    label: Tutorial API Gateway
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/API-Gateway
---
O gateway faz quatro coisas: **autentica** (OAuth2/Keycloak), **autoriza**, **audita** e faz **proxy** das requisições para o back. Entenda o fluxo antes de mexer em login, permissões ou auditoria.
