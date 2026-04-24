# Metrados Belempampa — Web UI Kit

A high-fidelity recreation of the Metrados Belempampa SPA (Vite + React 19 + Tailwind 4 in the real product). Here rendered as browser-native React + Babel + the `colors_and_type.css` tokens.

## Files

- `index.html` — entry; loads React, Babel, Tailwind Play CDN, and all JSX components
- `Header.jsx` — brand lockup + Hospital/Contingencia toggle
- `MetradosForm.jsx` — left-column registration form (specialty → partida → location → math → save)
- `MetradosTable.jsx` — right-column WBS hierarchical planilla with title rows, partida headers, virtual element groupers, and atomic rows
- `Primitives.jsx` — `Select`, `SearchCombobox`, `ModDot`, inline icons

## Coverage

| Screen / state | Covered |
|---|---|
| Initial empty state (Hospital) | ✅ |
| Form with Estructuras partida selected | ✅ |
| Form with acero (kg) branch — Φ dropdown | ✅ (button state only; no live select) |
| WBS table with title row + partida header + virtual element + atomic rows | ✅ |
| Contingencia project switch (amber theme) | ✅ |
| Modification tag dots (DD/PN/MM/PC) | ✅ |
| Toast | ✅ |
| Export / Clear / Delete actions | ✅ cosmetic, no backend call |

## Not implemented (deliberately omitted)

- The HVAC duct/tee/reducción/codo detail autocomplete (too data-heavy; exists in the repo's `hvacData.ts`).
- The "Nueva partida" modal (covered by README text, not rendered).
- Real Excel export via `/api/export/metrados`.
- Trimble Connect workspace API integration.

This kit's purpose is pixel-fidelity UI, not working plumbing.
