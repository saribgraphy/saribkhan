import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { Translator } from "@/components/notes/translator";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb, Divider, Section, SectionLabel, Title } from "@/components/ui/view";
import { notes, notesHeading, notesLabels, translatorClosing, translatorLeadIn } from "@/content/notes";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Notes" }]} />
      <Title>{notesHeading}</Title>

      <ul className="-mx-3 mt-10 grid">
        {notes.map((n) => (
          <li key={n.slug}>
            <Link href={`/notes/${n.slug}`} className="group flex items-center gap-4 rounded-[10px] px-3 py-3 hover:bg-tint">
              <span className="grid min-w-0 flex-1 gap-0.5">
                <span className="text-[15px] leading-6 font-medium tracking-[-0.015em] text-ink">{n.title}</span>
                <span className="t-ui truncate font-normal text-muted">{n.paragraphs[0]}</span>
              </span>
              <span className="t-mono shrink-0 text-muted">{n.readingTime}</span>
              <ArrowRight size={14} className="shrink-0 text-faint group-hover:text-ink" />
            </Link>
          </li>
        ))}
      </ul>

      <Divider className="my-16" />

      <Section id="translator">
        <SectionLabel>{notesLabels.translator}</SectionLabel>
        <p className="t-body">{translatorLeadIn}</p>
        <div className="mt-2">
          <Translator />
        </div>
        <p className="t-body mt-8">
          <Copy>{translatorClosing}</Copy>
        </p>
      </Section>
    </>
  );
}
