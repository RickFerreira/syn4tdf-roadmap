import type { Phase } from "../types";

const phase: Phase = {
  id: "treinamento",
  title: "Treinamento",
  color: "treino",
  nodes: [
    { label: "Entendendo o TDF e contabilidade", href: "#", icon: "doc" },
    { label: "Fluxo de trabalho e reuniões", href: "#", icon: "doc" },
    {
      label: "Alura",
      icon: "alura",
      children: [
        { label: "Trilha Front-end", href: "#" },
        { label: "Trilha Back-end", href: "#" },
      ],
    },
    { label: "Arquitetura do projeto", href: "#", icon: "doc" },
    { label: "CVS", href: "#", icon: "doc" },
    { label: "Complementos", href: "#", icon: "doc" },
    { label: "Versionando objetos", href: "#", icon: "doc" },
    { label: "Relatórios no Reports", href: "#", icon: "doc" },
    { label: "API Gateway", href: "#", icon: "doc" },
    { label: "Contab", href: "#", icon: "doc" },
  ],
};

export default phase;
