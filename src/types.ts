export type LinkType = "wiki" | "notion" | "alura" | "video" | "issue" | "site";

export interface NodeLink {
  type: LinkType;
  label: string;
  /** vazio = link ainda pendente (aparece como "em breve") */
  url: string;
}

export interface RoadmapNode {
  id: string;
  phase: string;
  order: number;
  title: string;
  /** frase curta exibida no card e no topo do painel */
  summary: string;
  optional: boolean;
  estimate?: string;
  /** conteúdo de negócio que ainda precisa ser revisado por um funcional */
  validate: boolean;
  /** nó que marca um marco (ex.: primeiro MR aprovado) */
  milestone: boolean;
  /** rótulo de grupo: etapas seguidas com o mesmo grupo aparecem juntas numa caixa */
  group?: string;
  /** ramo do Aprofundamento (ver content/branches.ts) */
  branch?: string;
  links: NodeLink[];
  checklist: string[];
  body: string;
}

export interface Phase {
  id: string;
  title: string;
  /** rótulo curto para o mapa da trilha */
  short: string;
  /** nome do token de cor (ver --fase-* em styles/base.css) */
  color: string;
  description: string;
}

export interface Branch {
  id: string;
  title: string;
  description: string;
}
