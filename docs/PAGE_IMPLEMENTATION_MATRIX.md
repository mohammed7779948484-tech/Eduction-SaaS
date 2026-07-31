# Page Implementation Matrix (Phase 2)

> All 10 remaining public-site pages. Homepage (`/`) + `/design-system` + `/register` (placeholder, to be replaced) already exist.

| # | Page (AR) | EN | Route | Audience | Goal | Primary CTA | Wave | Status |
|---|-----------|-----|-------|----------|------|-------------|------|--------|
| 1 | من نحن | About | `/about` | Parents, schools, partners | Build institutional trust | Trial lesson | 1 | Pending |
| 2 | البرنامج | Program | `/program` | Parents | Understand Soroban + levels + ages | Trial lesson | 1 | Pending |
| 3 | القنوات التعليمية | Learning Channels | `/channels` | Families, schools | Choose the right learning path | Per-channel CTA | 1 | Pending |
| 4 | المنصة الافتراضية | Virtual Platform | `/platform` | Parents, students | Present Phase 2 vision | Register interest | 1 | Pending |
| 5 | التسجيل والحصة التجريبية | Registration | `/register` | Parents | Register / book trial | Submit (local) | 2 | Replace placeholder |
| 6 | تواصل معنا | Contact | `/contact` | All visitors | Direct communication | Send message (local) | 2 | Pending |
| 7 | المدارس والمؤسسات | Schools | `/schools` | School administrators | B2B partnership proposition | Partner interest (local) | 2 | Pending |
| 8 | تدريب المدربين | Trainers | `/trainers` | Prospective trainers | Trainer development path | Apply (local) | 2 | Pending |
| 9 | الأسئلة الشائعة | FAQ | `/faq` | All visitors | Quick answers + routing | Contact / register | 3 | Pending |
| 10 | الخصوصية والشروط | Privacy | `/privacy` | All visitors | Legal + safeguarding trust | Contact | 3 | Pending |

## Shared components (parent-prepared)
- `PageHero` — reusable page header (eyebrow + title + subtitle + optional tone).
- `PrototypeFormNotice` — alert-style notice (forms are prototype-only).
- `FormSection` — shared form wrapper (consistent spacing + react-hook-form).
- `SuccessState` — shared post-submit success message.
- `MetricCard` — stat/metric display.
- `ProcessTimeline` — vertical/horizontal step progression.
- `BranchCard` — contact branch card.
- `LevelCard` — program level card.
- `ProfileCard` — team/trainer profile.
- `ComparisonTable` — channels comparison.
- `AudienceCard` — audience targeting card.
- `TableOfContents` — legal TOC.

## shadcn components to install
- `Alert` (for PrototypeFormNotice) — only missing one needed.

## Source references
- `docs/PAGE_SPECS.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/SOURCE_OF_TRUTH.md`, client DOCX/PDF, DESIGN.md, homepage patterns.
