import { Quotes, Square } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";
import { Divider } from "@/components/ui/view";
import { A, K, Prompt } from "./blocks";

/**
 * Renders a guide written in Markdown with the guide's own blocks: headings
 * with anchors, paragraphs, lists, checklists, tables in the card style, quotes,
 * and code as copyable cards. Only the subset the guides use: `##` and `###`
 * headings, `-`, `1.` and `- [ ]` lists, `|` tables, `>` quotes, fenced code,
 * and inline `code`, **bold** and [links](url). Each `##` section is set off
 * with a divider, like the hand-built guide.
 */

type Block =
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string; id: string }
  | { kind: "p"; text: string }
  | { kind: "ul" | "ol" | "check"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "quote"; text: string }
  | { kind: "code"; lang: string; text: string };

/** The anchor for a heading: "5. The workflow, step by step" → "the-workflow-step-by-step". */
export const slug = (text: string) =>
  text
    .replace(/^\d+(\.\d+)*\.?\s*/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function parse(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  const isStart = (l: string) => /^(#{2,3} |```|>|\||- |\d+\. )/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim() === "---") {
      i++;
      continue;
    }
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) body.push(lines[i++]);
      i++;
      blocks.push({ kind: "code", lang, text: body.join("\n") });
      continue;
    }
    if (line.startsWith("## ") || line.startsWith("### ")) {
      const level = line.startsWith("### ") ? "h3" : "h2";
      const text = line.replace(/^#{2,3} /, "").trim();
      blocks.push({ kind: level, text, id: slug(text) });
      i++;
      continue;
    }
    if (line.startsWith("|")) {
      const head = cells(line);
      i += 2; // skip the |---| row
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) rows.push(cells(lines[i++]));
      blocks.push({ kind: "table", head, rows });
      continue;
    }
    if (line.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) parts.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ kind: "quote", text: parts.join(" ").trim() });
      continue;
    }
    if (/^- \[[ x]\] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- \[[ x]\] /.test(lines[i])) items.push(lines[i++].replace(/^- \[[ x]\] /, ""));
      blocks.push({ kind: "check", items });
      continue;
    }
    if (line.startsWith("- ") || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+\. /.test(lines[i]) : lines[i].startsWith("- "))) {
        let item = lines[i++].replace(ordered ? /^\d+\. / : /^- /, "");
        // Continuation lines indented under the item.
        while (i < lines.length && /^ {2,}\S/.test(lines[i])) item += " " + lines[i++].trim();
        items.push(item);
      }
      blocks.push({ kind: ordered ? "ol" : "ul", items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !isStart(lines[i])) para.push(lines[i++].trim());
    if (para.length) blocks.push({ kind: "p", text: para.join(" ") });
    else i++;
  }
  return blocks;
}

/** Inline `code`, **bold** and [links](url). */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("`") && part.endsWith("`")) return <K key={i}>{part.slice(1, -1)}</K>;
        if (part.startsWith("**") && part.endsWith("**"))
          return (
            <strong key={i} className="font-medium text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return <A key={i} href={link[2]}>{link[1]}</A>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

const CODE_LABEL: Record<string, string> = { bash: "Command", text: "Text", markdown: "Markdown", html: "Code", js: "Code", tsx: "Code", css: "Code", json: "Code" };

function Render({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 id={block.id} className="scroll-mt-28 text-[24px] leading-[30px] font-semibold tracking-[-0.015em] text-ink">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={block.id} className="mt-4 scroll-mt-28 text-[19px] leading-7 font-semibold tracking-[-0.015em] text-ink">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="t-body">
          <Inline text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="grid gap-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="t-body flex gap-3">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-faint" aria-hidden />
              <span className="min-w-0">
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="grid gap-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="t-body flex gap-3">
              <span className="t-mono mt-[3px] w-5 shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "check":
      return (
        <ul className="grid gap-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="t-body flex gap-3">
              <Square size={18} className="mt-[2px] shrink-0 text-muted" />
              <span className="min-w-0">
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="card overflow-x-auto !p-0">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="t-label px-4 py-3 align-bottom font-medium">
                    <Inline text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-line last:border-0">
                  {row.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="t-ui px-4 py-3 align-top font-medium text-ink">
                        <Inline text={c} />
                      </th>
                    ) : (
                      <td key={i} className="t-ui px-4 py-3 align-top font-normal text-body">
                        <Inline text={c} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <blockquote className="frame flex gap-3 !px-4 !py-3.5">
          <Quotes size={18} weight="fill" className="mt-[3px] shrink-0 text-faint" />
          <p className="t-body text-ink-2">
            <Inline text={block.text} />
          </p>
        </blockquote>
      );
    case "code":
      return <Prompt label={CODE_LABEL[block.lang] ?? "Code"}>{block.text}</Prompt>;
  }
}

/** The `##` headings, for the contents list. */
export function headings(source: string) {
  return parse(source).flatMap((b) => (b.kind === "h2" ? [{ text: b.text, id: b.id }] : []));
}

export function Markdown({ source }: { source: string }) {
  const blocks = parse(source);
  // Group into sections at each ## heading.
  const sections: Block[][] = [];
  for (const b of blocks) {
    if (b.kind === "h2" || !sections.length) sections.push([]);
    sections[sections.length - 1].push(b);
  }
  return (
    <>
      {sections.map((section, s) => (
        <Fragment key={s}>
          {s > 0 ? <Divider /> : null}
          <section className="grid gap-5">
            {section.map((b, i) => (
              <Render key={i} block={b} />
            ))}
          </section>
        </Fragment>
      ))}
    </>
  );
}
