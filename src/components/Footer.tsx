import Link from "next/link";
import { contact, ISTEM_URL } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 bg-brand-900 text-brand-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h3 className="font-display text-xl font-bold text-white">Central Research Facility</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-200">
            A Centre of National Importance for Research and Creation — advanced analytical instruments under one roof for
            researchers, academia and industry.
          </p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-brand-100">
            {contact.org}
            <br />
            {contact.inst}
            <br />
            {contact.address}
          </address>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["/instruments", "Instruments"],
              ["/people", "People"],
              ["/forms", "Requisition Forms"],
              ["/booking", "Booking"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-brand-200 hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href={ISTEM_URL} target="_blank" rel="noopener noreferrer" className="text-brand-200 hover:text-white">
                I-STEM Portal ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-brand-200">
            <li>
              Head: <a className="hover:text-white" href={`mailto:${contact.headEmail}`}>{contact.headEmail}</a>
            </li>
            <li>
              Office: <a className="hover:text-white" href={`mailto:${contact.officeEmail}`}>{contact.officeEmail}</a>
            </li>
            <li>
              Slot booking: <a className="hover:text-white" href={`mailto:${contact.slotEmail}`}>{contact.slotEmail}</a>
            </li>
            <li>
              I-STEM: <a className="hover:text-white" href={`mailto:${contact.istemEmail}`}>{contact.istemEmail}</a>
            </li>
            <li>
              Tel: <a className="hover:text-white" href="tel:+917707018471">{contact.phone}</a>
            </li>
            <li>
              <a className="hover:text-white" href={contact.directory} target="_blank" rel="noopener noreferrer">
                Telephone Directory ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs leading-relaxed text-brand-300">
          <p>© {new Date().getFullYear()} IIT (ISM) Dhanbad. All rights reserved.</p>
          <p className="mt-1">
            Conceptualized by Prof. Sagar Pal, Prof. Ravi Kumar Gangwar and Prof. Ejaz Ahmad.
          </p>
        </div>
      </div>
    </footer>
  );
}
