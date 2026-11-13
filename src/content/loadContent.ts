import fm from "front-matter";
import type { NodeLink, RoadmapNode } from "../types";
import { PHASES } from "./phases";
import notionLinks from "./notion-links.json";

// Links do Notion ficam centralizados em notion-links.json (chave = label do link)
const NOTION = notionLinks as Record<string, string>;
function resolveUrl(l: NodeLink): string {
  if (l.url) return l.url;
  if (l.type === "notion") return NOTION[l.label] ?? "";
  return "";
}

const files = import.meta.glob("./nodes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const pages = import.meta.glob("./pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

interface Attrs {
  id: string;
  phase: string;
  order?: number;
  title: string;
  summary?: string;
  optional?: boolean;
  group?: string;
  estimate?: string;
  validate?: boolean;
  milestone?: boolean;
  branch?: string;
  links?: NodeLink[];
  checklist?: string[];
}

function parseNode(raw: string): RoadmapNode {
  const { attributes: a, body } = fm<Attrs>(raw);
  return {
    id: a.id,
    phase: a.phase,
    order: a.order ?? 99,
    title: a.title,
    summary: a.summary ?? "",
    optional: a.optional ?? false,
    group: a.group,
    estimate: a.estimate,
    validate: a.validate ?? false,
    milestone: a.milestone ?? false,
    branch: a.branch,
    links: (a.links ?? []).map((l) => ({ ...l, url: resolveUrl({ ...l, url: l.url ?? "" }) })),
    checklist: a.checklist ?? [],
    body: body.trim(),
  };
}

const phaseIndex = new Map(PHASES.map((p, i) => [p.id, i]));

export const NODES: RoadmapNode[] = Object.values(files)
  .map(parseNode)
  .sort(
    (x, y) =>
      (phaseIndex.get(x.phase) ?? 99) - (phaseIndex.get(y.phase) ?? 99) ||
      x.order - y.order,
  );

export const NODE_BY_ID = new Map(NODES.map((n) => [n.id, n]));

export function nodesOfPhase(phaseId: string) {
  return NODES.filter((n) => n.phase === phaseId);
}

export function getPage(name: string): string {
  const raw = pages[`./pages/${name}.md`] ?? "";
  return fm(raw).body;
}
