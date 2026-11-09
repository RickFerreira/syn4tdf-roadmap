import type { IconName } from "../../components/icon-paths";

// Uma etapa vira um grupo quando possui children.
export interface Step {
  label: string;
  icon?: IconName;
  href?: string;
  linkLabel?: string;
  // Aceita links no formato [texto](https://endereco).
  description?: string;
  links?: {
    title: string;
    items: { label: string; href: string }[];
  };
  sections?: Section[];
  children?: Step[];
}

export interface Section {
  title?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Phase {
  id: string;
  title: string;
  color: string;
  nodes: Step[];
}
