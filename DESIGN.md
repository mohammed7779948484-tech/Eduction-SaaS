# DESIGN.md — Design Constitution

> Visual source of truth for humans and AI agents. Derived from the client DOCX,
> homepage reference image, and Phase 1 proposal (see `docs/SOURCE_OF_TRUTH.md`).
> Two layers: **A** machine-readable tokens, **B** human-readable rationale.

---

## Layer A — Machine-Readable Tokens

### Brand colors (raw — source: DOCX image1)

| Token | Hex | Role |
|-------|-----|------|
| `--brand-orange` | `#F2A23C` | CTA / conversion |
| `--brand-navy-dark` | `#06335C` | deepest navy (hero/footer) |
| `--brand-blue` | `#2C8FC0` | medium blue (secondary surface) |
| `--brand-teal` | `#37B0C3` | primary turquoise (brand accent/icons) |
| `--brand-navy` | `#0A4C82` | primary navy (structure/headings) |
| `--brand-grey-light` | `#D2DCE2` | borders/dividers |
| `--brand-grey-text` | `#56636E` | secondary text (darkened from DOCX `#6B7A86` for WCAG AA) |
| `--brand-ink` | `#2A3A47` | primary text |
| `--brand-bg` | `#F4F9FA` | page background |
| `--brand-teal-pale` | `#E1F0F3` | soft surface tint + teal text on navy |
| `--brand-teal-strong` | `#1F7D8C` | teal for TEXT on light surfaces (WCAG AA) |

### Semantic colors

| Token | Value | Tailwind utility |
|-------|-------|------------------|
| `--background` | `var(--brand-bg)` | `bg-background` |
| `--foreground` | `var(--brand-ink)` | `text-foreground` |
| `--card` / `-foreground` | `#FFF` / `--brand-ink` | `bg-card` / `text-card-foreground` |
| `--popover` / `-foreground` | `#FFF` / `--brand-ink` | `bg-popover` / `text-popover-foreground` |
| `--primary` / `-foreground` | `--brand-navy` / `#FFF` | `bg-primary` / `text-primary-foreground` |
| `--secondary` / `-foreground` | `--brand-teal-pale` / `--brand-navy` | `bg-secondary` |
| `--muted` / `-foreground` | `--brand-teal-pale` / `--brand-grey-text` | `bg-muted` / `text-muted-foreground` |
| `--accent` / `-foreground` | `--brand-teal` / `#FFF` | `bg-accent` / `text-accent-foreground` |
| `--cta` / `-foreground` | `--brand-orange` / `--brand-navy-dark` | `bg-cta` / `text-cta-foreground` |
| `--destructive` / `-foreground` | `#D64545` / `#FFF` | `bg-destructive` |
| `--success` | `#2F9E6F` | `bg-success` |
| `--border` | `--brand-grey-light` | `border-border` |
| `--input` | `--brand-grey-light` | `border-input` |
| `--ring` | `--brand-teal` | focus ring |

### Typography

| Token | Value |
|-------|-------|
| `--font-sans` | Tajawal (next/font, weights 400/500/700/800) |
| `--font-display` | Tajawal |
| Type scale | xs 12 · sm 14 · base 16 · lg 18 · xl 20 · 2xl 24 · 3xl 30 · 4xl 36 · 5xl 48 · 6xl 60 (rem) |
| Line height | tight 1.15 · snug 1.3 · normal 1.55 · relaxed 1.7 |
| Weights | regular 400 · medium 500 · bold 700 · extrabold 800 |
| Tracking | tight -0.02em · normal 0 · wide 0.02em |

### Radius

| Token | Value |
|-------|-------|
| `--radius` | `0.75rem` (12px) |
| sm/md/lg/xl/2xl | 8 / 10 / 12 / 16 / 20px |
| pill | 9999px (badges, tags) |

### Spacing (4px base)

1=4 · 2=8 · 3=12 · 4=16 · 6=24 · 8=32 · 12=48 · 16=64 · 20=80 · 24=96 (px)

### Containers

sm 640 · md 768 · lg 1024 · xl 1200 · 2xl 1320 (px) — homepage uses `2xl` (1320px) max.

### Shadows

| Token | Use |
|-------|-----|
| `--shadow-xs` | hairline elevation |
| `--shadow-sm` | cards default |
| `--shadow-md` | hover / raised cards |
| `--shadow-lg` | hero / modal |
| `--shadow-focus` | `0 0 0 3px rgb(55 176 195 / .35)` focus ring |

### Z-index

base 0 · header 1050 · dropdown 1000 · sticky 1100 · overlay 1200 · modal 1300 · toast 1400

### Breakpoints (Tailwind default)

sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 (px). Mobile-first.

### Motion

