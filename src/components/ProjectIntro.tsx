import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { useProgress } from "../state/progress";
import { BrandLogo, Icon } from "./Icons";
import { scrollToPhase } from "./PhaseMap";

/**
 * "Onde você chegou": a empresa, o produto, o ciclo fiscal e onde o código do time entra.
 * Texto público: baseado no site institucional da Synchro e na tela inicial do produto.
 */

const CYCLE: { label: [string, string?]; text: string }[] = [
  {
    label: ["Conteúdo", "legal"],
    text: "Leis, convênios, portarias e layouts de arquivos mudam o tempo todo, em três esferas (federal, estadual e municipal). Acompanhar essas mudanças é o que mantém o cliente em conformidade, e é a origem de boa parte das issues que você vai pegar.",
  },
  {
    label: ["Cálculo", "e emissão"],
    text: "O imposto é calculado item a item quando a nota fiscal é emitida, no ERP SAP do cliente. Cada documento já nasce com a base de cálculo, a alíquota e o valor de cada tributo.",
  },
  {
    label: ["Apuração"],
    text: "No fim do período, a soma de tudo: débitos − créditos ± ajustes = saldo a pagar (ou credor, para o próximo mês). É o coração do Synchro4TDF, feito com procedures e Calculation Views no HANA.",
  },
  {
    label: ["Declaração"],
    text: "Gerar as obrigações acessórias: arquivos do SPED (EFD ICMS/IPI, EFD-Contribuições, ECF…) e declarações estaduais e municipais. No produto você verá isso como processos de \"Geração\".",
  },
  {
    label: ["Validação", "e entrega"],
    text: "Antes de transmitir, os arquivos passam por críticas (erros e alertas) e pelo validador do fisco. O produto mostra o status de cada obrigação em painéis como o Cockpit.",
  },
  {
    label: ["Recolhimento", "e/ou compensação"],
    text: "O saldo apurado vira guia de pagamento (DARF, GNRE, guias estaduais) ou é compensado com créditos que a empresa tem a receber.",
  },
  {
    label: ["Recuperação", "de créditos"],
    text: "Identificar imposto pago a mais e pedir de volta. Exemplo clássico: o ressarcimento de ICMS-ST, com arquivos próprios como a CAT 42 (SP) e o ADRC-ST (PR).",
  },
  {
    label: ["Gestão de obrig.", "e sup. audit/fiscal."],
    text: "Controlar prazos e status das entregas e, quando o fisco pergunta, mostrar de onde veio cada número. Rastreabilidade (logs, auditoria, conciliação) é requisito, não luxo.",
  },
];

