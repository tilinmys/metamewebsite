"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

const TELEMETRY = [
  {
    n: "01",
    title: "Whole-body screening",
    sub: "11 biological systems & visceral profiling",
  },
  {
    n: "02",
    title: "Longitudinal intelligence",
    sub: "AI risk stratification & trend monitoring",
  },
  {
    n: "03",
    title: "Decentralized access",
    sub: "Campus kiosks & physician teleconsultations",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#121214]">
      {/* background asset layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-profile.webp"
          alt="A woman in profile, lit by a warm circular glow"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="pointer-events-none object-cover object-right"
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#121214] via-[#121214]/92 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[#121214]/55 md:hidden" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-[#121214] to-transparent" />
      </div>

      {/* content engine */}
      <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pt-24 lg:px-12 lg:pt-32">
        <div className="max-w-[620px]">
          <motion.h1
            {...rise(0.05)}
            className="font-display text-[clamp(2.75rem,5.2vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.025em] text-white"
          >
            Know your health before disease defines it.
          </motion.h1>

          <motion.p
            {...rise(0.13)}
            className="mb-8 mt-6 max-w-[480px] font-sans text-sm font-normal leading-relaxed text-[#A1A1AA] sm:text-base"
          >
            11 biological systems evaluated in a single session. Translating
            multi-organ biomarker telemetry into an actionable preventive
            roadmap.
          </motion.p>

          <motion.div {...rise(0.2)} className="flex flex-wrap items-center gap-3">
            <a
              href="#start"
              className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-medium text-[#121214] shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-[#FAF6ED] active:scale-[0.98]"
            >
              Start Assessment
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </a>
            <a
              href="#systems"
              className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 font-sans text-sm font-normal text-white/90 transition-all duration-200 hover:border-white/[0.25] hover:bg-white/[0.08]"
            >
              Explore 11 Systems
              <span aria-hidden>↓</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* bottom telemetry rail */}
      <motion.div
        {...rise(0.3)}
        className="relative z-20 mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-6 border-t border-white/[0.08] px-6 pb-8 pt-10 md:grid-cols-3 lg:px-12"
      >
        {TELEMETRY.map((t) => (
          <div key={t.n}>
            <p className="font-mono text-xs font-medium uppercase tracking-wider text-white">
              <span className="mr-2 font-medium text-[#ED5B2D]">{t.n}</span>
              {t.title}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-tight text-[#8A8A93]">
              {t.sub}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
