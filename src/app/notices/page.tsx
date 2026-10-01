import type { Metadata } from "next";
import NoticeBoard from "@/components/NoticeBoard";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = { title: "Notices" };

export default function Notices() {
  return (
    <>
      <PageHero title="Notices" subtitle="Training programmes, guidelines and announcements." crumbs={[{ label: "Notices" }]} />
      <Section>
        <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-sm">
          <NoticeBoard />
        </div>
      </Section>
    </>
  );
}
