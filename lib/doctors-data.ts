/**
 * "Led by clinicians" section — placeholder content for the demo.
 * Portraits are rendered as initial monograms; drop real images into
 * /public/images/doctor_<slug>.jpg later and set `photo` here.
 * Credentials / affiliations / blurbs are illustrative — replace before launch.
 */
export type Doctor = {
  slug: string;
  name: string;
  initials: string;
  credentials: string;
  role: string;
  affiliation: string;
  blurb: string;
  photo?: string;
};

export const DOCTORS: Doctor[] = [
  {
    slug: "smitha-avula",
    name: "Dr. Smitha Avula",
    initials: "SA",
    credentials: "MBBS · DNB · FFM · MBA (HHSM)",
    role: "Founder & High-Risk Obstetrician",
    affiliation: "St. John's Medical College, Bengaluru",
    blurb:
      "Founder of My Stree. Two decades in high-risk obstetrics and women's health; built Meta Me to move care upstream of diagnosis.",
  },
  {
    slug: "surbhi-sinha",
    name: "Dr. Surbhi Sinha",
    initials: "SS",
    credentials: "MBBS · MD, Internal Medicine",
    role: "Preventive & Metabolic Physician",
    affiliation: "Bangalore Medical College & Research Institute",
    blurb:
      "Leads the Meta Me clinical protocol — early metabolic and cardiometabolic risk, translated into a roadmap patients can actually follow.",
  },
  {
    slug: "priyanka-savina",
    name: "Priyanka Savina",
    initials: "PS",
    credentials: "MSc, Clinical Nutrition · CDE",
    role: "Lifestyle & Nutrition Lead",
    affiliation: "Manipal Academy of Higher Education",
    blurb:
      "Designs the nutrition, sleep and habit-change side of every roadmap. Ten years across clinical and performance nutrition.",
  },
];
