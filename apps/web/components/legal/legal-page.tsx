import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/shared/logo";

// Shared identity referenced across all legal pages. Geoplan is the operating
// entity and data controller for the Handshakes service.
export const LEGAL_COMPANY = "Geoplan Philippines Inc.";
export const LEGAL_PRODUCT = "Handshakes";
export const LEGAL_CONTACT_EMAIL = "support@geoplanph.com";
export const LEGAL_WEBSITE = "https://geoplanph.com";

export type LegalSection = { id: string; title: string };

export function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 space-y-4"
    >
      <h2
        id={`${id}-heading`}
        className="text-xl font-bold uppercase tracking-widest text-foreground"
      >
        {title}
      </h2>
      <div className="h-1 w-12 bg-foreground" />
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-foreground [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}

export function LegalPage({
  eyebrow = "Legal",
  title,
  description,
  updated,
  sections,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={`${LEGAL_PRODUCT} home`}
            className="inline-flex items-center rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo markClassName="w-8" wordClassName="text-[16px]" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Last updated: {updated}
          </p>
        </div>

        <nav
          aria-label="Table of contents"
          className="mt-12 rounded-2xl border border-border bg-muted/20 p-6"
        >
          <h2 className="mb-4 text-[10px] font-black uppercase tracking-widest text-foreground">
            On this page
          </h2>
          <ol className="grid gap-x-8 gap-y-2 text-sm text-muted-foreground sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex gap-2 rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span aria-hidden className="tabular-nums text-muted-foreground/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-14">{children}</div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {LEGAL_COMPANY}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
