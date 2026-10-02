import instrumentsJson from "@/data/instruments.json";
import peopleJson from "@/data/people.json";
import resourcesJson from "@/data/resources.json";

export type Instrument = {
  slug: string;
  title: string;
  code: string | null;
  subtitle?: string;
  details: [string, string][];
  paragraphs: string[];
  bullets: string[];
  images: string[];
  status: string | null;
  links: { title: string; href: string }[];
  emails?: string[];
  tables?: string[][];
};

export type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
  photo: string | null;
};

export const instruments = instrumentsJson as Instrument[];
export const people = peopleJson as { head: Person[]; fics: Person[]; staff: Person[] };
export const resources = resourcesJson as {
  notices: { title: string; href: string | null }[];
  forms: { title: string; href: string | null }[];
  guidelines: string | null;
  flyer: string | null;
};

export const ISTEM_URL = "https://www.istem.gov.in/login";
export const PAYMENT_URL = "https://eps.eshiksa.net/DirectFeesv3/IIT_Dhanbad/index";

export const contact = {
  org: "Central Research Facility, Institute Research Hub (iRh)",
  inst: "Indian Institute of Technology (ISM) Dhanbad",
  address: "Dhanbad-826004, Jharkhand",
  headEmail: "hod_crf@iitism.ac.in",
  phone: "+91-7707018471",
  officeEmail: "office_crf@iitism.ac.in",
  slotEmail: "slotbooking_crf@iitism.ac.in",
  istemEmail: "istem_crf@iitism.ac.in",
  directory: "https://people.iitism.ac.in/~download/td/TD.pdf",
};

export const getInstrument = (slug: string) => instruments.find((i) => i.slug === slug);

export const telHref = (p: string) => "tel:" + p.replace(/[^\d+]/g, "");
