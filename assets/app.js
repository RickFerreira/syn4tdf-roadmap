/**
 * ============================================================
 *  MOTOR DE RENDERIZAÇÃO — não precisa editar este arquivo
 *  para adicionar/mudar conteúdo. Edite assets/data.js.
 * ============================================================
 * Este arquivo lê PHASES (definido em data.js) e monta o HTML
 * da trilha dentro de <div id="track"></div>.
 */

// ---------- Ícones SVG disponíveis para os nós ----------
const ICONS = {
  doc: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v16H4z" stroke="white" stroke-width="2.2"/></svg>`,
  alura: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 6l8-4 8 4-8 4-8-4z" stroke="white" stroke-width="2"/><path d="M4 6v8l8 4 8-4V6" stroke="white" stroke-width="2"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" stroke-width="2.4" stroke-linecap="round"/></svg>`,
};

function iconSvg(name) {
  return ICONS[name] || ICONS.doc;
}

// ---------- Monta um nó simples (link) ----------
function renderLinkNode(node, colorVar) {
  return `
    <a class="node" href="${node.href}" target="_blank" rel="noopener">
      <span class="node-type-icon" style="background:var(${colorVar})" title="${node.icon}">
        ${iconSvg(node.icon)}
      </span>
      ${node.label}
    </a>
  `;
}

// ---------- Monta um nó de grupo (ex: Alura com filhos) ----------
function renderGroupNode(node, colorVar) {
  const children = node.children
    .map(
      (child) => `
      <a class="node" href="${child.href}" target="_blank" rel="noopener">
        ${child.label}
      </a>
    `
    )
    .join("");

  return `
    <div class="subgroup">
      <div class="subgroup-head">
        <span class="node-type-icon" style="background:var(${colorVar})" title="${node.icon}">
          ${iconSvg(node.icon)}
        </span>
        ${node.label}
      </div>
      <div class="subgroup-children">
        ${children}
      </div>
    </div>
  `;
}

// ---------- Monta uma "row" (um nó saindo do tronco, esquerda ou direita) ----------
function renderRow(node, side, colorVar) {
  const inner =
    node.type === "group"
      ? renderGroupNode(node, colorVar)
      : renderLinkNode(node, colorVar);

  const cluster = `<div class="node-cluster">${inner}</div>`;
  const connector = `<div class="connector-wrap"><div class="connector" style="width:100%"></div></div>`;

  if (side === "left") {
    return `
      <div class="row side-left">
        <div class="slot-left">${cluster}</div>
        ${connector}
        <div class="slot-right"></div>
      </div>
    `;
  }
  return `
    <div class="row side-right">
      <div class="slot-left"></div>
      ${connector}
      <div class="slot-right">${cluster}</div>
    </div>
  `;
}

// ---------- Monta uma fase inteira (chip + nós alternando lado) ----------
function renderPhase(phase, index) {
  const colorVar = `--fase-${phase.color}`;
  const colorSoftVar = `--fase-${phase.color}-soft`;

  const rows = phase.nodes
    .map((node, i) => {
      const side = i % 2 === 0 ? "left" : "right";
      return renderRow(node, side, colorVar);
    })
    .join("");

  return `
    <section class="phase" style="--phase-color: var(${colorVar}); --phase-color-soft: var(${colorSoftVar});">
      <div class="phase-marker">
        <div class="phase-label">
          <span class="phase-index">${index + 1}</span>${phase.title}
        </div>
      </div>
      <div class="phase-body">
        ${rows}
      </div>
    </section>
  `;
}

// ---------- Monta a legenda no topo a partir das fases existentes ----------
function renderLegend(phases) {
  return phases
    .map(
      (phase) => `
      <span class="legend-item">
        <span class="legend-dot" style="background:var(--fase-${phase.color})"></span>
        ${phase.title}
      </span>
    `
    )
    .join("");
}

// ---------- Ponto de entrada ----------
function renderTrack() {
  const track = document.getElementById("track");
  const legend = document.getElementById("legend");

  if (legend) {
    legend.innerHTML = renderLegend(PHASES);
  }

  const phasesHtml = PHASES.map((phase, i) => renderPhase(phase, i)).join("");

  track.innerHTML = `
    <div class="spine"></div>

    <div class="cap">
      <div class="cap-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="white" stroke-width="2"/><path d="M12 7v5l3 3" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
        Início
      </div>
    </div>

    ${phasesHtml}

    <div class="cap">
      <div class="cap-badge end">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#4a3300" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        Pronto para a squad
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", renderTrack);
