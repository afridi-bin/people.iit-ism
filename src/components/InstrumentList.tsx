"use client";

import { useMemo, useState } from "react";
import InstrumentCard from "./InstrumentCard";
import type { Instrument } from "@/lib/data";

export default function InstrumentList({ items }: { items: Instrument[] }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? items.filter((i) => (i.title + " " + (i.code ?? "")).toLowerCase().includes(s)) : items;
  }, [q, items]);
  return (
    <>
      <label className="relative block max-w-md">
        <span className="sr-only">Search instruments</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search instruments or I-STEM code…"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </label>
      <p className="mt-3 text-xs text-muted">{list.length} of {items.length} instruments</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((i) => (
          <InstrumentCard key={i.slug} i={i} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted">No instruments match “{q}”.</p>}
    </>
  );
}
