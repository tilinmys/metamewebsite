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
      : "Closed now · opens 8 AM",
  };
}

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ext = isExternal(href);
  return (
    <a
      href={href}
      {...(ext && !href.startsWith("mailto:") && !href.startsWith("tel:")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="group inline-flex w-fit items-center gap-1.5 py-[5px] font-sans text-[13.5px] text-[#B9B4A8] transition-colors duration-200 hover:text-white"
    >
      <span className="h-px w-0 bg-[#FF833C] transition-all duration-300 group-hover:w-3.5" />
      <span className="-ml-1.5 transition-all duration-300 group-hover:ml-0">
        {children}
      </span>
    </a>
  );
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

  const tel = `tel:${SITE.telephone.replace(/[^+\d]/g, "")}`;

  return (
    <footer className="relative overflow-hidden bg-[#121214] text-[#F5EFDC]">
      {/* the flame CTA above burns down into the footer's night */}
      <div
        aria-hidden
        className="h-16 w-full md:h-20"
        style={{
          background:
            "linear-gradient(180deg, #ED5B2D 0%, #a8401f 34%, #3a1d13 66%, #121214 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 pt-14 lg:px-12 lg:pt-20">
        {/* ── identity + link columns ──────────────────────────────── */}
        <div className="grid gap-x-12 gap-y-12 border-b border-white/[0.08] pb-14 lg:grid-cols-12 lg:gap-y-0 lg:pb-16">
          {/* left — who this is */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl leading-none tracking-[-0.01em] text-white">
                Meta&nbsp;Me
              </span>
              <span className="h-4 w-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8E8A81]">
                a My Stree program
              </span>
            </div>

            <p className="mt-5 max-w-[40ch] font-sans text-[13.5px] leading-relaxed text-[#A8A49A]">
              {FOOTER.blurb}
            </p>

            {/* live status, derived from the clinic's real opening hours */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5">
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

            {/* NAP — the local-search anchor */}
            <address className="mt-7 not-italic">
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
              <a
                href={tel}
                className="mt-3 inline-block font-sans text-[13.5px] text-[#E6E1D4] underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-[#FF833C]"
              >
                {SITE.telephone.replace(/-/g, " ")}
              </a>
              <p className="mt-1 font-sans text-[12.5px] text-[#8E8A81]">
                Mon–Fri 8 AM – 8 PM · Sat 8 AM – 5 PM
              </p>
            </address>
          </div>

          {/* right — three columns, evenly weighted */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7 lg:gap-x-10">
            {FOOTER.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="font-display text-lg leading-none text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 flex flex-col">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ── closing invitation + back to top ─────────────────────── */}
        <div className="flex flex-col gap-6 py-9 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={FOOTER.cta.href}
            className="group inline-flex items-center gap-2.5 self-start rounded-full bg-[#ED5B2D] px-6 py-3 font-sans text-sm font-medium text-white transition-colors duration-200 hover:bg-[#d94f24]"
          >
            {FOOTER.cta.label}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="inline-flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E8A81] transition-colors hover:text-[#F5EFDC] sm:self-auto"
          >
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[#FF833C]"
            >
              ↑
            </span>
            Back to top
          </motion.button>
        </div>

        {/* ── meta bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 border-t border-white/[0.08] py-7 font-mono text-[10px] uppercase tracking-[0.16em] text-[#7E7A72] md:flex-row md:items-center md:justify-between">
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
            © {new Date().getFullYear()} {FOOTER.copyright}
          </p>

          <div className="flex gap-6">
            {FOOTER.legal.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[#C9C5B8]"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── the closing wordmark — spans the full width, edges just kissed ── */}
      <div
        aria-hidden
        className="pointer-events-none relative w-full select-none overflow-hidden pt-9 lg:pt-12"
      >
        <div className="relative left-1/2 w-max -translate-x-1/2">
          <span
            className="block whitespace-nowrap font-sans font-semibold leading-[0.85] text-[#F5EFDC]"
            style={{
              fontSize: "clamp(3.25rem, 26.5vw, 27rem)",
              letterSpacing: "-0.04em",
              marginBottom: "-0.04em",
            }}
          >
            {FOOTER.wordmark}
          </span>
        </div>
      </div>
    </footer>
  );
}
