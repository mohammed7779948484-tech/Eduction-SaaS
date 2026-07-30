# Asset Guidelines

## Folders
```
public/
├── brand/         # logo, favicon, brand marks
├── images/        # photographic / raster imagery
├── illustrations/ # SVG illustrations, abacus graphics
└── icons/         # custom SVG icons (Lucide used inline for UI icons)
```

## Logo
- Client vector logo **not yet provided**. Prototype uses a typographic + abacus-glyph logo treatment built from brand tokens (`src/components/brand/logo.tsx`).
- Easy to replace: when client supplies vector, drop into `public/brand/` and update the Logo component.
- Never use the scaffold Z.ai logo.

## Imagery direction
- **Prefer CSS/SVG abacus-inspired graphics** over stock photos (beads, rods, frames, geometric educational patterns).
- Avoid generic educational stock-photo clichés.
- If photography is added later: bright, authentic children concentrating on Soroban, warm natural light.
- All imagery centralized + replaceable.
- Meaningful **Arabic alt text** on every image.

## Abacus-inspired graphic language
The abacus is the core brand metaphor. Reuse across favicon, logo glyph, hero visual, step icons, dividers, progress. Built from brand tokens (navy frame, teal/orange beads). SVGs inline or in `public/illustrations/`.

## Icons
- UI icons: **Lucide** (`lucide-react`), brand-teal on light / white on navy.
- Custom SVGs in `public/icons/` only when Lucide lacks what's needed.
- Sizes: 16 inline / 20 UI / 24 section / 32 feature / 48 hero.

## Asset inventory (to maintain)
| Asset | Location | Source | Status |
|-------|----------|--------|--------|
| Favicon (abacus) | `public/brand/favicon.svg` | Built from tokens | ✓ |
| Logo (typographic+glyph) | `src/components/brand/logo.tsx` | Built from tokens | Placeholder (replace w/ client vector) |
| Hero abacus visual | `src/components/sections/hero` (SVG) | Built from tokens | ✓ |
| DOCX extracted images | `upload/extracted/image1–4.png` | Client DOCX | Reference only (not shipped) |

## Optimization
- `sharp` retained for `next/image` optimization.
- Prefer SVG over raster where possible.
- Lazy-load below-the-fold images.
