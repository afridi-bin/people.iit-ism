"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, instruments, ISTEM_URL, resources } from "@/lib/data";

type Item = { href: string; label: string; external?: boolean; hint?: string };

const resourceMenu: Item[] = [
  { href: "/forms", label: "Requisition Forms", hint: `${resources.forms.length} instrument forms` },
  { href: "/booking", label: "Booking Guide", hint: "How to reserve a slot" },
  { href: resources.guidelines ?? "/booking", label: "I-STEM Guidelines", hint: "PDF", external: true },
];

const moreMenu: Item[] = [
  { href: "https://www.iitism.ac.in/", label: "IIT(ISM) Website", external: true },
  { href: "https://people.iitism.ac.in/~research/index.php", label: "R&D Home", external: true },
  { href: "https://mis.iitism.ac.in/", label: "MIS (Intranet)", external: true },
  { href: "https://people.iitism.ac.in/~faculty/", label: "Faculty", external: true },
  { href: "https://ir.iitism.ac.in/", label: "International Relations", external: true },
  { href: "https://library.iitism.ac.in/", label: "Library", external: true },
];

const utilityLinks = moreMenu.filter((m) => ["IIT(ISM) Website", "MIS (Intranet)", "Library"].includes(m.label));

const Chevron = ({ open }: { open?: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

function ItemLink({ item, className, onClick }: { item: Item; className?: string; onClick?: () => void }) {
  const body = (
    <>
      <span className="block text-sm font-semibold text-ink">{item.label}{item.external && <span className="ml-1 text-muted" aria-hidden>↗</span>}</span>
      {item.hint && <span className="block text-xs text-muted">{item.hint}</span>}
    </>
  );
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>{body}</a>
  ) : (
    <Link href={item.href} onClick={onClick} className={className}>{body}</Link>
  );
}

function Dropdown({ id, label, active, openId, setOpenId, children, width = "w-72" }: {
  id: string;
  label: string;
  active?: boolean;
  openId: string | null;
  setOpenId: (v: string | null) => void;
  children: React.ReactNode;
  width?: string;
}) {
  const open = openId === id;
  return (
    <div className="relative" onMouseEnter={() => setOpenId(id)} onMouseLeave={() => setOpenId(null)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpenId(open ? null : id)}
        className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
          active || open ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-brand-50 hover:text-brand-700"
        }`}
      >
        {label}
        <Chevron open={open} />
      </button>
      {open && (
        <div className={`absolute left-0 top-full z-50 pt-2 ${width}`}>
          <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-2xl ring-1 ring-black/5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [acc, setAcc] = useState<string | null>(null);
  const lastPath = useRef(pathname);

  // Close menus on route change
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setMobileOpen(false);
      setOpenId(null);
    }
  }, [pathname]);

  // Lock scroll while the drawer is open; close on Escape
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const is = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const resourcesActive = ["/forms", "/booking"].some(is);
  const closeAll = () => {
    setMobileOpen(false);
    setOpenId(null);
  };

  const plainLink = (href: string, label: string) => (
    <Link
      href={href}
      aria-current={is(href) ? "page" : undefined}
      className={`relative whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
        is(href) ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-brand-50 hover:text-brand-700"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 shadow-sm lg:-top-[7.25rem]">
      {/* Utility strip — desktop only */}
      <div className="hidden bg-brand-900 text-xs text-brand-100 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.headEmail}`} className="flex items-center gap-1.5 hover:text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              {contact.headEmail}
            </a>
            <a href="tel:+917707018471" className="flex items-center gap-1.5 hover:text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></svg>
              {contact.phone}
            </a>
          </div>
          <div className="flex items-center gap-6">
            {utilityLinks.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Brand bar */}
      <div className="bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white">
        <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" onClick={closeAll} className="flex min-w-0 items-center gap-4" aria-label="Central Research Facility, IIT (ISM) Dhanbad — home">
            <Image src="/images/logo.png" alt="IIT (ISM) Dhanbad" width={2614} height={608} priority sizes="(min-width:1024px) 240px, 170px" className="h-9 w-auto shrink-0 sm:h-11 lg:h-12" />
            <span className="hidden border-l border-white/30 pl-4 leading-tight xl:block">
              <span className="block font-display text-lg font-bold">Central Research Facility</span>
              <span className="block text-xs text-brand-100">Institute Research Hub (iRh)</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={ISTEM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-700 shadow-md transition hover:bg-brand-50 lg:inline-flex"
            >
              Book a Slot
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/30 transition hover:bg-white/25 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav row */}
      <nav className="hidden border-b border-line bg-white lg:block" aria-label="Main">
        <div className="container-x flex h-[3.25rem] items-center gap-1">
          {plainLink("/", "Home")}
          {plainLink("/about", "About")}

          <Dropdown id="instruments" label="Instruments" active={is("/instruments")} openId={openId} setOpenId={setOpenId} width="w-[min(46rem,calc(100vw-3rem))]">
            <div className="flex items-center justify-between px-3 pb-2 pt-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{instruments.length} instruments</p>
              <Link href="/instruments" onClick={closeAll} className="text-xs font-semibold text-brand-600 hover:underline">
                View all →
              </Link>
            </div>
            <ul className="grid max-h-[26rem] grid-cols-2 gap-x-1 overflow-y-auto pr-1">
              {instruments.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/instruments/${i.slug}`}
                    onClick={closeAll}
                    className="block rounded-lg px-3 py-2 text-[13px] leading-snug text-ink hover:bg-brand-50 hover:text-brand-700"
                  >
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Dropdown>

          {plainLink("/people", "People")}

          <Dropdown id="resources" label="Resources" active={resourcesActive} openId={openId} setOpenId={setOpenId}>
            {resourceMenu.map((m) => (
              <ItemLink key={m.label} item={m} onClick={closeAll} className="block rounded-xl px-3 py-2.5 hover:bg-brand-50" />
            ))}
          </Dropdown>

          {plainLink("/contact", "Contact")}

          <div className="ml-auto">
            <Dropdown id="more" label="More" openId={openId} setOpenId={setOpenId} width="w-64 right-0 left-auto">
              {moreMenu.map((m) => (
                <a key={m.href} href={m.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink hover:bg-brand-50 hover:text-brand-700">
                  {m.label}
                  <span className="text-muted" aria-hidden>↗</span>
                </a>
              ))}
            </Dropdown>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id="mobile-menu" className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-white lg:hidden">
          <nav className="container-x flex-1 py-3" aria-label="Mobile">
            <ul className="divide-y divide-line">
              {[
                ["/", "Home"],
                ["/about", "About"],
                ["/instruments", "Instruments"],
                ["/people", "People"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeAll}
                    aria-current={is(href) ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 text-base font-semibold ${is(href) ? "text-brand-600" : "text-ink"}`}
                  >
                    {label}
                    <span className="text-muted" aria-hidden>›</span>
                  </Link>
                </li>
              ))}

              <li>
                <button type="button" aria-expanded={acc === "res"} onClick={() => setAcc(acc === "res" ? null : "res")} className={`flex w-full items-center justify-between py-3.5 text-base font-semibold ${resourcesActive ? "text-brand-600" : "text-ink"}`}>
                  Resources <Chevron open={acc === "res"} />
                </button>
                {acc === "res" && (
                  <ul className="mb-3 space-y-1 rounded-xl bg-brand-50 p-2">
                    {resourceMenu.map((m) => (
                      <li key={m.label}>
                        <ItemLink item={m} onClick={closeAll} className="block rounded-lg px-3 py-2.5 active:bg-brand-100" />
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link href="/contact" onClick={closeAll} className={`flex items-center justify-between py-3.5 text-base font-semibold ${is("/contact") ? "text-brand-600" : "text-ink"}`}>
                  Contact <span className="text-muted" aria-hidden>›</span>
                </Link>
              </li>

              <li>
                <button type="button" aria-expanded={acc === "more"} onClick={() => setAcc(acc === "more" ? null : "more")} className="flex w-full items-center justify-between py-3.5 text-base font-semibold text-ink">
                  More <Chevron open={acc === "more"} />
                </button>
                {acc === "more" && (
                  <ul className="mb-3 space-y-1 rounded-xl bg-brand-50 p-2">
                    {moreMenu.map((m) => (
                      <li key={m.href}>
                        <a href={m.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-ink active:bg-brand-100">
                          {m.label} <span className="text-muted" aria-hidden>↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          <div className="sticky bottom-0 border-t border-line bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="block rounded-xl bg-brand-600 px-4 py-3.5 text-center text-base font-bold text-white shadow-md active:bg-brand-700">
              Book a Slot on I-STEM ↗
            </a>
            <p className="mt-3 text-center text-xs text-muted">
              <a href={`mailto:${contact.headEmail}`} className="hover:text-brand-600">{contact.headEmail}</a> · <a href="tel:+917707018471" className="hover:text-brand-600">{contact.phone}</a>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
