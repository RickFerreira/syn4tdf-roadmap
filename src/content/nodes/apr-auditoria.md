---
id: apr-auditoria
phase: aprofundamento
branch: plataforma
order: 6
title: "Auditoria"
summary: "Rastrear requisições e registrar eventos auditados."
optional: true
links:
  - type: wiki
    label: Auditoria
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Auditoria
---
As requisições que passam pelo **API Gateway** podem ser auditadas. Expressões regulares definidas em CSV indicam quais endpoints geram evento, e os eventos são gravados via **message-store**. Para testar localmente: metadados importados, gateway, back e front rodando.
