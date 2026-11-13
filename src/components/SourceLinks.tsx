import { Link } from "react-router-dom";
import type { LinkType, NodeLink } from "../types";
import { Icon } from "./Icons";

const SOURCE_NAME: Record<LinkType, string> = {
  wiki: "Wiki",
  notion: "Notion",
  alura: "Alura",
  video: "Vídeo",
  issue: "Issue",
  site: "Link",
};

export default function SourceLinks({ links }: { links: NodeLink[] }) {
  if (!links.length) return null;
  return (
    <ul className="sources">
      {links.map((l, i) => (
        <li key={i}>
          {l.url.startsWith("#/") ? (
            <Link className={`source source-${l.type}`} to={l.url.slice(1)}>
              <span className="source-icon">
                <Icon name={l.type} />
              </span>
              <span className="source-text">
                <span className="source-kind">Nesta trilha</span>
                <span className="source-label">{l.label}</span>
              </span>
            </Link>
          ) : l.url ? (
            <a className={`source source-${l.type}`} href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="source-icon">
                <Icon name={l.type} />
              </span>
              <span className="source-text">
                <span className="source-kind">{SOURCE_NAME[l.type]}</span>
                <span className="source-label">{l.label}</span>
              </span>
            </a>
          ) : (
            <span className={`source source-${l.type} pending`} title="Link ainda não cadastrado">
              <span className="source-icon">
                <Icon name={l.type} />
              </span>
              <span className="source-text">
                <span className="source-kind">{SOURCE_NAME[l.type]} · em breve</span>
                <span className="source-label">{l.label}</span>
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
