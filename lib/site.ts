/**
 * Single source of truth for anything URL / SEO / schema related.
 *
 * ▸ Deploying somewhere else? Change `ORIGIN` (and `PATH` if Meta Me lives on a
 *   sub-path rather than its own host). Everything else — canonical tags, the
 *   sitemap, robots.txt, Open Graph, JSON-LD — is derived from these two.
 */
export const ORIGIN = "https://metame.mystree.org";
export const PATH = "/";
export const CANONICAL = ORIGIN + (PATH === "/" ? "" : PATH);

export const PARENT_ORIGIN = "https://www.mystree.org";

import { CLINIC } from "./faq-data";

export const SITE = {
  name: "Meta Me",
  legalName: "Meta Me — a My Stree program",
  parent: "My Stree",
  tagline: "Preventive-health intelligence in Indiranagar, Bengaluru",
  description:
    "Meta Me is My Stree's preventive-health program in Indiranagar, Bengaluru. One 45-minute visit reads eleven biological systems for early metabolic, hormonal and cardiovascular risk, then a clinician hands you a written roadmap — not a PDF. Gender-neutral. Kiosk and teleconsult access across Karnataka.",
  keywords: [
    "preventive health check Indiranagar",
    "full body checkup Indiranagar Bengaluru",
    "early diabetes risk test Bengaluru",
    "insulin resistance test Indiranagar",
    "preventive health screening near Indiranagar Metro",
    "longevity clinic Bengaluru",
    "metabolic health assessment Karnataka",
    "corporate wellness screening Bengaluru",
    "My Stree Meta Me",
    "health checkup 100 Feet Road CMH Road",
  ],
  locale: "en_IN",
  twitter: "@mystree",
  sameAs: [
    "https://www.mystree.org",
    "https://www.instagram.com/mystree.health",
    "https://www.linkedin.com/company/mystree",
  ],
  ogImage: "/og.jpg",
  geo: { latitude: 12.9719, longitude: 77.6412 },
  telephone: "+91-80-4718-0000",
  priceRange: "₹₹",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
    { days: ["Saturday"], opens: "08:00", closes: "17:00" },
  ],
};

/* ---------- site-wide JSON-LD (Organization · WebSite · MedicalClinic) ---------- */
export function siteSchema() {
  const clinicId = `${CANONICAL}#clinic`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${CANONICAL}#org`,
        name: SITE.legalName,
        alternateName: "Meta Me",
        url: CANONICAL,
        parentOrganization: {
          "@type": "Organization",
          name: "My Stree",
          url: PARENT_ORIGIN,
        },
        logo: `${ORIGIN}/images/hero-profile.webp`,
        sameAs: SITE.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${CANONICAL}#website`,
        url: CANONICAL,
        name: SITE.name,
        inLanguage: "en-IN",
        publisher: { "@id": `${CANONICAL}#org` },
        about: {
          "@type": "Thing",
          name: "Preventive health and longevity screening",
        },
      },
      {
        "@type": ["MedicalClinic", "MedicalBusiness"],
        "@id": clinicId,
        name: CLINIC.name,
        url: CANONICAL,
        image: `${ORIGIN}${SITE.ogImage}`,
        description: SITE.description,
        medicalSpecialty: ["PreventiveMedicine", "Endocrine", "Cardiovascular"],
        priceRange: SITE.priceRange,
        telephone: SITE.telephone,
        parentOrganization: { "@id": `${CANONICAL}#org` },
        address: {
          "@type": "PostalAddress",
          streetAddress: CLINIC.street,
          addressLocality: CLINIC.city,
          addressRegion: CLINIC.region,
          postalCode: CLINIC.postalCode,
          addressCountry: CLINIC.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.latitude,
          longitude: SITE.geo.longitude,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`,
        areaServed: CLINIC.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
        openingHoursSpecification: SITE.openingHours.map((o) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: o.days,
          opens: o.opens,
          closes: o.closes,
        })),
        availableService: [
          {
            "@type": "MedicalTest",
            name: "Meta Me eleven-system preventive screening",
            usedToDiagnose: "Early metabolic, hormonal, cardiovascular and micronutrient risk",
          },
          {
            "@type": "MedicalProcedure",
            name: "Clinician-guided preventive roadmap",
          },
        ],
      },
    ],
  };
}
