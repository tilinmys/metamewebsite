import type { Transition } from "framer-motion";

/** Every viewport-entrance animation — soft, natural settle. */
export const ENTER_SPRING: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

/** Scroll-scrub smoothing (Journey progress rail). */
export const SCRUB_SPRING = {
  stiffness: 60,
  damping: 20,
  restDelta: 0.001,
} as const;

/** Small UI transitions (hover, link underlines). */
export const UI_SPRING: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
};
