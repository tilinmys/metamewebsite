"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ENTER_SPRING } from "@/lib/motion";

type Tag = "div" | "li" | "section" | "article" | "span" | "p" | "h2";

/** Standard scroll-entrance wrapper. Opacity-only under reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: Tag;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0.3 } : { ...ENTER_SPRING, delay }}
    >
      {children}
    </M>
  );
}
