/* All copy + data. Written plain: name the pain, no buzzwords, one thought per screen. */

export const HERO = {
  brandline: "Meta Me — a My Stree program",
  kicker: "Preventive health",
  headline: "Your body has been talking",
  headlineAccent: "for years.",
  headlineRest: "Nobody was reading it.",
  body: "Tiredness, weight that won't move, a mood that dipped and stayed. These usually start years before a test comes back abnormal. Meta Me finds them while they can still be turned around — and gives you a plan you can actually follow.",
  cta: "Book a screening",
  ctaHref: "#start",
  link: "See what we check",
  linkHref: "#systems",
  stat: {
    to: 10,
    suffix: " years",
    caption: "is how long metabolic problems can build before a diagnosis",
  },
};

export const SYSTEMS_INTRO = {
  kicker: "What we check",
  headline: "One visit. Eleven systems.",
  headlineAccent: "Read together.",
  body: "Most check-ups look at one number at a time, so a tired result gets a shrug. Meta Me measures eleven systems in the same visit and looks at how they pull on each other — which is usually where the real answer is.",
};

export type SystemItem = {
  n: string;
  name: string;
  line: string;
  icon: string;
  /** stroke colour token for the icon */
  stroke: "flame" | "sienna" | "pumpkin" | "cadet" | "ink";
  markers: string;
  status: string;
};

/** icon = key into components/SystemIcons.tsx */
export const SYSTEMS: SystemItem[] = [
  {
    n: "01",
    name: "Metabolic & blood sugar",
    line: "Sugar handling, long before a fasting test turns.",
    icon: "metabolic",
    stroke: "flame",
    markers: "HbA1c · Fasting insulin · HOMA-IR",
    status: "Nominal",
  },
  {
    n: "02",
    name: "Heart & circulation",
    line: "The lipid signals plain cholesterol misses.",
    icon: "heart",
    stroke: "cadet",
    markers: "ApoB · Lp(a) · hs-CRP · Endothelial tone",
    status: "Optimal",
  },
  {
    n: "03",
    name: "Hormones",
    line: "Thyroid, reproductive and stress hormones, and their drift.",
    icon: "hormone",
    stroke: "pumpkin",
    markers: "Free T3 / T4 · Cortisol rhythm · DHEA",
    status: "Monitored",
  },
  {
    n: "04",
    name: "Liver & kidneys",
    line: "Two organs that carry a lot and fail quietly.",
    icon: "organ",
    stroke: "cadet",
    markers: "eGFR · Cystatin-C · ALT / AST · GGT",
    status: "Nominal",
  },
  {
    n: "05",
    name: "Bone strength",
    line: "Density you lose without feeling it.",
    icon: "bone",
    stroke: "ink",
    markers: "DEXA Z-score · Osteocalcin · Serum Ca²⁺",
    status: "Stable",
  },
  {
    n: "06",
    name: "Body composition",
    line: "Fat around your organs, and the muscle you're losing.",
    icon: "body",
    stroke: "flame",
    markers: "Visceral adiposity · Skeletal muscle index",
    status: "Balanced",
  },
  {
    n: "07",
    name: "Nutrient levels",
    line: "Iron, B12, D, magnesium — floors that feel like fatigue.",
    icon: "nutrient",
    stroke: "sienna",
    markers: "Ferritin · Active B12 · RBC magnesium · 25-OH D3",
    status: "Checked",
  },
  {
    n: "08",
    name: "Inflammation & immunity",
    line: "The background burn that speeds up chronic disease.",
    icon: "immunity",
    stroke: "cadet",
    markers: "hs-CRP · IL-6 · Neutrophil / lymphocyte ratio",
    status: "Low risk",
  },
  {
    n: "09",
    name: "Gut integrity",
    line: "Digestion and absorption, which shape everything else.",
    icon: "gut",
    stroke: "pumpkin",
    markers: "Zonulin · Short-chain fatty acids · Calprotectin",
    status: "Nominal",
  },
  {
    n: "10",
    name: "Sleep, stress & mood",
    line: "The load that rewrites your other numbers.",
    icon: "sleep",
    stroke: "cadet",
    markers: "Overnight HRV · Sleep architecture · Cortisol index",
    status: "Tracked",
  },
  {
    n: "11",
    name: "Physical fitness",
    line: "Cardiorespiratory stamina and functional power output.",
    icon: "fitness",
    stroke: "flame",
    markers: "VO₂ max estimate · Grip strength · Lactate clearance",
    status: "Active",
  },
];

