import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { contact } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  const rows = [
    ["Head, CRF", contact.headEmail],
    ["Office of CRF", contact.officeEmail],
    ["Slot booking enquiry", contact.slotEmail],
    ["I-STEM coordinator (CRF)", contact.istemEmail],
  ];
  return (
    <>
      <PageHero title="Contact Us" crumbs={[{ label: "Contact" }]} />
      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-brand-600">Address</h2>
            <address className="mt-3 text-sm not-italic leading-7">
              Head, {contact.org}
              <br />
              {contact.inst}
              <br />
              {contact.address}
            </address>
            <p className="mt-4 text-sm">
              Telephone: <a className="text-brand-600 hover:underline" href="tel:+917707018471">{contact.phone}</a>
            </p>
            <a className="mt-3 inline-block text-sm font-semibold text-brand-600 hover:underline" href={contact.directory} target="_blank" rel="noopener noreferrer">
              Telephone Directory ↗
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-brand-600">E-mail</h2>
            <dl className="mt-3 divide-y divide-line text-sm">
              {rows.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between">
                  <dt className="text-muted">{k}</dt>
                  <dd><a className="break-all text-brand-600 hover:underline" href={`mailto:${v}`}>{v}</a></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