| Token | Value |
|-------|-------|
| Duration | instant .08s · fast .18s · normal .32s · slow .5s · slower .8s |
| Easing | standard `cubic-bezier(.4,0,.2,1)` · emphasized `cubic-bezier(.2,0,0,1)` · decel `cubic-bezier(0,0,.2,1)` · accel `cubic-bezier(.4,0,1,1)` · spring `cubic-bezier(.34,1.56,.64,1)` |
| Stagger | fast .06s · normal .1s · slow .14s |
| Framer presets | reveal, stagger, hover-lift, count-up (see `src/lib/motion/presets/`) |
| GSAP | hero-timeline, scroll-scenes (see `src/lib/gsap/`) |

### Icon sizes

16 (inline) · 20 (UI) · 24 (section) · 32 (feature) · 48 (hero) (px). Lucide.

### Image aspect ratios

hero 4:3 / 1:1 · channel card 16:9 · testimonial avatar 1:1 · og 1.91:1.

---

## Layer B — Human-Readable Design Rationale

### Brand personality
Trustworthy, educational, warm, precise. A premium children's mental-arithmetic program rooted in the Soroban tradition but presented with modern clarity. The brand already owns a strong logo; the site extends it into a coherent digital language — it does not reinvent it.

### Audience
Parents (primary decision-makers, need trust + proof), children 7–12 (end learners, need warmth), schools (institutional partners, need credibility), prospective trainers, institutional partners.

### Desired emotional response
"I can trust this program with my child's mind." Confidence + warmth + clarity in the first seconds.

### Arabic typography direction
Arabic-first. **Tajawal** selected over Cairo, IBM Plex Sans Arabic, Noto Naskh Arabic:
- **Tajawal** (chosen): clean modern geometric sans, excellent small-size legibility, weights 200–900, warm approachable feel suited to children's education, strong Latin fallback. Matches the reference's "modern clean sans" direction.
- Cairo: good but less distinctive at display sizes.
- IBM Plex Sans Arabic: excellent but corporate-cold for a kids' brand.
- Noto Naskh: traditional, best for body but not "modern brand".
Loaded via `next/font/google` (self-hosted at build, `display: swap`, `subsets: ["arabic","latin"]`).

Numbers: Latin digits used for statistics in the prototype (clarity for mixed audiences); tabular-nums enabled. Arabic-Indic digits available for fully localized future content.

### Visual hierarchy
1. Hero headline (extrabold, navy/white, 5xl→6xl) — the promise.
2. Section H2 (extrabold navy, 3xl, centered or start-aligned) — structure.
3. Stat numbers (extrabold, 4xl+, navy/teal) — proof.
4. Body (regular, ink/grey-text, 1.7 line-height) — explanation.
5. Captions/labels (sm, grey-text) — context.

### Color roles & when to use each
- **Navy `--brand-navy` / `--brand-navy-dark`**: trust, structure. Hero background, footer, headings, primary buttons, deep section accents.
- **Teal `--brand-teal`**: brand identity, growth, clarity. Icons, active states, links, accents, progress, focus rings (`--ring`).
- **Orange `--cta`**: warmth + urgency — **conversion CTAs only** (book trial, register). Dark navy text on orange for contrast. Never decorative, never on non-conversion elements.
- **Medium blue `--brand-blue`**: secondary surface variation (e.g. a channel card variant).
- **Teal-pale `--brand-teal-pale` / icy `--brand-bg`**: soft section backgrounds, muted surfaces.
- **Neutrals**: text hierarchy (`--brand-ink` → `--brand-grey-text`), borders (`--brand-grey-light`).

### When to use the orange CTA color
Only on the single primary conversion action per screen: "احجز حصة تجريبية" (book a trial) in hero + final CTA banner. Secondary actions use navy primary or ghost. Never more than one orange CTA per visible viewport.

### Section-background alternation
Alternate icy `--background` ↔ white `--card` surfaces to create rhythm. Navy reserved for hero + footer (bookends). Stats strip uses a pale tint. Final CTA uses orange (the conversion crescendo).

### Card language
White surface, `--brand-grey-light` border (1px), 12px radius, `--shadow-sm` default → `--shadow-md` on hover. Two-column (visual + content) for channel/step cards. Equal-height grid rows.

### Button hierarchy
1. **Primary** — navy fill, white text (`bg-primary`). Confirmations, main non-conversion actions.
2. **CTA** — orange fill, navy-dark text (`bg-cta`). The conversion action. Most prominent.
3. **Secondary** — teal-pale fill, navy text (`bg-secondary`). Alternate/tertiary.
4. **Ghost/Outline** — teal border, transparent. "اعرف المزيد" / dismiss.

### Photography direction
No stock-photo clichés. Prefer: CSS/SVG abacus-inspired graphics, abstract bead/rod motifs, geometric educational patterns. If photography is later added: bright, authentic children concentrating on Soroban, warm natural light. Keep centralized + replaceable.

### Illustration direction
Geometric, brand-token-colored, abacus-derived (beads, rods, frames). Flat with subtle depth. Never cartoonish.

### Abacus-inspired graphic language
The abacus is the brand's core metaphor: beads (circles), rods (vertical lines), frames (rounded rects). Reuse across: favicon, logo glyph, hero visual, step-card icons, section dividers, progress indicators. Built from brand tokens (navy frame, teal/orange beads).

