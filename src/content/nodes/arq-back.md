---
id: arq-back
phase: arquitetura
group: "Back e front"
order: 2
title: Back-end em camadas
summary: "Resource → Service → Repository, distribuídos nos módulos api, core, tech e webapi."
estimate: 45 min
links:
  - type: wiki
    label: "CRUD de Nova Tela › parte Java"
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Treinamento-Universidades/Tutoriais-Synchro4TDF/CRUD-de-Nova-Tela
  - type: wiki
    label: Por que usar @Controller e @Path no resource
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Por-que-usar-as-anota%C3%A7%C3%B5es-@Controller-e-@Path-no-resource
  - type: wiki
    label: Boas práticas para construir endpoints
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/Boas-pr%C3%A1ticas-para-construir-endpoints-%28DOCUMENTA%C3%87%C3%83O-EM-DESENVOLVIMENTO%29
  - type: wiki
    label: preconditions / parameter-validation
    url: https://labgit.synchro.com.br/componentes/syn4tdf/-/wikis/preconditions
checklist:
  - Abri o projeto e encontrei um Resource, a Service e o Repository de uma mesma tela
---
O back-end segue uma **arquitetura em camadas** (estilo *onion*), separada em módulos Gradle:

| Pasta | Contém | Exemplo |
|---|---|---|
| **api** | Contratos públicos: **TO** (*transfer objects*) e interfaces de **Service** | `BeneficioFiscalTO`, `IBeneficioFiscalService` |
| **core** | Regra de negócio: `ServiceImpl` (estende `SecuredServiceImpl`) e interfaces de Repository | `BeneficioFiscalServiceImpl` |
| **tech** | Acesso a dados: `RepositoryImpl` (estende `BaseRepository`, usa JDBC Template) | `BeneficioFiscalRepositoryImpl` |
| **webapi** | Endpoints REST em **Groovy** (`Resource`, JAX-RS/Jersey) | `BeneficioFiscalResource` |

Uma requisição percorre **Resource → Service → Repository → banco** (tabela ou CV).

Outros conceitos que você vai encontrar:

- **Spring Batch** para importar e exportar Excel e metadados;
- **Quartz** para processos agendados;
- `@PreCondition` e `@ParameterValidation` para validar antes de gerar obrigações;
- perfis Spring **evolucao** e **suporte**.
