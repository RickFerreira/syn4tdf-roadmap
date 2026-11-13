import type { CSSProperties } from "react";
import type { Phase } from "../types";
import { BRANCHES } from "../content/branches";
import { nodesOfPhase } from "../content/loadContent";
import { phaseProgress, useProgress } from "../state/progress";
import NodeCard from "./NodeCard";

/** Curvas do ponto central até o topo de cada ramo (coordenadas em % da largura). */
function Lines({ xs, className }: { xs: number[]; className: string }) {
  return (
    <svg className={`branch-lines ${className}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {xs.map((x) => (
        <path key={x} d={`M50 0 C 50 55, ${x} 40, ${x} 100`} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/**
 * Aprofundamento: não tem ordem, então em vez de seguir a espinha ele se abre em ramos
 * que saem do mesmo ponto. Cada ramo agrupa temas parecidos.
 */
export default function BranchHub({ phase, index }: { phase: Phase; index: number }) {
  const { data } = useProgress();
  const nodes = nodesOfPhase(phase.id);
  const prog = phaseProgress(nodes, data);
  const style = { "--phase-color": `var(--fase-${phase.color})` } as CSSProperties;
  const n = BRANCHES.length;
  const xs4 = BRANCHES.map((_, i) => ((i + 0.5) / n) * 100);
  const xs2 = [25, 75];

  return (
    <section className="phase branch-section" style={style} id={`fase-${phase.id}`} aria-labelledby={`fase-${phase.id}-t`}>
      <div className="hub-stem" aria-hidden="true" />
      <div className="hub">
        <div className="hub-node">
          <span className="phase-index">{index}</span>
          <span id={`fase-${phase.id}-t`}>{phase.title}</span>
          <span className="phase-count">
            {prog.done}/{prog.total}
          </span>
        </div>
        <p className="phase-desc">{phase.description}</p>
      </div>
      <Lines xs={xs4} className="lines-4" />
      <Lines xs={xs2} className="lines-2" />
      <div className="branch-grid">
        {BRANCHES.map((b) => {
          const items = nodes.filter((nd) => nd.branch === b.id);
          const done = items.filter((nd) => data.done[nd.id]).length;
          return (
            <div className="branch" key={b.id}>
              <div className="branch-head">
                <strong>{b.title}</strong>
                <span className="branch-count">
                  {done}/{items.length}
                </span>
                <small>{b.description}</small>
              </div>
              <ul className="branch-body">
                {items.map((nd) => (
                  <NodeCard key={nd.id} node={nd} side="leaf" />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
