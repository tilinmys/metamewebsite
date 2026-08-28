"use client";

import { motion } from "framer-motion";
import { UI_SPRING } from "@/lib/motion";

/**
 * Pill CTA. No slider gadgets — just a quiet arrow that steps forward on hover.
 * `solid`  = ink fill / paper text (12:1)
 * `flame`  = deepened-flame fill / paper text (5.3:1) — reserved for the final CTA
 * `ghost`  = underlined text link
 */
export default function CtaButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "flame" | "paper" | "ghost";
  className?: string;
}) {
  if (variant === "ghost") {
    return (
      <a
        href={href}
        className={`group inline-flex items-center gap-2 font-serif text-sm text-rust ${className}`}
      >
        <span className="border-b border-rust/40 pb-0.5 transition-colors group-hover:border-rust">
          {children}
        </span>
        <motion.span
          aria-hidden
          className="inline-block"
          initial={{ x: 0 }}
          whileHover={{ x: 3 }}
        >
          ↓
        </motion.span>
      </a>
    );
  }

  const fill =
    variant === "flame"
      ? "bg-[#BE3A12] text-paper"
      : variant === "paper"
        ? "bg-paper text-ink"
        : "bg-ink text-paper";

  return (
    <motion.a
      href={href}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.98 }}
      transition={UI_SPRING}
      className={`group inline-flex items-center gap-3 rounded-full ${fill} px-7 py-3.5 font-serif text-sm font-medium ${className}`}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="inline-block"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
