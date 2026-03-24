import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseFecha, formatFecha } from "@/lib/dateParser";

interface Contrato {
  nombre: string;
  habitacion: string;
  proyecto: string;
  fecha_inicio: unknown;
  fecha_fin: unknown;
  fecha_salida?: unknown;
  valor: unknown;
}

interface TooltipData {
  nombre: string;
  proyecto: string;
  fechaInicio: unknown;
  fechaFin: unknown;
  fechaSalida?: unknown;
  valor: unknown;
  x: number;
  y: number;
}

interface Props {
  contratos: Contrato[];
  filtroProyecto?: string;
}

const PROJECT_COLORS: Record<string, string> = {
  "La Nevera Living": "bg-[#2d6a4f] text-white",
  "Koti Coliving": "bg-[#264653] text-white",
  "Ecoliving TEU": "bg-[#2a9d8f] text-white",
};

const PROJECT_BAR_COLOR: Record<string, string> = {
  "La Nevera Living": "#2d6a4f",
  "Koti Coliving": "#264653",
  "Ecoliving TEU": "#2a9d8f",
};

const PROJECT_DOT: Record<string, string> = {
  "La Nevera Living": "bg-[#2d6a4f]",
  "Koti Coliving": "bg-[#264653]",
  "Ecoliving TEU": "bg-[#2a9d8f]",
};

