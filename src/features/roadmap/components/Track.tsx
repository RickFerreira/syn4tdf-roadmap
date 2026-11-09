import type { Phase } from "../types";
import { PhaseSection } from "./PhaseSection";

export function Track({ phases }: { phases: Phase[] }) {
  return <main className="track">
    <div className="spine" />
    <div className="cap"><div className="cap-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" /><path d="M12 7v5l3 3" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
      Início
    </div></div>
    {phases.map((phase, i) => <PhaseSection key={phase.id} phase={phase} index={i} />)}
    <div className="cap"><div className="cap-badge end">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="#4a3300" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Pronto para a squad
    </div></div>
  </main>;
}
