# Skills — Discovery, Evaluation & Installation Record

> Record of every agent skill evaluated for this project, per master task §5.
> Discovery performed via the loaded `find-skills` skill (`npx skills find <query>`).

---

## 1. Discovery Method

- `find-skills` skill was loaded (`npx skills use "https://github.com/vercel-labs/skills" --skill "find-skills"`) and used to search the open skills ecosystem.
- Searches run: `frontend design`, `shadcn`, `nextjs react`, `accessibility`, `planning`, `browser automation`, `design system`, `tailwind`.
- Quality gates applied (per find-skills): install count ≥1K, reputable owner, no Figma/Stitch/missing-MCP/proprietary-input dependency.

## 2. Installation Status (IMPORTANT — recorded decision)

Persistent installation via `npx skills add <owner/repo@skill> -y` was **attempted multiple times** but **timed out** in this sandboxed environment — the command is network-bound (fetches from GitHub) and exceeded the tool execution deadline on every attempt (`context deadline exceeded`). Discovery via `npx skills find` (lighter GitHub API queries) succeeded.

**Decision (recorded per master task §5 "record a clear reason"):**
- Skills are **evaluated and documented** below (satisfying the documentation requirement).
- The `find-skills` skill itself remains loaded and was used for discovery.
- For **visual verification**, the environment's built-in **`agent-browser` skill** is used (it is pre-available and does not require external install).
- For **design / shadcn / accessibility / planning / Tailwind-v4** guidance, the primary agent applies the equivalent best-practice knowledge directly (these skills are instruction markdown; the primary agent already operates at that level).
- If persistent install becomes available in a later session, the skills in §3 "Install" are the approved set to add.

## 3. Evaluated Skills

| # | Skill | Source | Installs | Purpose | Decision | Reason |
|---|-------|--------|----------|---------|----------|--------|
| 1 | `frontend-design` | `anthropics/skills` | 722.6K | Frontend design quality, visual hierarchy, component craft | **Install (approved)** | Official Anthropic; highest installs; code/doc-based, no Figma/Stitch/MCP. Reputable. |
| 2 | `shadcn` | `shadcn/ui` | 259.7K | Official shadcn component usage & customization | **Install (approved)** | Official shadcn team; directly relevant to component curation. |
| 3 | `accessibility` | `addyosmani/web-quality-skills` | 40.4K | A11y audit, ARIA, contrast, keyboard, RTL | **Install (approved)** | Addy Osmani (Google); strong a11y relevance for RTL Arabic. |
| 4 | `planning-and-task-breakdown` | `addyosmani/agent-skills` | 17.9K | Structured planning & task decomposition | **Install (approved)** | Reputable; supports milestone planning. |
| 5 | `tailwind-design-system` | `wshobson/agents` | 56.9K | Tailwind-based design-system token patterns | **Install (approved)** | Relevant to Tailwind v4 token architecture. |
| 6 | `tailwind-4-docs` | `lombiq/tailwind-agent-skills` | 8.7K | Tailwind v4 CSS-first `@theme` reference | **Install (approved)** | Directly supports v4 CSS-first token migration. |
| 7 | `find-skills` | `vercel-labs/skills` | (loader) | Skill discovery workflow | **Installed (loaded)** | Already loaded; used for all searches. |
| 8 | `agent-browser` | (built-in env skill) | n/a | Headless browser navigation, snapshot, click, visual QA | **Available (built-in)** | Pre-installed in environment; used for visual verification. |
| R1 | `design-taste-frontend` | `leonxlnx/taste-skill` | 306.2K | Frontend taste | **Rejected** | Overlaps #1; #1 is official Anthropic. |
| R2 | `extract-design-system` | `arvindrk/extract-design-system` | 126.4K | Extract DS from existing sites | **Rejected** | Extracts from existing URLs; we build from client sources, not extraction. |
| R3 | `stitch-skills@shadcn-ui` | `google-labs-code/stitch-skills` | 46.6K | shadcn via Stitch | **Rejected** | Requires Stitch (proprietary design input) — forbidden by master task §5. |
| R4 | `migrate-radix-to-base` | `shadcn/ui` | 11.1K | Migrate Radix→Base UI | **Rejected** | Migration not in scope; we keep Radix-based shadcn. |
| R5 | `react-nextjs-development` | `sickn33/antigravity-awesome-skills` | 1.5K | Next.js dev | **Rejected** | Lower installs; overlaps approved set; less reputable owner. |
| R6 | `browser-automation` (various) | multiple | <10K each | Browser automation | **Rejected** | Built-in `agent-browser` skill already covers this; no need to install. |

## 4. Security Observations

- All approved skills are **instruction markdown** (SKILL.md) — they do not execute arbitrary code at install time in this agent context; they guide the agent.
- No approved skill requires Figma, Stitch, a missing MCP, or proprietary design input.
- Approved owners are reputable: `anthropics`, `shadcn/ui`, `addyosmani` (Google), `wshobson`, `lombiq`.
- The `skills` CLI is invoked via `npx` (ephemeral); no global system modification.

## 5. Skill → Phase / Agent Assignment

| Skill | Project phase | Assigned agent |
|-------|---------------|----------------|
| `frontend-design` | Design system, homepage, /design-system | Primary + Design-System Reviewer (subagent 3) + Visual QA (subagent 6) |
| `shadcn` | Component curation, /design-system | Primary + Architecture Reviewer (subagent 2) |
| `accessibility` | All UI milestones, final QA | RTL/A11y Reviewer (subagent 4) |
| `planning-and-task-breakdown` | Milestone planning, review loops | Primary |
| `tailwind-design-system` | Token architecture, DESIGN.md | Primary + Design-System Reviewer (subagent 3) |
| `tailwind-4-docs` | Tailwind v4 `@theme` migration | Primary |
| `find-skills` | Skill discovery (done) | Primary |
| `agent-browser` | Visual verification (Phase 9) | Visual QA Reviewer (subagent 6) + Primary |

## 6. Exact Install Commands (for a session where network permits)

```bash
npx skills add anthropics/skills@frontend-design -y
npx skills add shadcn/ui@shadcn -y
npx skills add addyosmani/web-quality-skills@accessibility -y
npx skills add addyosmani/agent-skills@planning-and-task-breakdown -y
npx skills add wshobson/agents@tailwind-design-system -y
npx skills add lombiq/tailwind-agent-skills@tailwind-4-docs -y
```

(Approved set = 6 focused skills, within the master task's "approximately five to eight" guideline.)

## 7. Installed Location

- `find-skills`: extracted by `npx skills use` to `/tmp/skills-use-*/find-skills/SKILL.md` (loaded into agent context).
- `agent-browser`: built-in environment skill (no filesystem install).
- Other approved skills: **not persistently installed** due to sandbox network timeout (§2). Guidance applied directly by primary agent.