function addMonths(date: Date, n: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function primerNombre(nombre: string): string {
  return nombre?.split(" ")[0] ?? nombre;
}

export function OccupancyCalendar({ contratos, filtroProyecto }: Props) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const totalDays = daysInMonth(year, month);

  const monthLabel = viewDate.toLocaleDateString("es-CO", { month: "long", year: "numeric" });

  // Derivar habitaciones únicas por proyecto
  const habitacionesPorProyecto = contratos.reduce((acc: Record<string, Set<string>>, c) => {
    if (c.proyecto && c.habitacion) {
      if (!acc[c.proyecto]) acc[c.proyecto] = new Set();
      acc[c.proyecto].add(c.habitacion);
    }
    return acc;
  }, {});

  // Respetar filtro de proyecto
  const proyectos = Object.keys(habitacionesPorProyecto)
    .filter(p => !filtroProyecto || filtroProyecto === "Todos" || p === filtroProyecto)
    .sort();

  // Usar fecha_salida como fecha de fin real si tiene valor
  const fechaFinEfectiva = (c: Contrato): unknown =>
    c.fecha_salida != null && c.fecha_salida !== "" ? c.fecha_salida : c.fecha_fin;

  const contratoEnDia = (proyecto: string, habitacion: string, day: number): Contrato | null => {
    const fecha = new Date(year, month, day, 12, 0, 0);
    return (
      contratos.find(c => {
        if (c.proyecto !== proyecto || c.habitacion !== habitacion) return false;
        const inicio = parseFecha(c.fecha_inicio);
        const fin = parseFecha(fechaFinEfectiva(c));
        if (!inicio || !fin) return false;
        return fecha >= inicio && fecha <= fin;
      }) ?? null
    );
  };

  const bloquesHabitacion = (proyecto: string, habitacion: string) => {
    const bloques: { startDay: number; endDay: number; contrato: Contrato }[] = [];
    let current: { startDay: number; endDay: number; contrato: Contrato } | null = null;

    for (let d = 1; d <= totalDays; d++) {
      const c = contratoEnDia(proyecto, habitacion, d);
      if (c) {
        if (
          current &&
          current.contrato.nombre === c.nombre &&
          current.contrato.habitacion === c.habitacion
        ) {
          current.endDay = d;
        } else {
          if (current) bloques.push(current);
          current = { startDay: d, endDay: d, contrato: c };
        }
      } else {
        if (current) {
          bloques.push(current);
          current = null;
        }
      }
    }
    if (current) bloques.push(current);
    return bloques;
  };

  const dayHeaders = Array.from({ length: totalDays }, (_, i) => i + 1);
  const showDayLabel = (d: number) => {
    const dow = new Date(year, month, d).getDay();
    return d === 1 || dow === 1;
  };

  if (contratos.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <p className="text-sm text-gray-400">Carga los contratos para ver el calendario de ocupación</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Tooltip flotante */}
      {tooltip && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg shadow-xl px-3 py-2 pointer-events-none"
          style={{ left: tooltip.x + 14, top: tooltip.y - 10 }}
        >
          <div className="font-semibold">{tooltip.nombre}</div>
          <div className="text-gray-400 text-[11px]">{tooltip.proyecto}</div>
          <div className="mt-1 text-gray-300">
            {formatFecha(tooltip.fechaInicio)} →{" "}
            {formatFecha(tooltip.fechaSalida ?? tooltip.fechaFin)}
            {tooltip.fechaSalida && (
              <span className="ml-1 text-yellow-300">(salida anticipada)</span>
            )}
          </div>
          <div className="text-green-400 font-medium">
            ${Number(tooltip.valor || 0).toLocaleString("es-CO")}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-gray-800">Calendario de ocupación</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {filtroProyecto && filtroProyecto !== "Todos"
              ? filtroProyecto
              : "Todos los proyectos"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewDate(d => addMonths(d, -1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700 capitalize w-40 text-center">
            {monthLabel}
          </span>
          <button
            onClick={() => setViewDate(d => addMonths(d, 1))}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-3 mb-4">
        {proyectos.map(p => (
          <span key={p} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`w-3 h-3 rounded-sm inline-block ${PROJECT_DOT[p] || "bg-gray-400"}`} />
            {p}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-3 h-3 rounded-sm inline-block bg-gray-100 border border-gray-200" />
          Disponible
        </span>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <div style={{ minWidth: `${totalDays * 18 + 160}px` }}>
          {/* Encabezado de días */}
          <div className="flex mb-1">
            <div className="w-40 flex-shrink-0" />
            {dayHeaders.map(d => (
              <div key={d} className="flex-1 text-center" style={{ minWidth: 18 }}>
                {showDayLabel(d) && (
                  <span className="text-xs text-gray-300">{d}</span>
                )}
              </div>
            ))}
          </div>

          {/* Filas por proyecto y habitación */}
          {proyectos.map(proyecto => {
            const habs = Array.from(habitacionesPorProyecto[proyecto]).sort((a, b) =>
              String(a).localeCompare(String(b), "es", { numeric: true })
            );
            const barColor = PROJECT_BAR_COLOR[proyecto] || "#6b7280";

            return (
              <div key={proyecto}>
                {/* Separador de proyecto */}
                <div className="flex items-center my-2">
                  <div
                    className={`w-40 flex-shrink-0 text-xs font-semibold px-2 py-1 rounded ${
                      PROJECT_COLORS[proyecto] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {proyecto}
                  </div>
                  <div className="flex-1 h-px bg-gray-100 ml-2" />
                </div>

                {habs.map(hab => {
                  const bloques = bloquesHabitacion(proyecto, hab);
                  return (
                    <div key={hab} className="flex items-center mb-1 group">
                      <div className="w-40 flex-shrink-0 text-xs text-gray-500 px-2 truncate group-hover:text-gray-800 transition-colors">
                        Hab. {hab}
                      </div>
                      {/* Fila de días */}
                      <div className="flex-1 relative h-7 bg-gray-50 rounded border border-gray-100">
                        {/* Líneas divisorias */}
                        <div className="absolute inset-0 flex pointer-events-none">
                          {dayHeaders.map(d => (
                            <div
                              key={d}
                              className="flex-1 border-r border-gray-100 last:border-0"
                            />
                          ))}
                        </div>
                        {/* Barras de contratos */}
                        {bloques.map((bloque, bi) => {
                          const leftPct = ((bloque.startDay - 1) / totalDays) * 100;
                          const widthPct =
                            ((bloque.endDay - bloque.startDay + 1) / totalDays) * 100;
                          const tieneSalidaAnticipada =
                            bloque.contrato.fecha_salida != null &&
                            bloque.contrato.fecha_salida !== "";
                          return (
                            <div
                              key={bi}
                              className="absolute top-1 bottom-1 rounded-md flex items-center overflow-hidden cursor-default select-none"
                              style={{
                                left: `${leftPct}%`,
                                width: `${widthPct}%`,
                                backgroundColor: barColor,
                                opacity: tieneSalidaAnticipada ? 0.7 : 0.92,
                              }}
                              onMouseEnter={e =>
                                setTooltip({
                                  nombre: bloque.contrato.nombre,
                                  proyecto,
                                  fechaInicio: bloque.contrato.fecha_inicio,
                                  fechaFin: bloque.contrato.fecha_fin,
                                  fechaSalida: tieneSalidaAnticipada
                                    ? bloque.contrato.fecha_salida
                                    : undefined,
                                  valor: bloque.contrato.valor,
                                  x: e.clientX,
                                  y: e.clientY,
                                })
                              }
                              onMouseMove={e =>
                                setTooltip(t => (t ? { ...t, x: e.clientX, y: e.clientY } : null))
                              }
                              onMouseLeave={() => setTooltip(null)}
                            >
                              <span className="text-xs px-1.5 truncate text-white font-medium leading-none">
                                {primerNombre(bloque.contrato.nombre)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
