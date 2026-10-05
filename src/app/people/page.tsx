import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, Section } from "@/components/ui";
import { people, telHref, type Person } from "@/lib/data";

export const metadata: Metadata = { title: "People" };

type Entry = Person & { roles?: string[] };

// one card per person: a faculty member in charge of several instruments gets all their roles listed
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

function Card({ p }: { p: Entry }) {
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

// function Group({ title, items, tint }: { title: string; items: Entry[]; tint?: boolean }) {
//   return (
//     <Section title={title} tint={tint}>
//       <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {items.map((p, i) => <Card key={p.name + p.role + i} p={p} />)}
//       </div>
//     </Section>
//   );
// }

function Group({ title, items, tint }: { title: string; items: Entry[]; tint?: boolean }) {
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
      <PageHero title="People" subtitle="Administration, faculty-in-charge and technical staff of the Central Research Facility." crumbs={[{ label: "People" }]} />
      <Group title="Administration" items={people.head} />
      <Group title="Faculty-in-Charge (FIC)" items={fics} tint />
      {grouped.map((g, i) => g.items.length > 0 && <Group key={g.title} title={g.title} items={g.items} tint={i % 2 === 1} />)}
      {other.length > 0 && <Group title="Other Staff" items={other} />}
    </>
  );
}
