import { getPage } from "../content/loadContent";
import Markdown from "./Markdown";

export default function MarkdownPage({ name }: { name: string }) {
  return (
    <article className="page">
      <Markdown>{getPage(name)}</Markdown>
    </article>
  );
}
