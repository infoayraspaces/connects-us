// Google Sheets puede enviar fechas como número serial, string DD/MM/YYYY, YYYY-MM-DD
// o el formato de la Visualization API: "Date(2026,7,31)"
export function parseFecha(val: unknown): Date | null {
  if (!val && val !== 0) return null;
  if (typeof val === "number") {
    return new Date((val - 25569) * 86400 * 1000);
  }
  const str = String(val).trim();
  if (!str) return null;
  const idx = str.indexOf("Date(");
  if (idx !== -1) {
    const inner = str.substring(idx + 5, str.indexOf(")", idx));
    const parts = inner.split(",").map(Number);
    if (parts.length >= 3) return new Date(parts[0], parts[1], parts[2], 12, 0, 0);
  }
  if (str.includes("/")) {
    const parts = str.split("/");
    if (parts.length === 3) {
      const d = parts[0].padStart(2, "0");
      const m = parts[1].padStart(2, "0");
      const y = parts[2].length === 2 ? "20" + parts[2] : parts[2];
      return new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
    }
  }
  if (str.length >= 10 && str[4] === "-") {
    const p = str.substring(0, 10).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0);
  }
  return null;
}

export function formatFecha(val: unknown): string {
  const d = parseFecha(val);
  if (!d || isNaN(d.getTime())) return String(val || "");
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}
