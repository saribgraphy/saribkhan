import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Copy } from "@/components/ui/copy";
import { Breadcrumb } from "@/components/ui/view";
import { getNote, notes } from "@/content/notes";

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  return note ? pageMetadata(note.title, note.paragraphs[0]) : {};
}

/** An essay opens in the reading column with a date, a reading time and nothing else. */
export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const next = notes[(notes.indexOf(note) + 1) % notes.length];

  return (
    <article>
      <Breadcrumb trail={[{ label: "Notes", href: "/notes" }, { label: note.title }]} />
      <h1 className="t-display mb-4">{note.title}</h1>
      <p className="t-mono mb-10 flex items-center gap-2 text-muted">
        <Copy>{note.date}</Copy>
        <span className="text-faint">·</span>
        {note.readingTime}
      </p>
      <div className="grid gap-5">
        {note.paragraphs.map((p, i) => (
          <p key={i} className="t-lead">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
        <Link href="/notes" className="t-ui inline-flex items-center gap-1.5 text-muted hover:text-ink">
          <ArrowLeft size={13} /> All notes
        </Link>
        <Link href={`/notes/${next.slug}`} className="t-ui inline-flex items-center gap-1.5 text-muted hover:text-ink">
          {next.title} <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
