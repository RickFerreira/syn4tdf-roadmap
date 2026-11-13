import synchroLogo from "../assets/synchro4tdf.svg?raw";
import type { LinkType } from "../types";

const paths: Record<string, JSX.Element> = {
  wiki: (
    <>
      <path d="M5 4h10l4 4v12H5z" />
      <path d="M14 4v5h5M8 13h8M8 17h6" />
    </>
  ),
  notion: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 16V8l6 8V8" />
    </>
  ),
  alura: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4z" />
      <path d="M4 7v8l8 4 8-4V7" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M10 9l5 3-5 3z" />
    </>
  ),
  issue: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  site: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrowLeft: <path d="M15 6l-6 6 6 6" />,
  arrowRight: <path d="M9 6l6 6-6 6" />,
  play: <path d="M8 5l11 7-11 7z" />,
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronUp: <path d="M6 15l6-6 6 6" />,
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5M8 7h7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </>
  ),
};

export function Icon({ name, size = 16 }: { name: LinkType | keyof typeof paths; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.site}
    </svg>
  );
}

/** Logo oficial do Synchro4TDF (do syn4tdf-frontend), na cor do texto ao redor. */
export function BrandLogo({ className = "brand-logo" }: { className?: string }) {
  return (
    <span
      className={className}
      role="img"
      aria-label="Synchro4TDF"
      dangerouslySetInnerHTML={{ __html: synchroLogo }}
    />
  );
}
