---
id: apr-acesso
phase: aprofundamento
branch: plataforma
order: 3
title: "Controle de acesso e feature toggles"
summary: "Perfis, papéis, grupos, ProtectedResource e funcionalidades ligadas por ambiente."
optional: true
links:
  - type: wiki
    label: Controle de Acesso
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/Controle-de-Acesso
  - type: video
    label: Perfis de acesso
    url: https://youtu.be/nxnYt6Iv84E
  - type: video
    label: Feature toggles
    url: https://youtu.be/Tuml19OirSA
  - type: wiki
    label: Criação de Novo Perfil
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cria%C3%A7%C3%A3o-de-Novo-Perfil
---
Cada tela é protegida por **perfis** (modelo antigo) ou por **papéis e grupos** (modelo novo). No front, `ProtectedResource` e as rotas exigem os papéis certos. **Feature toggles** ligam e desligam funcionalidades por ambiente, configurados no back e no `syn4tdf-workspace`.
