---
id: amb-devtools
phase: ambiente
order: 5
title: Dev-tools (Clojure CLI + Babashka)
summary: Os scripts `bb` do time fazem setup dos repositórios e aplicam o Liquibase no banco.
estimate: 45 min
links:
  - type: wiki
    label: "Configuração de ambiente › Dev-tools"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#dev-tools
checklist:
  - rlwrap, Clojure CLI e Babashka instalados
  - "`syn4tdf-dev-tools` clonado e `bb setup <pasta-dos-repos>` executado"
  - "`bb repo:projects` lista os repositórios"
---
O `syn4tdf-dev-tools` é um conjunto de scripts em **Babashka** (Clojure para scripts). Você vai usá-lo principalmente para **aplicar alterações de banco** com o Liquibase:

```bash
bb db:changes <ambiente> syn4tdf      # mostra o que falta aplicar
bb db:migrate <ambiente> syn4tdf      # aplica os changesets
bb db:migrate:procs <ambiente> syn4tdf  # aplica procedures e functions
```

Instale `rlwrap`, a **Clojure CLI** e o **Babashka** com os scripts oficiais. Depois clone o repositório e rode `bb setup`, apontando para a pasta onde ficam seus repositórios.

### Erros comuns

- **Changelog lock / Liquibase travado:** existe uma task para liberar o lock (`bb db:release:locks`). Confirme com o time antes de usar em ambiente compartilhado.
- **Timeout ao conectar:** verifique a VPN e se o host em `~/.syn4tdf/devtools.edn` é o atual.
