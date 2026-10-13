import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Tiny mono breadcrumb that opens every view, where wireframe.co puts its greeting. */
export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="t-mono mb-6 flex items-center gap-2 text-muted">
      <span className="text-faint">/</span>
      {trail.map((t, i) => (
        <Fragment key={t.label}>
          {i > 0 ? <span className="text-faint">/</span> : null}
          {t.href ? (
            <Link href={t.href} className="hover:text-ink">
              {t.label}
            </Link>
          ) : (
            <span className="text-ink-2">{t.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h1 className={cn("t-display mb-6", className)}>{children}</h1>;
}

export function SectionLabel({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={cn("t-label mb-6 scroll-mt-28", className)}>
      {children}
    </h2>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cn("my-10 h-px border-0 bg-line", className)} />;
}

export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      {children}
    </section>
  );
}
