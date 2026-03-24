import { useState } from "react";
import { Download, ChevronUp, ChevronDown } from "lucide-react";
import { parseFecha, formatFecha } from "@/lib/dateParser";
import { exportToCsv } from "@/lib/exportCsv";

interface Contrato {
  nombre: string;
  proyecto: string;
  habitacion: string;
  valor: unknown;
  fecha_inicio: unknown;
  fecha_fin: unknown;
  estado: string;
  [key: string]: unknown;
}

type SortKey = "nombre" | "proyecto" | "valor" | "fecha_fin";
type SortDir = "asc" | "desc";

interface Props {
  contratos: Contrato[];
}

export function ContractsTable({ contratos }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("fecha_fin");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const today = new Date();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sorted = [...contratos].sort((a, b) => {
    let valA: number | string = 0;
    let valB: number | string = 0;
    if (sortKey === "nombre" || sortKey === "proyecto") {
      valA = String(a[sortKey] || "").toLowerCase();
      valB = String(b[sortKey] || "").toLowerCase();
    } else if (sortKey === "valor") {
      valA = Number(a.valor) || 0;
      valB = Number(b.valor) || 0;
    } else if (sortKey === "fecha_fin") {
      valA = parseFecha(a.fecha_fin)?.getTime() ?? 0;
      valB = parseFecha(b.fecha_fin)?.getTime() ?? 0;
    }
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleExport = () => {
    const rows = sorted.map(c => ({
      Nombre: c.nombre,
      Proyecto: c.proyecto,
      Habitación: c.habitacion,
      Canon: Number(c.valor || 0),
      Inicio: formatFecha(c.fecha_inicio),
      Fin: formatFecha(c.fecha_fin),
      Estado: c.estado,
    }));
    exportToCsv(`contratos-ayra-${new Date().toISOString().slice(0, 10)}`, rows);
  };

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-20" />;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 text-[#2d6a4f]" /> : <ChevronDown className="w-3 h-3 text-[#2d6a4f]" />;
  }

  function SortTh({ col, label, align = "left" }: { col: SortKey; label: string; align?: string }) {
    return (
      <th
        className={`py-3 px-3 text-gray-500 font-medium text-${align} cursor-pointer select-none hover:text-[#2d6a4f] transition-colors`}
        onClick={() => handleSort(col)}
      >
        <span className="inline-flex items-center gap-1">{label}<SortIcon col={col} /></span>
      </th>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-gray-800">Contratos</h2>
          <span className="text-xs text-gray-400">{contratos.length} registros</span>
        </div>
        <button
          onClick={handleExport}
          disabled={contratos.length === 0}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-[#2d6a4f] text-white rounded-lg hover:bg-[#1e4d38] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <SortTh col="nombre" label="Nombre" />
              <SortTh col="proyecto" label="Proyecto" />
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Hab.</th>
              <SortTh col="valor" label="Canon" align="left" />
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Inicio</th>
              <SortTh col="fecha_fin" label="Fin" />
              <th className="text-left py-3 px-3 text-gray-500 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const estado = String(c.estado || "").trim();
              const fin = parseFecha(c.fecha_fin);
              const diff = fin ? Math.ceil((fin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 99;
              let estadoColor = "bg-green-100 text-green-700";
              let estadoLabel = estado || "Activo";
              if (estado === "Vencido") { estadoColor = "bg-red-100 text-red-700"; }
              else if (diff <= 30) { estadoColor = "bg-yellow-100 text-yellow-700"; estadoLabel = "Por vencer"; }
              return (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3 font-medium text-gray-800">{c.nombre}</td>
                  <td className="py-3 px-3 text-gray-500">{c.proyecto}</td>
                  <td className="py-3 px-3 text-gray-500">{c.habitacion}</td>
                  <td className="py-3 px-3 text-gray-700">${Number(c.valor || 0).toLocaleString("es-CO")}</td>
                  <td className="py-3 px-3 text-gray-500">{formatFecha(c.fecha_inicio)}</td>
                  <td className="py-3 px-3 text-gray-500">{formatFecha(c.fecha_fin)}</td>
                  <td className="py-3 px-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoColor}`}>{estadoLabel}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {contratos.length === 0 && (
          <p className="text-center text-gray-400 py-8 text-sm">No hay contratos con los filtros seleccionados</p>
        )}
      </div>
    </div>
  );
}
