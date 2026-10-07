import instrumentsJson from "@/data/instruments.json";
import peopleJson from "@/data/people.json";
import resourcesJson from "@/data/resources.json";

export type Instrument = {
  slug: string;
  title: string;
  code: string | null;
  faculty?: { name: string; role: string; image: string | null } | null;
  subtitle?: string;
  details: [string, string][];
  paragraphs: string[];
  bullets: string[];
  analysisModes?: string[]; 
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

export const instruments = instrumentsJson as unknown as Instrument[];

export const people = peopleJson as {
  head: Person[];
  fics: Person[];
  staff: Person[];
};

export const resources = resourcesJson as {
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

/**
 * Maps each instrument slug → its requisition form PDF.
 * Keys MUST match the `slug` field in instruments.json exactly.
 */
export const formByInstrumentSlug: Record<string, string> = {
  "liquid-chromatography-mass-spectrometry-crf-lcms":
    "/files/forms/requisition-form-lcms-and-charges-25-07-2025-1.pdf",

  "high-resolution-transmission-electron-microscope":
    "/files/forms/requisition-form-hrtem.pdf",

  "field-emission-scanning-electron-microscope":
    "/files/forms/requisition-form-fesem.pdf",

  "single-crystal-x-ray-diffractometer":
    "/files/forms/requisition-form-sc-xrd.pdf",

  "scanning-probe-microscope":
    "/files/forms/requisition-form-spm.pdf",

  "gas-sorption-analyzer":
    "/files/forms/requisition-form-gsa.pdf",

  "uv-vis-nir-spectrophotometer":
    "/files/forms/requisition-form-uv-vis-nir.pdf",

  "high-resolution-mass-spectrometer":
    "/files/forms/requisition-form-hrms.pdf",

  "high-resolution-x-ray-diffractometer":
    "/files/forms/requisition-form-hrxrd.pdf",

  "wavelength-dispersive-x-ray-fluorescence":
    "/files/forms/requisition-form-xrf.pdf",

  "x-ray-photoemission-spectroscopy":
    "/files/forms/requisition-form-xps.pdf",

  "advanced-polymer-chromatography":
    "/files/forms/requisition-form-apc.pdf",

  "inductively-coupled-plasma-optical-emission-spectroscopy":
    "/files/forms/requisition-form-icp-oes.pdf",

  "digital-micro-vickers-hardness-testing-machine":
    "/files/forms/requisition-form-dmvhtm.pdf",

  "universal-tribometer":
    "/files/forms/requisition-form-ut.pdf",

  "elemental-analyzer-chnso":
    "/files/forms/requisition-form-chnso.pdf",

  "universal-testing-machine":
    "/files/forms/requisition-form-utm.pdf",

  "differential-scanning-calorimeter":
    "/files/forms/dsc-requisition-form.pdf",

  "solid-particle-zetameter":
    "/files/forms/requisition-form-zetameter.pdf",

  "cell-culture-lab":
    "/files/forms/requisition-form-cellculture.pdf",

  "field-emission-scanning-electron-microscope-with-e-beam-lith":
    "/files/forms/requisition-form-ebl.pdf",

  "metal-3d-printer-powder-bed-fusion-based":
    "/files/forms/requisitionformmetal3dprinting.pdf",

  "creep-fatigue-interaction-test-setup":
    "/files/forms/requisition-form-for-creep-fatigue-interaction.pdf",

  "abrasive-waterjet-machine":
    "/files/forms/requisition-form-for-waterjet.pdf",

  "thermogravimetric-analyser-with-mass-spectrometer-tga-ms":
    "/files/forms/tga-requisition-form.pdf",
};

/** Returns the form href for an instrument slug, or null if none exists. */
export const getFormForInstrument = (slug: string): string | null =>
  formByInstrumentSlug[slug] ?? null;

export const getInstrument = (slug: string) =>
  instruments.find((i) => i.slug === slug);

export const telHref = (p: string) => "tel:" + p.replace(/[^\d+]/g, "");
