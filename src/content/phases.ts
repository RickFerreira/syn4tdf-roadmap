import type { Phase } from "../types";

/**
 * Ordem das fases da trilha. Para criar uma fase nova:
 * 1. adicione aqui (a posição no array define a ordem);
 * 2. se for usar uma cor nova, crie --fase-NOME e --fase-NOME-soft em src/styles/base.css;
 * 3. crie os nós em src/content/nodes/ com `phase: <id>`.
 */
export const PHASES: Phase[] = [
  {
    id: "boas-vindas",
    title: "Boas-vindas",
    short: "Boas-vindas",
    color: "boas",
    description: "Como usar esta trilha, quem vai te acompanhar e onde pedir ajuda.",
  },
  {
    id: "acessos",
    title: "Primeiros acessos",
    short: "Acessos",
    color: "acesso",
    description: "Contas e ferramentas de comunicação. Sem elas as próximas fases não andam.",
  },
  {
    id: "ambiente",
    title: "Ambiente de desenvolvimento",
    short: "Ambiente",
    color: "config",
    description: "Deixar front, back, banco e microsserviços rodando na sua máquina.",
  },
  {
    id: "negocio",
    title: "Entender o negócio",
    short: "Negócio",
    color: "negocio",
    description: "O que o Synchro4TDF resolve: TDF, tributos, apuração, SPED e a Reforma Tributária.",
  },
  {
    id: "arquitetura",
    title: "Como o projeto é construído",
    short: "Arquitetura",
    color: "projeto",
    description: "Camadas do back-end, estrutura do front, banco HANA, CVs e microsserviços.",
  },
  {
    id: "processo",
    title: "Como o time trabalha",
    short: "Processo",
    color: "processo",
    description: "Board, branches, commits, MRs, code review e os rituais do time.",
  },
  {
    id: "treinamento",
    title: "Treinamento",
    short: "Treinamento",
    color: "treino",
    description: "Cursos da Alura e os tutoriais do projeto, na ordem em que você vai usá-los.",
  },
  {
    id: "issues",
    title: "Issues de treinamento",
    short: "Issues",
    color: "issue",
    description: "Prática de verdade, com branch, MR e revisão. O marco final é o primeiro MR aprovado.",
  },
  {
    id: "aprofundamento",
    title: "Aprofundamento",
    short: "Aprofundar",
    color: "extra",
    description: "Opcional e sem ordem fixa: escolha o ramo que a sua squad e as suas issues pedirem.",
  },
];
