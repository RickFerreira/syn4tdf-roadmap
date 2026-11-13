---
id: arq-front
phase: arquitetura
group: "Back e front"
order: 3
title: Estrutura do front-end
summary: "Menu → Rotas → Domain → Pages → Stores → Service, com React + MobX."
estimate: 45 min
links:
  - type: wiki
    label: "CRUD de Nova Tela › parte Front-end"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/CRUD-de-Nova-Tela
  - type: wiki
    label: Migração do React Router
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Migra%C3%A7%C3%A3o-do-React-Router
  - type: site
    label: Storybook de componentes do Synchro4TDF
    url: https://componentes-syn4tdf.synchro.com.br/
  - type: site
    label: Ant Design (base dos componentes)
    url: https://ant.design/
checklist:
  - Encontrei no código o menu, a rota, o domain, as pages, a store e a service de uma tela existente
---
O front (`syn4tdf-frontend`) é **React** com **MobX** para estado e componentes baseados em **Ant Design**. Uma tela típica de cadastro passa por:

1. **Menu**: o item no `AccordionMenu` / `MenuLink`.
2. **Rotas**: em `routes/*.js` e `allRoutes.js`, com proteção por perfil.
3. **Domain**: classe MobX com os campos da entidade, em *snake_case* igual ao back.
4. **Pages**: `Index` (listagem), `Form`, `New` e `Edit`.
5. **Stores**: `IndexStore` e `FormStore` (carregam, filtram e salvam).
6. **Service**: estende `ServiceBase` e chama a API REST.

Há vários componentes prontos para reaproveitar: `ComboEmpresa`, `ComboFilial`, `ComboDominio`, `PeriodPicker`, `ProtectedResource`… **Antes de criar um componente, procure se já existe** no código ou no Storybook.
