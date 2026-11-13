import type { CSSProperties } from "react";
import type { Phase, RoadmapNode } from "../types";
import { nodesOfPhase } from "../content/loadContent";
import { phaseProgress, useProgress } from "../state/progress";
import NodeCard from "./NodeCard";
import { Icon } from "./Icons";

/** Etapas seguidas com o mesmo `group` viram uma linha só, com uma caixa. */
type Row = { kind: "node"; node: RoadmapNode } | { kind: "group"; label: string; nodes: RoadmapNode[] };

function toRows(nodes: RoadmapNode[]): Row[] {
  const rows: Row[] = [];
  for (const n of nodes) {
    const last = rows[rows.length - 1];
    if (n.group && last?.kind === "group" && last.label === n.group) last.nodes.push(n);
    else if (n.group) rows.push({ kind: "group", label: n.group, nodes: [n] });
    else rows.push({ kind: "node", node: n });
  }
  return rows;
}

function GroupRow({ label, nodes, side }: { label: string; nodes: RoadmapNode[]; side: "left" | "right" }) {
  const { data } = useProgress();
  const done = nodes.filter((n) => data.done[n.id]).length;
  return (
    <li className={`row side-${side}`}>
      <div className="connector" aria-hidden="true" />
      <div className="node-group">
        <div className="node-group-head">
          <strong>{label}</strong>
          <span>
            {done}/{nodes.length}
          </span>
        </div>
        <ul>
          {nodes.map((n) => (
            <NodeCard key={n.id} node={n} side="leaf" />
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  const { data } = useProgress();
  const nodes = nodesOfPhase(phase.id);
  const prog = phaseProgress(nodes, data);

  const style = { "--phase-color": `var(--fase-${phase.color})` } as CSSProperties;

  return (
    <section className="phase" style={style} aria-labelledby={`fase-${phase.id}-t`} id={`fase-${phase.id}`}>
      <div className="phase-marker">
        <div className={prog.complete ? "phase-label complete" : "phase-label"}>
          <span className="phase-index">{prog.complete ? <Icon name="check" size={13} /> : index}</span>
          <span id={`fase-${phase.id}-t`}>{phase.title}</span>
          <span className="phase-count">
            {prog.done}/{prog.total}
          </span>
        </div>
        <p className="phase-desc">{phase.description}</p>
      </div>
      <ol className="phase-body">
        {toRows(nodes).map((r, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return r.kind === "group" ? (
            <GroupRow key={r.label} label={r.label} nodes={r.nodes} side={side} />
          ) : (
            <NodeCard key={r.node.id} node={r.node} side={side} />
          );
        })}
      </ol>
    </section>
  );
}
