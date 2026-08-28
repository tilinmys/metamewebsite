"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SCRUB_SPRING, ENTER_SPRING } from "@/lib/motion";
import { JOURNEY_INTRO, JOURNEY_STEPS } from "@/lib/content";

function StepLabel({
  label,
  index,
  count,
  progress,
}: {
  label: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const at = index / (count - 1);
  const enter = Math.max(0, at - 0.5 / (count - 1));
  const color = useTransform(
    progress,
    [enter, at],
    ["rgba(252,244,217,0.4)", "rgba(252,244,217,1)"],
  );
  return (
    <motion.span
      className="absolute left-6 -translate-y-1/2 font-serif text-sm"
      style={{ top: `${at * 100}%`, color }}
    >
      {label}
    </motion.span>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, reduce ? { stiffness: 1000, damping: 100 } : SCRUB_SPRING);
  const fillPct = useTransform(smooth, [0, 1], [0, 100]);
  const fillH = useMotionTemplate`${fillPct}%`;

  return (
    <section ref={ref} id="journey" className="relative bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/journey-contours.webp"
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(90% 60% at 85% 0%, rgba(191,226,254,0.16), transparent 60%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-container px-5 pb-28 pt-14 md:px-10 md:pb-36 md:pt-20">
        <div className="lg:flex lg:gap-14">
          {/* rail — 38 */}
          <div className="lg:basis-[38%]">
            <div className="lg:sticky lg:top-16">
              <p className="kicker text-pumpkin">{JOURNEY_INTRO.kicker}</p>
              <h2 className="mt-4 max-w-[14ch] font-display text-d1 text-paper">
                {JOURNEY_INTRO.headline}
              </h2>

              <div className="relative mt-10" style={{ height: "clamp(15rem, 30vh, 20rem)" }}>
                {/* track */}
                <span className="absolute left-1 top-0 h-full w-px bg-paper/20" />
                {/* flame fill */}
                <motion.span
                  className="absolute left-1 top-0 w-px bg-flame"
                  style={{ height: fillH }}
                />
                {JOURNEY_STEPS.map((s, i) => (
                  <StepLabel
                    key={s.label}
                    label={s.label}
                    index={i}
                    count={JOURNEY_STEPS.length}
                    progress={smooth}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* steps — 62 */}
          <div className="mt-12 lg:mt-0 lg:basis-[62%]">
            <ol className="space-y-10">
              {JOURNEY_STEPS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={reduce ? { duration: 0.3 } : { ...ENTER_SPRING, delay: i * 0.05 }}
                  className="border-t border-paper/15 pt-5"
                >
                  <h3 className="font-serif text-d2 text-paper">
                    <span className="mr-3 align-baseline font-display text-sm text-pumpkin">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.label}
                  </h3>
                  <p className="mt-2 max-w-prose text-body text-paper/75">{s.line}</p>
                </motion.li>
              ))}
            </ol>

            <a
              href={JOURNEY_INTRO.ctaHref}
              className="group mt-12 inline-flex items-center gap-2 font-serif text-sm text-pumpkin"
            >
              <span className="border-b border-pumpkin/40 pb-0.5 transition-colors group-hover:border-pumpkin">
                {JOURNEY_INTRO.cta}
              </span>
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
