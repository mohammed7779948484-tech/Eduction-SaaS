# Repository Audit

> Inspection of the existing repository **before** any destructive change.
> Performed against actual files on disk (not assumptions).

---

## 1. Current Architecture

- **Framework:** Next.js 16.1.1 (App Router), React 19, TypeScript 5, strict mode.
- **Styling:** Tailwind CSS v4 (CSS-first `@theme inline` in `src/app/globals.css`) + `tw-animate-css`. A **legacy** `tailwind.config.ts` also exists and pulls in `tailwindcss-animate` (conflict — see `DEPENDENCY_AUDIT.md` C5).
- **UI library:** shadcn/ui (New York style, neutral base color, CSS variables, Lucide icons) — `components.json`. ~50 components in `src/components/ui/`.
- **Build output:** `output: "standalone"` (`next.config.ts`); `typescript.ignoreBuildErrors: true`; `reactStrictMode: false`.
- **Package manager:** Bun (`bun.lock` present). No `package-lock.json` (must stay that way).
- **Dev server:** `next dev -p 3000` piped to `dev.log`.

## 2. Runtime & Infrastructure

- **Gateway:** `Caddyfile` listens on `:81`, forwards `?XTransformPort=*` queries to the named localhost port, else to `localhost:3000`. **Preserve** — required by the preview environment.
- **Port:** Next.js dev on 3000 (only externally exposed route).
- **Tests:** `tests/*.sh` (runtime/build container scripts) — preserve/adapt; not part of prototype runtime.
- **Examples:** `examples/websocket/` (Socket.IO demo) — scaffold demo only; ignored by ESLint. Keep file but do not wire into prototype.

## 3. Directory Map (current)

```
src/
├── app/
│   ├── layout.tsx        # Z.ai metadata, Geist fonts, <html lang="en">, Toaster
│   ├── page.tsx          # 'use client' Z.ai logo placeholder → REPLACE
│   ├── globals.css       # Tailwind v4 @theme + neutral oklch palette + dark
│   └── api/route.ts      # "Hello world" GET → REMOVE (no backend)
├── components/ui/         # ~50 shadcn components (curate)
├── hooks/                 # use-mobile.ts, use-toast.ts (toast uses radix-toast)
├── lib/
│   ├── db.ts             # Prisma client → REMOVE
│   └── utils.ts          # cn() → KEEP
prisma/schema.prisma       # User + Post models → REMOVE
db/custom.db               # SQLite file → REMOVE
public/logo.svg            # Z.ai scaffold logo → REPLACE
public/robots.txt
examples/websocket/        # Socket.IO demo → keep, unwired
tests/                     # shell scripts → preserve
```

## 4. Existing UI Components (`src/components/ui/`)

Full set (shadcn new-york): accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip.

**Curation plan** (per master task §12) recorded in `DEPENDENCY_AUDIT.md` §shadcn curation.

## 5. Configuration Files

| File | Status | Action |
|------|--------|--------|
| `next.config.ts` | standalone output, ignoreBuildErrors on | Keep; review ignoreBuildErrors (keep off for quality? — keep as-is to avoid blocking on strict typing of 3rd-party). |
| `tsconfig.json` | strict, `@/*` → `./src/*` | Keep. |
| `postcss.config.mjs` | `@tailwindcss/postcss` only | Keep. |
| `eslint.config.mjs` | next core-web-vitals + typescript, many rules off, ignores `examples/** skills` | Keep; rules are permissive (acceptable for prototype). |
| `components.json` | shadcn new-york, css globals | Keep. |
| `tailwind.config.ts` | legacy, uses `tailwindcss-animate` | **Remove** after confirming Tailwind v4 CSS-first config suffices (see DEPENDENCY_AUDIT C5). |
| `Caddyfile` | gateway | **Preserve** (environment role). |
| `prisma/schema.prisma` | User/Post models | **Remove** (no DB). |
| `src/lib/db.ts` | Prisma client | **Remove**. |

## 6. Existing User Work to Preserve

- `upload/` (all client source files + `extracted/`).
- `worklog.md`, `docs/` (this documentation set).
- `Caddyfile`, `tests/`, `examples/` (environment/demo).
- `bun.lock` (lockfile integrity).

## 7. Scaffold-Only Files (removal candidates)

- `public/logo.svg` (Z.ai logo) → replace with brand logo treatment.
- `src/app/api/route.ts` (hello-world) → remove.
- `src/lib/db.ts`, `prisma/`, `db/custom.db` → remove (no DB).
- `src/hooks/use-toast.ts` + `src/components/ui/toast.tsx` + `toaster.tsx` → remove if `sonner` is the toast system (it is; `layout.tsx` imports `Toaster` from `@/components/ui/toaster` — switch to `sonner`).
- Scaffold metadata in `layout.tsx` (Z.ai title/description/icons) → replace with program metadata.

## 8. Risks

| Risk | Mitigation |
|------|------------|
| Removing a Radix dep that a retained shadcn component still imports | Audit imports before `bun remove`; keep Radix packages for retained components. |
| `tailwindcss-animate` vs `tw-animate-css` double-animation utilities | Remove `tailwindcss-animate` + `tailwind.config.ts` only after grep confirms no `tailwindcss-animate` import and no reliance on its utility classes. |
| Removing `next-themes` breaks dark-mode toggle | Prototype is light-only Arabic-first; remove `next-themes` and drop `.dark` block (documented decision). |
| `react-day-picker`/`date-fns` only used by Calendar | Remove with Calendar component. |
| Broken lockfile if `npm` invoked accidentally | Always use `bun`; never run `npm install`. |
| `examples/` and `skills` referenced by ESLint ignores | Keep ignores; do not delete those dirs. |

## 9. Files That Must NOT Be Deleted Before Verifying Environment Role

- `Caddyfile` (gateway routing).
- `tests/*.sh` (may be used by environment health checks).
- `examples/websocket/` (referenced by ESLint ignores; harmless if unwired).
- `bun.lock` (lockfile integrity).
- `.next/`, `node_modules/` (build/runtime).

## 10. Cleanup Order (executed in `DEPENDENCY_AUDIT.md` phase)

1. Stop dev server (if running).
2. Remove scaffold source files (`api/route.ts`, `lib/db.ts`, `prisma/`, `db/`, `public/logo.svg`).
3. Remove non-retained shadcn components.
4. `bun remove` non-retained dependencies (batch).
5. `bun add gsap @gsap/react`.
6. Rewrite `layout.tsx` (Arabic font, `lang=ar dir=rtl`, sonner Toaster, program metadata).
7. Rewrite `globals.css` (brand tokens) + remove `tailwind.config.ts`.
8. `bun install` → `bun run lint` → start dev server → verify.

**Audit complete. No destructive change performed in this document.**
