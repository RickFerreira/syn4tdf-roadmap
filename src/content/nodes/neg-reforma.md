---
id: neg-reforma
phase: negocio
order: 5
title: Reforma Tributária (IBS, CBS e IS)
summary: Os novos tributos sobre consumo e o módulo novo do produto.
estimate: 45 min
validate: true
links:
  - type: wiki
    label: "CBS/IBS › Informações gerais"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Informa%C3%A7%C3%B5es-gerais
  - type: wiki
    label: "CBS/IBS › Requisitos funcionais (RF-001 a RF-019)"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Requisitos-funcionais
  - type: wiki
    label: Cenários de teste da apuração IBS e CBS
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Cen%C3%A1rios-de-Teste-%E2%80%93-Apura%C3%A7%C3%A3o-IBS-e-CBS-%28Synchro4TDF%29
checklist:
  - Sei quais tributos o IBS e a CBS substituem
  - Li a página Informações gerais do módulo CBS/IBS
---
A **Reforma Tributária** (EC 132/2023, regulamentada pela LC 214/2025) troca, aos poucos, os tributos sobre consumo por um modelo de **IVA dual**:

- **CBS** (federal) substitui **PIS/COFINS**;
- **IBS** (estadual e municipal) substitui **ICMS** e **ISS**;
- **IS** (Imposto Seletivo) incide sobre produtos específicos.

A transição começou em **2026** e convive com os tributos atuais por alguns anos. Por isso o produto precisa lidar com os dois mundos ao mesmo tempo.

O Synchro4TDF tem uma squad dedicada (**Reforma Tributária**) e um módulo novo com apuração de IBS/CBS, confirmação de créditos, **eventos** e o **RDT** (Registro Digital Tributário). A wiki tem a seção **CBS – IBS** com requisitos funcionais (RF), histórias de usuário (US), matrizes de rastreabilidade por versão e cenários de teste.
