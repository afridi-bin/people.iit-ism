import type { Metadata } from "next";
import InstrumentList from "@/components/InstrumentList";
import { PageHero, Section } from "@/components/ui";
import { instruments } from "@/lib/data";

export const metadata: Metadata = { title: "Instruments" };

export default function Instruments() {
  return (
    <>
      <PageHero title="Instruments" subtitle="Advanced analytical and characterisation instruments available at CRF." crumbs={[{ label: "Instruments" }]} />
      <Section>
        <InstrumentList items={instruments} />
      </Section>
    </>
  );
}
