/**
 * "Led by clinicians" section.
 *
 * Ordered by seniority / experience. Portraits live in /public/images/ — drop
 * the four files listed in `photo` below (4:5 headshots crop best). Until a
 * file exists the card falls back to an initial monogram.
 *
 * `focus` sets object-position for the crop (default "50% 30%" favours the
 * face); tweak per photo if a face sits high or low in frame.
 *
 * NOTE: Dr. Deekshita's credentials/blurb are placeholders — replace with her
 * real Practo details.
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
    photo: "/images/doc-smitha.jpg",
    focus: "50% 22%",
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
    photo: "/images/doc-surbhi.jpg",
    focus: "50% 25%",
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
    photo: "/images/doc-priyanka.jpg",
    focus: "50% 20%",
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
    photo: "/images/doc-deekshita.jpg",
    focus: "50% 28%",
  },
];
