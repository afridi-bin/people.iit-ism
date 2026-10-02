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
       
        <div style={{ height: "auto", width: "100%", overflow: "hidden" }}>
           {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={i?.images[0]} alt={i.title} style={{ width: "100%", height: "300px", }} />
        </div>
        
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
