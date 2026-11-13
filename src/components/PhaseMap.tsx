import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { PHASES } from "../content/phases";
import { nodesOfPhase } from "../content/loadContent";
import { phaseProgress, useProgress } from "../state/progress";
import { Icon } from "./Icons";

export function scrollToPhase(id: string) {
  document.getElementById(`fase-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Mapa da trilha: as fases em linha, com o progresso de cada uma.
 * Fica grudado no topo enquanto a pessoa desce e serve de menu.
 */
export default function PhaseMap() {
  const { data } = useProgress();
  const [active, setActive] = useState<string>("");
  const [stuck, setStuck] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // fase visível no momento
  useEffect(() => {
    const sections = PHASES.map((p) => document.getElementById(`fase-${p.id}`)).filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id.replace("fase-", ""), e.isIntersecting);
        const first = PHASES.find((p) => visible.get(p.id));
        setActive(first?.id ?? "");
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // sombra quando o mapa gruda no topo
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // no celular o mapa rola de lado: mantém a fase ativa à vista
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-phase="${active}"]`);
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <nav className={stuck ? "phase-map stuck" : "phase-map"} aria-label="Mapa da trilha">
        <ol ref={listRef}>
          {PHASES.map((p, i) => {
            const prog = phaseProgress(nodesOfPhase(p.id), data);
            const frac = prog.total ? prog.done / prog.total : 0;
            const style = { "--phase-color": `var(--fase-${p.color})`, "--frac": frac } as CSSProperties;
            const cls = [
              "mm-item",
              prog.complete && "complete",
              active === p.id && "active",
              prog.optionalOnly && "optional",
              frac === 0 && "zero",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li key={p.id} className={cls} style={style} data-phase={p.id}>
                <button
                  onClick={() => scrollToPhase(p.id)}
                  title={`${p.title}: ${prog.done} de ${prog.total}${prog.optionalOnly ? " (opcional)" : ""}`}
                  aria-current={active === p.id ? "step" : undefined}
                >
                  <span className="mm-dot">
                    <svg viewBox="0 0 36 36" aria-hidden="true">
                      <circle className="mm-ring-bg" cx="18" cy="18" r="15.5" />
                      <circle className="mm-ring" cx="18" cy="18" r="15.5" pathLength={100} />
                    </svg>
                    <span className="mm-num">{prog.complete ? <Icon name="check" size={14} /> : i}</span>
                  </span>
                  <span className="mm-label">{p.short}</span>
                  <span className="mm-count">
                    {prog.done}/{prog.total}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
