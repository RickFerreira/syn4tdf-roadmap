# Pendências de conteúdo

Lista do que falta para a trilha ficar completa. Ao resolver um item, remova-o daqui.

## 1. Links do Notion (`src/content/notion-links.json`)

O export do Notion não preserva as URLs reais das páginas, então todos os links do Notion estão vazios e aparecem no site como **"Notion · em breve"**.

**Como preencher:** abra a página no Notion, use *Copiar link* e cole a URL no `src/content/notion-links.json`, na chave com o mesmo texto. Uma chave é usada por todas as etapas que citam aquela página.

| Chave em `notion-links.json` | Página no Notion (arquivo no export) |
|---|---|
| Atas (modelo de reuniões) | `Syn4TDF/Atas` |
| Code Review › Backend Clojure | `Syn4TDF/Code Review/Backend Clojure` |
| Code Review › Backend Java | `Syn4TDF/Code Review/Backend Java` |
| Code Review › Customizações | `Syn4TDF/Code Review/Customizações` |
| Code Review › Frontend | `Syn4TDF/Code Review/Frontend` |
| Configurações de Ambiente › Configuração Inicial (extensões do VS Code) | `Syn4TDF/Configurações de Ambiente/Configuração Inicial` |
| Configurações de Ambiente › Configuração Inicial (PDFs Linux/Windows/Mac) | `Syn4TDF/Configurações de Ambiente/Configuração Inicial` |
| Configurações de Ambiente › Configurando o DBeaver | `Syn4TDF/Configurações de Ambiente/Configurando o DBeaver` |
| Configurações de Ambiente › Profiles Clojure | `Syn4TDF/Configurações de Ambiente/Profiles Clojure` |
| Informações da Equipe (planilhas de horários) | `Syn4TDF/Informações da Equipe` |
| Planning Poker (exemplos por pontuação) | `Syn4TDF/Planning Poker` |
| Stack Overflow › Não é possível trocar a senha | `Syn4TDF/Stack Overflow/Problema/Não é possível trocar a senha…` |
| TopWeek | `Syn4TDF/TopWeek` |
| Treinamento › Bem-vindo | `Syn4TDF/Treinamento/Bem vindo` |
| Treinamento › Configuração de Ambiente de Desenvolvimento | `Syn4TDF/Treinamento/Configuração de Ambiente de Desenvolvimento` |
| Treinamento › Configuração de Ambiente de Desenvolvimento › Back-end | mesma página acima (âncora da seção Back-end) |
| Treinamento › Glossário Funcional | `Syn4TDF/Treinamento/Glossário Funcional` |
| Treinamento › Introdução ao Syn4TDF › Bitrix | `Syn4TDF/Treinamento/Introdução ao Syn4TDF` (seção Bitrix) |
| Treinamento › Introdução ao Syn4TDF (Bitrix e Zimbra) | `Syn4TDF/Treinamento/Introdução ao Syn4TDF` |
| Treinamento › Introdução ao Syn4TDF › Raias do GitLab | `Syn4TDF/Treinamento/Introdução ao Syn4TDF` (seção Raias) |
| Treinamento › Introdução ao Syn4TDF (squads e membros) | `Syn4TDF/Treinamento/Introdução ao Syn4TDF` (seção Squads) |
| Treinamento › Introdução ao Syn4TDF › Zimbra | `Syn4TDF/Treinamento/Introdução ao Syn4TDF` (seção Zimbra) |
| Treinamento › Issues Base | `Syn4TDF/Treinamento/Issues Base` |
| Tutoriais Syn4TDF › API Gateway | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/API Gateway` |
| Tutoriais Syn4TDF › Arquitetura do Projeto | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Arquitetura do Projeto` |
| Tutoriais Syn4TDF › Conciliação | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Conciliação` |
| Tutoriais Syn4TDF › Contab (visão funcional e técnica) | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Contab` |
| Tutoriais Syn4TDF › CRUD de Nova Tela | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/CRUD de Nova Tela` |
| Tutoriais Syn4TDF › Dicas Gerais CVs | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Dicas Gerais CVs` |
| Tutoriais Syn4TDF › Dicas Gerais CVs › Informações ESSENCIAIS de CVs | `…/Dicas Gerais CVs/Informações ESSENCIAIS de CVs` |
| Tutoriais Syn4TDF › Message-store | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Message-store` |
| Tutoriais Syn4TDF › Relatórios no Reports | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Relatórios no Reports` |
| Tutoriais Syn4TDF › Script SonarQube | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Script SonarQube` |
| Tutoriais Syn4TDF › Versionamento de Objetos | `Syn4TDF/Treinamento/Tutoriais Syn4TDF/Versionamento de Objetos` |
| Workflow Customizações | `Syn4TDF/Workflow Customizações` |

> O Notion do time é privado? Ótimo: o link só abre para quem tem acesso, e o site continua público sem expor nada.

## 2. Itens que dependem do time

- [ ] **Issue "Atualizar e versionar uma CV":** criar a issue de treinamento e colocar o número em `src/content/nodes/issue-cv.md`.
- [ ] **VPN:** confirmar quem o novato procura para pedir acesso (credencial de rede e DUO) e descrever em `acesso-vpn.md`, sem nomes de pessoas.
- [ ] **GitLab:** como solicitar a conta no labgit e o acesso aos boards (`acesso-gitlab.md`).
- [ ] **Discord e Alura:** como o novato recebe o convite e as credenciais (`acesso-discord.md`, `acesso-alura.md`).
- [ ] **Keycloak / master user:** confirmar o processo atual (`acesso-keycloak.md`).
- [ ] **Issues de treinamento:** confirmar se os MRs de treinamento são mergeados ou só revisados (`issue-como.md`).
- [ ] **Validação funcional:** pedir a um analista funcional para revisar os nós marcados com `validate: true` (fase *Entender o negócio*) e o glossário.

## 3. Lacunas nas documentações de origem

Achadas durante a montagem da trilha. Vale corrigir na wiki ou no Notion, não aqui.

- A wiki não tem material introdutório sobre o domínio fiscal (TDF, SPED, apuração). A trilha cobre isso com resumos próprios; o ideal seria uma página oficial.
- `automacao.md` na wiki está praticamente vazia; não há documentação da Automação 2.0.
- A página `RDT---Registro-Digital-Tributário` está vazia (o conteúdo está no RF-007).
- Vários links ainda usam o domínio antigo `git.synchro.com.br`.
- O sidebar da wiki aponta "api gateway" para `pages?page=2`.
- O comando `bb db:migrate` aparece com sintaxes diferentes no Guia-MRs e no tutorial de Versionamento.
- **Segurança:** páginas da wiki (`Acesso-ambiente-OCI-*`, `Configuração-do-XSA`), anexos `profiles.clj` e páginas do Notion (`Configuração de Ambiente de Desenvolvimento`, `Profiles Clojure`, `Relatórios no Reports`) têm senhas e segredos em texto. Considere movê-los para um cofre de senhas.
