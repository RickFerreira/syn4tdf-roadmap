---
id: neg-apuracao
phase: negocio
order: 3
title: Escrituração × Apuração
summary: Registrar os documentos nos livros e, no fim do período, calcular o saldo do imposto.
estimate: 30 min
validate: true
links:
  - type: wiki
    label: Apuração e Escrituração de ISSQN (exemplo concreto)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Apura%C3%A7%C3%A3o-e-Escritura%C3%A7%C3%A3o-de-ISSQN
checklist:
  - Sei explicar a diferença entre escriturar e apurar
---
São duas palavras que você vai ouvir o tempo todo:

- **Escrituração** é **registrar** os documentos fiscais nos livros fiscais (entradas, saídas, apuração), organizados por período.
- **Apuração** é **calcular**, no fim do período, quanto a empresa deve: *débitos − créditos ± ajustes*. O resultado é **saldo a pagar** ou **saldo credor** para o próximo período.

Entre um e outro há detalhes: **ajustes** (benefícios fiscais, estornos, códigos de ajuste de cada UF), **períodos** de apuração e regras de data. A página de ISSQN da wiki mostra isso com um exemplo: o documento é escriturado no mês de emissão, mas a apuração depende do **fato gerador** e da **data de corte** de cada município.

No produto, a apuração é feita por **procedures e Calculation Views** no HANA. O usuário vê o resultado nas telas e nos relatórios de apuração.
