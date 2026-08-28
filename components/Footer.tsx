"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FOOTER } from "@/lib/content";
import { CLINIC } from "@/lib/faq-data";
import { SITE } from "@/lib/site";

/* ---------- live clinic clock, in the clinic's own timezone ---------- */
type Now = { weekday: string; hh: string; mm: string; ss: string };

function istNow(): Now {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    hh: get("hour"),
    mm: get("minute"),
    ss: get("second"),
  };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const to12h = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour} ${suffix}` : `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
};

/**
 * The clinic is in Indiranagar, so the footer clock runs on Indiranagar time —
 * not the visitor's. The status badge is derived from the same opening-hours
 * data the MedicalClinic schema publishes, so the page can never claim the
 * clinic is open while the structured data says otherwise.
 */
function useClinicStatus() {
  const [now, setNow] = useState<Now | null>(null);

  useEffect(() => {
    const tick = () => setNow(istNow());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) return null;

  const today = SITE.openingHours.find((o) => o.days.includes(now.weekday));
  const minutes = Number(now.hh) * 60 + Number(now.mm);
  const open =
    !!today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes);

  return {
    clock: `${now.hh}:${now.mm}:${now.ss}`,
    open,
    label: open
      ? `Open now · until ${to12h(today!.closes)}`
      : "Closed now · Mon–Fri 8 AM–8 PM, Sat 8 AM–5 PM",
  };
}

export default function Footer() {
  const status = useClinicStatus();
  const reduce = useReducedMotion();

  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: number, o?: object) => void };
      }
    ).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#121214] text-[#F5EFDC]">
      {/* the flame CTA above burns down into the footer's night */}
      <div
        aria-hidden
        className="h-16 w-full md:h-20"
        style={{
          background:
            "linear-gradient(180deg, #ED5B2D 0%, #a8401f 34%, #3a1d13 66%, #121214 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-16 lg:px-12 lg:pt-20">
        {/* ---------- asymmetric 70 / 30 ---------- */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/[0.09] pb-14 lg:grid-cols-12 lg:gap-16 lg:pb-16">
          {/* left — the statement */}
          <div className="lg:col-span-8">
            {/* live status, derived from the clinic's real opening hours */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                {status?.open && (
                  <span
                    aria-hidden
                    className="soft-pulse absolute inline-flex h-full w-full rounded-full bg-[#8EA89D]"
                  />
                )}
                <span
                  className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                    status?.open ? "bg-[#8EA89D]" : "bg-[#8BA4BF]"
                  }`}
                />
              </span>
              <span
                suppressHydrationWarning
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#C9C5B8]"
              >
                {status?.label ?? "Indiranagar clinic · hours"}
              </span>
            </div>

            <h2 className="mt-7 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-white">
              {FOOTER.headline}{" "}
              <span className="accent-italic text-[#FF833C]">
                {FOOTER.headlineAccent}
              </span>
            </h2>

            <p className="mt-6 max-w-[46ch] font-sans text-sm leading-relaxed text-[#A8A49A]">
              {FOOTER.body}
            </p>

            {/* NAP — the local-search anchor, set as real editorial detail */}
            <address className="mt-9 grid max-w-[560px] grid-cols-1 gap-x-10 gap-y-5 not-italic sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7E7A72]">
                  The clinic
                </p>
                <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-[#E6E1D4]">
                  {CLINIC.street}
                  <br />
                  {CLINIC.city} {CLINIC.postalCode}, {CLINIC.region}
                </p>
                <p className="mt-1.5 font-sans text-[12.5px] text-[#8E8A81]">
                  Near {CLINIC.landmarks.join(" · ")}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7E7A72]">
                  Reach us
                </p>
                <a
                  href={`tel:${SITE.telephone.replace(/[^+\d]/g, "")}`}
                  className="mt-2 block font-sans text-[13.5px] text-[#E6E1D4] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#FF833C]"
                >
                  {SITE.telephone}
                </a>
                <p className="mt-1.5 font-sans text-[12.5px] leading-relaxed text-[#8E8A81]">
                  Mon–Fri 8 AM–8 PM
                  <br />
                  Saturday 8 AM–5 PM
                </p>
              </div>
            </address>
          </div>

          {/* right — one vertical stack, not a column dump */}
          <div className="flex flex-col justify-between lg:col-span-4 lg:border-l lg:border-white/[0.09] lg:pl-14">
            <nav aria-label="Footer">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7E7A72]">
                {FOOTER.navLabel}
              </p>
              <ul className="mt-5 space-y-0.5">
                {FOOTER.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group flex items-baseline py-2 font-serif text-[17px] text-[#E6E1D4] transition-colors duration-200 hover:text-white"
                    >
                      {/* rule grows out of nothing, so the labels stay flush
                          with the section label above them at rest */}
                      <span className="h-px w-0 self-center bg-[#FF833C] transition-all duration-300 group-hover:mr-2.5 group-hover:w-4" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={FOOTER.navCta.href}
                className="group mt-6 inline-flex items-center gap-2 border-b border-[#FF833C]/40 pb-1 font-sans text-sm font-medium text-[#FF833C] transition-colors hover:border-[#FF833C]"
              >
                {FOOTER.navCta.label}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </nav>

            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={reduce ? undefined : { scale: 1.03 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              style={{ willChange: "transform" }}
              className="mt-12 flex w-full items-center justify-between gap-4 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-4 text-left font-sans text-sm text-[#E6E1D4] transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08]"
            >
              <span>{FOOTER.backToTop}</span>
              <span aria-hidden className="font-mono text-xs text-[#FF833C]">
                ↑
              </span>
            </motion.button>
          </div>
        </div>

        {/* ---------- metadata bar ---------- */}
        <div className="flex flex-col gap-4 pt-7 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E7A72] md:flex-row md:items-center md:justify-between">
          <p>
            Indiranagar · IST{" "}
            <span
              suppressHydrationWarning
              className="ml-1 tabular-nums text-[#C9C5B8]"
            >
              {status?.clock ?? "--:--:--"}
            </span>
          </p>

          <p className="tracking-[0.14em]">
            © {new Date().getFullYear()} {FOOTER.copyright} · Meta Me
          </p>

          <div className="flex gap-6">
            {FOOTER.legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-[#C9C5B8]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
