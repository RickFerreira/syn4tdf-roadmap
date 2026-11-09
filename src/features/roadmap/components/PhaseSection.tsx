import type { CSSProperties } from "react";
import type { Phase } from "../types";
import { StepGroup } from "./StepGroup";
import { StepCard } from "./StepCard";

export function PhaseSection({ phase, index }: { phase: Phase; index: number }) {
  return <section className="phase" style={{
    "--phase-color": `var(--fase-${phase.color})`,
    "--phase-color-soft": `var(--fase-${phase.color}-soft)`,
  } as CSSProperties}>
    <div className="phase-marker"><div className="phase-label">
      <span className="phase-index">{index + 1}</span>{phase.title}
    </div></div>
    <div className="phase-body">{phase.nodes.map((step, i) => {
      const content = <div className="node-cluster">
        {step.children ? <StepGroup step={step} phase={phase} /> : <StepCard step={step} phase={phase} />}
      </div>;
      return <div key={i} className={`row side-${i % 2 === 0 ? "left" : "right"}`}>
        <div className="slot-left">{i % 2 === 0 && content}</div>
        <div className="connector-wrap"><div className="connector" style={{ width: "100%" }} /></div>
        <div className="slot-right">{i % 2 !== 0 && content}</div>
      </div>;
    })}</div>
  </section>;
}

