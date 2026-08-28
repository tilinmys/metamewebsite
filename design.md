# Meta Me — design.md

Single-page program site for **Meta Me**, a preventive-health program by **My Stree**.
No navbar (the main My Stree site owns navigation). One thought per screen.

## Palette — from *My Stree Final Corp Identity.pdf* (p.5)

| Token       | Hex       | Where it's allowed                                                        |
| ----------- | --------- | ------------------------------------------------------------------------ |
| `paper`     | `#FCF4D9` | Page canvas (Corn Silk)                                                   |
| `ink`       | `#282828` | All text, at any size — 13:1 on paper                                     |
| `flame`     | `#ED5B2D` | Rules, borders, icon strokes, **display text ≥ 24px**, decorative fills   |
| `rust`      | `#B4370F` | Flame for **body-size text + links** — 5.2:1 on paper                     |
| `sienna`    | `#EF6A40` | Decorative fills only (fails text contrast)                               |
| `pumpkin`   | `#FF833C` | Decorative on light; **usable as text on the dark section** (5.6:1)       |
| `cadet`     | `#8BA4BF` | Line-icon strokes, hairlines, cool marks — **never body text on paper**   |
| `cadetDeep` | `#4A6076` | Cadet as text when needed — 5.5:1 on paper                                |
| `uranian`   | `#BFE2FE` | Soft fills; accent on the dark section                                    |

**Contrast rules (the "faded letters" fix):**
- Every label / eyebrow / caption is `ink` or `rust`. Never `cadet`, never `flame`, never low-opacity on small text.
- `flame` as text only for headings ≥ 24px. Links and small accents use `rust`.
- Primary button: `ink` fill + `paper` text (12:1). One `flame`-filled button on the final CTA uses `#BE3A12` under `paper` text (5.3:1).
- Dark section (`ink` bg): text is `paper` / `paper`@72% / `pumpkin` / `cadet` — all ≥ 4.5:1.

## Type — editorial serif stack (no sans, no Inter)

| Token          | Face                     | Use                                             |
| -------------- | ------------------------ | ----------------------------------------------- |
| `font-serif`   | **Newsreader** 400/500   | Body, working headlines, labels (small-caps)    |
| `font-display` | **Instrument Serif** 400 | Oversized hero / section display                 |
| `font-script`  | **Playfair Display** *italic* | One expressive accent line per section     |

Body 17px / 1.65. Headlines `line-height` 1.03–1.18, `letter-spacing` −0.015em. Labels 12px, `letter-spacing` 0.16em, uppercase.

## Spacing & rhythm

8px grid (Tailwind even steps). **Sections are tight:** `py-16 md:py-20` (64 / 80px), not 128. Container `max-w-container` 1200px, gutters `px-5 md:px-10`. Hairline `1px rgba(40,40,40,0.12)` between sections.

## Section colour map (deliberate contrast, whole palette)

| Section            | Background            | Accents in play                          |
| ------------------ | -------------------- | --------------------------------------- |
| Hero               | `paper` + cool→warm colour field (`uranian` glow → `pumpkin` glow), drifting `cadet` petal motif | `ink` image panel, `flame` stat rule, `rust` text |
| What we check      | `white`              | `flame` self-drawing top rule, `uranian` number pills, `cadet` icons |
| How it works       | `ink` + contours photo + `uranian` glow | `flame` progress fill, `pumpkin` step numbers |
| Who it's for       | `mist` (pale Uranian) | `cadet` petal, `flame` audience marks, `ink` kiosk band |
| Start — tiers      | `white`              | `flame` + `cadet` tier rules, `blush` fill on the featured tier |
| Start — closing CTA | `flame` (full-bleed) | `black` text (7:1), `paper` button      |
| Footer             | `ink`                | `paper` text                            |

## Layout blueprint (asymmetric, mobile-first)

1. **Hero** — split. Text constrained left (56%), serum image as a full-height `ink` panel bleeding to the right edge (a band below the text on mobile), gentle scroll parallax. Count-up stat is a typographic block with a flame rule — not a card. Colour field + petal motif + grain + scroll cue.
2. **What we check** — `white` + the `bg_desk_deck` paper wash (`mix-blend-multiply`, 80%). A horizontal **"desk deck"** of 11 specimen cards (`ElevenPillarsDeck.tsx`): each card has an organic resting tilt, pops up on hover/tap via spring transform (`stiffness 350, damping 25`) — **no reflow, transform only**. Mouse drag-to-scroll on desktop, native swipe on mobile, proximity snap. Cards carry a mono index pill, a coloured line icon in a Silk-tint well, a serif title, a 3-line clamp, and a JetBrains Mono telemetry strip (markers + status, `cadetDeep` for AA contrast). A quiet 520Hz Web-Audio tick on interaction (debounced, unlocked on first gesture, silent under reduced-motion).
3. **How it works** — 38/62, sticky progress rail (fills with flame as you scroll, no dot), 5 steps scroll past. The dark centre of the page.
4. **Who it's for** — `mist`. Copy left (62%), 2-column audience list right, each item staggers in. Full-bleed dark kiosk band below with x-parallax.
5. **Start** — tiers on `white` (editorial rows, Annual on a `blush` fill), then a full-bleed `flame` closing block with the final CTA.

## Motion

- Entrance: `spring(100, 15)`, `y: 16 → 0`, `opacity 0 → 1`, `viewport once, -80px`. Everything.
- Count-up stat: `IntersectionObserver` + exponential ease-out, MotionValue (no re-render).
- Journey rail: `useScroll` → `useSpring(60, 20)` → fill height. No marker dot.
- Kiosk band: `x: -32 → 0` spring.
- `prefers-reduced-motion`: opacity only, no travel, no scrub, stat jumps to final.
- **No** backdrop-blur / glass, **no** navbar, **no** marker-dot slider gadget.
