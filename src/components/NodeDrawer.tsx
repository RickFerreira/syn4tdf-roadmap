import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NODE_BY_ID, NODES, nodesOfPhase } from "../content/loadContent";
import { PHASES } from "../content/phases";
import { BRANCHES } from "../content/branches";
import { useProgress } from "../state/progress";
import { prefersReducedMotion, travel } from "../lib/travel";
import type { RoadmapNode } from "../types";
import Markdown from "./Markdown";
import SourceLinks from "./SourceLinks";
import { Icon } from "./Icons";

type Stage = "open" | "leaving" | "hidden";
const LEAVE_MS = 220;

export default function NodeDrawer() {
  const { id = "" } = useParams();
  const node = NODE_BY_ID.get(id);
  const navigate = useNavigate();
  const { data, setDone, toggleCheck, visit } = useProgress();
  const panelRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("open");
  const busy = useRef(false);
  const firstOpen = useRef(true);

  const close = useCallback(() => {
    if (busy.current) return;
    if (prefersReducedMotion()) return navigate("/");
    busy.current = true;
    setStage("leaving");
    setTimeout(() => {
      busy.current = false;
      navigate("/");
    }, LEAVE_MS);
  }, [navigate]);

  /** Fecha o painel, "pula" até a etapa de destino na trilha e abre o painel dela. */
  const goTo = useCallback(
    async (target: RoadmapNode) => {
      if (!node || busy.current || target.id === node.id) return;
      if (prefersReducedMotion()) {
        navigate(`/n/${target.id}`, { replace: true });
        return;
      }
      busy.current = true;
      setStage("leaving");
      await new Promise((r) => setTimeout(r, LEAVE_MS));
      setStage("hidden");
      await travel(node.id, target.id);
      navigate(`/n/${target.id}`, { replace: true });
      setStage("open");
      busy.current = false;
    },
    [node, navigate],
  );

  useEffect(() => {
    if (!node) return;
    visit(node.id);
    panelRef.current?.scrollTo(0, 0);
    panelRef.current?.focus({ preventScroll: true });
    // aberto por link direto: mostra a caixinha correspondente atrás do painel
    if (firstOpen.current) {
      firstOpen.current = false;
      document.getElementById(`node-${node.id}`)?.scrollIntoView({ block: "center" });
    }
  }, [node, visit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", stage !== "hidden");
    return () => document.body.classList.remove("drawer-open");
  }, [stage]);

  if (!node) {
    return (
      <div className="drawer-backdrop" onClick={close}>
        <div className="drawer" onClick={(e) => e.stopPropagation()}>
          <p>Etapa não encontrada.</p>
          <Link to="/">Voltar para a trilha</Link>
        </div>
      </div>
    );
  }
  if (stage === "hidden") return null;

  const phase = PHASES.find((p) => p.id === node.phase)!;
  const phaseNo = PHASES.indexOf(phase);
  const idx = NODES.findIndex((n) => n.id === node.id);
  const prev = NODES[idx - 1];
  const next = NODES[idx + 1];
  const siblings = nodesOfPhase(phase.id);
  const posInPhase = siblings.findIndex((n) => n.id === node.id);
  const done = !!data.done[node.id];
  const checked = new Set(data.checks[node.id] ?? []);
  const branch = node.branch ? BRANCHES.find((b) => b.id === node.branch) : undefined;

  const style = { "--phase-color": `var(--fase-${phase.color})` } as CSSProperties;
  const leaving = stage === "leaving";

  return (
    <div className={leaving ? "drawer-backdrop leaving" : "drawer-backdrop"} onClick={close}>
      <div
        key={node.id}
        className={leaving ? "drawer leaving" : "drawer"}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-head">
          <span className="drawer-phase">
            Fase {phaseNo} de {PHASES.length - 1} · {phase.title}
            {branch && <> · {branch.title}</>}
          </span>
          <button className="icon-btn" onClick={close} aria-label="Fechar (Esc)">
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* onde estou nesta fase: um ponto por etapa */}
        <ol className="drawer-steps" aria-label={`Etapa ${posInPhase + 1} de ${siblings.length} nesta fase`}>
          {siblings.map((s, i) => (
            <li key={s.id}>
              <button
                className={[
                  "step-dot",
                  s.id === node.id && "here",
                  data.done[s.id] && "done",
                  s.optional && "optional",
                ]
                  .filter(Boolean)
                  .join(" ")}
                title={`${i + 1}. ${s.title}`}
                aria-label={`${i + 1}. ${s.title}${data.done[s.id] ? " (concluída)" : ""}`}
                onClick={() => goTo(s)}
              />
            </li>
          ))}
          <li className="drawer-steps-label">
            etapa {posInPhase + 1} de {siblings.length}
          </li>
        </ol>

        <h2 id="drawer-title">{node.title}</h2>
        {node.summary && <p className="drawer-summary">{node.summary}</p>}

        <div className="drawer-tags">
          {node.optional && <span className="tag">opcional</span>}
          {node.group && <span className="tag">{node.group}</span>}
          {node.estimate && (
            <span className="tag soft">
              <Icon name="clock" size={12} /> {node.estimate}
            </span>
          )}
          {node.milestone && <span className="tag gold">marco</span>}
        </div>

        {node.validate && (
          <p className="callout">
            Resumo introdutório escrito para o onboarding. Na dúvida, a fonte oficial é a
            documentação linkada e o time funcional. Termos fiscais estão no{" "}
            <Link to="/glossario">glossário</Link>.
          </p>
        )}

        <Markdown>{node.body}</Markdown>

        {node.links.length > 0 && (
          <section className="drawer-section">
            <h3>Onde aprender</h3>
            <SourceLinks links={node.links} />
          </section>
        )}

        {node.checklist.length > 0 && (
          <section className="drawer-section">
            <h3>Pronto quando…</h3>
            <ul className="checklist">
              {node.checklist.map((item, i) => (
                <li key={i}>
                  <label>
                    <input type="checkbox" checked={checked.has(i)} onChange={() => toggleCheck(node, i)} />
                    <span>
                      <Markdown>{item}</Markdown>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="drawer-footer">
          <button className={done ? "btn done" : "btn"} onClick={() => setDone(node.id, !done)}>
            <Icon name="check" size={14} />
            {done ? "Concluída · desmarcar" : "Marcar como concluída"}
          </button>
          <div className="drawer-nav">
            {prev && (
              <button className="btn ghost" onClick={() => goTo(prev)} title={prev.title}>
                <Icon name="arrowLeft" size={14} /> Anterior
              </button>
            )}
            {next && (
              <button className="btn primary" onClick={() => goTo(next)} title={next.title}>
                Próxima <Icon name="arrowRight" size={14} />
              </button>
            )}
          </div>
          {next && (
            <p className="drawer-next">
              A seguir: <strong>{next.title}</strong>
              {next.phase !== node.phase && (
                <> · começa a fase <strong>{PHASES.find((p) => p.id === next.phase)?.title}</strong></>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
