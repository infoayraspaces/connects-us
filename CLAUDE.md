# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server (Vite, localhost:5173)
npm run build        # Production build
npm run build:dev    # Dev-mode build
npm run lint         # ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build
```

Run a single test file:
```bash
npx vitest run src/path/to/file.test.tsx
```

## Architecture

**Coliving website** for AYRA properties in Bogotá. Static SPA with no backend — all data is hardcoded.

**Routing** (`HashRouter` in `App.tsx`): uses hash-based routing for GitHub Pages / static hosting compatibility.

| Route | Page |
|---|---|
| `/` | Home (Index) |
| `/ubicaciones` | Locations list |
| `/ubicaciones/:id` | Location detail |
| `/comunidad` | Community |
| `/preguntas` | FAQs |
| `/contacto` | Contact |
| `/dashboard` | Dashboard |

**Data layer** (`src/data/locations.ts`): Single source of truth. Exports `Location[]` and `RoomType` interfaces. All property data (rooms, pricing, amenities, images, FAQs, map URLs) lives here. Adding a new property = adding an entry to the `locations` array.

**Component structure:**
- `src/pages/` — route-level page components
- `src/components/` — layout (`Navbar`, `Footer`, `Layout`, `ScrollToTop`, `WhatsAppButton`) and page-specific sections
- `src/components/home/` — homepage sections (`HeroSection`, `BenefitsSection`, `LocationsHighlight`, `TestimonialsSection`, `CTASection`)
- `src/components/ui/` — shadcn/ui primitives (do not edit directly)

**Path alias:** `@/` maps to `src/`.

**Styling:** Tailwind CSS + shadcn/ui components. Theme config in `tailwind.config.ts`. Component variants use `class-variance-authority`.

**Testing:** Vitest + jsdom + React Testing Library. Setup file at `src/test/setup.ts`. Tests co-located under `src/**/*.{test,spec}.{ts,tsx}`.

## Reglas de calidad

- SIEMPRE verifica tu trabajo antes de darlo por terminado. Revisa que el código compila, que no hay errores de tipos, y que la lógica tiene sentido.
- Antes de implementar cualquier cambio, investiga el código existente para entender cómo funciona. No asumas — lee el código primero.
- NO implementes nada a menos que estés 100% seguro de que va a funcionar. Si tienes dudas, investiga más o pregúntame antes de proceder.

## Sistema de memoria

- Antes de terminar cualquier sesión de trabajo, guarda un resumen de lo que hiciste, lo que falta por hacer y cualquier decisión importante en un archivo PROGRESS.md dentro de la carpeta del proyecto.
- Al iniciar una nueva sesión, busca y lee PROGRESS.md para entender dónde te quedaste y qué sigue.
- Organiza las notas por secciones: "Completado", "En progreso", "Pendiente" y "Decisiones tomadas".
- Actualiza PROGRESS.md cada vez que completes un bloque significativo de trabajo.