**Reusable abacus-language patterns (Phase 1.5, demonstrated in `/design-system`):**
- **`BeadBadge`** (`src/components/brand/bead-badge.tsx`) — bead-shaped number/label badge. Tones: teal (`bg-brand-teal-strong` for AA), orange (CTA-only), navy, pale. Sizes sm/md/lg. Used in: step numbers.
- **`RailDivider`** (`src/components/brand/rail-divider.tsx`) — abacus-rod-inspired section divider (thin rail + evenly-spaced beads, low opacity). Tones: teal, navy, muted. Decorative (aria-hidden). Used in: section transitions.
- **`ChannelIllustration`** (`src/components/brand/channel-illustration.tsx`) — 3 lightweight branded SVGs (center=building, school=book, screen=monitor-with-beads). Token-driven, aria-hidden. Used in: channel cards.

**Restraint rule:** the abacus appears in the hero (signature) + subtle motifs (bead badges, rail dividers, card accents) — NOT in every section. Visual unity, not repetition.

### Icon rules
Lucide icons, brand-teal by default on light surfaces, white on navy. Sizes per context (16/20/24/32). Never recolor to non-brand colors. Icon + label pairs for nav.

### Spacing rhythm
8px base grid. Section vertical padding: 64px mobile / 96px desktop. Card padding: 24px (p-6). Grid gaps: 16px mobile / 24px desktop. Generous whitespace = premium feel.

### Responsive behavior
Mobile-first. Single column < md; 2-col at md; 3–4-col at lg+. Hero stacks (visual above copy) on mobile, side-by-side lg+. Stats: 2x2 mobile → 4x1 lg. Channels: 1 → 3. Testimonials: carousel always (1 visible mobile, peek desktop). Header collapses to Sheet nav < lg. No horizontal overflow at any width.

### RTL behavior
`dir="rtl"` on `<html>`. All layouts mirror. Nav starts from the right. Carousels advance leftward. Progress fills right-to-left. Icons that imply direction (chevrons, arrows) are flipped. Numbers remain LTR within RTL text where needed. Logical utilities (`ps/pe/ms/me/start/end`) everywhere.

### Framer Motion philosophy
Motion supports content, never obstructs. Use for: section reveals on viewport enter, staggered card entrances, carousel transitions, hover lift, stat count-up. Durations from tokens (normal .32s). Easing emphasized/standard. All wrapped in `prefers-reduced-motion` fallback (content appears instantly). No character-level Arabic animation — animate by line/word-group/block.

### GSAP limitations
Only the hero timeline (coordinated entrance: headline → subhead → CTAs → visual) and the abacus signature animation. Centralized in `src/lib/gsap/` with `useGSAP` scope + cleanup. Reduced-motion: timeline skipped, final state shown. Never for ordinary reveals/buttons/cards.

### Accessibility
- Contrast (measured): ink `#2A3A47` on white ≈ 11.4:1; navy `#0A4C82` on white ≈ 8.8:1; grey-text `#56636E` on white ≈ 5.0:1; teal-strong `#1F7D8C` on white ≈ 4.6:1 (teal for text on light); teal-pale `#E1F0F3` on navy ≈ 7.6:1 (teal text on navy); navy-dark `#06335C` on orange `#F2A23C` ≈ 6.1:1 (CTA text). All ≥ WCAG AA. Teal `#37B0C3` is reserved for fills/icons-on-dark, never text on light.
- Focus: visible `--ring` (teal) outline, 2px offset.
- Touch targets ≥ 44px.
- Semantic landmarks; ARIA where needed; alt text (Arabic).
- Reduced-motion: global CSS rule nullifies animations; components also check `useReducedMotion`.

### Reduced-motion behavior
Site remains fully attractive and usable with all motion disabled. Reveals show final state; count-ups show final number; hero shows composed static layout; carousel is still operable.

### Anti-patterns (forbidden)
- Raw brand hex in components (`#37B0C3` in a section = wrong; `bg-brand-teal` = right).
- Generic SaaS indigo/blue gradients.
- Random floating glass cards.
- Excessive parallax / scroll hijacking.
- Animation that delays content access.
- Character-by-character Arabic animation.
- Flat-image recreation of the homepage (must be real HTML/CSS).
- More than one orange CTA per viewport.
- Physical `left/right` CSS in RTL context.
- Cartoonish mascots / stock-photo clichés.

### Correct examples
- Hero: navy rounded panel, right-side Arabic headline + orange CTA + ghost secondary, left-side SVG abacus visual — GSAP timeline entrance, reduced-motion shows static.
- Stat strip: 4 numbers, tabular-nums, count-up on viewport, grey labels.
- Channel card: white surface, top visual band (navy/blue/teal variant), title + arrow, hover-lift.

### Incorrect examples
- `style={{ background: '#0A4C82' }}` in a section → use `bg-primary`.
- Framer `duration: 0.7` inline → use `--motion-slow` token via preset.
- `<p dir="ltr">` forcing LTR in Arabic flow.
- Two orange buttons in the hero.
