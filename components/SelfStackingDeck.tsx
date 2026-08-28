"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DECK_CARDS, type DeckCard } from "@/lib/deck-data";

/* ---------- micro-sonic tick ---------- */
let actx: AudioContext | null = null;
let last = 0;
function tick() {
  if (typeof window === "undefined") return;
  const now = performance.now();
  if (now - last < 90) return;
  last = now;
  if (!actx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    try {
      actx = new AC();
    } catch {
      return;
    }
  }
  if (actx.state === "suspended") actx.resume().catch(() => {});
  if (actx.state !== "running") return;
  const t = actx.currentTime;
  const o = actx.createOscillator();
  const g = actx.createGain();
  o.type = "sine";
  o.frequency.value = 520;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.015, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(actx.destination);
  o.start(t);
  o.stop(t + 0.06);
}

/* ---------- card face — minimal editorial ---------- */
function CardFace({ c }: { c: DeckCard }) {
  const markers = c.markers.split("·").map((m) => m.trim()).slice(0, 3);
  return (
    <>
      <div className="flex items-center">
        <span className="font-mono text-xs font-medium text-[#B4370F]">{c.id}</span>
        <span className="ml-2 font-sans text-xs font-medium text-[#18181B]">
          {c.tag}
        </span>
      </div>

      <div className="relative my-3 h-48 w-full overflow-hidden rounded-2xl border border-[rgba(24,24,27,0.04)] bg-[#FAF6ED] sm:h-52">
        {c.media ? (
          <Image src={c.media} alt="" fill sizes="410px" className="object-cover" />
        ) : (
          <svg
            viewBox="0 0 400 200"
            className="h-full w-full"
            preserveAspectRatio="none"
            aria-hidden
          >
            {[0, 1, 2, 3, 4].map((k) => (
              <path
                key={k}
                d={`M0 ${40 + k * 30} C 90 ${18 + k * 30}, 170 ${66 + k * 30}, 260 ${40 + k * 30} S 400 ${18 + k * 30}, 400 ${40 + k * 30}`}
                fill="none"
                stroke={c.accent}
                strokeOpacity={0.28}
                strokeWidth={1.25}
              />
            ))}
          </svg>
        )}
      </div>

      <div>
        <h3 className="font-serif text-xl font-normal leading-tight text-[#18181B] sm:text-2xl">
          {c.title}
        </h3>
        <p className="mt-1 font-sans text-xs leading-relaxed text-[#5F5F66]">
          {c.insight}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {markers.map((m) => (
          <span
            key={m}
            className="rounded-full border border-[rgba(24,24,27,0.05)] bg-[#FAF6ED] px-3 py-1 font-sans text-[11px] font-medium text-[#52525B]"
          >
            {m}
          </span>
        ))}
      </div>
    </>
  );
}

