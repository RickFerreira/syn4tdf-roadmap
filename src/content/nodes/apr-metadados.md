---
id: apr-metadados
phase: aprofundamento
branch: dados
order: 2
title: "Metadados"
summary: "Tabelas de domínio e dados carregados por arquivos CSV."
optional: true
links:
  - type: wiki
    label: Metadados
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Metadados
  - type: wiki
    label: Atualização de Metadados do sistema
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Atualiza%C3%A7%C3%A3o-de-Metadados-do-sistema
---
Listas de valores (tipos, códigos, situações) não são fixas no código: ficam em **CSVs de metadados** importados para o banco. Para criar um domínio novo, adiciona-se uma entrada `TabCod(...)` em `TDF_TABELAS_DOMINIO.csv` e a constante correspondente no front, para usar com `ComboDominio`. A importação é feita por um endpoint do back.
