---
id: amb-pacotes
phase: ambiente
order: 1
title: Sistema, pacotes e Git
summary: Ubuntu 22.04+, pacotes básicos, Git e a pasta onde ficarão os repositórios.
estimate: 30 min
links:
  - type: wiki
    label: "Configuração de ambiente › Pacotes iniciais e git"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Configura%C3%A7%C3%A3o-de-ambiente-de-desenvolvimento-para-o-Synchro4TDF#pacotes-iniciais-e-git
  - type: notion
    label: "Treinamento › Configuração de Ambiente de Desenvolvimento"
    url: https://app.notion.com/p/Configura-o-de-Ambiente-de-Desenvolvimento-40ec555d5604800da11bdba24fa52638
checklist:
  - "`git --version` funciona e configurei `user.name` e `user.email`"
  - Criei uma pasta única para todos os repositórios do projeto
  - Consigo clonar um repositório do labgit via SSH
---
O guia oficial foi escrito para **Ubuntu 22.04** e parte do princípio de que a **VPN já está configurada**. Em outro sistema operacional, adapte os comandos.

```bash
sudo apt update && sudo apt install -y build-essential curl git xclip
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@synchro.com.br"
```

Use uma **pasta única** para todos os repositórios, por exemplo `~/workspace/`. O `syn4tdf-dev-tools` usa essa pasta para encontrar os projetos.

**Dica (Ubuntu 22+):** se o compartilhamento de tela não funcionar nas reuniões, troque a sessão de *Wayland* para *Xorg* na tela de login.
