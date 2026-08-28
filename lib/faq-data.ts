/**
 * Section 5 — FAQ intelligence directory.
 *
 * Each cluster owns a full-bleed portal image. Each question opens a "dossier"
 * modal: an expanded answer, a stack of location-aware sub-questions written for
 * answer-engine (AEO) + local-search (SEO) coverage around Indiranagar,
 * Bengaluru, plus a reviewer note.
 */

export const CLINIC = {
  name: "Meta Me — by My Stree",
  street: "2nd Floor, 13th Main, Indiranagar",
  locality: "Indiranagar",
  city: "Bengaluru",
  region: "Karnataka",
  postalCode: "560038",
  country: "IN",
  areaServed: ["Indiranagar", "Bengaluru", "Karnataka", "Tier 2 & Tier 3 India"],
  landmarks: ["100 Feet Road", "CMH Road", "Indiranagar Metro"],
};

export type SubFAQ = { q: string; a: string };

export type FAQItem = {
  q: string;
  a: string;
  dossier: {
    kicker: string;
    lead: string;
    sub: SubFAQ[];
    aside?: { label: string; rows: { k: string; v: string }[] };
    review: { quote: string; name: string; meta: string };
  };
};

export type FAQCluster = {
  id: string;
  tab: string;
  rail: string;
  heading: string;
  portal: string;
  items: FAQItem[];
};

