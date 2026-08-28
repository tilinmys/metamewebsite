import type { Metadata, Viewport } from "next";
import {
  Newsreader,
  Instrument_Serif,
  Playfair_Display,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { ORIGIN, CANONICAL, SITE, siteSchema } from "@/lib/site";

/* Body + working headlines — Newsreader is built for reading at text sizes. */
const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

/* Oversized display — sharp modern editorial headline face. */
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

/* Expressive italic accents — calligraphic drop terminals. */
const script = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-script",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

/* Clinical telemetry / index tags. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/* Humanist sans — hero UI + body. */
const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: {
    default: "Meta Me — Preventive Health Screening in Indiranagar, Bengaluru | My Stree",
    template: "%s | Meta Me — My Stree",
  },
  description: SITE.description,
  keywords: SITE.keywords,
  applicationName: "Meta Me",
  authors: [{ name: "My Stree" }],
  creator: "My Stree",
  publisher: "My Stree",
  category: "health",
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: CANONICAL,
    siteName: "Meta Me — a My Stree program",
    title: "Know your health before disease defines it — Meta Me, Indiranagar",
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Meta Me preventive health roadmap on a clinician's tablet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: "Meta Me — preventive health, read as one picture",
    description:
      "Eleven biological systems in one visit. A clinician-written roadmap, not a PDF. Indiranagar, Bengaluru.",
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCF4D9" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e10" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      className={`${serif.variable} ${display.variable} ${script.variable} ${mono.variable} ${sans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}
