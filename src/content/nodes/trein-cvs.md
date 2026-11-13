---
id: trein-cvs
phase: treinamento
order: 4
title: Dicas de Calculation Views
summary: Executar, filtrar, exportar e debugar uma CV no Eclipse.
estimate: 2h
links:
  - type: wiki
    label: Dicas Gerais CVs
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Dicas-Gerais-CVs
  - type: video
    label: Lidando com CVs (dicas gerais)
    url: https://www.youtube.com/watch?v=VaB7dDYzTZ0
  - type: video
    label: Debugando CVs
    url: https://www.youtube.com/watch?v=wWz25U5WoFk
  - type: notion
    label: "Tutoriais Syn4TDF › Dicas Gerais CVs"
    url: ""
checklist:
  - Executei uma CV com *Data Preview* informando os parâmetros
  - Usei o preview de um nó intermediário (projection/join) para entender o fluxo
  - Sei exportar uma CV como backup
---
Você vai passar bastante tempo com **Calculation Views**. Antes de alterar qualquer uma, aprenda a **inspecionar**:

- **Data Preview:** executa a CV inteira ou só um nó intermediário. É assim que se descobre em qual etapa um dado some ou duplica.
- **Filtros e parâmetros:** a maioria das CVs pede `P_MANDT`, `P_EMPRESA`, período etc.
- **Debug this View:** percorre a CV nó a nó.
- **Busca binária para achar erro:** vá olhando nós intermediários até isolar onde o problema começa.

⚠️ **Exporte a CV que você está editando** (backup). Os ambientes de DEV são compartilhados e uma CV pode ser sobrescrita por outro deploy.

⚠️ Se colocar **valor padrão em um parâmetro** para testar, **remova antes de versionar**.
