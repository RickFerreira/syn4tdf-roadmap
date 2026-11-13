import { useNavigate } from "react-router-dom";
import { useProgress } from "../state/progress";
import { NODE_BY_ID } from "../content/loadContent";
import { Icon } from "./Icons";

export default function Hero() {
  const { stats, data, nextPending } = useProgress();
  const navigate = useNavigate();
  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
  const last = data.lastVisited ? NODE_BY_ID.get(data.lastVisited) : undefined;
  const next = nextPending();
  const resumeTarget = last && !data.done[last.id] ? last : next;
  const started = Object.values(data.done).some(Boolean) || !!data.lastVisited;

  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Onboarding · time Synchro4TDF</p>
        <h1>
          Do primeiro acesso ao <em>primeiro MR aprovado</em>
        </h1>
        <p className="lede">
          Uma trilha para você seguir sozinho, no seu ritmo. Cada etapa explica o assunto em poucas
          linhas e aponta onde está o conteúdo completo: wiki do projeto, Notion, Alura ou vídeos.
        </p>
      </div>

      <div className="progress-card">
        <div className="progress-top">
          <span className="progress-label">
            <strong>{stats.done}</strong> de {stats.total} etapas obrigatórias
          </span>
          <span className="progress-pct">{pct}%</span>
        </div>
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso na trilha"
        >
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>

        <div className="progress-actions">
          {resumeTarget && (
            <button className="btn primary block" onClick={() => navigate(`/n/${resumeTarget.id}`)}>
              <Icon name="play" size={14} />
              {started ? "Continuar de onde parei" : "Começar a trilha"}
              <span className="btn-sub">{resumeTarget.title}</span>
            </button>
          )}
          {!resumeTarget && stats.total > 0 && (
            <span className="all-done">🎉 Trilha obrigatória concluída!</span>
          )}
        </div>
      </div>
    </section>
  );
}
