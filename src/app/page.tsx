import Image from "next/image";
import Link from "next/link";
import InstrumentCard from "@/components/InstrumentCard";
import { FileLink, Section } from "@/components/ui";
import { ISTEM_URL, instruments, people, resources, telHref } from "@/lib/data";

const objectives = [
  "To establish state-of-the-art research facilities and instruments to support advanced research under one umbrella.",
  "To support and promote inter- and multidisciplinary research in contemporary and frontier areas.",
  "To enable Faculty members and research scholars of IIT(ISM), Dhanbad to access facilities of the most advanced class of instruments with minimum expenses.",
  "To provide high-end analytical instrumental facilities to researchers, scientists and other users from academic institutes/R&D laboratories and industries to empower them to carry out different analyses for R&D work.",
];

export default function Home() {
  const hod = people.head[0];
  const stats = [
    { n: `${instruments.length}`, l: "LABORATORIES" },
    { n: `${people.fics.length}`, l: "FACILITATORS" },
    { n: `${people.staff.length}`, l: "OFFICERS & STAFF" },
    // { n: `${resources.forms.length}`, l: "REQUISITION FORMS" },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-brand-700 text-white">
        <div className="dot-pattern absolute inset-0" aria-hidden />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="container-x relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              IIT (ISM) Dhanbad
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">Central Research Facility</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
              A Centre of National Importance for Research and Creation. Cutting-edge analytical instruments at a single
              location — operated by dedicated faculty, technical officers and skilled operators.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/instruments" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50">
                Explore Instruments
              </Link>
              <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                Book on I-STEM ↗
              </a>
            </div>
          </div>
          {resources.flyer && (
            <div className="relative mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-2xl border-4 border-white/20 bg-white shadow-2xl">
                <Image src={resources.flyer} alt="CRF training flyer" width={800} height={1000} className="h-auto w-full" priority />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="container-x -mt-8 relative z-10">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-lg lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.l} className="bg-white p-5 text-center sm:p-6">
              <dt className="order-2 mt-1 text-xs font-medium text-muted sm:text-sm">{s.l}</dt>
              <dd className="font-display text-3xl font-extrabold text-brand-600 sm:text-4xl">{s.n}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section kicker="About" title="Research under one umbrella">
        <div className="grid gap-10 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted">
            Central Research Facility of IIT(ISM), Dhanbad has been established as a Centre of National Importance for
            Research and Creation. The constellation of high-quality equipment enabled with cutting edge technologies at a
            single location provides a scientific arena for the researchers. Sophisticated analytical instruments are vital
            for pursuing high-end research in areas of modern science and technology. Various advanced analytical
            instruments of CRF are operated and maintained by a dedicated and qualified group of Faculty members, Technical
            Officers and Skilled Operators. It is an integral part of IIT(ISM), Dhanbad.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-brand-600">Our primary objectives</h3>
            <ul className="mt-4 space-y-3">
              {objectives.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-ink">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {hod && (
        <Section kicker="Leadership" title="Central Research Facility">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand-50 via-white to-brand-50 p-6 shadow-sm sm:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-600/10 blur-3xl" aria-hidden />
            <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-12">
              <div className="relative shrink-0">
                <div className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-brand-600" aria-hidden />
                <div className="relative aspect-[354/485] w-56 overflow-hidden rounded-3xl bg-brand-50 ring-4 ring-white sm:w-64">
                  {hod.photo && <Image src={hod.photo} alt={hod.name} fill sizes="256px" className="object-cover" />}
                </div>
              </div>
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">HEAD</span>
                <h3 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{hod.name}</h3>
                <p className="mt-2 text-lg text-brand-700">{hod.role}</p>
                <p className="mt-1 text-sm text-muted">Indian Institute of Technology (ISM), Dhanbad</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  <a href={telHref(hod.phone.split("/")[0])} className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Phone</span>
                    {hod.phone}
                  </a>
                  <a href={`mailto:${hod.email}`} className="rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Email</span>
                    {hod.email}
                  </a>
                </div>
                <Link href="/people" className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline">Meet the team →</Link>
              </div>
            </div>
          </div>
        </Section>
      )}

      <Section
        tint
        kicker="Facilities"
        title="Instruments"
        action={<Link href="/instruments" className="text-sm font-semibold text-brand-600 hover:underline">View all {instruments.length} →</Link>}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {instruments.slice(0, 6).map((i) => (
            <InstrumentCard key={i.slug} i={i} />
          ))}
        </div>
      </Section>

      <Section kicker="Updates" title="Booking">
        <div className="grid gap-8">
          <div className="rounded-2xl bg-brand-50 p-6">
            <h3 className="text-lg font-semibold text-brand-700">Booking</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              Internal and external users need to book their slot through the I-STEM portal.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700">
                Book through I-STEM ↗
              </a>
              {resources.guidelines && <FileLink href={resources.guidelines}>Guidelines to the I-STEM Users</FileLink>}
              <Link href="/forms" className="rounded-xl border border-brand-200 bg-white px-5 py-3 text-center text-sm font-semibold text-brand-700 hover:border-brand-400">
                Instrument Requisition Forms
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <Section tint kicker="Location" title="Find Us on Google Maps">
  <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
    <iframe
      title="IIT (ISM) Dhanbad Location"
      src="https://www.google.com/maps?q=IIT+ISM+Dhanbad&output=embed"
      width="100%"
      height="450"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className="block w-full border-0"
    />
  </div>
</Section>
    </>
  );
}
