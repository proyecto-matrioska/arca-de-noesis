# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Vite dev server (http://localhost:5173/arca-de-noesis/)
npm run build      # Production build → build/
npm run serve      # Preview production build
npm run deploy     # Build + publish to GitHub Pages via gh-pages
```

There is no test suite. TypeScript type checking is the main correctness gate:

```bash
npx tsc --noEmit   # Type-check without emitting files
npx eslint src     # Lint TypeScript/TSX files
```

## What This App Does

**Arca de Noesis** is a web tool that automatically generates visual diagrams from JSON data representing dialectical process information. The user loads a `.noesis` file (JSON), edits the underlying data, selects a schema type, and the app renders the corresponding diagram inside an embedded Excalidraw canvas.

Hosted as a static site at `https://proyecto-matrioska.github.io/arca-de-noesis/`. The Vite base path `/arca-de-noesis/` is intentional for GitHub Pages.

## Architecture

### Data Model

The core data type is a nested tuple structure:
- `DualityData = [string, string, string, string]` — a 4-element quadruplet
- `DialecticsDataEntry = [DualityData, DualityData]` — two dualities
- A full dataset is an array of `DialecticsDataEntry` values
- Persisted as JSON with `.noesis` extension

12 named schema types (`SchemaIdentifier`) exist: `dualidades`, `cuadros`, `cuadros-complejos`, `octagonos`, `octagonos-empiricos`, `triadas`, `triadas-empiricas`, `dialectica`, `dialectica-empirica`, `procesual`, `capas-discursivas`, `matrioskas`.

### Schema Generation (`src/schemas/`)

Each schema module exports a function that takes the Redux state (data + options) and returns an array of Excalidraw elements. Primitives for constructing elements are in `src/schemas/elements/`. Data transformations (factorizations, grouping) are in `src/schemas/transformations/`.

`matrioska.ts` is a large file (~251KB) — be careful editing it.

### State Management (`src/state/`)

Two Redux slices:
- **`dialecticsSlice`** — the loaded data, filename, FileSystem handle, and dirty flag. Actions: `setDialecticsData`, `updateEntry`, `moveUpEntry`, `moveDownEntry`, `insertEntry`, `deleteEntry`, `setFileHandle`, `setIsDirty`.
- **`uiSlice`** — sidebar visibility, selected schema identifier, and diagram options. Key options: `diagramAutoupdate`, `factorizations`, `showDualityIndex`, `elementDescriptions`, `intensionFormContext`, `arrangement`, `showRectangularFactorizations`.

File I/O (`src/state/fileThunks.ts`) uses the File System Access API with fallback to `<input type="file">`. Functions: `loadDataFile`, `saveDataFile`, `saveAsDataFile`, `loadExample`.

### React Components (`src/components/`)

- **`ArcaDeNoesis.tsx`** — main shell; integrates Excalidraw, the editor sidebar, and Redux. Calls schema generators and feeds their output to Excalidraw's imperative API.
- **`Editor.tsx`** — lets the user edit the dialectical data entries.
- **`OptionsPanel.tsx`** — controls the schema options from `uiSlice`.

### Internationalization (`src/i18n/`)

i18next with English (`en.json`) and Spanish (`es.json`). Auto-detects browser language, falls back to English. Schema files use translation keys for annotations and labels — add new keys to both locale files when adding schema text.

## Key Conventions

- TypeScript strict mode is on; avoid `any` and `!` non-null assertions where possible.
- No CSS-in-JS — each component has a companion `.css` file.
- The Excalidraw canvas is controlled imperatively via refs, not through React state syncing.
- Vite chunk naming is customized in `vite.config.js`; Excalidraw ships its own large assets (fonts in `public/excalidraw-fonts/`).
