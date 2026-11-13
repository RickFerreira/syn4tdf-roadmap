import { PHASES } from "../content/phases";
import PhaseSection from "./PhaseSection";
import BranchHub from "./BranchHub";
import { Icon } from "./Icons";

/** Fases com ordem ficam na espinha; o Aprofundamento (sem ordem) se abre em ramos no fim. */
const BRANCHED = "aprofundamento";

export default function Roadmap() {
  const linear = PHASES.filter((p) => p.id !== BRANCHED);
  const branched = PHASES.find((p) => p.id === BRANCHED);
  return (
    <div className="roadmap">
      <div className="track">
        <div className="spine" aria-hidden="true" />
        <div className="cap">
          <span className="cap-badge">
            <Icon name="flag" size={14} /> Início
          </span>
        </div>
        {linear.map((p, i) => (
          <PhaseSection key={p.id} phase={p} index={i} />
        ))}
        <div className="cap end">
          <span className="cap-badge gold">
            <Icon name="check" size={14} /> Pronto para a squad
          </span>
        </div>
      </div>
      {branched && <BranchHub phase={branched} index={PHASES.indexOf(branched)} />}
    </div>
  );
}
