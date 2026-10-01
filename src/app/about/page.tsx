import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "About" };

const objectives = [
  "To establish state-of-the-art research facilities and instruments to support advanced research under one umbrella.",
  "To support and promote inter- and multidisciplinary research in contemporary and frontier areas.",
  "To enable Faculty members and research scholars of IIT(ISM), Dhanbad to access facilities of the most advanced class of instruments with minimum expenses.",
  "To provide high-end analytical instrumental facilities to researchers, scientists and other users from academic institutes/R&D laboratories and industries to empower them to carry out different analyses for R&D work.",
];

export default function About() {
  return (
    <>
      <PageHero title="About the Central Research Facility" subtitle="A Centre of National Importance for Research and Creation." crumbs={[{ label: "About" }]} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-8 text-muted">
            Central Research Facility of IIT(ISM), Dhanbad has been established as a Centre of National Importance for
            Research and Creation. The constellation of high-quality equipment enabled with cutting edge technologies at a
            single location provides a scientific arena for the researchers. Sophisticated analytical instruments are vital
            for pursuing high-end research in areas of modern science and technology. Various advanced analytical
            instruments of CRF are operated and maintained by a dedicated and qualified group of Faculty members, Technical
            Officers and Skilled Operators. It is an integral part of IIT(ISM), Dhanbad.
          </p>
          <h2 className="mt-12 text-2xl font-bold text-brand-600">Primary objectives</h2>
          <ol className="mt-5 space-y-4">
            {objectives.map((o, i) => (
              <li key={o} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{i + 1}</span>
                <span className="text-sm leading-relaxed">{o}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/instruments" className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Browse instruments</Link>
            <Link href="/people" className="rounded-xl border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 hover:bg-brand-50">Meet the team</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
