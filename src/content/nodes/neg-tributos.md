---
id: neg-tributos
phase: negocio
order: 2
title: Tributos em 5 minutos
summary: ICMS, IPI, PIS/COFINS e ISS, e por que a nota fiscal é o centro de tudo.
estimate: 30 min
validate: true
links:
  - type: site
    label: "Glossário fiscal: ICMS, ST, DIFAL, IPI, PIS/COFINS, ISS"
    url: "#/glossario?t=icms"
  - type: wiki
    label: Glossário Funcional
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Glossario-Funcional
  - type: wiki
    label: "Cenário: Venda de Mercadoria (exemplo prático de débito e crédito)"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rio---Venda-de-Mercadoria-
checklist:
  - Sei diferenciar ICMS, IPI, PIS/COFINS e ISS (quem cobra e sobre o quê)
  - Entendi a ideia de débito (saída) e crédito (entrada)
---
Os impostos que mais aparecem no produto são os **tributos indiretos**, cobrados sobre o consumo e calculados **nota a nota**:

| Tributo | Esfera | Incide sobre |
|---|---|---|
| **ICMS** | Estadual | Circulação de mercadorias e alguns serviços (transporte, comunicação). Variações: ICMS-ST, DIFAL, FCP |
| **IPI** | Federal | Produtos industrializados |
| **PIS / COFINS** | Federal | Receita das empresas |
| **ISS (ISSQN)** | Municipal | Prestação de serviços |

### A nota fiscal é a origem de tudo

Cada **documento fiscal** (NF-e, NFS-e, CT-e…) traz os valores dos impostos de cada item, além de códigos como **CFOP** (tipo de operação) e **CST** (situação tributária).

- Na **saída** (venda), a empresa gera **débito**: imposto a pagar.
- Na **entrada** (compra), muitas vezes gera **crédito**: imposto que pode abater.

O saldo entre débitos e créditos de um período é o que a empresa paga. Esse cálculo é a **apuração** (próxima etapa).

Também existem os **tributos diretos** (IRPJ, CSLL), tratados pela squad de Diretos, e os **retidos na fonte**.

Cada um desses tributos tem um verbete detalhado, com exemplos, no [glossário fiscal](#/glossario?t=icms). Comece pelos [primeiros conceitos](#/glossario?t=fato-gerador): fato gerador, base de cálculo, débito e crédito.
