import "./globals.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-paper px-6">
      <div className="grid max-w-[360px] gap-4">
        <span className="t-mono text-muted">404</span>
        <h1 className="text-[28px] leading-8 font-semibold tracking-[-0.015em] text-ink">This page isn&apos;t part of the funnel.</h1>
        <Link href="/" className="btn btn-primary w-fit">
          <span className="btn-label">Back home</span>
        </Link>
      </div>
    </main>
  );
}
