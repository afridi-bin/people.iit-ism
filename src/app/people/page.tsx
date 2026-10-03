import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section } from "@/components/ui";
import { people, telHref, type Person } from "@/lib/data";

export const metadata: Metadata = { title: "People" };

function Card({ p }: { p: Person }) {
  const initials = p.name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s*/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");
  return (
    <article className="flex flex-col items-center rounded-2xl border border-line bg-white p-6 text-center shadow-sm transition hover:shadow-lg">
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-brand-50 ring-4 ring-brand-100">
        {p.photo ? (
          <Image src={p.photo} alt={p.name} fill sizes="212px" className="object-cover object-top" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-600">{initials}</span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{p.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-600">{p.role}</p>
      <div className="mt-3 space-y-1 text-sm text-muted">
        {p.phone && <a href={telHref(p.phone.split("/")[0])} className="block hover:text-brand-600">☎ {p.phone}</a>}
        {p.email && <a href={`mailto:${p.email.trim()}`} className="block break-all hover:text-brand-600">✉ {p.email.trim()}</a>}
      </div>
    </article>
  );
}

function Group({ title, items, tint }: { title: string; items: Person[]; tint?: boolean }) {
  return (
    <Section title={title} tint={tint}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p, i) => <Card key={p.name + p.role + i} p={p} />)}
      </div>
    </Section>
  );
}

export default function People() {
  return (
    <>
      <PageHero title="People" subtitle="Administration, faculty-in-charge and technical staff of the Central Research Facility." crumbs={[{ label: "People" }]} />
      <Group title="Administration" items={people.head} />
      <Group title="Faculty-in-Charge (FIC)" items={people.fics} tint />
      <Group title="Officers & Staff" items={people.staff} />
    </>
  );
}
