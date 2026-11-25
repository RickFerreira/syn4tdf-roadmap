---
id: amb-gateway
phase: ambiente
order: 10
title: API Gateway local
summary: Rodar o sistema com login real (Keycloak) e auditoria.
optional: true
estimate: 45 min
links:
  - type: wiki
    label: "Tutoriais › API Gateway"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/API-Gateway
  - type: notion
    label: "Tutoriais Syn4TDF › API Gateway"
    url: https://app.notion.com/p/Configura-o-de-Ambiente-de-Desenvolvimento-40ec555d5604800da11bdba24fa52638
---
Por padrão você roda **front (8000) → back**. Quando a tarefa envolve login real, permissões ou auditoria, entra no meio o **API Gateway** (`syn4tdf-api-gateway`, Clojure):

- o gateway sobe na porta **8080** e autentica no **Keycloak**;
- o back passa para a porta **8081** e o front continua na **8000**;
- você acessa o sistema por `localhost:8080`.

Só configure quando uma issue pedir.
