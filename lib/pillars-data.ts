export type Pillar = {
  id: string;
  tag: string;
  title: string;
  insight: string;
  markers: string[];
  status: string;
  /** accent for icon + sparkline (from brief) */
  accent: string;
};

export const ELEVEN_PILLARS: Pillar[] = [
  {
    id: "01",
    tag: "METABOLIC",
    title: "Metabolic & Blood Sugar",
    insight: "Sugar handling and insulin resistance long before fasting glucose escalates.",
    markers: ["HbA1c", "Fasting Insulin", "HOMA-IR", "Glucose Drift"],
    status: "NOMINAL",
    accent: "#ED5B2D",
  },
  {
    id: "02",
    tag: "CARDIOVASCULAR",
    title: "Heart & Circulation",
    insight: "Atherogenic particle counts and endothelial signals standard lipid panels miss.",
    markers: ["ApoB", "Lp(a)", "hs-CRP", "Endothelial Tone"],
    status: "OPTIMAL",
    accent: "#8BA4BF",
  },
  {
    id: "03",
    tag: "ENDOCRINE",
    title: "Hormonal Equilibrium",
    insight: "Thyroid velocity, reproductive balance, and adrenal cortisol diurnal drift.",
    markers: ["Free T3/T4", "Cortisol Rhythm", "DHEA-S", "Estradiol/Prog"],
    status: "MONITORED",
    accent: "#FF833C",
  },
  {
    id: "04",
    tag: "RENAL & HEPATIC",
    title: "Liver & Kidney Health",
    insight: "Filtration velocity and hepatic fat stress in organs that fail quietly.",
    markers: ["Cystatin-C", "eGFR", "ALT/AST Ratio", "GGT"],
    status: "NOMINAL",
    accent: "#8BA4BF",
  },
  {
    id: "05",
    tag: "SKELETAL",
    title: "Bone Density & Strength",
    insight: "Micro-architectural mineral loss and remodeling turnover you lose silently.",
    markers: ["DEXA Z-Score", "Osteocalcin", "Serum Ca++", "CTX-1"],
    status: "STABLE",
    accent: "#18181B",
  },
  {
    id: "06",
    tag: "BODY COMPOSITION",
    title: "Visceral Fat & Muscle",
    insight: "Deep organ-wrapping fat ratio against skeletal lean mass preservation.",
    markers: ["Visceral Area", "Skeletal Muscle Index", "Phase Angle", "BMR"],
    status: "BALANCED",
    accent: "#ED5B2D",
  },
  {
    id: "07",
    tag: "MICRONUTRIENTS",
    title: "Cellular Nutrient Reserves",
    insight: "Intracellular mineral floors that trigger chronic fatigue and cognitive dip.",
    markers: ["Active B12", "Ferritin", "RBC Magnesium", "25-OH D3"],
    status: "CHECKED",
    accent: "#EF6A40",
  },
  {
    id: "08",
    tag: "IMMUNOLOGY",
    title: "Inflammation & Immunity",
    insight: "Low-grade systemic inflammatory burn that accelerates chronic disease.",
    markers: ["hs-CRP", "IL-6", "NLR Ratio", "Homocysteine"],
    status: "LOW RISK",
    accent: "#8BA4BF",
  },
  {
    id: "09",
    tag: "MICROBIOME",
    title: "Gut Barrier Integrity",
    insight: "Mucosal barrier permeability and microbial metabolite absorption.",
    markers: ["Zonulin", "Short-Chain Fatty Acids", "Calprotectin", "Dysbiosis"],
    status: "NOMINAL",
    accent: "#FF833C",
  },
  {
    id: "10",
    tag: "NEURO-RECOVERY",
    title: "Sleep, Stress & Mood",
    insight: "Autonomic nervous load and parasympathetic recovery rewriting other numbers.",
    markers: ["Overnight HRV", "REM/Deep Ratio", "Cortisol Index", "Sleep Latency"],
    status: "TRACKED",
    accent: "#8BA4BF",
  },
  {
    id: "11",
    tag: "FUNCTIONAL",
    title: "Physical Stamina & Power",
    insight: "Cellular mitochondrial efficiency, VO2 capacity, and functional vitality.",
    markers: ["VO2 Max Est", "Grip Dynamometry", "Lactate Clearance", "RHR"],
    status: "ACTIVE",
    accent: "#ED5B2D",
  },
];

/** Green = settled, rust = worth a look. (raw #ED5B2D fails contrast at 10px.) */
export function statusColor(status: string): string {
  return status === "MONITORED" || status === "TRACKED" ? "#B4370F" : "#244234";
}
