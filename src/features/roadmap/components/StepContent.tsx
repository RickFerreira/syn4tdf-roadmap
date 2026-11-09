import type { Step } from "../types";
import { InlineText, linkUrl } from "../../../components/InlineText";

export function StepContent({ step }: { step: Step }) {
  const href = linkUrl(step.href);
  const links = (step.links?.items ?? [])
    .map((item) => ({ ...item, href: linkUrl(item.href) }))
    .filter((item) => item.href);

  return <>
    {step.description && <p className="detail-description"><InlineText>{step.description}</InlineText></p>}
    {step.sections?.map((section, index) => (
      <section className="detail-section" key={index}>
        {section.title && <h3>{section.title}</h3>}
        {section.paragraphs?.map((text, i) => <p key={i}><InlineText>{text}</InlineText></p>)}
        {!!section.items?.length && <ul>{section.items.map((text, i) => <li key={i}><InlineText>{text}</InlineText></li>)}</ul>}
      </section>
    ))}
    {!step.description && !step.sections?.length && !href && !links.length && <p className="detail-empty">As orientações desta etapa serão adicionadas em breve.</p>}
    {href && <p><a className="inline-link" href={href} target="_blank" rel="noopener noreferrer">
      {step.linkLabel || step.label}<span className="sr-only"> (abre em nova aba)</span>
    </a></p>}
    {!!links.length && <section className="step-links">
      <h3>{step.links?.title}</h3>
      <ul>{links.map((item, index) => <li key={index}>
        <a className="inline-link" href={item.href} target="_blank" rel="noopener noreferrer">
          {item.label}<span className="sr-only"> (abre em nova aba)</span>
        </a>
      </li>)}</ul>
    </section>}
  </>;
}
