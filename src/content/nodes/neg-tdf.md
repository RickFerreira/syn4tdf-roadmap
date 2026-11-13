---
id: neg-tdf
phase: negocio
order: 1
title: SAP TDF e o Synchro4TDF
summary: O que o produto resolve e onde ele se encaixa no mundo SAP.
estimate: 30 min
validate: true
links:
  - type: wiki
    label: Home da wiki (arquitetura de componentes)
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/home
  - type: wiki
    label: "Introdução ao Synchro4TDF › Squads (módulos)"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Introdu%C3%A7%C3%A3o-ao-Synchro4TDF#squads
  - type: site
    label: Documentação funcional do produto (MkDocs)
    url: https://synchro4tdf-docs.synchro.com.br/
checklist:
  - Sei explicar em duas frases o que o Synchro4TDF faz e para quem
---
Empresas no Brasil precisam **calcular impostos** e **entregar ao fisco** uma série de arquivos e declarações: as **obrigações acessórias**. Fazer isso com dados de um ERP grande é complexo.

- **SAP TDF** (*Tax Declaration Framework for Brazil*) é a solução da SAP que guarda, num banco **SAP HANA**, os documentos fiscais e os dados tributários das empresas que usam SAP.
- **Synchro4TDF** é o produto da **Synchro** (em parceria com a SAP) que roda **em cima do TDF**, no ambiente do próprio cliente (*on-premises*). Ele lê os dados do TDF e entrega:
  - **apuração** de impostos (ICMS, IPI, PIS/COFINS, ISS e, agora, IBS/CBS);
  - geração das obrigações do **SPED** e de outras declarações;
  - **conciliação** fiscal × contábil;
  - **contabilização** dos impostos apurados (Contab4TDF);
  - relatórios, cadastros e ajustes manuais.

Na prática, boa parte do seu trabalho será criar ou ajustar **telas de cadastro**, **relatórios**, **Calculation Views** e **processos** que transformam dados fiscais.
