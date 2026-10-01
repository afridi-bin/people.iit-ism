import type { Metadata } from "next";
import { FileLink, PageHero, Section } from "@/components/ui";
import { resources } from "@/lib/data";

export const metadata: Metadata = { title: "Instrument Requisition Forms" };

export default function Forms() {
  return (
    <>
      <PageHero title="Instrument Requisition Forms" subtitle="Download the form for the instrument you wish to use." crumbs={[{ label: "Forms" }]} />
      <Section>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.forms.map((f) => (
            <FileLink key={f.title} href={f.href}>{f.title}</FileLink>
          ))}
        </div>
      </Section>
    </>
  );
}
