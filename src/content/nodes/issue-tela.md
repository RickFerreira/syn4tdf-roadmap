---
id: issue-tela
phase: issues
order: 3
title: "[Treinamento] Tela de Benefícios Fiscais"
summary: Um CRUD completo, com tabela, CV, Java, front e import/export Excel.
estimate: 1–2 semanas
links:
  - type: issue
    label: "Issue #10063"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/issues/10063
  - type: wiki
    label: CRUD de Nova Tela (tutorial)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/CRUD-de-Nova-Tela
checklist:
  - Tabela, sequence e CV criadas e versionadas
  - Back-end (TO, Resource, Service, Repository) funcionando
  - Tela no front com listagem, criação, edição e exclusão
  - MR aberto com vídeo de evidência e revisado pelos padrinhos
---
A issue mais completa do treinamento: você constrói uma **tela de cadastro** de ponta a ponta.

Muita gente faz em duas partes, **front primeiro** (usando o mock do `yarn api`) e depois **back + banco**. Assim cada MR fica menor e mais fácil de revisar.

Use o tutorial **CRUD de Nova Tela** como guia e copie a estrutura de uma tela parecida que já existe no produto. Ler código existente é metade do trabalho.
