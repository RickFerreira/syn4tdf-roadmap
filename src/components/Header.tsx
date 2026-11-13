import { Link, NavLink } from "react-router-dom";
import { useProgress } from "../state/progress";
import { useTheme } from "../state/theme";
import { BrandLogo, Icon } from "./Icons";

/** Barra superior no formato da barra do próprio Synchro4TDF. */
export default function Header() {
  const { stats } = useProgress();
  const { theme, toggle } = useTheme();

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand" aria-label="Início da trilha">
            <BrandLogo />
          </Link>
          <span className="brand-section">Trilha de onboarding</span>
          <nav className="topnav-links" aria-label="Seções">
            <NavLink to="/" end>Trilha</NavLink>
            <NavLink to="/glossario">Glossário fiscal</NavLink>
            <NavLink to="/ajuda">Travou?</NavLink>
            <NavLink to="/sobre">Sobre</NavLink>
          </nav>
          <button
            className="theme-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema azul-escuro"}
            title={theme === "dark" ? "Tema claro" : "Tema azul-escuro"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
          </button>
        </div>
      </div>
      <div className="subbar">
        <div className="subbar-inner">
          <span>
            Progresso: <strong>{stats.done}/{stats.total}</strong> etapas
          </span>
          <span className="subbar-right">Salvo neste navegador · sem login</span>
        </div>
      </div>
    </header>
  );
}
