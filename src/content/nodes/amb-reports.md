---
id: amb-reports
phase: ambiente
group: "Microsserviços Clojure"
order: 6
title: Reports (Clojure)
summary: Microsserviço que gera os relatórios Excel e PDF do produto.
estimate: 1h
links:
  - type: wiki
    label: "Configuração de ambiente › Reports"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#reports
  - type: notion
    label: "Configurações de Ambiente › Profiles Clojure"
    url: ""
checklist:
  - Leiningen instalado e `syn4tdf-report` importado no IntelliJ com Cursive
  - "`profiles.clj` criado na raiz do projeto (modelo da wiki)"
  - "`lein ring server-headless` sobe o serviço na porta 3000"
---
Os relatórios do Synchro4TDF são gerados por um microsserviço em **Clojure**, o `syn4tdf-report`.

1. `sudo apt install leiningen`
2. Clone `componentes/syn4tdf-report`. No IntelliJ com **Cursive**, use *Project from Existing Sources › Leiningen*.
3. Rode `lein deps`.
4. Crie o `profiles.clj` na raiz, a partir do modelo anexado na wiki. Ele aponta para o banco e leva **a sua sigla**. **Esse arquivo tem senhas: nunca faça commit dele.**
5. Rode `lein ring server-headless`.

**Dica:** no Cursive, troque o editor estrutural de *paredit* para **parinfer**. Fica bem mais fácil editar os parênteses.

**Erro comum:** se o REPL não iniciar, rode `lein clean` e depois `lein deps`.
