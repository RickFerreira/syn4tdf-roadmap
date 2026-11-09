import Markdown from "react-markdown";

// URLs pendentes ou protocolos não suportados são exibidos apenas como texto.
export function linkUrl(href?: string) {
  if (!href || href === "#") return undefined;
  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function InlineText({ children }: { children: string }) {
  return <Markdown
    allowedElements={["a", "strong", "em", "code"]}
    unwrapDisallowed
    skipHtml
    components={{
      a: ({ href, children }) => {
        const url = linkUrl(href);
        if (!url) return <>{children}</>;
        return <a className="inline-link" href={url} target="_blank" rel="noopener noreferrer">
          {children}<span className="sr-only"> (abre em nova aba)</span>
        </a>;
      },
    }}
  >{children}</Markdown>;
}
