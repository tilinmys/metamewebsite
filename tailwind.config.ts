import type { Config } from "tailwindcss";

/**
 * Meta Me — My Stree corp-identity system.
 * Palette lifted verbatim from "My Stree Final Corp Identity.pdf" (p.5).
 * Contrast rules are enforced in design.md — colour usage here is deliberate.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // brand
        paper: "#FCF4D9", // Corn Silk — page canvas
        ink: "#282828", // charcoal — all body + display text (13:1 on paper)
        graphite: "#52525B", // muted body text — 6.6:1 on white
        silk: "#FAF6ED", // Silk Tint — icon wells, hover surfaces
        flame: "#ED5B2D", // Flame — accent: rules, borders, icon strokes, large display
        rust: "#B4370F", // deepened Flame — flame for TEXT / links (5.2:1 on paper)
        sienna: "#EF6A40", // Burnt Sienna — decorative only
        pumpkin: "#FF833C", // Pumpkin — decorative on light / text on dark
        cadet: "#8BA4BF", // Cadet Gray — line icons, hairlines, cool notes
        cadetDeep: "#4A6076", // Cadet for text if needed (5.5:1 on paper)
        uranian: "#BFE2FE", // Uranian Blue — soft fills, dark-section accent
        mist: "#E9F3FC", // pale Uranian — cool section background
        blush: "#FBEADF", // pale Flame — warm tint fills
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        display: ["var(--font-display)", "Instrument Serif", "Georgia", "serif"],
        script: ["var(--font-script)", "Playfair Display", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.03", letterSpacing: "-0.02em" }],
        d1: ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        d2: ["clamp(1.4rem, 2.4vw, 1.9rem)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        lede: ["1.25rem", { lineHeight: "1.55" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        sm: ["0.9375rem", { lineHeight: "1.55" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        container: "1200px",
        prose: "58ch",
      },
      borderColor: {
        DEFAULT: "rgba(40,40,40,0.12)",
      },
      divideColor: {
        DEFAULT: "rgba(40,40,40,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
