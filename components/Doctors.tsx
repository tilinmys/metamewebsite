"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { DOCTORS, type Doctor } from "@/lib/doctors-data";

function Portrait({ d }: { d: Doctor }) {
  // show the photo when it exists; fall back to a monogram if the file is
  // missing so a not-yet-added portrait never renders as a broken image.
  const [failed, setFailed] = useState(false);
  const showPhoto = d.photo && !failed;

  return (
    <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-2xl bg-[#ECE9E1]">
      {showPhoto ? (
        <Image
          src={d.photo as string}
          alt={`Portrait of ${d.name}`}
          fill
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 78vw"
          className="object-cover"
          style={{ objectPosition: d.focus ?? "50% 30%" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EFEAE0] to-[#E3DCCD]">
          <span className="font-display text-5xl text-[#C6BCA6]">{d.initials}</span>
        </div>
      )}
    </div>
  );
}

function DoctorCard({ d }: { d: Doctor }) {
  return (
    <article className="flex w-[78vw] max-w-[290px] shrink-0 flex-col sm:w-[304px] lg:w-[324px] lg:max-w-none">
      <Portrait d={d} />

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#B4370F]">
          {d.affiliation}
        </p>
        <h3 className="mt-2 font-serif text-[1.35rem] font-normal leading-tight text-[#18181B]">
          {d.name}
        </h3>
        <p className="mt-0.5 font-sans text-[13px] text-black/55">{d.role}</p>
        <p className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.1em] text-black/35">
          {d.credentials}
        </p>
        <p className="mt-3 line-clamp-3 font-sans text-[12.5px] leading-relaxed text-black/65">
          {d.blurb}
        </p>
        {d.languages && (
          <p className="mt-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-black/30">
            {d.languages}
          </p>
        )}
      </div>
    </article>
  );
}

function ClosingCard() {
  return (
    <article className="flex w-[78vw] max-w-[280px] shrink-0 flex-col justify-center sm:w-[300px] lg:w-[340px] lg:max-w-none">
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
  const [travel, setTravel] = useState(0);

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
    const t2 = setTimeout(measure, 700);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  // pixel-measured pan, driven directly by the (Lenis-smoothed) scroll —
  // a numeric useSpring on a "%" value silently breaks, so no spring here.
  // brief hold at each end so the first/last card can be read.
  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -travel]);

  // the scroll-linked pan now runs on every viewport; reduced motion falls
  // back to a native swipe strip.
  const pan = !reduce;

  return (
    <section
      ref={track}
      id="doctors"
      className={`relative border-t border-black/[0.06] bg-[#FBF8F1] ${
        pan ? "h-[260vh] lg:h-[220vh]" : ""
      }`}
    >
      <div
        className={
          pan
            ? "sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden"
            : "flex min-h-[72vh] w-full flex-col justify-center overflow-hidden py-16"
        }
      >
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
              ? "mt-10 overflow-hidden lg:mt-14"
              : "no-scrollbar mt-10 snap-x snap-proximity overflow-x-auto pb-4"
          }
        >
          <motion.div
            ref={strip}
            style={pan ? { x } : undefined}
            className="flex w-max items-start gap-6 px-6 lg:gap-12 lg:px-12"
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
