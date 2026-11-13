---
id: amb-banco
phase: ambiente
order: 4
title: Banco SAP HANA (Eclipse/DBeaver)
summary: Ferramenta para abrir tabelas, rodar SQL e editar Calculation Views no HANA de DEV.
estimate: 1h30
links:
  - type: wiki
    label: "Configuração de ambiente › Banco de dados"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#banco-de-dados
  - type: wiki
    label: Acesso ambiente OCI DEV (hosts e usuários)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Acesso-ambiente-OCI-DEV
  - type: notion
    label: "Configurações de Ambiente › Configurando o DBeaver"
    url: ""
checklist:
  - Eclipse com SAP HANA Tools instalado (versão compatível)
  - Conexões com os schemas de **evolução** e **suporte** do DEV criadas
  - Consigo abrir uma Calculation View e fazer *Data Preview*
---
O banco do projeto é o **SAP HANA**. Muita lógica do produto mora nele: tabelas `/SYN/...`, procedures e **Calculation Views (CVs)**.

### Ferramentas

- **Eclipse + SAP HANA Tools**: obrigatório para **criar e editar CVs**. Atenção à versão: o HANA Tools só funciona com algumas versões do Eclipse. Consulte a página do HANA Tools antes de baixar e instale o pacote *Eclipse IDE for Enterprise Java and Web Developers*.
- **DBeaver** (opcional): mais confortável para consultas SQL e para navegar nas tabelas. O passo a passo está no Notion.

### Conexões

Use a perspectiva **SAP HANA Development** e adicione os sistemas de **evolução** e **suporte** do ambiente **DEV**. Hosts, portas e usuários ficam na página da wiki *Acesso ambiente OCI DEV*. **Nunca copie essas credenciais para fora da wiki.**

> Os ambientes OCI só funcionam em horário comercial estendido. Se der timeout fora desse horário, provavelmente o ambiente está desligado.
