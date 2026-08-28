export type DeckCard = {
  id: string;
  tag: string;
  title: string;
  insight: string;
  markers: string;
  accent: string;
  /** media file in /public/images — omit for a procedural fallback */
  media?: string;
};

export const DECK_CARDS: DeckCard[] = [
  {
    id: "01",
    tag: "Metabolic",
    title: "Metabolic & glucose intelligence",
    insight: "Insulin resistance surfaces years before glucose does.",
    markers: "HbA1c · Fasting insulin · HOMA-IR",
    accent: "#ED5B2D",
    media: "/images/stack_01.webp",
  },
  {
    id: "02",
    tag: "Cardiovascular",
    title: "Cardiovascular & endothelial health",
    insight: "Particle-level risk that standard cholesterol panels miss.",
    markers: "ApoB · Lp(a) · hs-CRP",
    accent: "#8BA4BF",
    media: "/images/stack_02.webp",
  },
  {
    id: "03",
    tag: "Endocrine",
    title: "Hormonal equilibrium & adrenal rhythm",
    insight: "Thyroid, reproductive and cortisol rhythms, read together.",
    markers: "Free T3/T4 · Cortisol rhythm · DHEA-S",
    accent: "#FF833C",
    media: "/images/stack_03.webp",
  },
  {
    id: "04",
    tag: "Microbiome",
    title: "Gut barrier integrity & biome",
    insight: "Gut-barrier permeability shaping inflammation across the body.",
    markers: "Zonulin · SCFA · Calprotectin",
    accent: "#8BA4BF",
    media: "/images/stack_04.webp",
  },
  {
    id: "05",
    tag: "Composition",
    title: "Visceral adiposity & lean mass",
    insight: "Organ-wrapping fat measured against the muscle you keep.",
    markers: "DEXA ratio · Visceral area · SMI",
    accent: "#ED5B2D",
    media: "/images/stack_05.webp",
  },
  {
    id: "06",
    tag: "Access",
    title: "Decentralised campus screening hub",
    insight: "Kiosk screening and physician follow-up, near you.",
    markers: "Real-time telemetry · Teleconsult",
    accent: "#18181B",
    media: "/images/stack_06.webp",
  },
];

/** organic resting tilt per card (deg) */
export const DECK_ROTATIONS = [-4, 3, -2, 5, -3, 2];
