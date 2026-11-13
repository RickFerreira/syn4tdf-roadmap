---
id: apr-contab
phase: aprofundamento
branch: modulos
order: 5
title: "Contab4TDF"
summary: "Lançamentos contábeis dos impostos apurados (FB50/FB60 no SAP)."
optional: true
links:
  - type: wiki
    label: Contab
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Contab
  - type: notion
    label: Tutoriais Syn4TDF › Contab (visão funcional e técnica)
    url: ""
---
O **Contab4TDF** pega os valores apurados e gera os **lançamentos contábeis** no SAP: **FB50** (lançamento contábil) e **FB60** (contas a pagar). É um serviço Clojure em arquitetura hexagonal (`adapters → ports → interceptors → domain`), com versionamento próprio.
