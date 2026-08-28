/**
 * "Led by clinicians" section. Ordered by seniority / experience.
 *
 * Portraits are pre-cropped to 4:5 WebP in /public/images/ (doc-*.webp) so they
 * drop straight into the card with no further cropping. `focus` still sets
 * object-position for any photo that isn't already 4:5.
 *
 * NOTE: Dr. Deekshita is not on the My Stree team page — her credentials and
 * blurb are still placeholders and need real detail.
 */
export type Doctor = {
  slug: string;
  name: string;
  initials: string;
  credentials: string;
  role: string;
  affiliation: string;
  blurb: string;
  languages?: string;
  photo?: string;
  focus?: string;
};

export const DOCTORS: Doctor[] = [
  {
    slug: "smitha-ap",
    name: "Dr. Smitha A. P.",
    initials: "SP",
    credentials: "MBBS · MS · DNB (OBG) · FFM · FRM · MBA",
    role: "Founder & High-Risk Obstetrician",
    affiliation: "23 years' experience · 15 as specialist",
    blurb:
      "High-risk obstetrics and in-utero fetal programming, with a focus on endocrine disorders, recurrent pregnancy loss and bad obstetric history. Care that goes beyond the illness — evidence-based medicine matched with personalised attention. Alumna of Dr. B. R. Ambedkar Medical College; member of BSOG and ISUOG.",
    languages: "English · Kannada · Tamil",
    photo: "/images/doc-smitha.webp",
  },
  {
    slug: "surbhi-sinha",
    name: "Dr. Surbhi Sinha",
    initials: "SS",
    credentials: "MBBS · MS · MD · MRCOG (UK) · FRM",
    role: "Co-Founder & Fertility Specialist",
    affiliation: "MRCOG, United Kingdom",
    blurb:
      "Expert in advanced surgical techniques and fertility solutions, known for precision and empathy. Prioritises faster recovery and minimal discomfort — cutting-edge technique with compassionate care.",
    languages: "English · Hindi",
    photo: "/images/doc-surbhi.webp",
  },
  {
    slug: "priyanka-savina",
    name: "Priyanka Savina",
    initials: "PS",
    credentials: "M.Sc Nutrition & Dietetics · M.Sc Psychological Counselling · Certified Wellness Coach",
    role: "Nutritionist & Wellness Consultant",
    affiliation: "Postpartum nutrition · PCOS management",
    blurb:
      "The architect of the seamless My Stree experience. Specialises in postpartum nutrition and PCOS management — from diet planning to lifestyle change, every step built around your body.",
    languages: "English · Hindi · Kannada",
    photo: "/images/doc-priyanka.webp",
  },
  {
    slug: "deekshita",
    name: "Dr. Deekshita",
    initials: "D",
    credentials: "MBBS · MS (OBG)",
    role: "Consultant Obstetrician & Gynaecologist",
    affiliation: "Women's health & preventive care",
    blurb:
      "Consultant obstetrician and gynaecologist on the Meta Me team, focused on preventive women's health and early metabolic risk. (Placeholder bio — replace with Practo details.)",
    photo: "/images/doc-deekshita.webp",
  },
];
