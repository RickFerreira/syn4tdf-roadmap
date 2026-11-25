---
id: amb-back
phase: ambiente
group: "Rodar o projeto"
order: 3
title: Back-end rodando
summary: IntelliJ, Java 8, Gradle 5.2.1 e o syn4tdf subindo com o perfil evolucao ou suporte.
estimate: 2h
links:
  - type: wiki
    label: "Configuração de ambiente › Back-end"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#back-end
  - type: notion
    label: "Treinamento › Configuração de Ambiente de Desenvolvimento › Back-end"
    url: https://app.notion.com/p/Configura-o-de-Ambiente-de-Desenvolvimento-40ec555d5604800da11bdba24fa52638
checklist:
  - OpenJDK 8 é o Java padrão (`java -version`)
  - Gradle 5.2.1 instalado via SDKMAN
  - "Run configurations `bootRun` criadas para **evolucao** e **suporte**"
  - Com back e front rodando, o sistema abre em localhost:8000
---
O back-end (`componentes/syn4tdf`) é **Java 8 + Groovy** com **Spring Boot**, compilado com **Gradle 5.2.1**. As versões são antigas, mas são as que o projeto usa. Não atualize por conta própria.

1. Instale o **IntelliJ IDEA Community** e os plugins **Lombok** e **Cursive** (o Cursive é para o Clojure, mais adiante).
2. Instale o **OpenJDK 8** e deixe-o como Java padrão (`update-alternatives`).
3. Instale o **SDKMAN** e rode `sdk install gradle 5.2.1`.
4. Clone `componentes/syn4tdf` e abra no IntelliJ como projeto Gradle.
5. Crie duas *run configurations* Gradle com `bootRun` e os argumentos do guia:
   - `--spring.profiles.active=evolucao` ou `suporte`, que escolhe o banco e o schema;
   - `--accounts.mock.usersFilePath=<caminho>/tdf/tdf-runtime/src/main/resources/user-data.json`, com os usuários mock para logar localmente.

**Evolução** é a versão em desenvolvimento e **Suporte** é a versão já entregue que recebe correções. Esse conceito aparece em todo o projeto (veja [Versões e branches](#/n/proc-branches)).

### Erros comuns

- **`sun.misc.BASE64Encoder` não encontrado:** o Gradle está usando um JDK diferente do 8. Nas configurações de Gradle do IntelliJ, escolha ou baixe o **JDK 1.8**.
- **Não conecta no banco:** a VPN está ligada? Os ambientes de banco também têm horário de funcionamento.
