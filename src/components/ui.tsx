import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({ title, subtitle, crumbs }: { title: string; subtitle?: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
      <div className="dot-pattern absolute inset-0" aria-hidden />
      <div className="container-x relative py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-brand-100">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs?.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span aria-hidden>/</span>
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-brand-100 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Section({ title, kicker, action, children, tint }: { title?: string; kicker?: string; action?: ReactNode; children: ReactNode; tint?: boolean }) {
  return (
    <section className={tint ? "bg-surface py-14 sm:py-16" : "py-14 sm:py-16"}>
      <div className="container-x">
        {(title || kicker) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              {kicker && <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{kicker}</p>}
              {title && <h2 className="mt-1 text-2xl font-bold text-ink sm:text-3xl">{title}</h2>}
            </div>
            {action}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function StatusBadge({ status }: { status: string | null }) {
  if (!status) return null;
  const running = /running/i.test(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        running ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${running ? "bg-emerald-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
}

export function FileLink({ href, children }: { href: string | null; children: ReactNode }) {
  if (!href) return <span className="text-muted">{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-line bg-white p-4 text-sm transition hover:border-brand-300 hover:shadow-md"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-600">PDF</span>
      <span className="font-medium text-ink group-hover:text-brand-600">{children}</span>
    </a>
  );
}
