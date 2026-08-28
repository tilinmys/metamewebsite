"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section 4 — the protocol in motion. Editorial split on pure white:
 * heading left, bare video right (no frame, no chrome, no overlays).
 * A gentle scroll-linked drift ties it to the dark section above.
 * The video only plays while on-screen and the tab is visible.
 */
export default function PreventiveEngine() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduce && !document.hidden) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduce]);

  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (inView && !reduce) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [inView, reduce]);

  // smooth hand-off from section 3 — subtle parallax as the section passes through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const videoY = useSpring(useTransform(scrollYProgress, [0, 1], [44, -44]), {
    stiffness: 55,
    damping: 20,
  });
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [18, -18]), {
    stiffness: 55,
    damping: 20,
  });

  return (
    <section
      ref={sectionRef}
      id="protocol"
      style={{ boxShadow: "0 -40px 80px -46px rgba(24,24,27,0.34)" }}
      className="relative z-10 -mt-10 flex min-h-[80vh] w-full items-center rounded-t-[1.75rem] bg-white py-16 lg:-mt-14 lg:rounded-t-[3rem] lg:py-24"
    >
      {/* Journey → Protocol: the white plane lifts clear of the dark section,
          with the faintest warm settle along its top edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-12 rounded-t-[1.75rem] bg-gradient-to-b from-[#F7EEE4] to-transparent lg:h-16 lg:rounded-t-[3rem]"
      />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* left — heading */}
        <motion.div
          style={reduce ? undefined : { y: textY }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col justify-center lg:col-span-5"
        >
          <h2 className="mb-5 font-serif text-3xl font-normal leading-[1.08] tracking-[-0.02em] text-[#18181B] sm:text-4xl lg:text-5xl">
            Screen. Understand. Intervene. Track.{" "}
            <span className="accent-italic text-[#ED5B2D]">Prevent.</span>
          </h2>
          <p className="mb-8 max-w-[460px] font-sans text-base leading-relaxed text-[#52525B]">
            From initial multi-organ biomarker screening to AI-assisted risk
            interpretation and continuous wearable tracking, explore how Meta Me
            turns clinical telemetry into lifelong preventive vitality.
          </p>
          <div>
            <a
              href="#start"
              className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-[#F6F4EE] px-8 py-4 font-sans text-sm font-medium text-[#18181B] transition-all duration-200 hover:border-black/30 hover:bg-[#F1EEE2] active:scale-[0.98]"
            >
              Explore the protocol
              <span className="text-[#ED5B2D] transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </motion.div>

        {/* right — bare video, nothing framing it */}
        <motion.div
          style={reduce ? undefined : { y: videoY }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
          whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:col-span-7 lg:aspect-auto lg:h-[500px]"
        >
          <video
            ref={videoRef}
            src="/videos/journey_overview.mp4"
            poster="/videos/journey_overview_poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-label="Meta Me protocol overview — biomarker screening to continuous tracking"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
