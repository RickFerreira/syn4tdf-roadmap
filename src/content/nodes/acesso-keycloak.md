---
id: acesso-keycloak
phase: acessos
order: 8
title: Login no sistema (Keycloak/SCSA)
summary: Usuário para entrar no Synchro4TDF dos ambientes e no API Gateway.
estimate: 15 min
links:
  - type: notion
    label: "Stack Overflow › Não é possível trocar a senha"
    url: ""
checklist:
  - Tenho usuário no Keycloak (SCSA) e troquei a senha inicial
---
Nos ambientes DEV, QA e SHOWCASE, e quando o **API Gateway** roda localmente, o login no Synchro4TDF passa pelo **Keycloak** (realm *SCSA*).

- A troca de senha é feita na página de conta do **SCSA de produção**. A instância de dev responde "usuário apenas leitura".
- Para ter acesso de administrador nos ambientes, o usuário precisa estar cadastrado como *master user* no repositório `syn4tdf-workspace`. Pergunte ao seu padrinho como é feito hoje.

No ambiente local sem gateway, o back usa **usuários mock** (`user-data.json`), então você não precisa do Keycloak para começar.
