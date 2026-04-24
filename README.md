# Metrados Belempampa — Design System

A design system for **Metrados Belempampa**, a clinical-density construction‑engineering SPA for recording, searching, and exporting *metrados* (quantity take‑offs) tied to the Work Breakdown Structure (WBS) of a public infrastructure project in Cusco, Peru (the Belempampa hospital build + its "Contingencia" contingency package).

> **Tagline that captures it:** *Plataforma Costos y Presupuestos.* Keyboard-first, spreadsheet-dense, "cero mouse."

---

## Product context

The product is a web SPA that lives next to Excel as the real database. Engineers on site register atomic *metrados* (quantity rows — length × width × height × times) tied to a **Partida** (a WBS-coded budget line). The SPA is a volatile viewer/mutator; Excel stays the source of truth.

**Two tracked projects** toggle from the header:
- **Hospital** (blue) — the main hospital budget, `Stethoscope` icon
- **Contingencia** (amber) — contingency/emergency package, `AlertTriangle` icon

**Core domain concepts:**
- **Partida** — a WBS line item (e.g. `OE.2.3.9.1 Concreto en Vigas f'c=210 kg/cm2`) with a unit (m³, kg, m², und) and a modification tag (`DD`, `PN`, `MM`, `PC`).
- **Metrado** — an atomic row the user types in: date, location (frente/bloque/nivel/cuadrilla), an "elemento" grouper, a "detalle," and the math cells.
- **WBS tree** — titles (`is_template=true, es_titulo=true`) roll up partidas roll up metrados. The zero-padded sort algorithm is load-bearing.
- **Acero branch** — when unit is `kg`, the form morphs: `Ancho` collapses, a `Diámetro (Φ)` dropdown appears, kilos come from nominal weights per diameter.
- **HVAC branch** — when the partida is HVAC, the detail field autocompletes from a duct/TEE/reduction/codo catalog with prefilled factors.

**Surface map (one product, one web app):**
- Header with brand lockup and Hospital / Contingencia toggle
- Left column: `MetradosForm` — Partida search + location + element/detail + math cells + Save
- Right column: `MetradosTable` — hierarchical WBS tree with inline-editable rows and Export button

---

## Sources

- **GitHub — engineering frontend (actual source):** `ghhn/buscardormetrados` @ `main` (React 19 + TypeScript + Vite + Tailwind CSS 4)
- **GitHub — analysis / docs / data drop:** `JorgeCusco/3_Entregable_web_buscador_de_metrados` @ `main`
- Key files used for this system:
  - `src/App.tsx` — layout, project toggle, toast, grid
  - `src/index.css` — brand primary token + glass-panel utility
  - `src/components/MetradosForm.tsx` — form chrome, modification badges, number cells
  - `src/components/MetradosTable.tsx` — WBS hierarchical grid, title rows, virtual element rows
  - `src/components/ui/{Select, SearchCombobox, SimpleSearchInput}.tsx` — primitive controls
  - `src/constants/especialidades.ts` — specialty → WBS prefix mapping
  - `src/types/index.ts` — Partida & Metrado shapes
  - `MASTER_CONTEXT.md` — architectural "DNA" document

Nothing about this system is invented — every color, spacing rhythm, and component here is lifted from the repo.

---

## Index

| Path | What it is |
|---|---|
| `README.md` | This file — product context, content + visual foundations, iconography |
| `SKILL.md` | Agent-Skills compatible skill entry point |
| `colors_and_type.css` | Design tokens — brand colors, neutrals, semantic colors, type scale |
| `fonts/` | Webfonts (Inter, via Google Fonts — see CONTENT FUNDAMENTALS) |
| `assets/` | Logos, icons, brand marks |
| `preview/` | Design-system preview cards (swatches, scales, components) |
| `ui_kits/web/` | The Metrados Belempampa web UI kit — JSX components + `index.html` |

---

## CONTENT FUNDAMENTALS

**Language:** Spanish (Peru/LatAm). Technical construction register with heavy abbreviation. No English except variable names and a few accepted Anglicisms (`Dashboard`, `Backend`). Never switch to English in UI copy.

**Tone:** *Clinical engineering.* Blunt, correct, no warmth. Uses WBS codes as nouns. Exclamation marks are rare in UI; they live in the docs.

**Voice — I vs you:** Neutral third person or imperative. The app addresses the user only through verbs: `Registrar metrado`, `Limpiar datos`, `Exportar oficial`. No "your," no "please," no "we."

