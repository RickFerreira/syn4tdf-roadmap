---
id: proc-commits-mr
phase: processo
order: 3
title: Commits e Merge Requests
summary: Padrão de commit, como abrir um MR completo e o que anexar de evidência.
estimate: 40 min
links:
  - type: wiki
    label: Especificação para Commits
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Especifica%C3%A7%C3%A3o-para-Commits
  - type: wiki
    label: "Introdução › Orientações para MRs"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Introdu%C3%A7%C3%A3o-ao-Synchro4TDF#orienta%C3%A7%C3%B5es-para-mrs
  - type: wiki
    label: Guia de MRs (checklist do revisor)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Guia-MRs
  - type: wiki
    label: Abrindo MR pelo navegador
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/abrindo-mr-no-navegador
checklist:
  - Sei escrever uma mensagem de commit no padrão do time
  - Conheço os passos para abrir um MR (target, issue, evidências, milestone, labels)
---
### Commits

O time usa um padrão inspirado em *Conventional Commits*: `tipo: descrição no presente`.

```
feat: adiciona tela de beneficios fiscais
fix: corrige filtro de periodo no relatorio de apuracao
```

### Checklist ao abrir um MR

1. **Target branch** certa: a mesma de onde você partiu.
2. Se ainda não está pronto, marque como **Draft**.
3. Referencie a issue na descrição: `#10063` no back, ou `syn4tdf#10063` no front e nos microsserviços.
4. **Remova o "Closes"** automático. A issue não deve fechar no merge, porque ainda passa por homologação.
5. Descreva o que mudou e anexe **evidências**: prints ou vídeo da funcionalidade.
6. Mexeu em banco? Anexe o **print da `DATABASECHANGELOG`** mostrando que o Liquibase rodou em DEV.
7. Defina a **milestone** e as **labels**.
8. Marque **"Delete source branch"**.
9. Peça revisão no canal do Discord e mova a issue para **Aguardando MR**.
