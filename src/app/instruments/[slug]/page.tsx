import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileLink, PageHero, Section, StatusBadge } from "@/components/ui";
import { ISTEM_URL, getInstrument, instruments, PAYMENT_URL } from "@/lib/data";

export function generateStaticParams() {
  return instruments.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: PageProps<"/instruments/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const i = getInstrument(slug);
  return { title: i?.title ?? "Instrument" };
}

export default async function InstrumentPage(props: PageProps<"/instruments/[slug]">) {
  const { slug } = await props.params;
  const i = getInstrument(slug);
  if (!i) notFound();

  const idx = instruments.findIndex((x) => x.slug === slug);
  const prev = instruments[idx - 1];
  const next = instruments[idx + 1];
  const faculty = i.faculty;
  const empty =!i.details.length && !i.paragraphs.length && !i.bullets.length;

  return (
    <>
      <PageHero
        title={i.title}
        subtitle={i.subtitle}
        crumbs={[{ label: "Instruments", href: "/instruments" }, { label: i.title }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-8">
            {empty && (
              <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-8 text-center">
                <h2 className="text-lg font-semibold text-brand-700">Details coming soon</h2>
                <p className="mt-2 text-sm text-muted">
                  Specifications for this instrument will be published soon. Please contact CRF for more information.
                </p>
                <Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:underline">Contact CRF →</Link>
              </div>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={i.images?.[0]} alt={i.title} style={{ width: "100%", height: "auto" }} />

            {i.paragraphs.length > 0 && (
              <div className="space-y-4">
                {i.paragraphs.map((p) => (
                  <p key={p} className="text-base leading-8 text-ink/90">{p}</p>
                ))}
              </div>
            )}

            {i.details.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold">Specifications</h2>
                <div className="overflow-hidden rounded-2xl border border-line">
                  <table className="w-full text-sm">
                    <tbody>
                      {i.details.map(([k, v]) => (
                        <tr key={k + v} className="border-b border-line last:border-0 even:bg-surface">
                          <th scope="row" className="w-2/5 px-4 py-3 text-left align-top font-semibold text-brand-700">{k}</th>
                          <td className="px-4 py-3 align-top break-words">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {i.bullets.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold">Key features</h2>
                <ul className="space-y-2.5">
                  {i.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {i.links.length > 0 && (
              <div>
                <h2 className="mb-3 text-xl font-bold">Resources</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {i.links.map((l) => (
                    <FileLink key={l.href} href={l.href}>{l.title}</FileLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Instrument status</h3>
                <StatusBadge status={i.status ?? "Not listed"} />
              </div>
              {i.code && <p className="mt-3 text-xs text-muted">I-STEM Equipment Code: <span className="font-semibold text-ink">{i.code}</span></p>}
              {i.emails && i.emails.length > 0 && (
                <div className="mt-4 border-t border-line pt-4 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted">Contact</p>
                  {i.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`} className="mt-1 block break-all text-brand-600 hover:underline">{e}</a>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-brand-50 p-5">
              <h3 className="font-semibold text-brand-700">Want to use this instrument?</h3>
              <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700">
                Book on I-STEM ↗
              </a>
                <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700">
                Payment Gateway ↗
              </a>
              <Link href="/forms" className="mt-2 block rounded-xl border border-brand-200 bg-white px-4 py-3 text-center text-sm font-semibold text-brand-700 hover:border-brand-400">
                Requisition forms
              </Link>
            </div>
            {faculty && (
              <div className="relative mt-28 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-5 pt-24 text-center text-white shadow-sm">
                <div className="absolute -top-0 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-brand-50 shadow-md">
                  {faculty.image && (
                    <Image src={faculty.image} alt={faculty.name} fill sizes="160px" className="object-cover object-top" />
                  )}
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">Faculty in-charge</p>
                <p className="mt-1 text-lg font-bold">{faculty.name}</p>
                <p className="mx-auto mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">{faculty.role}</p>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm">
          {prev ? <Link href={`/instruments/${prev.slug}`} className="font-medium text-brand-600 hover:underline">← {prev.title}</Link> : <span />}
          {next ? <Link href={`/instruments/${next.slug}`} className="font-medium text-brand-600 hover:underline">{next.title} →</Link> : <span />}
        </div>
      </Section>
    </>
  );
}
