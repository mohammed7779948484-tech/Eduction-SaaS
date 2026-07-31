# Dependency Audit

> Classification of every important dependency, with proposed + final action.
> Executed after `REPOSITORY_AUDIT.md`. Lockfile integrity preserved (Bun only).

---

## 1. Classification Summary

| Class | Count | Examples |
|-------|-------|----------|
| Keep | 27 | next, react, framer-motion, retained Radix, sonner, zod, sharp |
| Remove | 33 | prisma, next-auth, @tanstack/*, recharts, cmdk, vaul, date-fns, … |
| Add | 2 | gsap, @gsap/react |
| Conditional | 3 | sharp (keep), zustand (remove→use Context), z-ai-web-dev-sdk (keep) |

## 2. Keep (with reason)

| Dependency | Why kept | Imported by |
|------------|----------|-------------|
| next, react, react-dom | Core framework | app |
| typescript, bun-types | Type system | tooling |
| tailwindcss, @tailwindcss/postcss, tw-animate-css | Styling v4 | globals.css |
| class-variance-authority, clsx, tailwind-merge | shadcn utils | all ui |
| lucide-react | Icons | components |
| framer-motion | Normal React animation (kept; NOT migrated to `motion`) | motion layer |
| react-hook-form, zod, @hookform/resolvers | Forms (retained Form component) | potential CTA form |
| sonner | Toast system (replaces radix-toast) | layout |
| embla-carousel-react | Carousel (testimonials) | carousel.tsx |
| sharp | next/image optimization (justified for asset strategy) | next |
| z-ai-web-dev-sdk | Used by env VLM/skills CLI; harmless at runtime | (env) |
| @radix-ui/react-accordion, -aspect-ratio, -avatar, -checkbox, -dialog, -dropdown-menu, -label, -navigation-menu, -progress, -radio-group, -select, -separator, -slot, -tabs, -tooltip | Retained shadcn components | retained ui |

## 3. Remove (verified unused after component curation)

| Dependency | Reason | Risk | Final action |
|------------|--------|------|--------------|
| prisma, @prisma/client | No DB in prototype | None | Removed; deleted `prisma/`, `db/`, `src/lib/db.ts` |
| next-auth | No auth | None | Removed |
| @tanstack/react-query, @tanstack/react-table | No server state/data-table | None | Removed |
| recharts | No charts | None | Removed; deleted `chart.tsx` |
| @mdxeditor/editor, react-markdown, react-syntax-highlighter | No markdown editor | None | Removed |
| next-intl | Prototype is Arabic-first static; no i18n routing | None | Removed |
| next-themes | Prototype is light-only | Drop `.dark` block | Removed |
| uuid | Not needed | None | Removed |
| date-fns, react-day-picker | Only Calendar uses them | None | Removed; deleted `calendar.tsx` |
| @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities | No drag-drop | None | Removed |
| react-resizable-panels | No resizable panels | None | Removed; deleted `resizable.tsx` |
| cmdk | Command palette (Command component) | None | Removed; deleted `command.tsx` |
| input-otp | OTP input | None | Removed; deleted `input-otp.tsx` |
| vaul | Drawer | None | Removed; deleted `drawer.tsx` |
| @reactuses/core | Unused hooks lib | None | Removed |
| zustand | No genuine global state; use React Context for AR/EN + mobile nav | None | Removed |
| tailwindcss-animate | Superseded by tw-animate-css (C5) | Verify no import | Removed; deleted `tailwind.config.ts` |
| @radix-ui/react-alert-dialog, -collapsible, -context-menu, -hover-card, -menubar, -popover, -scroll-area, -slider, -switch, -toast, -toggle, -toggle-group | Only removed components use them | None | Removed; deleted those component files |

## 4. Add

| Dependency | Purpose | Phase |
|------------|---------|-------|
| gsap | Signature hero timeline + abacus animation only | Homepage hero |
| @gsap/react | React integration for GSAP (useGSAP hook) | Homepage hero |

## 5. shadcn Component Curation (final set)

**Retained (24):** accordion, aspect-ratio, avatar, badge, button, card, carousel, checkbox, dialog, dropdown-menu, form, input, label, navigation-menu, progress, radio-group, select, separator, sheet, skeleton, sonner, tabs, textarea, tooltip.

**Removed (24):** alert, alert-dialog, breadcrumb, calendar, chart, collapsible, command, context-menu, drawer, hover-card, input-otp, menubar, pagination, popover, resizable, scroll-area, sidebar, slider, switch, table, toast, toaster, toggle, toggle-group.

(Removal rule respected: no retained component depends on a removed one. Toast system switched radix-toast → sonner.)

## 6. Lockfile & Reinstall

- `bun.lock` preserved; no `package-lock.json` generated.
- After edits: `bun install` → `bun run lint` → start dev server.
- All scripts in `package.json` retained except prisma scripts (`db:*`) removed.

## 7. Final package.json Scripts

```
"dev": "next dev -p 3000 2>&1 | tee dev.log",
"build": "next build && cp -r .next/static .next/standalone/.next/ && cp -r public .next/standalone/",
"start": "NODE_ENV=production bun .next/standalone/server.js 2>&1 | tee server.log",
"lint": "eslint ."
```
(Removed: `db:push`, `db:generate`, `db:migrate`, `db:reset`.)
