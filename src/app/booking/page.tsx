import type { Metadata } from "next";
import Link from "next/link";
import { FileLink, PageHero, Section } from "@/components/ui";
import { ISTEM_URL, contact, resources } from "@/lib/data";

export const metadata: Metadata = { title: "Booking" };

export default function Booking() {
  return (
    <>
      <PageHero title="Booking" subtitle="Reserve instrument time through the I-STEM portal." crumbs={[{ label: "Booking" }]} />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">How to book</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Internal and external users need to book their slot through the I-STEM portal.
            </p>
            <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              Go to I-STEM portal ↗
            </a>
          </div>
          {resources.guidelines && <FileLink href={resources.guidelines}>Guidelines to the I-STEM Users</FileLink>}
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/forms" className="rounded-xl border border-line bg-white p-4 text-sm font-semibold hover:border-brand-300 hover:text-brand-600">Requisition forms →</Link>
            <Link href="/instruments" className="rounded-xl border border-line bg-white p-4 text-sm font-semibold hover:border-brand-300 hover:text-brand-600">Browse instruments →</Link>
          </div>
          <p className="text-sm text-muted">
            Slot booking enquiries: <a className="text-brand-600 hover:underline" href={`mailto:${contact.slotEmail}`}>{contact.slotEmail}</a>
            <br />
            I-STEM coordinator (CRF): <a className="text-brand-600 hover:underline" href={`mailto:${contact.istemEmail}`}>{contact.istemEmail}</a>
          </p>
        </div>
      </Section>
    </>
  );
}
