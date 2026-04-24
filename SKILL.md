---
name: metrados-belempampa-design
description: Use this skill to generate well-branded interfaces and assets for Metrados Belempampa — a clinical-density construction-engineering SPA for recording, searching, and exporting metrados (quantity take-offs) against a WBS for a public hospital build in Cusco, Peru. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

Key files to orient on:
- `README.md` — product context, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — the only source of truth for colors, type, spacing, radii, shadows. Import it into any artifact you build.
- `preview/` — small design-system cards (colors, type, spacing, components, brand) that document tokens in use.
- `ui_kits/web/` — pixel-fidelity recreation of the SPA: `Header`, `MetradosForm`, `MetradosTable`, `Primitives`. Copy components and re-skin rather than inventing from scratch.
- `assets/` — logo lockups and icon usage notes (Lucide-only).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

House rules to follow:
- **Keyboard-first, spreadsheet-dense.** Tight padding, micro labels (9–11px uppercase black), monospace numerals in totals and grids.
- **Two project themes only:** Hospital (`#0084ff`) and Contingencia (amber-500). Switch by header toggle; never mix in one view.
- **Modification tags** (DD/PN/MM/PC) render as 10×10 colored dots with a 1px border — color *is* the icon; the letters live in `title=`.
- **Lucide icons only**, 1.5–2px stroke. For Φ, ↳, ▼, |, use typographic glyphs, not custom SVGs.
- **Emoji:** one — `✨` in the success toast. Nowhere else.
- **Language:** Spanish UI, English or Spanish internal docs. Passive-voice, technical. "Partida", "Metrado", "Elemento", "Detalle" are load-bearing terms; do not translate.
- **Buttons:** rounded-xl, bold shadows with colored glow (`shadow-primary/30`), micro "hover:-translate-y-[1px]".

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions (Hospital vs Contingencia? which screen? density level? Spanish or bilingual?), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
