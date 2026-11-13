import type { Branch } from "../types";

/**
 * Ramos do Aprofundamento. Cada nó da fase "aprofundamento" indica o seu com `branch: <id>`.
 * A ordem aqui é a ordem dos ramos na tela.
 */
export const BRANCHES: Branch[] = [
  {
    id: "dados",
    title: "Dados e banco",
    description: "Como os dados fiscais entram e são transformados.",
  },
  {
    id: "plataforma",
    title: "Plataforma",
    description: "Segurança, gateway, auditoria e serviços de apoio.",
  },
  {
    id: "modulos",
    title: "Módulos do produto",
    description: "Áreas de negócio que atravessam várias squads.",
  },
  {
    id: "pratica",
    title: "Prática do dia a dia",
    description: "Modelos de issue, clientes e qualidade de código.",
  },
];
