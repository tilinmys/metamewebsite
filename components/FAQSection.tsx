"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { FAQ_CLUSTERS, faqSchema, type FAQItem } from "@/lib/faq-data";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- expanded dossier (inline, dark glass) ---------- */
function Dossier({ item }: { item: FAQItem }) {
  const [sub, setSub] = useState<number | null>(null);
  const d = item.dossier;
  return (
    <div
      data-lenis-prevent
      className="max-h-[38vh] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
    >
      <p className="font-sans text-[13px] leading-relaxed text-white/70">{d.lead}</p>

      {d.aside && (
        <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#8BA4BF]">
            {d.aside.label}
          </p>
          <dl className="mt-2 divide-y divide-white/[0.06]">
            {d.aside.rows.map((r) => (
              <div key={r.k} className="flex items-center justify-between gap-3 py-2">
                <dt className="font-sans text-[12px] text-white/60">{r.k}</dt>
                <dd className="text-right font-sans text-[12px] font-medium text-white">
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#FF833C]">
        Asked in Indiranagar, Bengaluru
      </p>
      <div className="mt-2 space-y-1.5">
        {d.sub.map((s, i) => {
          const open = sub === i;
          return (
            <div
              key={s.q}
              className={`rounded-lg border ${open ? "border-white/[0.14] bg-white/[0.05]" : "border-white/[0.06] bg-white/[0.02]"}`}
            >
              <button
                type="button"
                onClick={() => setSub(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 p-3 text-left"
              >
                <span className="font-sans text-[12px] font-medium text-white/90">{s.q}</span>
                <span className={`shrink-0 font-mono text-sm text-[#FF833C] transition-transform ${open ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-white/[0.05] px-3 pb-3 pt-2 font-sans text-[12px] leading-relaxed text-white/55">
                      {s.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <figure className="mt-5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
        <blockquote className="font-serif text-[13px] font-normal italic leading-relaxed text-white/80">
          &ldquo;{d.review.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-2.5">
          <span className="font-sans text-[11.5px] font-medium text-white">{d.review.name}</span>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
            {d.review.meta}
          </span>
        </figcaption>
      </figure>

      <a
        href="#start"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ED5B2D] px-5 py-3 font-sans text-[12.5px] font-medium text-white transition-colors hover:bg-[#d94f24]"
      >
        Book a Meta Me screening in Indiranagar <span aria-hidden>→</span>
      </a>
    </div>
  );
}

function BgLayer({
  src,
  opacity,
  scale,
  priority,
}: {
  src: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  priority?: boolean;
}) {
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 will-change-transform">
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

const ROW = 40; // px per nav row

export default function FAQSection() {
  const track = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [openQ, setOpenQ] = useState<string | null>(null);
  const activeRef = useRef(0);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  const o0 = useTransform(scrollYProgress, [0, 0.19, 0.27], [1, 1, 0]);
  const o1 = useTransform(scrollYProgress, [0.19, 0.27, 0.44, 0.52], [0, 1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.44, 0.52, 0.69, 0.77], [0, 1, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.69, 0.77, 1], [0, 1, 1]);
  const s0 = useTransform(scrollYProgress, [0, 0.27], [1.06, 1]);
  const s1 = useTransform(scrollYProgress, [0.19, 0.52], [1.06, 1]);
  const s2 = useTransform(scrollYProgress, [0.44, 0.77], [1.06, 1]);
  const s3 = useTransform(scrollYProgress, [0.69, 1], [1.06, 1]);
  const opac = [o0, o1, o2, o3];
  const scal = [s0, s1, s2, s3];

  // the tick bar slides continuously down the nav as you scroll
  const tickY = useTransform(scrollYProgress, [0.04, 0.96], [0, ROW * 3]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    const idx = Math.max(0, Math.min(3, Math.floor(v * 3.999)));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
      setOpenQ(null);
    }
  });

  const jumpTo = (i: number) => {
    activeRef.current = i;
    setActive(i);
    setOpenQ(null);
    const el = track.current;
    if (reduce || !el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const dur = el.offsetHeight - window.innerHeight;
    const target = Math.round(top + dur * (i / 4) + dur * 0.05);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const cluster = FAQ_CLUSTERS[active];

  return (
    <section
      ref={track}
      id="faqs"
      className="relative h-[420vh] bg-[#0e0e10] lg:h-[560vh]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />

      <div className="sticky top-0 flex h-screen w-full items-start overflow-hidden pt-20 sm:pt-24 lg:items-center lg:pt-0">
        {/* background — full-bleed, cross-fades on scroll. no white wash. */}
        <div className="absolute inset-0 z-0">
          {reduce ? (
            <AnimatePresence mode="sync">
              <motion.div
                key={cluster.portal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0"
              >
                <Image
                  src={cluster.portal}
                  alt=""
                  aria-hidden
                  fill
                  priority
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            FAQ_CLUSTERS.map((c, i) => (
              <BgLayer
                key={c.portal}
                src={c.portal}
                opacity={opac[i]}
                scale={scal[i]}
                priority={i === 0}
              />
            ))
          )}
          {/* legibility — shaped to the text column so the photo stays crisp on
              the right where the tablet is the focal point. Tuned to hold AA on
              the brightest of the four portals. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(104deg, rgba(7,7,9,0.88) 0%, rgba(7,7,9,0.66) 24%, rgba(7,7,9,0.34) 44%, rgba(7,7,9,0.08) 60%, transparent 75%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0b0b0d]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0e0e10]/92 via-[#0e0e10]/45 to-transparent" />
          {/* just enough shade behind the right-hand nav */}
          <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[#0b0b0d]/50 to-transparent lg:block" />
          {/* narrow screens: the text column spans the full width, so hold an
              even wash over the whole portal for legibility */}
          <div className="absolute inset-0 bg-[#0b0b0d]/55 lg:hidden" />
        </div>

        {/* content — heading + questions, upper-left */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pr-16 lg:px-12 lg:pr-12">
          <div className="lg:max-w-[46%] [&_h2]:[text-shadow:0_2px_20px_rgba(0,0,0,0.6)] [&_p]:[text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#FF833C]">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ED5B2D] align-middle" />
              06 — Frequently asked
            </p>

            <h2 className="mt-4 max-w-[15ch] font-serif text-[2.1rem] font-normal leading-[1.05] text-white sm:text-[2.7rem] lg:text-[3.3rem]">
              Every question answered with{" "}
              <span className="accent-italic text-[#FF833C]">clinical clarity.</span>
            </h2>

            <p className="mt-4 max-w-[40ch] font-sans text-sm leading-relaxed text-white/85">
              Written for people searching in Indiranagar, Bengaluru. Scroll to
              move through the directory; open a question for the full answer.
            </p>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={cluster.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="space-y-3"
                >
                  {cluster.items.map((item) => {
                    const open = openQ === item.q;
                    return (
                      <div
                        key={item.q}
                        className={`overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-200 ${
                          open
                            ? "border-[#ED5B2D]/45 bg-[#141416]/92"
                            : "border-white/[0.1] bg-[#141416]/55 hover:border-white/25"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenQ(open ? null : item.q)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                        >
                          <span className="font-sans text-sm font-medium text-white sm:text-[15px]">
                            {item.q}
                          </span>
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] font-mono text-base text-[#FF833C] transition-transform duration-200 ${
                              open ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.34, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-white/[0.07] px-4 pb-5 pt-4 sm:px-5">
                                <Dossier item={item} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* the one navigation — right corner, tick slides on scroll */}
        <nav className="absolute right-5 top-1/2 z-20 -translate-y-1/2 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] md:right-8 lg:right-12">
          <div className="relative pl-4">
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 w-[2px] rounded-full bg-white"
              style={{
                height: ROW - 12,
                marginTop: 6,
                y: reduce ? active * ROW : tickY,
              }}
            />
            <div className="flex flex-col text-right">
              {FAQ_CLUSTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={c.rail}
                  style={{ height: ROW }}
                  className="flex items-center justify-end gap-4"
                >
                  <span
                    className={`hidden font-sans text-[13px] transition-colors duration-300 sm:inline sm:text-sm ${
                      active === i ? "font-semibold text-white" : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {c.rail}
                  </span>
                  <span
                    className={`font-mono text-xs transition-colors duration-300 ${
                      active === i ? "text-[#FF833C]" : "text-white/50"
                    }`}
                  >
                    {c.id}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
