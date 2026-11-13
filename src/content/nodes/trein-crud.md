---
id: trein-crud
phase: treinamento
order: 7
title: CRUD de nova tela
summary: Uma tela completa, do banco ao front, passo a passo e com vídeos.
estimate: 1 dia
links:
  - type: wiki
    label: CRUD de Nova Tela
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/CRUD-de-Nova-Tela
  - type: video
    label: "Vídeo 1: Front-end"
    url: https://youtu.be/qEmIg1ivTdU
  - type: video
    label: "Vídeo 2: Banco de dados"
    url: https://youtu.be/xJpw_4iCtEw
  - type: video
    label: "Vídeo 3: Java"
    url: https://youtu.be/LhHvsRqTSlc
  - type: notion
    label: "Tutoriais Syn4TDF › CRUD de Nova Tela"
    url: ""
checklist:
  - Assisti aos três vídeos
  - Entendi o caminho completo, tabela → CV → Repository → Service → Resource → Service (front) → Store → Page
  - Sei como funciona a importação e exportação Excel de uma tela
---
É o tutorial mais completo da wiki e a base da issue de treinamento **Tela de Benefícios Fiscais**. Ele cobre:

1. **Banco:** tabela `/SYN/`, sequence e uma **CV** com joins de estabelecimento e de tabelas de domínio.
2. **Java:** TO → Resource → Service → Repository.
3. **Front:** menu, rota, domain, pages (Index/Form/New/Edit), stores e service.
4. **Import/Export Excel:** template `.xlsx`, *Processor*, *Job* do Spring Batch e a flag no front.

Você não precisa reproduzir tudo agora. Leia, assista e **identifique cada peça numa tela que já existe** no código. Na issue de treinamento você vai construir a sua.
