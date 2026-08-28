import { Grain, ScrollProgress } from "@/components/Atmosphere";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import SelfStackingDeck from "@/components/SelfStackingDeck";
import Journey from "@/components/Journey";
import PreventiveEngine from "@/components/PreventiveEngine";
import Doctors from "@/components/Doctors";
import FAQSection from "@/components/FAQSection";
import Start from "@/components/Start";
import Footer from "@/components/Footer";

/**
 * Reading order is the design here.
 *
 *   promise → what we read → how the loop works → the loop in motion
 *   → who reads it → what people ask → how to begin → footer
 *
 * Journey tells the five stages; Protocol shows the same five in motion —
 * deliberately adjacent, tell-then-show. Trust (Doctors) and objections (FAQ)
 * both land before pricing, so the flame CTA is the last thing before the
 * footer rather than something buried mid-page.
 *
 * Section boundaries are handled at the edges of the sections themselves — a
 * hairline where two planes of the same value meet, a short honest fade where
 * the palette genuinely jumps, and one structural move (the white Protocol
 * plane lifting clear of the dark Journey). No floating label bands.
 */
export default function Page() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Grain />
      <main>
        {/* 01 — the promise */}
        <Hero />

        {/* 02 — what we read. Hero→Systems dawn bridge lives inside the deck. */}
        <SelfStackingDeck />

        {/* corn silk dims to charcoal */}
        <div
          aria-hidden
          className="h-12 w-full md:h-16"
          style={{
            background: "linear-gradient(180deg, #FCF4D9 0%, #b3ab93 46%, #282828 100%)",
          }}
        />

        {/* 03 — how the loop works, told */}
        <Journey />

        {/* 04 — the same loop, shown. Lifts as a white plane over the dark. */}
        <PreventiveEngine />

        {/* 05 — who reads it. White meets warm paper on a hairline. */}
        <Doctors />

        {/* warm paper falls to night */}
        <div
          aria-hidden
          className="h-14 w-full md:h-[4.5rem]"
          style={{
            background: "linear-gradient(180deg, #FBF8F1 0%, #9c9184 44%, #0e0e10 100%)",
          }}
        />

        {/* 06 — what people ask */}
        <FAQSection />

        {/* night lifts back to white — the longest fade on the page, because
            dark→white is the one jump that bands if you rush it */}
        <div
          aria-hidden
          className="h-20 w-full md:h-24"
          style={{
            background:
              "linear-gradient(180deg, #0e0e10 0%, #575049 40%, #cfc7ba 74%, #ffffff 100%)",
          }}
        />

        {/* 07 — how to begin, ending on the flame CTA */}
        <Start />
      </main>

      {/* the flame → night seam lives inside the footer */}
      <Footer />
    </>
  );
}