/* ---------- the deck ---------- */
export default function SelfStackingDeck() {
  const stage = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLDivElement | null)[]>([]);
  const bgEls = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const cards = cardEls.current.filter(Boolean) as HTMLDivElement[];
    const bgs = bgEls.current.filter(Boolean) as HTMLDivElement[];
    const total = cards.length;
    if (!stage.current || total === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (
        end: string,
        scrub: number,
        dx: number,
        dy: number,
      ) => {
        let vh = window.innerHeight;

        // every card starts parked below the fold, dead-centre horizontally
        const park = () => {
          cards.forEach((card) => {
            gsap.set(card, {
              xPercent: -50,
              yPercent: -50,
              x: 0,
              y: vh,
              scale: 1,
              force3D: true,
            });
          });
        };
        park();
        gsap.set(bgs, { opacity: 0 });
        if (bgs[0]) gsap.set(bgs[0], { opacity: 1 });

        let activeBg = 0;
        const cardStep = 1 / total;

        ScrollTrigger.create({
          trigger: stage.current,
          start: "top top",
          end: `+=${end}`,
          pin: true,
          pinSpacing: true,
          scrub,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onRefresh: () => {
            vh = window.innerHeight;
            park();
          },
          onUpdate: (self) => {
            const progress = self.progress;

            for (let i = 0; i < total; i++) {
              const enterStart = i * cardStep;
              // 0 → 1 as this card travels from below into its slot; once it
              // reaches 1 the slot is FIXED — placed cards never drift again.
              const raw = Math.min(
                Math.max((progress - enterStart) / cardStep, 0),
                1,
              );
              const p = 1 - Math.pow(1 - raw, 3); // easeOutCubic — soft landing

              const depth = total - 1 - i; // 0 = last card (front, dead-centre)
              const restY = -depth * dy;
              const restX = -depth * dx;
              const restScale = 1 - depth * 0.04;

              const y = (1 - p) * vh + p * restY;
              const x = p * restX;
              const scale = 1 - p * (1 - restScale);

              gsap.set(cards[i], { x, y, scale, force3D: true });
            }

            // strata cross-fade
            const nextBg = progress < 0.35 ? 0 : progress < 0.7 ? 1 : 2;
            if (nextBg !== activeBg && bgs[nextBg]) {
              gsap.to(bgs[activeBg], { opacity: 0, duration: 0.35, overwrite: true });
              gsap.to(bgs[nextBg], { opacity: 1, duration: 0.35, overwrite: true });
              activeBg = nextBg;
            }
          },
        });
      };

      //                              end     scrub  dx  dy
      mm.add("(min-width: 900px)", () => build("620%", 1, 11, 18));
      mm.add("(max-width: 899px)", () => build("460%", 0.5, 6, 14));

      return () => mm.revert();
    }, stage);

    // recalculate pin distances once layout has fully settled (images, fonts,
    // mobile browser-chrome height) so the deck is aligned from the first frame
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts?.ready) document.fonts.ready.then(onLoad);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, []);

  const Eyebrow = () => (
    <p className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#B4370F]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ED5B2D] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ED5B2D]" />
      </span>
      What we check
    </p>
  );

  return (
    <section id="systems" className="relative bg-[#FCF4D9]">
      {/* Hero → Systems: charcoal lifts through a warm neutral into corn silk. */}
      <div
        aria-hidden
        className="h-[15vh] w-full md:h-[17vh]"
        style={{
          background:
            "linear-gradient(180deg, #121214 0%, #2b2723 32%, #7d715c 62%, #cbbf9b 84%, #FCF4D9 100%)",
        }}
      />

      <div
        ref={stage}
        className="deck-stage relative flex h-screen w-full items-center overflow-hidden bg-[#FCF4D9]"
      >
        {["bg_strata_01", "bg_strata_02", "bg_strata_03"].map((f, i) => (
          <div
            key={f}
            ref={(el) => {
              bgEls.current[i] = el;
            }}
            className="pointer-events-none absolute inset-0 z-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={`/images/${f}.jpg`}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[70%] bg-gradient-to-r from-[#FCF4D9] via-[#FCF4D9]/85 to-transparent lg:block" />

        {/* left — heading */}
        <div className="relative z-20 hidden shrink-0 pl-8 pr-6 lg:block lg:w-[45%] lg:pl-16">
          <Eyebrow />
          <h2 className="mt-3 mb-6 max-w-[15ch] font-serif text-3xl font-normal leading-[1.08] text-[#18181B] lg:text-5xl">
            Eleven systems, one session.{" "}
            <span className="accent-italic text-[#ED5B2D]">Read together.</span>
          </h2>
          <p className="hidden max-w-[420px] font-sans text-sm leading-relaxed text-[#52525B] sm:block">
            Most check-ups review isolated figures. Meta Me evaluates eleven
            systems simultaneously and reads the pattern between them.
          </p>
        </div>

        {/* mobile heading */}
        <div className="deck-m-head absolute inset-x-0 top-0 z-30 px-4 pt-6 text-center lg:hidden">
          <div className="flex justify-center">
            <Eyebrow />
          </div>
          <h2 className="mt-2 font-serif text-2xl font-normal leading-tight text-[#18181B]">
            Eleven systems, one session.
          </h2>
        </div>

        {/* right — the deck */}
        <div className="relative z-20 flex h-full w-full items-center justify-center lg:w-[55%]">
          {DECK_CARDS.map((c, i) => (
            <div
              key={c.id}
              ref={(el) => {
                cardEls.current[i] = el;
              }}
              onMouseEnter={tick}
              onFocus={tick}
              tabIndex={0}
              style={{ "--card-accent": c.accent } as React.CSSProperties}
              className="stack-card absolute left-1/2 top-1/2 flex h-[480px] w-[88vw] max-w-[340px] select-none flex-col justify-between rounded-[28px] border border-[rgba(24,24,27,0.07)] bg-white p-6 shadow-[0_24px_48px_-12px_rgba(24,24,27,0.08)] outline-none transition-[box-shadow,border-color] duration-200 hover:border-[color:var(--card-accent)] hover:shadow-[0_36px_70px_-18px_rgba(24,24,27,0.22)] focus-visible:border-[color:var(--card-accent)] sm:h-[510px] lg:h-[510px] lg:w-[410px] lg:max-w-none"
            >
              <CardFace c={c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