function CycleDiagram() {
  const [sel, setSel] = useState(2);
  const R = 150;
  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSel(i);
    }
  };

  return (
    <div className="intro-cycle">
      <svg viewBox="-30 -10 460 420" className="cycle-svg" role="group" aria-label="Ciclo fiscal">
        <defs>
          <marker id="cyc-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" className="cycle-arrowhead" />
          </marker>
          <marker id="cyc-arrow-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0L10 5L0 10z" className="cycle-arrowhead-gold" />
          </marker>
        </defs>
        {/* anel azul (ciclo) e anel dourado (melhoria contínua), como na tela inicial do produto */}
        <path
          className="cycle-ring"
          d={`M ${200 + R * Math.cos(-1.15)} ${200 + R * Math.sin(-1.15)} A ${R} ${R} 0 1 1 ${200 + R * Math.cos(-2.0)} ${200 + R * Math.sin(-2.0)}`}
          markerEnd="url(#cyc-arrow)"
        />
        <path
          className="cycle-ring-gold"
          d={`M ${200 + 92 * Math.cos(-1.45)} ${200 + 92 * Math.sin(-1.45)} A 92 92 0 1 1 ${200 + 92 * Math.cos(-1.95)} ${200 + 92 * Math.sin(-1.95)}`}
          markerEnd="url(#cyc-arrow-gold)"
        />
        <image href="./brand/synchro-colorido-escuro.svg" className="logo-on-dark" x="140" y="160" width="120" height="70" />
        <image href="./brand/synchro-colorido.svg" className="logo-on-light" x="140" y="160" width="120" height="70" />

        {CYCLE.map((s, i) => {
          const a = -Math.PI / 2 + (i * Math.PI) / 4;
          const cx = 200 + R * Math.cos(a);
          const cy = 200 + R * Math.sin(a);
          const w = 118;
          const h = 46;
          return (
            <g
              key={i}
              className={sel === i ? "cycle-step selected" : "cycle-step"}
              role="button"
              tabIndex={0}
              aria-pressed={sel === i}
              aria-label={s.label.join(" ")}
              onClick={() => setSel(i)}
              onKeyDown={onKey(i)}
            >
              <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="9" />
              {s.label[1] ? (
                <text x={cx} y={cy - 4} textAnchor="middle">
                  <tspan x={cx}>{s.label[0]}</tspan>
                  <tspan x={cx} dy="15">{s.label[1]}</tspan>
                </text>
              ) : (
                <text x={cx} y={cy + 5} textAnchor="middle">{s.label[0]}</text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="cycle-detail" aria-live="polite">
        <p className="section-kicker">O ciclo fiscal · {sel + 1} de 8</p>
        <h3>{CYCLE[sel].label.join(" ").replace("obrig.", "obrigações").replace("sup. audit/fiscal.", "suporte à auditoria e fiscalização")}</h3>
        <p>{CYCLE[sel].text}</p>
        <p className="cycle-hint">
          Este é o diagrama da tela inicial do Synchro4TDF. Clique nas etapas para ler sobre cada uma.
        </p>
        <div className="cycle-nav">
          <button className="btn small" onClick={() => setSel((sel + 7) % 8)} aria-label="Etapa anterior">
            <Icon name="arrowLeft" size={14} />
          </button>
          <button className="btn small" onClick={() => setSel((sel + 1) % 8)} aria-label="Próxima etapa">
            <Icon name="arrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectIntro() {
  const { data } = useProgress();
  const started = Object.values(data.done).some(Boolean);
  const [open, setOpen] = useState(!started);

  return (
    <section className={open ? "intro open" : "intro"} id="intro" aria-labelledby="intro-title">
      <div className="intro-head">
        <div>
          <p className="section-kicker">Antes de começar</p>
          <h2 className="section-title" id="intro-title">Onde você chegou</h2>
          {!open && (
            <p className="intro-teaser">A Synchro, o Synchro4TDF, o ciclo fiscal e onde o seu código entra.</p>
          )}
        </div>
        <button className="btn small" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="intro-body">
          {open ? "Recolher" : "Ler a introdução"}
          <Icon name={open ? "chevronUp" : "chevronDown"} size={14} />
        </button>
      </div>

      {open && (
        <div id="intro-body">
          <div className="intro-cards">
            <article className="intro-card">
              <p className="section-kicker">A empresa</p>
              <h3>Synchro Soluções Fiscais</h3>
              <p>
                Empresa brasileira com mais de 30 anos de mercado, especializada em software fiscal e
                <strong> parceira da SAP</strong>. Os produtos ajudam grandes empresas a calcular
                tributos, entregar as obrigações ao fisco e estar em conformidade com uma legislação
                que muda toda semana.
              </p>
              <p className="intro-small">
                Nomes que você vai ouvir: <strong>Synchro4TDF</strong>, <strong>Synchro4DRC</strong>{" "}
                (certificado pela SAP) e <strong>Synchro4Me</strong>.
              </p>
              <a href="https://www.synchro.com.br/" target="_blank" rel="noopener noreferrer">
                Site da Synchro →
              </a>
            </article>

            <article className="intro-card featured">
              <BrandLogo className="intro-logo" />
              <h3 className="sr-only">O Synchro4TDF</h3>
              <p>
                Fruto da parceria com a SAP, o Synchro4TDF une a experiência tributária da Synchro ao{" "}
                <strong>SAP TDF</strong> (<em>Tax Declaration Framework</em>). É uma solução
                <strong> nativa do ambiente SAP</strong>: roda dentro do <strong>SAP HANA</strong> do
                cliente e usa os dados do fato gerador em tempo real na apuração e na declaração das
                obrigações.
              </p>
              <ul className="intro-list">
                <li>Sem integração externa: nativo ao SAP</li>
                <li>Dados fiscais em tempo real, tratados na origem</li>
                <li>Roda no XSA, compatível com nuvem</li>
              </ul>
            </article>

            <article className="intro-card">
              <p className="section-kicker">O time</p>
              <h3>Quem constrói</h3>
              <p>
                Desenvolvedores da Synchro e bolsistas de laboratórios parceiros (<strong>LSI/UFCG</strong>{" "}
                e <strong>IDE.IA/IFPB</strong>), organizados em <strong>squads</strong>: Indiretos,
                Diretos, Horizontais, Reforma Tributária, Customizações e AMS.
              </p>
              <p className="intro-small">
                O trabalho chega como issue no GitLab, passa por branch, MR e code review, e termina
                validado pelo time funcional. A fase <em>Como o time trabalha</em> explica cada passo.
              </p>
            </article>
          </div>

          <CycleDiagram />

          <div className="intro-flow-wrap">
            <p className="section-kicker">Onde o seu código entra</p>
            <ol className="intro-flow">
              <li>
                <strong>ERP SAP</strong>
                <span>O cliente emite notas e faz lançamentos no dia a dia.</span>
              </li>
              <li>
                <strong>SAP TDF</strong>
                <span>Os dados fiscais ficam organizados no banco HANA.</span>
              </li>
              <li className="you">
                <strong>Synchro4TDF</strong>
                <span>Apuração, obrigações, conciliação, contabilização e relatórios.</span>
                <span className="intro-stack">
                  <span className="tag">React + MobX</span>
                  <span className="tag">Java / Groovy</span>
                  <span className="tag">SAP HANA · CVs</span>
                  <span className="tag">Clojure</span>
                </span>
                <span className="you-badge">você está aqui</span>
              </li>
              <li>
                <strong>Fisco</strong>
                <span>Recebe arquivos do SPED, declarações e guias.</span>
              </li>
            </ol>
          </div>

          <div className="intro-why">
            <div>
              <h3>Por que o começo parece difícil (e tudo bem)</h3>
              <ul>
                <li>
                  <strong>O domínio é de contabilidade e direito tributário</strong>, não de
                  computação. ICMS, CFOP, apuração e SPED são a primeira barreira.
                </li>
                <li>
                  <strong>O ecossistema SAP</strong> tem nomes e ferramentas próprias: HANA, TDF, XSA,
                  Calculation Views.
                </li>
                <li>
                  <strong>A stack é poliglota</strong>: React, Java, SQLScript e Clojure no mesmo
                  produto.
                </li>
              </ul>
            </div>
            <div className="intro-cta">
              <p>A trilha encurta esse caminho. Quando aparecer um termo fiscal, o glossário está a um clique.</p>
              <button className="btn primary" onClick={() => scrollToPhase("boas-vindas")}>
                Ir para a fase 0 <Icon name="arrowRight" size={14} />
              </button>
              <Link className="btn" to="/glossario">
                <Icon name="book" size={14} /> Glossário fiscal
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
