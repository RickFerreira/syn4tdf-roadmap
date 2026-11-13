---
id: acesso-vpn
phase: acessos
order: 3
title: VPN (Cisco + DUO)
summary: Sem VPN não há GitLab, wiki, banco nem ambientes. É o primeiro bloqueio de todo mundo.
estimate: 30 min
links:
  - type: notion
    label: "Configurações de Ambiente › Configuração Inicial (PDFs Linux/Windows/Mac)"
    url: ""
checklist:
  - Cisco Secure Client instalado com o perfil da Synchro
  - DUO Mobile configurado no celular
  - Conecto na VPN e consigo abrir o labgit no navegador
---
Quase tudo do projeto fica na rede interna da Synchro: o **GitLab (labgit)**, a **wiki**, os **bancos HANA** dos ambientes DEV e QA e o **XSA**. Para acessar, você precisa da **VPN**.

### Como funciona

- O cliente é o **Cisco Secure Client** (antigo AnyConnect), usado com o **perfil XML** da Synchro.
- O login é feito com a **credencial de rede da Synchro**, a mesma do e-mail, e confirmado por **DUO Mobile** (autenticação em dois fatores no celular).
- O Notion tem os PDFs com o passo a passo para **Linux, Windows e Mac**, além dos links para baixar o cliente e o perfil.

### Problemas comuns

- **Perdeu o celular ou trocou de aparelho?** Um novo QR code do DUO só sai por chamado. Peça ajuda ao seu orientador ou padrinho.
- Antes de pedir ajuda com qualquer erro de rede, banco ou Liquibase, confira: **a VPN está ligada?** 😉
