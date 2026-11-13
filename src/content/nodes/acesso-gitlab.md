---
id: acesso-gitlab
phase: acessos
order: 4
title: GitLab (labgit) e chave SSH
summary: Onde ficam o código, as issues, os MRs, o board e a wiki.
estimate: 30 min
links:
  - type: site
    label: Projeto Synchro4TDF no labgit
    url: https://labgit.synchro.com.br/componentes/syn4tdf
  - type: wiki
    label: "Configuração de ambiente › Pacotes iniciais e git (chave SSH)"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#pacotes-iniciais-e-git
checklist:
  - Consigo abrir o projeto, o board e a wiki no labgit (com VPN)
  - Cadastrei minha chave SSH no GitLab
  - Coloquei foto no perfil do GitLab
---
O código fica no GitLab interno da Synchro, o **labgit** (`labgit.synchro.com.br`). Alguns links antigos ainda usam `git.synchro.com.br`; troque pelo domínio novo. Seu usuário segue o padrão `nome.sobrenome.ext`.

### Repositórios que você vai usar

| Repositório | O que é |
|---|---|
| `componentes/syn4tdf` | Back-end principal (Java/Groovy) e scripts de banco (Liquibase, CVs) |
| `componentes/syn4tdf-frontend` | Front-end React |
| `componentes/syn4tdf-dev-tools` | Scripts Babashka (`bb`) para setup e para aplicar o banco |
| `componentes/syn4tdf-report` | Microsserviço de relatórios (Clojure) |
| `componentes/poc-syn4tdf-automacao` | Automação: orquestra processos (Clojure) |
| `componentes/syn4tdf-api-gateway` | API Gateway (login e auditoria) |
| `componentes/syn4tdf-workspace` | Configurações de ambiente e feature toggles |

Além do código, o GitLab tem o **board** das issues (raias de Kanban) e a **wiki**, que é uma das duas documentações oficiais do time.
