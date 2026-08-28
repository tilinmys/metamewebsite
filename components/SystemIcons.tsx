/**
 * Custom line glyphs for the eleven systems — drawn on a 24 grid, 1.4px stroke,
 * matching the thin-line medical icon set in the My Stree identity.
 */
import type { SVGProps } from "react";

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type P = SVGProps<SVGSVGElement>;

const metabolic = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 14h3l2-6 3 11 3-14 2 9 1.5-4H21" />
  </svg>
);
const heart = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20S4 14.5 4 8.8A4.3 4.3 0 0 1 12 6.6 4.3 4.3 0 0 1 20 8.8C20 14.5 12 20 12 20Z" />
    <path d="M6.5 12H9l1.4-2.6L12.5 15l1.3-3H17.5" strokeOpacity={0.5} />
  </svg>
);
const hormone = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="3.3" />
    <circle cx="16" cy="16" r="3.3" />
    <path d="m10.3 10.3 3.4 3.4M8 11.5V15m-1.7-1.7h3.4M16 9.5V13m-1.7-1.7h3.4" strokeOpacity={0.55} />
  </svg>
);
const organ = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 7c4-2 10-2 14 0 0 6-2.6 10-7 10S5 13 5 7Z" />
    <path d="M9 9c1.4 1.1 4.6 1.1 6 0M10 12.6c.8.7 3.2.7 4 0" strokeOpacity={0.5} />
  </svg>
);
const bone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7.6 16.4 16.4 7.6" />
    <path d="M7.6 16.4a2.1 2.1 0 1 1-2.9-2.9 2.1 2.1 0 0 1-.1-2.9 2.1 2.1 0 0 1 2.9.1 2.1 2.1 0 0 1 2.9 2.9 2.1 2.1 0 0 1 .1 2.9 2.1 2.1 0 0 1-2.9-.1Z" />
    <path d="M16.4 7.6a2.1 2.1 0 0 0 2.9.1 2.1 2.1 0 0 0-.1-2.9 2.1 2.1 0 0 0-2.9-2.9 2.1 2.1 0 0 0-2.9.1" />
  </svg>
);
const body = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="5.5" r="2.3" />
    <path d="M12 8v7m0 0-3.5 5M12 15l3.5 5M6 11l6-2 6 2" />
  </svg>
);
const nutrient = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21c-3.5 0-6-3.3-6-8 0-3.1 2-6 4-6 1.1 0 1.5.6 2 .6s.9-.6 2-.6c2 0 4 2.9 4 6 0 4.7-2.5 8-6 8Z" />
    <path d="M12 7c0-2 1-3.3 3-4" strokeOpacity={0.55} />
  </svg>
);
const immunity = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.3 3 8 7 10 4-2 7-5.7 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4.3" strokeOpacity={0.6} />
  </svg>
);
const gut = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 4v3a3 3 0 0 0 3 3h1a3 3 0 0 1 0 6H9a3 3 0 0 0-3 3v1" />
    <path d="M17 4v16" strokeOpacity={0.4} />
  </svg>
);
const sleep = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 13.4A7.5 7.5 0 1 1 10.6 4a6 6 0 0 0 9.4 9.4Z" />
    <path d="M14 5h3l-3 3.3h3" strokeOpacity={0.55} />
  </svg>
);
const fitness = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 9v6M7 7v10M20 9v6M17 7v10M7 12h10" />
  </svg>
);

export const SYSTEM_ICONS: Record<string, (p: P) => JSX.Element> = {
  metabolic,
  heart,
  hormone,
  organ,
  bone,
  body,
  nutrient,
  immunity,
  gut,
  sleep,
  fitness,
};

/** Eleven-Pillars deck: id "01".."11" → glyph, in brief order. */
export const ICON_BY_ID: Record<string, (p: P) => JSX.Element> = {
  "01": metabolic,
  "02": heart,
  "03": hormone,
  "04": organ,
  "05": bone,
  "06": body,
  "07": nutrient,
  "08": immunity,
  "09": gut,
  "10": sleep,
  "11": fitness,
};