export const FAQ_CLUSTERS: FAQCluster[] = [
  {
    id: "01",
    tab: "Clinical model",
    rail: "The clinical model",
    heading: "Preventive intelligence & architecture",
    portal: "/images/faq_portal_01.webp",
    items: [
      {
        q: "What is Meta Me and how does it work?",
        a: "Meta Me is My Stree's preventive-health intelligence programme. It screens eleven biological systems at once for early metabolic, hormonal and cellular risk, then converts that biomarker data into a personalised, physician-guided lifestyle roadmap.",
        dossier: {
          kicker: "Clinical model",
          lead: "Meta Me evaluates eleven biological systems in a single session — metabolic, cardiovascular, endocrine, renal-hepatic, skeletal, body composition, micronutrient, immune, gut, sleep-stress and fitness. A clinician reads the panel as one picture, not eleven isolated numbers, and issues a written roadmap of nutrition, movement, sleep, supplement and, where indicated, medical steps. Progress is then tracked longitudinally against your own baseline.",
          sub: [
            {
              q: "Where can I do a Meta Me preventive health screening in Indiranagar?",
              a: "Meta Me runs from the My Stree clinic at 2nd Floor, 13th Main, Indiranagar, Bengaluru 560038 — a short walk from 100 Feet Road, CMH Road and Indiranagar Metro. Assessments are by appointment; kiosk and teleconsult options extend the same programme beyond the clinic.",
            },
            {
              q: "Is Meta Me a diagnostic lab or a preventive programme?",
              a: "It is a preventive programme. Lab investigations are one input; the value is the clinician interpretation, the intervention plan and the longitudinal tracking that a standalone Indiranagar diagnostic lab does not provide.",
            },
            {
              q: "Which conditions does the Meta Me model aim to delay or prevent?",
              a: "Type-2 diabetes, cardiovascular disease, fatty-liver progression, osteoporosis, thyroid and adrenal dysfunction, sarcopenia, and the chronic low-grade inflammation that accelerates most age-related disease.",
            },
          ],
          aside: {
            label: "Standard check-up vs Meta Me",
            rows: [
              { k: "Biomarkers read together", v: "one at a time / 11 systems" },
              { k: "Clinician interpretation", v: "brief / 45-minute review" },
              { k: "What you leave with", v: "a PDF / a written plan" },
              { k: "Follow-up", v: "none / scheduled re-checks" },
            ],
          },
          review: {
            quote:
              "I'd had 'normal' reports for years. Meta Me was the first time someone in Indiranagar actually connected the dots and gave me a plan I could follow.",
            name: "Adarsh Vinayak",
            meta: "34 · Indiranagar, Bengaluru",
          },
        },
      },
      {
        q: "Is Meta Me only for women?",
        a: "No. My Stree began in specialised women's health, but Meta Me is gender-neutral — open to women, men, couples, families, campuses and corporate workplaces.",
        dossier: {
          kicker: "Who it's for",
          lead: "My Stree built its clinical depth in women's health; Meta Me opens that same preventive engine to everyone. The screening, the clinicians and the roadmap are identical regardless of gender — panels are simply weighted to your physiology, age and history.",
          sub: [
            {
              q: "Can couples or families book a Meta Me assessment together in Indiranagar?",
              a: "Yes. Family and couple slots are available at the Indiranagar clinic, and a shared longitudinal record lets a clinician see household patterns — useful where cardiac or metabolic risk runs in the family.",
            },
            {
              q: "Is there a preventive health check for men near Indiranagar?",
              a: "Meta Me is one of the few dedicated preventive-health programmes for men in the Indiranagar–CMH Road area, covering cardiovascular particle risk, metabolic health, testosterone and body composition.",
            },
          ],
          review: {
            quote:
              "My wife and I did our screenings together at the Indiranagar clinic. Same clinician, one conversation — it made the follow-through much easier.",
            name: "Tilin Bijoy",
            meta: "38 · Indiranagar, Bengaluru",
          },
        },
      },
    ],
  },
  {
    id: "02",
    tab: "Silent indicators",
    rail: "Silent indicators",
    heading: "Early biomarker & symptom detection",
    portal: "/images/faq_portal_02.webp",
    items: [
      {
        q: "How does Meta Me detect diabetes risk before diagnosis?",
        a: "Metabolic dysfunction builds for eight to ten years before diabetes shows on a standard fasting test. Meta Me reads early insulin resistance, HOMA-IR and glucose-velocity markers so the trajectory can be changed while it is still reversible.",
        dossier: {
          kicker: "Silent indicators",
          lead: "A fasting glucose only moves once compensation has failed. Meta Me looks upstream — fasting insulin, HOMA-IR, triglyceride-to-HDL ratio, HbA1c trend and post-meal glucose velocity — to catch insulin resistance in the reversible window, often years before a formal pre-diabetes label.",
          sub: [
            {
              q: "Where can I get an early insulin-resistance test in Indiranagar?",
              a: "The Meta Me panel at the Indiranagar clinic includes fasting insulin and HOMA-IR as standard, which most routine Bengaluru health packages leave out. Continuous-glucose monitoring can be added.",
            },
            {
              q: "I have a family history of diabetes — what preventive check should I do in Bengaluru?",
              a: "Book the Meta Me metabolic assessment. With a first-degree family history, a clinician will typically add an oral glucose tolerance test with insulin and set a 90-day re-check.",
            },
            {
              q: "How often should I re-screen metabolic markers?",
              a: "Every six to twelve months if markers are drifting, annually if stable. Meta Me schedules the re-check and compares each result to your own history rather than a population range.",
            },
          ],
          review: {
            quote:
              "My HOMA-IR was flagged before anything showed on a normal report. Six months of the plan and it was back in range.",
            name: "Adarsh Vinayak",
            meta: "34 · Indiranagar, Bengaluru",
          },
        },
      },
      {
        q: "Why am I always tired when my blood tests are normal?",
        a: "Persistent fatigue is often driven by factors standard panels miss — subclinical thyroid drift, iron or B12 gaps, disrupted sleep architecture, and low-grade inflammation.",
        dossier: {
          kicker: "Unexplained fatigue",
          lead: "A 'normal' basic panel rules out very little. Meta Me profiles the common hidden drivers together: ferritin and active B12, free T3/T4 and TSH trend, 25-OH vitamin D, RBC magnesium, hs-CRP, and overnight HRV and sleep-stage data from a wearable.",
          sub: [
            {
              q: "Which clinic in Indiranagar tests for causes of chronic fatigue?",
              a: "Meta Me at My Stree, Indiranagar runs a dedicated fatigue work-up — thyroid, iron studies, B12, vitamin D, inflammation and sleep architecture — read together by a clinician in one visit.",
            },
            {
              q: "Can Meta Me tell if my fatigue is thyroid-related before it shows on TSH?",
              a: "Often, yes. Subclinical thyroid drift shows in the free T3/T4 ratio and antibody status before TSH crosses a threshold.",
            },
          ],
          review: {
            quote:
              "Three doctors said my bloods were fine. Meta Me found a B12 floor and early thyroid drift in one sitting.",
            name: "Tilin Bijoy",
            meta: "38 · Indiranagar, Bengaluru",
          },
        },
      },
    ],
  },
  {
    id: "03",
    tab: "Protocols",
    rail: "Screening protocols",
    heading: "Screening mechanics & wearable sync",
    portal: "/images/faq_portal_03.webp",
    items: [
      {
        q: "What does a Meta Me assessment include?",
        a: "A comprehensive biomarker panel, lifestyle profiling, and a 45-minute clinical consultation that assembles your actionable preventive roadmap.",
        dossier: {
          kicker: "The assessment",
          lead: "One visit, about forty-five minutes with the clinician plus the lab draw. You leave with a written roadmap; results and the plan are also in your digital record. Re-assessment cadence is set to your risk — typically every six to twelve months.",
          sub: [
            {
              q: "How long does a Meta Me screening take at the Indiranagar clinic?",
              a: "Plan for one visit: a 10–15 minute lab draw and a 45-minute clinician consultation. The Indiranagar clinic runs morning and evening slots on 13th Main.",
            },
            {
              q: "Do I need to fast before my Meta Me appointment in Bengaluru?",
              a: "Yes — a 10–12 hour overnight fast for the metabolic and lipid markers. Water and regular medication are fine unless your clinician advises otherwise.",
            },
            {
              q: "Is Meta Me a one-time test or an ongoing membership?",
              a: "Both exist. Most people start with a one-time screen, then move to an annual membership with two screenings a year and follow-up between visits.",
            },
          ],
          aside: {
            label: "What a session covers",
            rows: [
              { k: "Lab draw", v: "10–15 min" },
              { k: "Clinician consult", v: "45 min" },
              { k: "Written roadmap", v: "same day" },
              { k: "First re-check", v: "90 days – 12 months" },
            ],
          },
          review: {
            quote:
              "Booked an evening slot near CMH Road, done in under an hour, and the plan actually made sense.",
            name: "Adarsh Vinayak",
            meta: "34 · Indiranagar, Bengaluru",
          },
        },
      },
      {
        q: "Does it integrate with my wearable?",
        a: "Yes. Meta Me syncs with health wearables to fold daily sleep architecture, HRV stability and activity trends into your longitudinal clinical profile.",
        dossier: {
          kicker: "Wearable sync",
          lead: "Between visits, your clinical picture keeps updating. Meta Me reads sleep stages, overnight HRV, resting heart rate and activity load from common wearables and rings, so a clinician can see whether the plan is landing without waiting for the next blood draw.",
          sub: [
            {
              q: "Which wearables work with Meta Me?",
              a: "Most major watches and rings that export sleep, HRV and activity data. Bring your device or app login to the Indiranagar appointment and it is linked during onboarding.",
            },
            {
              q: "Can wearable data replace a blood test?",
              a: "No — it complements it. Trends flag when to bring a re-check forward; the blood panel remains the anchor.",
            },
          ],
          review: {
            quote:
              "Linking my ring meant my clinician spotted a stress-load spike and adjusted the plan before my next visit.",
            name: "Tilin Bijoy",
            meta: "38 · Indiranagar, Bengaluru",
          },
        },
      },
    ],
  },
  {
    id: "04",
    tab: "Campus access",
    rail: "Campus & kiosk access",
    heading: "Decentralised kiosks & corporate care",
    portal: "/images/faq_portal_04.webp",
    items: [
      {
        q: "How do I access Meta Me outside major cities?",
        a: "Through assisted screening kiosks and teleconsultation across Tier 2 and Tier 3 cities, campuses and workplaces — with referral upward when specialist care is needed.",
        dossier: {
          kicker: "Decentralised access",
          lead: "The Indiranagar clinic is the hub; the kiosk model is the reach. Assisted digital screening and teleconsultation bring the same panels and the same clinicians to campuses, workplaces and smaller cities, with referral to Bengaluru when specialist input is needed.",
          sub: [
            {
              q: "Is the Meta Me clinic near Indiranagar Metro?",
              a: "Yes — the My Stree clinic on 13th Main is within walking distance of Indiranagar Metro and 100 Feet Road, with the kiosk network covering areas without a dedicated preventive clinic.",
            },
            {
              q: "Can my company run Meta Me screenings on-site instead of at Indiranagar?",
              a: "Yes. Corporate cohorts can be screened at your office with an on-site kiosk and clinician review, then followed up digitally — no need for the whole team to travel to Indiranagar.",
            },
            {
              q: "Do you cover Tier 2 and Tier 3 cities in Karnataka?",
              a: "Kiosk-based screening and teleconsult extend across Tier 2 and Tier 3 Karnataka, with the Indiranagar clinicians reading results and escalating to Bengaluru specialists where required.",
            },
          ],
          review: {
            quote:
              "Our office ran a Meta Me kiosk day. Same-quality screening as the Indiranagar clinic, no one lost a working morning.",
            name: "Adarsh Vinayak",
            meta: "34 · HR lead, Bengaluru",
          },
        },
      },
      {
        q: "Do you run corporate wellness programmes?",
        a: "Yes. Meta Me delivers decentralised corporate programmes with on-site kiosk diagnostics, clinician review and ongoing health tracking for whole teams.",
        dossier: {
          kicker: "Corporate & campus",
          lead: "A cohort programme: on-site or kiosk screening, individual clinician roadmaps, aggregate (anonymised) reporting for the organisation, and scheduled re-checks. Built for Bengaluru tech and campus populations where metabolic and stress risk shows early.",
          sub: [
            {
              q: "How do we set up a corporate Meta Me programme in Bengaluru?",
              a: "Talk to the team at the Indiranagar clinic. A typical rollout is a kiosk day on-site, individual reports within a week, and a quarterly aggregate review.",
            },
            {
              q: "Is employee data shared with the employer?",
              a: "No. Individuals get their own results and plan; the organisation only sees anonymised, aggregate trends.",
            },
          ],
          review: {
            quote:
              "The aggregate report told us where to focus wellbeing spend. The individual plans meant people actually engaged.",
            name: "Tilin Bijoy",
            meta: "38 · People team, Bengaluru",
          },
        },
      },
    ],
  },
];

/* ---------- schema.org ----------
 * FAQPage only. The MedicalClinic / Organization / WebSite graph lives in
 * lib/site.ts (siteSchema) and is injected once, site-wide, from the layout.  */
export function faqSchema() {
  const questions = FAQ_CLUSTERS.flatMap((c) =>
    c.items.flatMap((item) => [
      {
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      },
      ...item.dossier.sub.map((s) => ({
        "@type": "Question",
        name: s.q,
        acceptedAnswer: { "@type": "Answer", text: s.a },
      })),
    ]),
  );
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-IN",
    about: {
      "@type": "MedicalBusiness",
      name: CLINIC.name,
      areaServed: CLINIC.areaServed,
    },
    mainEntity: questions,
  };
}
