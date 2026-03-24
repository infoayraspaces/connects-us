# PROGRESS.md

## Completado

### Mejora 1 — Seguridad: Credenciales fuera del código
- **Archivos:** `src/lib/auth.ts` (nuevo), `src/pages/Dashboard.tsx`, `.env.local` (nuevo)
- Credenciales eliminadas del código fuente
- SHA-256 del string `"usuario:contraseña"` guardado en `VITE_DASHBOARD_HASH` en `.env.local`
- Sesión con expiración de 8 horas (token base64 con timestamp)
- `.env.local` ignorado por git vía `*.local` en `.gitignore`
- **ACCIÓN PENDIENTE:** Si el repo es/fue público, rotar la contraseña y generar nuevo hash con `echo -n "usuario:nuevapass" | sha256sum`

### Mejora 2 — Refactor Dashboard monolito + Exportar CSV
- Dashboard.tsx: de ~880 líneas → ~185 líneas
- **Archivos nuevos:**
  - `src/lib/dateParser.ts` — `parseFecha()` y `formatFecha()`
  - `src/lib/exportCsv.ts` — `exportToCsv()` con BOM UTF-8 para Excel
  - `src/components/dashboard/FinancialReport.tsx` — `InformeNevera` + `InformeKoti`
  - `src/components/dashboard/ExpirationAlerts.tsx` — alertas de vencimiento
  - `src/components/dashboard/AnalyticsCharts.tsx` — 4 gráficos analíticos
  - `src/components/dashboard/ContractsTable.tsx` — tabla con sorting + botón "Exportar CSV"
  - `src/components/dashboard/OccupancyCalendar.tsx` — vista Gantt de ocupación por mes
- Columnas ordenables: Nombre, Proyecto, Canon, Fecha Fin
- CSV exporta solo los contratos filtrados actualmente visibles

### Mejora 3 — Formulario de contacto con validación
- **Archivos:** `src/pages/Contact.tsx`, `src/components/home/CTASection.tsx`
- React Hook Form + Zod: validación de nombre (min 2 chars), email (formato), teléfono colombiano (regex), mensaje (max 500)
- Botón deshabilitado durante envío + spinner visual
- `noValidate` en el form para evitar conflicto con validación del browser
- Corregido número de WhatsApp en CTASection: `573001234567` → `573028366373`

### Mejora 4 — SEO
- **Archivos:** `index.html`, `public/sitemap.xml` (nuevo), `public/robots.txt`
- JSON-LD de `LodgingBusiness` con schema.org en `index.html`
- OG image corregida: `lovable.dev/...` → `ayracoliving.com/og-image.jpg`
- **ACCIÓN PENDIENTE:** Crear y subir `/public/og-image.jpg` (1200×630px) con imagen de AYRA
- Sitemap XML con todas las rutas hash del sitio
- robots.txt actualizado con `Sitemap:` directive

### Mejora 5 — Calendario de ocupación (Gantt)
- **Archivo:** `src/components/dashboard/OccupancyCalendar.tsx`
- Vista tipo Gantt: eje Y = habitaciones agrupadas por propiedad, eje X = días del mes
- Navegación mes/año con flechas
- Habitaciones derivadas dinámicamente de los contratos históricos (no hardcodeadas)
- Tooltip nativo con nombre del inquilino, fechas y canon al hover
- Integrado en Dashboard.tsx encima de las alertas de vencimiento

## Pendiente

- [ ] Subir imagen `/public/og-image.jpg` (1200×630px) para OG social
- [ ] Si el repo fue público: rotar contraseña del dashboard y generar nuevo hash
- [ ] Configurar `VITE_DASHBOARD_HASH` en las variables de entorno del hosting (Vercel/Netlify)
- [ ] Registrar sitemap.xml en Google Search Console: https://search.google.com/search-console
- [ ] Tests unitarios para `parseFecha()`, `exportToCsv()`, y validación del formulario de contacto

## Decisiones tomadas

- **Auth en SPA estático:** Se optó por hash SHA-256 del string `"usuario:contraseña"` almacenado en variable de entorno Vite. Es la mejor solución sin backend — el hash es irreversible y la contraseña no aparece en el código.
- **Dashboard refactor:** Se preservó 100% de la funcionalidad visual. No se cambió ningún comportamiento, solo se reorganizó el código en componentes cohesivos.
- **Calendario de ocupación:** Las habitaciones se derivan dinámicamente de los contratos históricos. Limitación conocida: habitaciones que nunca han tenido contrato no aparecen.
- **Número de WhatsApp:** Se unificó a `573028366373` en CTASection y Contact (ya estaba correcto en WhatsAppButton y en el panel de contacto info).
