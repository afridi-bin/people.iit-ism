import Link from "next/link";
import type { Instrument } from "@/lib/data";
import { StatusBadge } from "./ui";

export default function InstrumentCard({ i }: { i: Instrument }) {
  const fic = i.details.find(([k]) => /faculty|facility in/i.test(k))?.[1];
  return (
    <Link
      href={`/instruments/${i.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
            <path d="M8 15h8" />
          </svg>
        </span>
        <StatusBadge status={i.status} />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug text-ink group-hover:text-brand-600">{i.title}</h3>
      {fic && <p className="mt-2 text-xs text-muted">FIC: {fic}</p>}
      <div className="mt-auto flex items-center justify-between pt-5 text-xs">
        <span className="text-muted">{i.code ? `I-STEM Code: ${i.code}` : "Details coming soon"}</span>
        <span className="font-semibold text-brand-600">View →</span>
      </div>
    </Link>
  );
}
