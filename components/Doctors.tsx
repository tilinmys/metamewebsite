"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { DOCTORS, type Doctor } from "@/lib/doctors-data";

function Portrait({ d }: { d: Doctor }) {
  return (
    <div className="relative aspect-[3/4] w-[116px] shrink-0 overflow-hidden rounded-xl bg-[#ECE9E1] sm:w-[130px]">
      {d.photo ? (
        <Image src={d.photo} alt={d.name} fill sizes="130px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <span className="font-serif text-3xl text-black/25">{d.initials}</span>
          <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-black/25">
            Portrait
          </span>
        </div>
      )}
    </div>
  );
}

function DoctorCard({ d }: { d: Doctor }) {
  return (
    <article className="flex w-[80vw] max-w-[380px] shrink-0 items-start gap-5 border-l border-black/[0.08] pl-6 sm:w-[400px] lg:w-[440px] lg:max-w-none lg:pl-10">
      <Portrait d={d} />
      <div className="min-w-0 pt-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/40">
          {d.affiliation}
        </p>
        <h3 className="mt-3 font-serif text-lg font-normal leading-snug text-[#18181B]">
          {d.name}
        </h3>
        <p className="mt-0.5 font-sans text-[13px] text-black/55">{d.role}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-black/35">
          {d.credentials}
        </p>
        <p className="mt-4 font-sans text-[13.5px] leading-relaxed text-black/70">
          {d.blurb}
        </p>
        <a
          href="#start"
          className="mt-4 inline-block font-sans text-[13px] text-[#18181B] underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-[#ED5B2D]"
        >
          Learn more
        </a>
      </div>
    </article>
  );
}

function ClosingCard() {
  return (
    <article className="flex w-[80vw] max-w-[340px] shrink-0 flex-col justify-center border-l border-black/[0.08] pl-6 sm:w-[360px] lg:w-[400px] lg:max-w-none lg:pl-10">
      <p className="font-serif text-xl font-normal leading-snug text-[#18181B]">
        Every Meta Me roadmap is signed off by a clinician before it reaches you.
      </p>
      <a
        href="#start"
        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#18181B] px-6 py-3 font-sans text-[13px] font-medium text-white transition-colors hover:bg-[#000]"
      >
        Book a screening <span aria-hidden>→</span>
      </a>
    </article>
  );
}

export default function Doctors() {
  const track = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // measure the real horizontal overflow so the strip lands with the last card
  // near the right edge on any viewport width — a fixed % can't do that.
  useEffect(() => {
    const measure = () => {
      const vp = viewport.current;
      const st = strip.current;
      if (!vp || !st) return;
      const overflow = st.scrollWidth - vp.clientWidth;
      setTravel(overflow > 0 ? overflow : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // after fonts settle
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  // pixel-measured pan, driven directly by the (Lenis-smoothed) scroll —
  // a numeric useSpring on a "%" value silently breaks, so no spring here.
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  // desktop always uses the pinned/clipped layout (no native-scrollbar flash);
  // the transform itself just waits until the overflow has been measured.
  const pan = isDesktop && !reduce;

  return (
    <section
      ref={track}
      id="doctors"
      className="relative border-t border-black/[0.06] bg-[#FBF8F1] lg:h-[200vh]"
    >
      <div className="flex min-h-[72vh] w-full flex-col justify-center overflow-hidden py-16 lg:min-h-screen lg:py-0 lg:sticky lg:top-0 lg:h-screen">
        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
          <Reveal>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#B4370F]">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ED5B2D] align-middle" />
              The team
            </p>
            <h2 className="mt-4 max-w-[20ch] font-serif text-3xl font-normal leading-[1.08] text-[#18181B] sm:text-4xl lg:text-[3rem]">
              Led by clinicians who work in prevention,{" "}
              <span className="accent-italic text-[#ED5B2D]">every day.</span>
            </h2>
          </Reveal>
        </div>

        <div
          ref={viewport}
          className={
            pan
              ? "mt-12 overflow-hidden lg:mt-16"
              : "no-scrollbar mt-10 snap-x snap-proximity overflow-x-auto pb-4"
          }
        >
          <motion.div
            ref={strip}
            style={pan ? { x } : undefined}
            className="flex w-max gap-8 px-6 lg:gap-14 lg:px-12"
          >
            {DOCTORS.map((d) => (
              <div key={d.slug} className={pan ? "" : "snap-start"}>
                <DoctorCard d={d} />
              </div>
            ))}
            <div className={pan ? "pr-6 lg:pr-0" : "snap-start pr-6"}>
              <ClosingCard />
            </div>
          </motion.div>
        </div>

        {!pan && (
          <p className="mx-auto mt-4 w-full max-w-[1400px] px-6 font-mono text-[10px] uppercase tracking-[0.16em] text-black/35 lg:px-12">
            Swipe to meet the team →
          </p>
        )}
      </div>
    </section>
  );
}