**Casing:**
- **UPPERCASE** for section labels and micro-labels, with tracked-out letter-spacing (`tracking-widest`, `tracking-tighter`, `tracking-[0.2em]`). E.g. *"ESPECIALIDAD (FILTRO OE)"*, *"REGISTRAR METRADO"*, *"CANTIDAD | LARGO | ANCHO | ALTO | VECES"*.
- **Title Case** for product-facing headlines: *"Metrados Belempampa"*, *"Planilla de Metrados Dinámica"*.
- **lowercase** almost never; only for file paths and code.
- User-typed free-text fields (`elemento`, `codigo`, partida descriptions) are **force-uppercased on blur** via `.toUpperCase()`. This is a hard rule — data consistency trumps user intent.

**Abbreviation culture:** aggressive.
- `CDLLA` for *Cuadrilla*, `GAN` for *Gancho*, `LONG` for *Longitud*, `DIÁM` for *Diámetro*, `AZ` for *Azotea*, `ZZ` for *Zapatas*, `N1`/`N2` for levels. Blocks use Roman numerals (I–XVI + EXT). Frentes are `F1`–`F5`.
- Modification badges are 2-letter codes (`DD`, `PN`, `MM`, `PC`) with fixed colors — never spelled out in the UI. Users memorize them.
- Units are lowercase abbreviated: `m`, `m2`, `m3`, `kg`, `und`, `glb`, `pto`, `est`.

**Numbers:** Spanish number format (`es-PE`): comma thousands, two-decimal fixed. Always right-aligned, always monospaced. Totals are `.font-mono .font-black .text-blue-900`.

**Emoji:** **No.** The `MASTER_CONTEXT.md` document uses emoji heavily (🏛️ 🧬 🔮) — that is documentation tone, not product tone. Product UI strings have **zero emoji** with one exception: a single `✨` in the success toast (`<span className="text-xl">✨</span> Metrado guardado`). Don't add more.

**Icon-as-prefix for section titles:** the vertical blue bar before a title is the system's "icon" for a section header. Reuse it.
```
<div className="w-1.5 h-4 bg-blue-600 rounded-full" /> REGISTRO DE METRADOS
```

**Example copy lifted from the product:**
- Header: *"Metrados Belempampa" / "Plataforma Costos y Presupuestos"*
- Form section: *"REGISTRO DE METRADOS"*, *"ESPECIALIDAD (FILTRO OE)"*, *"PARTIDA (BUSCADOR)"*, *"ELEMENTO / AGRUPADOR"*, *"↳ DETALLE ESPECÍFICO"*
- Placeholders: *"Ej. Viga BV-206 Ejes 1-4..."*, *"Ej. Acero longitudinal 3/4''..."*, *"Buscar por código o descripción..."*
- Table: *"Planilla de Metrados Dinámica"*, *"Partidas con metrado (vista): 12"*, *"Control de Planilla Web v3.0"*
- Buttons: *"REGISTRAR METRADO"*, *"Exportar Oficial"*, *"Limpiar datos"*, *"+ Crear nueva partida"*, *"+ Agregar partida personalizada"*
- Toast: *"✨ Metrado guardado: OE.2.3.9.1"*

---

## VISUAL FOUNDATIONS

**Vibe:** A clinical financial terminal dressed with just enough glass and soft blue to feel like a 2020s web app — think **Bloomberg × Notion × Tailwind tutorial**. Dense, type-forward, rarely decorative. Whitespace exists to separate zones, not to breathe.

**Color palette:**
- **Primary** `--color-primary: #0084ff` (a pure mid-blue) with hover `#006bce`. This is the Hospital-project accent, the Save button, focus rings, link-blue on descriptions.
- **Hospital context:** blue — `blue-600` / `blue-700` / `blue-50` tints.
- **Contingencia context:** amber — `amber-600` on white with `amber-100` border.
- **Neutrals:** Tailwind `slate-*` top to bottom. `slate-800` is the darkest surface (WBS title rows). `slate-50/50` and `slate-100` are the workspace backgrounds. Body background is `#f3f4f6` (`gray-100`).
- **Semantic:** `green-500`/`green-600` for save-success and Export (legal export is green, intentionally — it signals "sanctioned transaction"). `red-500` for destructive/delete-hover. `orange-*` for the acero (`kg`) branch — diameter pill + badge. `sky-*` for "no modification" default dot.
- **Modification-tag colors (load-bearing — never remap):**
  - `DD` → `red-500` / `red-600` border
  - `PN` → `green-500` / `green-600` border
  - `MM` → `blue-500` / `blue-600` border
  - `PC` → `#FF69B4` / `#FF1493` border (hot-pink, custom for "Partidas Creadas")

**Typography:** **Inter** (system fallback: `system-ui, -apple-system, sans-serif`), loaded from Google Fonts. Weights used: 400, 500, 600, 700, 800, 900 — all of them. The system leans hard on `font-black` (900) for micro-uppercase labels and totals. Monospace is the browser default `font-mono` — used for WBS codes, numbers in the grid, badges. No serif anywhere. No display/brand font.

