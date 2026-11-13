import { Link, useMatch } from "react-router-dom";
import type { RoadmapNode } from "../types";
import { useProgress } from "../state/progress";
import { Icon } from "./Icons";

interface Props {
  node: RoadmapNode;
  /** "left"/"right" = lado da espinha; "leaf" = folha de um ramo do Aprofundamento */
  side: "left" | "right" | "leaf";
}

export default function NodeCard({ node, side }: Props) {
  const { data } = useProgress();
  const match = useMatch("/n/:id");
  const done = !!data.done[node.id];
  const checks = data.checks[node.id]?.length ?? 0;
  const partial = !done && checks > 0;

  const cls = [
    "node",
    done && "done",
    partial && "partial",
    node.optional && "optional",
    node.milestone && "milestone",
    match?.params.id === node.id && "current",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={side === "leaf" ? "leaf" : `row side-${side}`}>
      <div className="connector" aria-hidden="true" />
      <Link to={`/n/${node.id}`} className={cls} id={`node-${node.id}`} title={node.summary}>
        <span className="node-status" aria-hidden="true">
          {done ? <Icon name="check" size={14} /> : node.milestone ? <Icon name="flag" size={12} /> : null}
        </span>
        <span className="node-text">
          <span className="node-title">{node.title}</span>
          <span className="node-meta">
            {node.optional && side !== "leaf" && <span className="tag">opcional</span>}
            {partial && (
              <span className="tag soft">
                {checks}/{node.checklist.length}
              </span>
            )}
            {node.estimate && <span className="node-est">{node.estimate}</span>}
          </span>
        </span>
        <span className="sr-only">{done ? " (concluído)" : ""}</span>
      </Link>
    </li>
  );
}
