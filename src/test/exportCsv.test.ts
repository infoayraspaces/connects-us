import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { exportToCsv } from "@/lib/exportCsv";

// jsdom no implementa createObjectURL ni descargas reales, así que
// interceptamos el Blob para poder inspeccionar el CSV generado.
let captured: string | null = null;

beforeEach(() => {
  captured = null;

  // Blob de mentira: solo necesitamos leer el texto que se le pasa.
  vi.stubGlobal(
    "Blob",
    class MockBlob {
      constructor(parts: string[]) {
        captured = parts.join("");
      }
    }
  );

  URL.createObjectURL = vi.fn(() => "blob:mock");
  URL.revokeObjectURL = vi.fn();

  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const lines = () => (captured ?? "").replace(/^\uFEFF/, "").split("\n");

describe("exportToCsv", () => {
  it("no hace nada si no hay filas", () => {
    exportToCsv("vacio", []);
    expect(captured).toBeNull();
  });

  it("incluye el BOM para que Excel muestre las tildes", () => {
    exportToCsv("test", [{ nombre: "Peña" }]);
    expect(captured?.startsWith("\uFEFF")).toBe(true);
  });

  it("usa las claves de la primera fila como encabezado", () => {
    exportToCsv("test", [{ nombre: "Ana", canon: 1200000 }]);
    expect(lines()[0]).toBe("nombre,canon");
  });

  it("escribe una línea por contrato", () => {
    exportToCsv("test", [{ nombre: "Ana" }, { nombre: "Luis" }]);
    expect(lines()).toHaveLength(3); // encabezado + 2 filas
  });

  it("escapa las comillas dobles duplicándolas", () => {
    exportToCsv("test", [{ nombre: 'Ana "La Jefa"' }]);
    expect(lines()[1]).toBe('"Ana ""La Jefa"""');
  });

  it("mantiene las comas dentro del campo entrecomillado", () => {
    exportToCsv("test", [{ direccion: "Carrera 81Bis #22-62, Modelia" }]);
    expect(lines()[1]).toBe('"Carrera 81Bis #22-62, Modelia"');
  });

  it("neutraliza fórmulas para evitar inyección CSV", () => {
    // Si un inquilino se llamara =cmd(), Excel no debe ejecutarlo
    exportToCsv("test", [{ nombre: "=1+1" }]);
    expect(lines()[1]).toBe(`"'=1+1"`);
  });

  it("convierte los campos vacíos en string vacío, no en 'undefined'", () => {
    exportToCsv("test", [{ nombre: "Ana", telefono: null }]);
    expect(lines()[1]).toBe('"Ana",""');
  });
});
