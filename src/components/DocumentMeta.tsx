import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { locations } from "@/data/locations";

const SITE = "AYRA Coliving Bogotá";
const BASE_URL = "https://ayracoliving.com";

const DEFAULT_DESCRIPTION =
  "AYRA Coliving en Bogotá: espacios de vida compartida con comunidad, sostenibilidad y bienestar. Para profesionales jóvenes y nómadas digitales.";

const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${SITE} — Vive en Comunidad`,
    description: DEFAULT_DESCRIPTION,
  },
  "/ubicaciones": {
    title: `Nuestras sedes en Bogotá | ${SITE}`,
    description:
      "Conoce las sedes de AYRA Coliving en Bogotá: Modelia y Teusaquillo. Habitaciones amobladas con servicios incluidos y espacios comunes.",
  },
  "/comunidad": {
    title: `La comunidad AYRA | ${SITE}`,
    description:
      "Así es vivir en comunidad en AYRA: eventos, espacios compartidos y una red de profesionales jóvenes y nómadas digitales en Bogotá.",
  },
  "/preguntas": {
    title: `Preguntas frecuentes | ${SITE}`,
    description:
      "Resolvemos las dudas más comunes sobre precios, estadía mínima, servicios incluidos y el proceso de aplicación en AYRA Coliving.",
  },
  "/contacto": {
    title: `Agenda tu tour | ${SITE}`,
    description:
      "Agenda una visita a AYRA Coliving en Bogotá. Tours de lunes a sábado, de 9am a 6pm. Respondemos en menos de 24 horas.",
  },
  "/dashboard": {
    title: `Panel de Control | ${SITE}`,
    description: DEFAULT_DESCRIPTION,
  },
};

function setMetaTag(selector: string, attr: string, name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Mantiene <title>, description, Open Graph y canonical sincronizados con la ruta.
 *
 * Va centralizado aquí en vez de repetido en cada página para que añadir una ruta
 * nueva sea una sola línea en el mapa META de arriba.
 *
 * Nota: mientras se use HashRouter, Google ignora el fragmento y solo indexa la
 * home. Esto mejora las pestañas del navegador y deja el terreno listo para la
 * migración a BrowserRouter. Ver REVISION-2026-08-12.md.
 */
const DocumentMeta = () => {
  const { pathname } = useLocation();
  const params = useParams<{ id?: string }>();

  useEffect(() => {
    let meta = META[pathname];

    // Las páginas de sede se generan a partir del catálogo de ubicaciones.
    if (!meta && pathname.startsWith("/ubicaciones/")) {
      const id = params.id ?? pathname.split("/")[2];
      const location = locations.find((l) => l.id === id);
      if (location) {
        meta = {
          title: `${location.name} — ${location.neighborhood} | ${SITE}`,
          description: location.description.slice(0, 155),
        };
      }
    }

    if (!meta) {
      meta = { title: `Página no encontrada | ${SITE}`, description: DEFAULT_DESCRIPTION };
    }

    const url = `${BASE_URL}/#${pathname}`;

    document.title = meta.title;
    setMetaTag('meta[name="description"]', "name", "description", meta.description);
    setMetaTag('meta[property="og:title"]', "property", "og:title", meta.title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", meta.description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", url);
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    setCanonical(url);
  }, [pathname, params.id]);

  return null;
};

export default DocumentMeta;
