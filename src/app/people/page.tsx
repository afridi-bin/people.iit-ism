import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section } from "@/components/ui";
import { people, telHref, type Person } from "@/lib/data";

export const metadata: Metadata = { title: "People" };

type Entry = Person & { roles?: string[] };

function mergeByPerson(list: Person[]): Entry[] {
  const map = new Map<string, Entry>();
  for (const p of list) {
    const key = p.name.trim();
    const role = p.role.replace(/^FIC\s*[,-]?\s*/i, "").trim();
    const e = map.get(key);
    if (e) e.roles!.push(role);
    else map.set(key, { ...p, roles: [role] });
  }
  return [...map.values()];
}

const staffGroups: { title: string; match: RegExp }[] = [
  { title: "Technical Officers", match: /^technical officer/i },
  { title: "Technical Superintendents", match: /superintendent|^jts$/i },
  { title: "Technicians", match: /technician/i },
];

const getInitials = (name: string) =>
  name.replace(/^(Prof\.|Dr\.|Mr\.|Ms\.)\s*/i, "").split(/\s+/).slice(0, 2).map((w) => w[0]).join("");

/* ---------- Default card (FIC + staff) ---------- */
function Card({ p }: { p: Entry }) {
  const initials = getInitials(p.name);
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
      {p.roles ? (
        <ul className="mt-2 flex flex-wrap justify-center gap-1.5">
          {p.roles.map((r) => (
            <li key={r} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">FIC · {r}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 text-sm font-medium text-brand-600">{p.role}</p>
      )}
      <div className="mt-3 space-y-1 text-sm text-muted">
        {p.phone && <a href={telHref(p.phone.split("/")[0])} className="block hover:text-brand-600">☎ {p.phone}</a>}
        {p.email && <a href={`mailto:${p.email.trim()}`} className="block break-all hover:text-brand-600">✉ {p.email.trim()}</a>}
      </div>
    </article>
  );
}

/* ---------- Big feature card (Administration) ---------- */
function HeadCard({ p }: { p: Entry }) {
  const initials = getInitials(p.name);
  return (
    <article className="group relative w-full max-w-4xl overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-white via-brand-50/40 to-brand-50 shadow-lg transition hover:shadow-xl">
      {/* decorative accent blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-brand-300/30 blur-3xl"
      />

      <div className="relative flex flex-col items-center gap-8 p-8 sm:p-10 md:flex-row md:items-center md:gap-10">
        {/* Photo */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 -m-3 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 opacity-20 blur-lg" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-white ring-4 ring-brand-500/30 sm:h-44 sm:w-44">
            {p.photo ? (
              <Image
                src={p.photo}
                alt={p.name}
                fill
                sizes="(min-width:640px) 176px, 160px"
                className="object-cover object-top"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-4xl font-bold text-brand-600">
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            Head, {p.role}
          </span>

          <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            {p.name}
          </h3>

          {/* underline accent */}
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-brand-500 to-brand-300 md:mx-0" />

          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            {p.phone && (
              <a
                href={telHref(p.phone.split("/")[0])}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-brand-400 hover:text-brand-700"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>
                {p.phone}
              </a>
            )}
            {p.email && (
              <a
                href={`mailto:${p.email.trim()}`}
                className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm transition hover:border-brand-400 hover:text-brand-700"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
                <span className="break-all">{p.email.trim()}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------- Wrapper that picks layout per group ---------- */
function Group({
  title,
  items,
  tint,
  variant = "grid",
}: {
  title: string;
  items: Entry[];
  tint?: boolean;
  variant?: "grid" | "feature";
}) {
  if (variant === "feature") {
    return (
      <Section title={title} tint={tint}>
        <div className="flex justify-center">
          {items.map((p, i) => (
            <HeadCard key={p.name + p.role + i} p={p} />
          ))}
        </div>
      </Section>
    );
  }

  const single = items.length === 1;
  return (
    <Section title={title} tint={tint}>
      <div
        className={
          single
            ? "flex justify-center"
            : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {items.map((p, i) => (
          <Card key={p.name + p.role + i} p={p} />
        ))}
      </div>
    </Section>
  );
}

export default function People() {
  const fics = mergeByPerson(people.fics);
  const grouped = staffGroups.map((g) => ({ ...g, items: people.staff.filter((p) => g.match.test(p.role)) }));
  const other = people.staff.filter((p) => !staffGroups.some((g) => g.match.test(p.role)));

  return (
    <>
      <PageHero
        title="People"
        subtitle="Administration, faculty-in-charge and technical staff of the Central Research Facility."
        crumbs={[{ label: "People" }]}
      />

      <Group title="Administration" items={people.head} variant="feature" />
      <Group title="Faculty-in-Charge (FIC)" items={fics} tint />
      {grouped.map(
        (g, i) =>
          g.items.length > 0 && (
            <Group key={g.title} title={g.title} items={g.items} tint={i % 2 === 1} />
          )
      )}
      {other.length > 0 && <Group title="Other Staff" items={other} />}
    </>
  );
}