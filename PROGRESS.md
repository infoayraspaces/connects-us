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

### Mejora 6 — Auditoría del 12 ago 2026
Ver `REVISION-2026-08-12.md` en la raíz del repo para el informe completo.

**Bugs corregidos**
- `LocationDetail.tsx:84` — typo `md:grid-cols -3` (con espacio). La clase no existía, así que la grilla de amenidades nunca tomó 3 columnas en tablet.
- `dateParser.ts` — off-by-one en seriales numéricos de Sheets. `new Date(ms)` da medianoche UTC, que en Colombia (UTC-5) se renderiza como el día ANTERIOR. Ahora se reconstruye al mediodía local, igual que las demás ramas.
- `NotFound.tsx` — estaba en inglés en un sitio en español, y usaba `<a href="/">` que sale del SPA. Reescrita con `Layout` + `<Link>` + `noindex`.
- `Dashboard.tsx:142` — `catch {}` vacío: si el sheet fallaba, el panel quedaba en blanco sin explicación. Ahora muestra el motivo y un botón "Reintentar", más un aviso aparte si la hoja carga pero viene sin filas.

**Rendimiento**
- `Dashboard` cargado con `React.lazy` + `Suspense`. Antes, quien entraba a la home descargaba recharts (~400 KB) y todo el panel sin usarlo.

**SEO**
- `DocumentMeta.tsx` (nuevo): `<title>`, description, Open Graph y canonical por ruta, centralizado. Antes todas las páginas compartían el título del `index.html`.
- `public/CNAME` (nuevo): el dominio estaba solo en la interfaz de GitHub, sin versionar.

**Seguridad / limpieza**
- CSP endurecida en `index.html`: `img-src` pasa de `https:` (cualquier dominio) a `'self' data:`; añadidos `base-uri`, `object-src 'none'`, `form-action` y `frame-ancestors 'none'`.
- `lovable-tagger` eliminado de `package.json` y `vite.config.ts`.
- Tests reales: `src/test/dateParser.test.ts` (16 casos, incluye regresión del off-by-one) y `src/test/exportCsv.test.ts` (8 casos, incluye inyección CSV).

**Verificación 2026-08-12 (sesión con Node/Bun disponibles)**
- `bun install` → lockfile regenerado, `lovable-tagger` eliminado (1 paquete removido).
- `bun run test` → 25/25 tests en verde (3 archivos).
- `bunx tsc -b --noEmit` → limpio, tras corregir `vite.config.ts` (ver abajo).
- `bun run build` → OK. Main `index-*.js` 637.71 kB (196.79 kB gzip); `Dashboard-*.js` en chunk aparte 432.39 kB (110.77 kB gzip). Verificado que recharts NO está en el chunk principal y que `index.html` no lo precarga.
- Correcciones aplicadas en esta sesión:
  - `vite.config.ts`: `defineConfig(() => ({...}))` → `defineConfig({...})`. Con la forma de función, TypeScript ensanchaba `minify: 'terser'` a `string` y fallaba el chequeo de tipos (TS2769). `vite build` no tipa, así que el error solo salía en el editor o al correr `tsc`.
  - `src/test/exportCsv.test.ts`: el BOM (U+FEFF) estaba escrito como carácter literal dentro de una regex; ESLint lo marcaba como `no-irregular-whitespace`. Cambiado a la secuencia `\uFEFF`.
