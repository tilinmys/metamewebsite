"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import CtaButton from "./CtaButton";
import { ENTER_SPRING } from "@/lib/motion";
import { START } from "@/lib/content";

export default function Start() {
  const reduce = useReducedMotion();

  return (
    <>
      <section id="start" className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-container px-5 md:px-10">
          <div className="lg:flex lg:gap-14">
            <div className="lg:basis-[40%]">
              <Reveal>
                <p className="kicker text-rust">{START.kicker}</p>
                <h2 className="mt-4 max-w-[16ch] font-display text-d1 text-ink">
                  Choose how you begin.
                </h2>
                <div className="mt-6 space-y-1.5">
                  {START.lines.map((l) => (
                    <p key={l} className="text-body text-ink/80">
                      {l}
                    </p>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="mt-10 lg:mt-0 lg:basis-[60%]">
              <ul className="space-y-7">
                {START.tiers.map((t, i) => (
                  <motion.li
                    key={t.name}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={reduce ? { duration: 0.3 } : { ...ENTER_SPRING, delay: i * 0.08 }}
                    className={
                      t.featured
                        ? "border-l-2 border-flame bg-blush/50 py-4 pl-6 pr-4"
                        : "border-l-2 border-cadet py-4 pl-6 pr-4"
                    }
                  >
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-serif text-d2 text-ink">{t.name}</h3>
                      {t.featured ? (
                        <span className="kicker text-rust">Most choose this</span>
                      ) : null}
                    </div>
                    <p className="mt-2 max-w-prose text-body text-ink/80">{t.detail}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* tiers → CTA: white warms through blush into flame — a short bloom */}
      <div
        aria-hidden
        className="h-10 w-full md:h-14"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #FBEADF 45%, #ED5B2D 100%)",
        }}
      />

      {/* closing CTA — full-bleed flame */}
      <motion.section
        initial={reduce ? { opacity: 0 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="bg-flame py-16 md:py-24"
      >
        <div className="mx-auto max-w-container px-5 md:px-10">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-d1 text-black md:text-hero">
              {START.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <CtaButton href={START.ctaHref} variant="paper">
                {START.cta}
              </CtaButton>
              <a
                href={START.ctaHref}
                className="font-serif text-sm font-medium text-black underline decoration-black/50 underline-offset-4 hover:decoration-black"
              >
                {START.sub}
              </a>
            </div>
          </Reveal>
        </div>
      </motion.section>
    </>
  );
}
