import { iconPaths } from "./icon-paths";
import type { IconName } from "./icon-paths";

export function Icon({ name = "doc" }: { name?: IconName }) {
  return <span className="node-type-icon" style={{ background: "var(--phase-color)" }} aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      {iconPaths[name].map((path) => <path key={path} d={path} strokeLinecap={name === "plus" ? "round" : undefined} />)}
    </svg>
  </span>;
}
