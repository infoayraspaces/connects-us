import { describe, it, expect } from "vitest";
import { parseFecha, formatFecha } from "@/lib/dateParser";

// Helper: compara solo año/mes/día en hora local, que es lo que ve el usuario.
const ymd = (d: Date | null) =>
  d === null ? null : [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("-");

describe("parseFecha", () => {
  describe("valores vacíos", () => {
    it("devuelve null para null, undefined y string vacío", () => {
      expect(parseFecha(null)).toBeNull();
      expect(parseFecha(undefined)).toBeNull();
      expect(parseFecha("")).toBeNull();
      expect(parseFecha("   ")).toBeNull();
    });

    it("no confunde el 0 con un valor vacío", () => {
      // 0 es un serial válido de Sheets, no un campo en blanco
      expect(parseFecha(0)).not.toBeNull();
    });
  });

  describe("formato de la Visualization API: Date(YYYY,M,D)", () => {
    it("parsea con mes 0-indexado, como hace JS", () => {
      // Date(2026,7,31) = 31 de AGOSTO de 2026, no de julio
      expect(ymd(parseFecha("Date(2026,7,31)"))).toBe("2026-8-31");
    });

    it("parsea enero correctamente", () => {
      expect(ymd(parseFecha("Date(2025,0,1)"))).toBe("2025-1-1");
    });
  });

  describe("formato DD/MM/YYYY", () => {
    it("interpreta el primer campo como día, no como mes", () => {
      // 03/08 debe ser 3 de agosto (formato colombiano), no 8 de marzo
      expect(ymd(parseFecha("03/08/2026"))).toBe("2026-8-3");
    });

    it("acepta día y mes sin cero a la izquierda", () => {
      expect(ymd(parseFecha("3/8/2026"))).toBe("2026-8-3");
    });

    it("expande el año de dos dígitos", () => {
      expect(ymd(parseFecha("15/06/25"))).toBe("2025-6-15");
    });
  });

  describe("formato ISO YYYY-MM-DD", () => {
    it("parsea la fecha en hora local, sin desplazarla por zona horaria", () => {
      expect(ymd(parseFecha("2026-08-31"))).toBe("2026-8-31");
    });

    it("ignora la parte de hora si viene un timestamp completo", () => {
      expect(ymd(parseFecha("2026-08-31T23:45:00Z"))).toBe("2026-8-31");
    });
  });

  describe("serial numérico de Sheets", () => {
    // Regresión: antes se construía con `new Date(ms)`, que da medianoche UTC.
    // En Colombia (UTC-5) eso se renderizaba como el día ANTERIOR.
    it("no adelanta ni atrasa el día en zonas horarias negativas", () => {
      // Serial 45881 = 2025-08-12 (45658 = 2025-01-01, + 223 días)
      expect(ymd(parseFecha(45881))).toBe("2025-8-12");
    });

    it("coincide con el mismo día expresado como string", () => {
      expect(ymd(parseFecha(45881))).toBe(ymd(parseFecha("12/08/2025")));
    });
  });

  describe("entradas inválidas", () => {
    it("devuelve null en texto que no es una fecha", () => {
      expect(parseFecha("pendiente")).toBeNull();
      expect(parseFecha("N/A")).toBeNull();
    });
  });
});

describe("formatFecha", () => {
  it("formatea como DD/MM/YYYY", () => {
    expect(formatFecha("2026-08-31")).toBe("31/08/2026");
  });

  it("es estable: parsear y formatear no cambia el día", () => {
    expect(formatFecha("03/08/2026")).toBe("03/08/2026");
  });

  it("devuelve el valor original si no puede parsearlo", () => {
    expect(formatFecha("pendiente")).toBe("pendiente");
  });

  it("devuelve string vacío para valores vacíos", () => {
    expect(formatFecha(null)).toBe("");
    expect(formatFecha("")).toBe("");
  });
});
