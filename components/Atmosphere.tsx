"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** 2px reading-progress bar pinned to the very top. Not a navbar — no links, no chrome. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-flame via-sienna to-pumpkin"
      style={{ scaleX: x }}
    />
  );
}

/**
 * Fixed grain layer. No blend mode — a full-viewport `mix-blend-multiply`
 * layer forces the compositor to re-blend the whole screen on every scroll
 * frame, which is a real jank source on low-end devices. Plain low-opacity
 * texture on its own GPU layer is effectively free.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-40 opacity-[0.03]"
      style={{ transform: "translateZ(0)" }}
    />
  );
}

/**
 * Oversized four-petal motif lifted from the My Stree mark.
 * Decorative brand anchor — drifts slowly, sits behind content.
 */
export function PetalMotif({
  className = "",
  color = "var(--cadet)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`petal-drift ${className}`}
      aria-hidden
      fill="none"
      stroke={color}
      strokeWidth={1.1}
    >
      <path d="M100 12c10 40 38 68 78 78-40 10-68 38-78 78-10-40-38-68-78-78 40-10 68-38 78-78Z" />
      <path d="M100 44c6 26 24 44 50 50-26 6-44 24-50 50-6-26-24-44-50-50 26-6 44-24 50-50Z" strokeOpacity={0.6} />
      <path d="M52 30c14 6 20 20 18 36M148 30c-14 6-20 20-18 36" strokeOpacity={0.5} />
      <circle cx="100" cy="100" r="6" strokeOpacity={0.7} />
    </svg>
  );
}
