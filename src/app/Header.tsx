import type { Phase } from "../features/roadmap/types";

export function Header({ phases }: { phases: Phase[] }) {
  return (
<header>
  <div className="eyebrow-mark">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#f2a900" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="#1c5aa8" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
    Laboratório IDE.IA · LSI UFCG · Time Synchro4TDF
  </div>
  <h1>Trilha de onboarding do bolsista</h1>
  <p>Do primeiro acesso à primeira entrega. Siga a espinha de cima para baixo — clique em uma etapa para abrir suas orientações e materiais em um modal.</p>

  <div className="legend">
    {phases.map((phase) => <span className="legend-item" key={phase.id}>
      <span className="legend-dot" style={{ background: `var(--fase-${phase.color})` }} />{phase.title}
    </span>)}
  </div>
</header>
  );
}