- CSP auditada contra todas las peticiones reales del sitio: `fetch` a `docs.google.com` y `formspree.io` (connect-src ✓), iframe de `www.google.com/maps/embed` (frame-src ✓), imágenes todas locales (`img-src 'self' data:` ✓), fuentes de Google (✓). Sin `eval`/`new Function` en el bundle, así que no hace falta `unsafe-eval`.
- `frame-ancestors 'none'` retirado de la CSP: los navegadores lo ignoran cuando viaja en un `<meta>`, así que solo generaba ruido en consola sin proteger nada. Queda un comentario en `index.html` explicando que el clickjacking exige cabecera HTTP (`Content-Security-Policy` o `X-Frame-Options`), imposible de configurar en GitHub Pages. **Pendiente real si se migra a Cloudflare Pages / Netlify.**
- `Dashboard.tsx` — flag `hasFetched`: el aviso ámbar de "la hoja no devolvió contratos" parpadeaba un fotograma justo tras el login, en el render que ocurre antes de que `fetchData` ponga `loading = true`. Ahora solo aparece después de una consulta real.
- `bunx update-browserslist-db@latest` → `caniuse-lite` a 1.0.30001809. El build ya no avisa de datos obsoletos. Sin cambios en los navegadores objetivo, así que el output es equivalente.

**Desactivado temporalmente**
- `locations.ts` — `virtualTourUrl` de Modelia comentado. El VPS (145.223.106.8) responde vacío en todas las rutas; el botón llevaba a una página en blanco. Descomentar cuando el tour vuelva.

## Pendiente

### 🔴 Urgente (fuga de datos)
- [ ] **Quitar el permiso "cualquiera con el enlace" del Google Sheet.** El endpoint `gviz/tq` solo funciona si la hoja es pública, y `VITE_SHEET_ID` queda escrito en el bundle JS. Hoy los datos de inquilinos son accesibles sin pasar por el login. Rompe el Dashboard, pero cierra la fuga.
- [ ] Rotar la contraseña del Dashboard (asumir comprometida).
- [ ] Decidir arquitectura real del Dashboard: Cloudflare Access, función serverless, o backend en el VPS. Un SPA estático no puede guardar un secreto.

### 🔴 Tour caído
- [ ] SSH al VPS `145.223.106.8` y revisar `tail -50 /var/log/nginx/error.log`. Responde vacío en todas las rutas (ni siquiera da 404), así que el docroot está vacío o el upstream está muerto.

### Resto
- [ ] Subir imagen `/public/og-image.jpg` (1200×630px) para OG social
- [x] Ejecutar `bun install` para regenerar el lockfile tras quitar `lovable-tagger` — hecho 2026-08-12, `bun.lockb` actualizado (falta commitearlo)
- [ ] Migrar `HashRouter` → `BrowserRouter` (`public/404.html` ya tiene el redirect listo) y regenerar `sitemap.xml` sin `#`. Ojo: rompe los enlaces `#/...` ya compartidos.
- [ ] Registrar sitemap.xml en Google Search Console: https://search.google.com/search-console
- [ ] `embedMapUrl` de Modelia tiene un place ID inventado (`0x8e3f9bf33e1c1c1d`, patrón `1c1c` repetido). Regenerarlo desde Google Maps.
- [ ] Tests de la validación del formulario de contacto
- [ ] Borrar `src/test/example.test.ts` (relleno, ya hay tests reales)
- [ ] Tipar el Dashboard (`type Contrato`) en vez de `any`
- [ ] `HABS_POR_PROYECTO` hardcodeado en `Dashboard.tsx:14` — al abrir sede nueva el % de ocupación queda mal en silencio
- [ ] Optimizar imágenes (WebP + `srcset`)
- [ ] Evaluar cancelar el hosting compartido de Hostinger si no se va a usar

## Decisiones tomadas

- **Auth en SPA estático:** Se optó por hash SHA-256 del string `"usuario:contraseña"` almacenado en variable de entorno Vite. Es la mejor solución sin backend — el hash es irreversible y la contraseña no aparece en el código.
- **Dashboard refactor:** Se preservó 100% de la funcionalidad visual. No se cambió ningún comportamiento, solo se reorganizó el código en componentes cohesivos.
- **Calendario de ocupación:** Las habitaciones se derivan dinámicamente de los contratos históricos. Limitación conocida: habitaciones que nunca han tenido contrato no aparecen.
- **Número de WhatsApp:** Se unificó a `573028366373` en CTASection y Contact (ya estaba correcto en WhatsAppButton y en el panel de contacto info).
