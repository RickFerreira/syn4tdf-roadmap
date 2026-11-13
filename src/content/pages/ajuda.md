# Travou? 🧭

Antes de tudo: **travar é normal**. Esta página junta os problemas mais comuns e diz onde procurar e a quem perguntar.

## 1. Checagens rápidas

- **A VPN está ligada?** Metade dos problemas de GitLab, wiki, banco e Liquibase é isso.
- **O ambiente está no horário de funcionamento?** Os bancos dos ambientes OCI são desligados à noite e em parte do fim de semana.
- **Você está no perfil certo?** `evolucao` ou `suporte` no back, branch certa e schema certo no banco.
- **Java 8 e Node LTS?** Versões diferentes causam erros estranhos.

## 2. Problemas comuns

| Sintoma | O que tentar |
|---|---|
| Back não sobe: `sun.misc.BASE64Encoder` | O Gradle está usando um JDK diferente do 8. Ajuste o JDK nas configurações de Gradle do IntelliJ |
| Front não instala ou não sobe | Confira Node LTS e yarn 1.22.x; `yarn cache clean` e `yarn` de novo |
| REPL do Reports não inicia | `lein clean` e `lein deps` |
| Automação: "porta em uso" | Reports e Automação usam a 3000 por padrão; rode um de cada vez ou troque a porta |
| Liquibase: *changelog lock* | Outro processo travou o lock; peça ajuda antes de liberar em ambiente compartilhado |
| Timeout ao conectar no banco | VPN, horário do ambiente e host atualizado em `~/.syn4tdf/devtools.edn` |
| Erro *2620* ou de SQL Engine numa CV | Use o Data Preview nos nós intermediários para isolar a etapa com problema |
| Não consigo trocar a senha do Keycloak | Use a página de conta do SCSA de produção, não a de dev |

A base completa de problemas e soluções está no **Notion**, na página *Stack Overflow*, organizada por categoria: Getting Started, Rodar aplicação, Liquibase e Outros. Encontrou um problema novo? **Registre lá** depois de resolver.

## 3. Onde procurar

- **Wiki do projeto:** [Dúvidas comuns](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/D%C3%BAvidas-comuns) e o [índice da wiki](https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/home).
- **Notion do time:** Stack Overflow, Tutoriais e Code Review.
- **Issues e MRs parecidos:** pesquise no GitLab por issues do mesmo módulo. Ver como alguém já resolveu é muito eficiente.

## 4. A quem perguntar

1. **Seus padrinhos.** Eles existem para isso.
2. O **canal de dúvidas** do Discord, onde todo o time das universidades vê.
3. O **grupo da squad** no Bitrix, para dúvidas de negócio ou de especificação com os funcionários da Synchro.

Ao perguntar, conte **o que está tentando fazer**, **o que já tentou** e **a mensagem de erro**, com print.