**Type scale (what the repo actually uses):**
- `text-2xl` (24px) `font-bold` → brand title
- `text-lg` (18px) `font-bold tracking-tight` → table panel title
- `text-xl` (20px) `font-black font-mono` → hero totals in form
- `text-sm` (14px) `font-bold uppercase` → section titles with vertical bar
- `text-xs` (12px) `font-bold` → field values, button labels
- `text-[11px]` / `text-[10px]` / `text-[9px]` / `text-[8px]` / `text-[7px]` — the clinical-density micro-labels. Everything under 12px is `font-black uppercase tracking-widest` or `tracking-tighter`. These tiny labels are the signature of the system; they are intentional, not a mistake.

**Backgrounds:** flat with layered soft tints. No hero images, no gradient backgrounds other than the brand-title `bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent`, which mutes it to nearly black. No illustrations, no patterns, no textures. Glass is the only "effect."

**Glass panels:** the `.glass-panel` utility is the signature card treatment. `rgba(255,255,255,0.7)` + `backdrop-filter: blur(12px)` + `1px solid rgba(255,255,255,0.5)` + `box-shadow: 0 8px 32px 0 rgba(31,38,135,0.07)`. Used for the form panel, modals (with an extra `bg-white/90 backdrop-blur-sm` over the panel), and dropdown popovers (`bg-white/95 backdrop-blur-md`). Always with a large radius.

**Corner radii (strict vocabulary):**
- `rounded-2xl` (16px) — cards, modals, dropdowns, form panels
- `rounded-xl` (12px) — inputs, buttons, toast, blue info pill
- `rounded-lg` (8px) — small sublight chips, export button
- `rounded-md` (6px) — footer "Control de Planilla Web" tag
- `rounded` (4px) — grid cells, inline inputs
- `rounded-full` — the vertical section-title bar, status dots, modification dots
- **No sharp 90° corners anywhere** except inside the grid `<table>`.

**Shadows:** kept very soft. `shadow-sm` everywhere by default. `shadow-md` on focused selects. `shadow-xl` on modals and open dropdowns. `shadow-2xl` on the large combobox dropdown. The brand icon chip has a colored shadow: `shadow-lg shadow-primary/30`. Save-success toast: `shadow-xl`. Inner-shadows (`shadow-inner`) appear on the project-toggle track and the cuadrilla pill — both read as "recessed slots."

**Borders:** `1px solid` basically always. Slate is default (`border-slate-100 | 200 | 300`). Blue (`border-blue-100 | 500`) lights up on focus and active partida. The cuadrilla pill uses `border-slate-300` + `bg-slate-200` for a debossed look. Dashed borders (`border-dashed`) only on "create new" affordances — never purely decorative.

**Focus states:** `focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none` is the canonical input focus. Buttons: `hover:shadow-lg active:scale-[0.98]`. Dropdowns open with `animate-in fade-in zoom-in-95 duration-200 origin-top`. Chevrons rotate 180° when a select is open.

**Hover states:** color shifts, not size. Inputs go `hover:border-blue-300 hover:shadow-md`. List items in combobox: `hover:bg-blue-600 hover:text-white` — full color inversion, not a tint. Destructive actions use a red hover: `hover:text-red-500 hover:bg-red-50`. Delete icons only appear `opacity-0 group-hover:opacity-100` — hidden until the row is hovered.

**Press states:** buttons use `active:scale-[0.98]`; a subtle shrink, nothing bouncy.

**Animations:** fast and workmanlike — `transition-all duration-200`, sometimes `300`. Enter animations are `animate-in fade-in zoom-in-95` or `slide-in-from-top-1 | top-5`. No spring physics, no Lottie, no decorative motion. The loading spinner is a plain `Loader2` with `animate-spin`. Toasts slide in from the top.

**Transparency + blur:** reserved for glass panels, modal scrims, and popovers. Body and input surfaces are solid.

**Layout rules:**
- Max width `1450px` centered (`max-w-[1450px] mx-auto`).
- Viewport padding: `p-4 md:p-6 lg:p-8`.
- Main content is a 12-column grid: `lg:grid-cols-12 gap-6`; form takes 4/12, table takes 8/12 (at xl, 3/9).
- Header is a horizontal flex, brand-left + project-toggle-right.
- Tables: `table-fixed`, `border-collapse`, sticky header with a hairline shadow `shadow-[0_1px_0_0_rgba(0,0,0,0.05)]`.
- Cards have internal padding `p-4` or `p-5`, with `gap-3` / `gap-4` rhythm.
- The form uses 4-column and 5-column micro-grids (`grid-cols-4`, `grid-cols-5`) with `gap-1.5` for the math cells.

