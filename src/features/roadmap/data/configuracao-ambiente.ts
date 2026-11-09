import type { Phase } from "../types";

const phase: Phase = {
  id: "configuracao-ambiente",
  title: "Configuração de ambiente",
  color: "config",
  nodes: [
    { label: "Configuração inicial", href: "#", icon: "doc" },
    { label: "Banco de dados", href: "#", icon: "doc" },
    { label: "Clojure (microsserviços)", href: "#", icon: "doc" },
  ],
};

export default phase;
