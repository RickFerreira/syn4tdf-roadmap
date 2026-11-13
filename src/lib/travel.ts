/**
 * Animação de "pulo" entre duas etapas da trilha:
 * rola até a próxima caixinha e um ponto salta, em arco, da etapa atual até ela.
 */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** Espera a rolagem suave terminar (scrollY parado por ~120ms, no máximo maxMs). */
async function scrollSettled(maxMs = 1100) {
  const start = performance.now();
  let last = window.scrollY;
  let stableSince = performance.now();
  while (performance.now() - start < maxMs) {
    await new Promise((r) => requestAnimationFrame(r));
    if (window.scrollY !== last) {
      last = window.scrollY;
      stableSince = performance.now();
    } else if (performance.now() - stableSince > 120) {
      return;
    }
  }
}

function center(r: DOMRect) {
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function visible(r: DOMRect) {
  return r.bottom > 0 && r.top < window.innerHeight;
}

export async function travel(fromId: string, toId: string) {
  const to = document.getElementById(`node-${toId}`);
  if (!to) return;
  const from = document.getElementById(`node-${fromId}`);
  const color = getComputedStyle(to).getPropertyValue("--phase-color").trim() || undefined;

  to.scrollIntoView({ block: "center", behavior: "smooth" });
  await scrollSettled();

  const b = to.getBoundingClientRect();
  const end = center(b);
  const a = from?.getBoundingClientRect();
  // se a etapa de origem saiu da tela, o ponto entra pela borda mais próxima
  const start =
    a && visible(a)
      ? center(a)
      : { x: end.x, y: a && a.top < 0 ? -20 : window.innerHeight + 20 };

  from?.classList.add("launch");
  const dot = document.createElement("div");
  dot.className = "travel-dot";
  if (color) dot.style.setProperty("--dot", color);
  document.body.appendChild(dot);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lift = 50 + Math.min(Math.abs(dx) * 0.25 + Math.abs(dy) * 0.15, 110);
  const frames: Keyframe[] = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = start.x + dx * t;
    const y = start.y + dy * t - lift * 4 * t * (1 - t);
    // achata um pouco no lançamento e na chegada
    const s = i === 0 || i === steps ? "scale(1.25, 0.8)" : "scale(1)";
    frames.push({ transform: `translate(${x}px, ${y}px) ${s}` });
  }

  // rastro: pontinhos que ficam e somem
  const ghosts: HTMLElement[] = [];
  for (let i = 2; i < steps; i += 3) {
    const g = document.createElement("div");
    g.className = "travel-ghost";
    if (color) g.style.setProperty("--dot", color);
    g.style.transform = (frames[i].transform as string).replace(/scale\([^)]*\)/, "");
    g.style.opacity = "0";
    document.body.appendChild(g);
    ghosts.push(g);
    g.animate([{ opacity: 0 }, { opacity: 0.5 }, { opacity: 0 }], {
      duration: 700,
      delay: (i / steps) * 520,
      fill: "forwards",
    });
  }

  try {
    await dot.animate(frames, { duration: 560, easing: "cubic-bezier(.45,.05,.4,1)", fill: "forwards" }).finished;
  } catch {
    /* animação cancelada */
  }
  dot.remove();
  from?.classList.remove("launch");

  to.classList.remove("landing");
  void to.offsetWidth; // reinicia a animação
  to.classList.add("landing");
  setTimeout(() => to.classList.remove("landing"), 700);
  setTimeout(() => ghosts.forEach((g) => g.remove()), 900);
  await wait(260);
}