**Imagery vibe:** there is none. This product has no photography, no illustrations, no avatars — zero decorative imagery. If you add imagery for marketing / slides, keep it architectural/engineering: blueprints, rebar, concrete, warm brown dust against cool blue UI. Don't use stock-photo people.

**Density & rhythm:** Use tiny labels (`text-[9px]` / `text-[10px]`) to pack information. Pair them with generous whitespace *between zones* (`space-y-3`, `gap-6`) so the eye still has resting places. The signature move is: tight internal density, relaxed zone separation.

---

## ICONOGRAPHY

**Icon set:** **Lucide** (`lucide-react@0.576.0`) — the project's only icon library. Lucide's 1.5px stroke, rounded linejoin aesthetic is the brand's icon look. Never mix in other icon sets (no Heroicons, no Feather — Feather is a Lucide ancestor, so skip it).

**Lucide icons actually used in the product:**
- `Building2` — brand chip icon in the header
- `Stethoscope` — Hospital project
- `AlertTriangle` — Contingencia project
- `Search` — combobox & search-input glyph
- `ChevronDown` — select & combobox disclosure
- `Save` — "REGISTRAR METRADO" submit
- `Eraser` — "Limpiar campos" / "Limpiar datos"
- `Download` — "Exportar Oficial"
- `Trash2` — row delete (hover-only, opacity-0 → 100)
- `Loader2` — spinner during export (`animate-spin`)

**Icon sizes:** `w-4 h-4` (16px) for inline buttons, `w-6 h-6` (24px) for the header brand chip, `size={10}` – `size={14}` in the dense UI.

**Non-Lucide glyphs treated as icons:**
- **Status dots** — 10×10 `rounded-full` divs with a border. This is how modification tags are rendered (`DD`, `PN`, `MM`, `PC`) — color *is* the icon; the letters sit in the `title` attribute only. See `RenderModificacionBadge` for the canonical implementation.
- **Arrow `↳`** (U+21B3, U+2193-family) — used to mark "detalle" as a child of "elemento" in the table and the form. Rendered in blue, `font-black`.
- **Triangle `▼`** (U+25BC) — on virtual element rows in the table, in a pale blue `text-blue-300 font-black text-[10px]`.
- **Phi `Φ`** (U+03A6) — marks the diameter field and the diameter pill in acero rows. Wrapped in an orange chip: `bg-orange-100/80 text-orange-600 px-1.5 py-0.5 rounded shadow-sm border border-orange-200`.
- **Vertical bar `|`** — ASCII divider inside info pills, at low opacity: `<span className="mx-3 opacity-20">|</span>`.
- **Separator bullet `•`** — none in the product, don't invent.

**Emoji:** one — `✨` in the green success toast. That's it.

**Logo:** the brand mark **is** `Building2` from Lucide sat inside a `bg-primary text-white p-2.5 rounded-xl shadow-lg shadow-primary/30` chip, next to the wordmark "Metrados Belempampa" in a charcoal gradient. There is no separate logo SVG in the repo — the chip+wordmark pair *is* the logo. See `assets/logo-mark.svg` and `assets/logo-lockup.svg`.

**Rules when extending:**
1. Reach for Lucide first. If Lucide has it, use it.
2. If Lucide doesn't have it, prefer a plain glyph or shape (dot, bar, arrow) over a custom SVG.
3. Never add emoji to the product UI. Docs and internal Markdown can use them.
4. Do not mix stroke weights. Lucide 1.5px only.

---

## Index — what's in this folder

Root files:
- `README.md` — this file.
- `SKILL.md` — Agent Skills entry point; makes this system portable to Claude Code.
- `colors_and_type.css` — source-of-truth CSS custom properties for colors, type, spacing, radii, shadows.
- `LICENSE` (n/a — recreation for design reference).

Folders:
- `assets/` — logo SVGs (`logo-mark.svg`, `logo-lockup.svg`), Lucide icon set notes.
- `fonts/` — Inter (via system/Google Fonts) + JetBrains Mono as monospace. If local files are missing, fall back to Google Fonts imports in `colors_and_type.css`.
- `preview/` — design-system cards shown in the Design System tab. Grouped as **Colors**, **Type**, **Spacing**, **Components**, **Brand**.
- `ui_kits/web/` — the one UI kit: a recreation of the Metrados Belempampa SPA with `Header`, `MetradosForm`, `MetradosTable`, `Primitives` and an `index.html` demo. See `ui_kits/web/README.md`.

Sources:
- GitHub (recreation reference): `JorgeCusco/3_Entregable_web_buscador_de_metrados` — Vite + React 19 + Tailwind 4 + Express backend. The design system here was derived from that repo's `client/src/components/`, `client/src/index.css`, and `client/src/pages/`.
- No Figma, no slide template, no brand guidelines were provided — visual tokens were lifted directly from the Tailwind config and component source.