export const JOURNEY_INTRO = {
  kicker: "How it works",
  headline: "A loop, not an appointment.",
  cta: "See a sample report",
  ctaHref: "#start",
};

export const JOURNEY_STEPS = [
  { label: "Screen", line: "History, lifestyle and targeted labs — read by a clinician, in one sitting." },
  { label: "Understand", line: "Your results in plain words you can repeat to your family. No Googling reference ranges." },
  { label: "Act", line: "Food, movement, sleep, stress, supplements or medication — only what your numbers ask for." },
  { label: "Track", line: "Re-checks on a schedule, with follow-up between visits." },
  { label: "Prevent", line: "Two years in, we compare you to you — not to a population average." },
];

export const BEYOND = {
  kicker: "Who it's for",
  headline: "Built for women first.",
  headlineAccent: "Now for the people they worry about.",
  body: "Same screening, same clinicians, same plan — for the husband whose father had a heart attack at 52, for your parents, for the 24-year-old on your team who thinks none of this applies yet.",
  audiences: ["Women", "Men", "Couples", "Parents", "Workplaces", "Campuses"],
  kiosk: {
    lead: "Good screening shouldn't need a metro address.",
    body: "Meta Me runs on the My Stree kiosk model — assisted screening and teleconsultation in Tier 2 and Tier 3 cities, campuses and workplaces, with a referral upward when specialist care is needed.",
    cta: "Check your city",
    ctaHref: "#start",
  },
};

export const START = {
  kicker: "Start",
  headline: "Know your health before disease names it.",
  lines: [
    "One visit, forty-five minutes.",
    "Eleven systems, read together by a clinician.",
    "You leave with a plan, not a login.",
  ],
  cta: "Book a screening",
  ctaHref: "#start",
  sub: "Corporate & campus programs — talk to our team",
  tiers: [
    {
      name: "One-time screen",
      detail: "The full eleven-system reading, a clinician review and a written plan. No commitment.",
      featured: false,
    },
    {
      name: "Annual membership",
      detail: "Two full screenings a year, scheduled re-checks, follow-up between visits, and a record that compares you to you.",
      featured: true,
    },
    {
      name: "Corporate & campus",
      detail: "Cohort screening at your workplace or institution, aggregate reporting, on-site or via kiosk.",
      featured: false,
    },
  ],
};

export const FOOTER_LINE = "Meta Me — from reactive healthcare to proactive living";

export const FOOTER = {
  /* the statement, split so the last two words can take the Playfair italic */
  headline: "From reactive healthcare to",
  headlineAccent: "proactive living.",
  body: "Meta Me is the preventive-health program of My Stree. Eleven biological systems, read together by a clinician, in one visit.",
  navLabel: "Find your way",
  nav: [
    { label: "The eleven systems", href: "#systems" },
    { label: "How the loop works", href: "#journey" },
    { label: "The protocol", href: "#protocol" },
    { label: "Our clinicians", href: "#doctors" },
    { label: "Questions", href: "#faqs" },
  ],
  navCta: { label: "Book a screening", href: "#start" },
  backToTop: "Back to top",
  legal: [
    { label: "Privacy", href: "https://www.mystree.org/privacy" },
    { label: "Terms", href: "https://www.mystree.org/terms" },
  ],
  copyright: "My Stree Healthcare",
};
