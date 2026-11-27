---
id: proc-raias
phase: processo
order: 1
title: Board e ciclo de uma issue
summary: As raias do GitLab, da especificação à homologação, e quando mover sua issue.
estimate: 30 min
links:
  - type: wiki
    label: "Introdução › Raias do GitLab"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Introdu%C3%A7%C3%A3o-ao-Synchro4TDF#raias-do-gitlab
  - type: wiki
    label: Classificação de Issues (labels obrigatórias)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Classificacao-de-Issues
  - type: notion
    label: "Treinamento › Introdução ao Syn4TDF › Raias do GitLab"
    url: "https://app.notion.com/p/Introdu-o-ao-Syn4TDF-1a8c555d560481db835fc29be11733d5"
checklist:
  - Sei para qual raia mover uma issue quando começo, quando abro o MR e quando ele é aprovado
  - Sei usar o Due Date e as labels de "Concluído" (25/50/75%)
---
Toda demanda é uma **issue** no GitLab, e ela anda por **raias** no board:

```
Disp. especificação → Espec. funcional/técnica → Disp. grooming
  → Disp. desenvolvimento → Em processo → Aguardando MR
  → Disp. deploy → Homologação ──(ok)──→ Fechada
                       └──(rebote)──→ volta para desenvolvimento
```

O que muda para **você**, como dev:

- **Ao pegar a issue:** mova para **Em processo**, coloque a label da sua universidade, preencha o **Due Date** e atualize a label de **Concluído** (25/50/75%) conforme avança.
- **Represado:** a issue parou por motivo externo. O MR fica em *Draft*.
- **Aguardando MR:** o MR está aberto. A **1ª revisão** é feita por alguém da universidade e a **2ª** por um funcionário da Synchro.
- **Disp. deploy:** depois do merge. Se houver MR fora do back e do front (por exemplo, no Reports), use *Disp. deploy em componente específico*.
- **Rebote:** a homologação encontrou problema e a issue volta para você.

Labels obrigatórias: **squad**, **módulo**, **prioridade** e **tipo** (Feature, Melhoria, Bug, Débito Técnico…).
