import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

const NEVERA_SHEET_ID = "1yd5JdYg-3lJneBheZht4O9KwKvgvnTeVOy1-0vhX7kU";
const NEVERA_MESES = ["ENE 25","FEB 25","MARZO 25","ABRIL 25","MAYO 25","JUNIO 25","JULIO 25","AGOSTO 25","SEPT 25","OCT 25","NOV 25","DIC 25"];
const NEVERA_LABELS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

const KOTI_SHEET_ID = "1AkM5C8J05I-jBJZh8vbXwPnhLzzLC5kD9ffPbGplrmI";
const KOTI_MESES_2024 = ["ABR24","MAY24","JUN24","JUL24","AGO24","SEP24","OCT24","NOV24","DIC24"];
const KOTI_LABELS_2024 = ["Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
const KOTI_MESES_2025 = ["ENE25","FEB25","MAR25","ABR25","MAYO2025","JUNIO 2025","JULIO 2025","AGOSTO 2025","SEPTIEMBRE 2025","OCTUBRE 2025","NOVIEMBRE 2025","DICIEMBRE 2025"];
const KOTI_LABELS_2025 = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

interface MesData { ingreso: number; egreso: number; utilidad: number; ocupacion: number; }

async function fetchMes(sheetId: string, mes: string): Promise<MesData> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(mes)}`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows.map((r: any) => r.c.map((c: any) => c?.v ?? ""));
    let ingreso = 0, egreso = 0, utilidad = 0, ocupacion = 0;
    for (const row of rows) {
      const labels = row.map((v: any) => String(v).trim().toLowerCase());
      for (let i = 0; i < labels.length; i++) {
        const findNext = (start: number) => {
          for (let j = start + 1; j < row.length; j++) {
            const v = Number(String(row[j]).replace(/[^0-9.-]/g, ""));
            if (!isNaN(v) && v !== 0) return v;
          }
          return 0;
        };
        if (labels[i].includes("total ingresos") || labels[i] === "total ingreso") {
          const v = findNext(i); if (v > 0) ingreso = v;
        }
        if (labels[i].includes("total egresos") || labels[i] === "total egreso") {
          const v = findNext(i); if (v > 0) egreso = v;
        }
        if (labels[i].includes("utilidad operativa")) {
          const v = findNext(i); if (v !== 0) utilidad = v;
        }
        if (labels[i].includes("% de ocupaci")) {
          const v = findNext(i); if (v > 0) ocupacion = v / 10;
        }
      }
    }
    if (utilidad === 0 && ingreso > 0 && egreso > 0) utilidad = ingreso - egreso;
    return { ingreso, egreso, utilidad, ocupacion };
  } catch {
    return { ingreso: 0, egreso: 0, utilidad: 0, ocupacion: 0 };
  }
}

function OcupacionBars({ datos, labels }: { datos: MesData[]; labels: string[] }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-6">Ocupación mensual</h3>
      <div className="flex items-end gap-3 h-32">
        {datos.map((d, i) => {
          const pct = Math.min(d.ocupacion / 100, 1.1);
          const color = d.ocupacion >= 100 ? "#2d6a4f" : d.ocupacion >= 90 ? "#52b788" : d.ocupacion >= 80 ? "#c0843a" : "#e76f51";
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-700">{d.ocupacion > 0 ? d.ocupacion.toFixed(1) + "%" : "—"}</span>
              <div className="w-full rounded-t-md" style={{ height: `${pct * 90}%`, background: color }} />
              <span className="text-xs text-gray-400">{labels[i]}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#2d6a4f] inline-block" />≥100%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#52b788] inline-block" />90-99%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#c0843a] inline-block" />80-89%</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#e76f51] inline-block" />&lt;80%</span>
      </div>
    </div>
  );
}

function DetalleTabla({ datos, labels, anio }: { datos: MesData[]; labels: string[]; anio: string }) {
  const fmt = (v: number) => "$" + Math.round(v).toLocaleString("es-CO");
  const totalIngreso = datos.reduce((s, d) => s + d.ingreso, 0);
  const totalEgreso = datos.reduce((s, d) => s + d.egreso, 0);
  const totalUtilidad = datos.reduce((s, d) => s + d.utilidad, 0);
  const ocupActivos = datos.filter(d => d.ocupacion > 0);
  const ocupPromedio = ocupActivos.length > 0 ? ocupActivos.reduce((s, d) => s + d.ocupacion, 0) / ocupActivos.length : 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-800 mb-4">Detalle mensual — {anio}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Mes","Ingresos","Egresos","Utilidad","Margen","Ocupación"].map((h, i) => (
                <th key={h} className={`py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide ${i === 0 ? "text-left" : i === 5 ? "text-center" : "text-right"}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((d, i) => {
              const margen = d.ingreso > 0 ? (d.utilidad / d.ingreso) * 100 : 0;
              const ocupColor = d.ocupacion >= 95 ? "bg-green-100 text-green-700" : d.ocupacion >= 80 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
              return (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-800">{labels[i]} {anio}</td>
                  <td className="py-3 px-3 text-right text-gray-700">{d.ingreso > 0 ? fmt(d.ingreso) : "—"}</td>
                  <td className="py-3 px-3 text-right text-gray-500">{d.egreso > 0 ? fmt(d.egreso) : "—"}</td>
                  <td className="py-3 px-3 text-right font-medium" style={{ color: d.utilidad > 0 ? "#2d6a4f" : "#e76f51" }}>{d.utilidad !== 0 ? fmt(d.utilidad) : "—"}</td>
                  <td className="py-3 px-3 text-right text-gray-500">{d.ingreso > 0 ? margen.toFixed(1) + "%" : "—"}</td>
                  <td className="py-3 px-3 text-center">{d.ocupacion > 0 ? <span className={`px-2 py-1 rounded-full text-xs font-medium ${ocupColor}`}>{d.ocupacion.toFixed(1)}%</span> : "—"}</td>
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-semibold">
              <td className="py-3 px-3 text-gray-800">Total {anio}</td>
              <td className="py-3 px-3 text-right text-gray-800">{fmt(totalIngreso)}</td>
              <td className="py-3 px-3 text-right text-gray-600">{fmt(totalEgreso)}</td>
              <td className="py-3 px-3 text-right" style={{ color: "#2d6a4f" }}>{fmt(totalUtilidad)}</td>
              <td className="py-3 px-3 text-right text-gray-600">{totalIngreso > 0 ? ((totalUtilidad / totalIngreso) * 100).toFixed(1) + "%" : "—"}</td>
              <td className="py-3 px-3 text-center"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{ocupPromedio.toFixed(1)}%</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InformeNevera() {
  const [datos, setDatos] = useState<MesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(NEVERA_MESES.map(m => fetchMes(NEVERA_SHEET_ID, m))).then(results => {
      setDatos(results); setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
      <div className="inline-block w-6 h-6 border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-gray-400">Cargando informe La Nevera Living...</p>
    </div>
  );

  const totalIngreso = datos.reduce((s, d) => s + d.ingreso, 0);
  const totalUtilidad = datos.reduce((s, d) => s + d.utilidad, 0);
  const ocupActivos = datos.filter(d => d.ocupacion > 0);
  const ocupPromedio = ocupActivos.length > 0 ? ocupActivos.reduce((s, d) => s + d.ocupacion, 0) / ocupActivos.length : 0;
  const mejorMes = datos.reduce((best, d, i) => d.ingreso > (datos[best]?.ingreso || 0) ? i : best, 0);
  const maxIngreso = Math.max(...datos.map(d => d.ingreso));
  const fmt = (v: number) => "$" + (v / 1000000).toFixed(1) + "M";
  const fmtFull = (v: number) => "$" + Math.round(v).toLocaleString("es-CO");

  return (
    <div className="space-y-6">
      <div className="bg-[#1a3a2a] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-green-300 uppercase tracking-widest mb-1">Informe Ejecutivo 2025</p>
            <h2 className="text-2xl font-bold">La Nevera Living</h2>
            <p className="text-sm text-white/50 mt-1">9 habitaciones · Bogotá</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center"><p className="text-2xl font-bold text-[#52b788]">{fmt(totalIngreso)}</p><p className="text-xs text-white/40 uppercase tracking-wide">Ingresos 2025</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-[#e9c46a]">{fmt(totalUtilidad)}</p><p className="text-xs text-white/40 uppercase tracking-wide">Utilidad 2025</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-white">{ocupPromedio.toFixed(1)}%</p><p className="text-xs text-white/40 uppercase tracking-wide">Ocupación prom.</p></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ingreso total", val: fmt(totalIngreso), sub: "Año 2025", color: "bg-[#2d6a4f]" },
          { label: "Egreso total", val: fmt(datos.reduce((s, d) => s + d.egreso, 0)), sub: "Costos operativos", color: "bg-[#c0843a]" },
          { label: "Utilidad neta", val: fmt(totalUtilidad), sub: `Margen ${((totalUtilidad / totalIngreso) * 100).toFixed(1)}%`, color: "bg-[#52b788]" },
          { label: "Mejor mes", val: NEVERA_LABELS[mejorMes], sub: fmt(maxIngreso), color: "bg-[#264653]" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{k.label}</p>
              <div className={`w-2 h-2 rounded-full ${k.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{k.val}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-6">Ingresos vs Egresos por mes</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={datos.map((d, i) => ({ mes: NEVERA_LABELS[i], ingreso: d.ingreso, egreso: d.egreso, utilidad: d.utilidad }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => "$" + (v / 1000000).toFixed(0) + "M"} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: any) => fmtFull(v)} />
            <Legend />
            <Bar dataKey="ingreso" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Ingresos" />
            <Bar dataKey="egreso" fill="#c0843a" radius={[4, 4, 0, 0]} name="Egresos" />
            <Bar dataKey="utilidad" fill="#52b788" radius={[4, 4, 0, 0]} name="Utilidad" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <OcupacionBars datos={datos} labels={NEVERA_LABELS} />
      <DetalleTabla datos={datos} labels={NEVERA_LABELS} anio="2025" />
    </div>
  );
}

export function InformeKoti() {
  const [anio, setAnio] = useState("2025");
  const [datos, setDatos] = useState<MesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const meses = anio === "2024" ? KOTI_MESES_2024 : KOTI_MESES_2025;
    Promise.all(meses.map(m => fetchMes(KOTI_SHEET_ID, m))).then(results => {
      setDatos(results); setLoading(false);
    });
  }, [anio]);

  const labels = anio === "2024" ? KOTI_LABELS_2024 : KOTI_LABELS_2025;
  const totalIngreso = datos.reduce((s, d) => s + d.ingreso, 0);
  const totalUtilidad = datos.reduce((s, d) => s + d.utilidad, 0);
  const ocupActivos = datos.filter(d => d.ocupacion > 0);
  const ocupPromedio = ocupActivos.length > 0 ? ocupActivos.reduce((s, d) => s + d.ocupacion, 0) / ocupActivos.length : 0;
  const mejorMes = datos.reduce((best, d, i) => d.ingreso > (datos[best]?.ingreso || 0) ? i : best, 0);
  const maxIngreso = Math.max(...(datos.map(d => d.ingreso).length > 0 ? datos.map(d => d.ingreso) : [0]));
  const fmt = (v: number) => "$" + (v / 1000000).toFixed(1) + "M";
  const fmtFull = (v: number) => "$" + Math.round(v).toLocaleString("es-CO");

  if (loading) return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
      <div className="inline-block w-6 h-6 border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm text-gray-400">Cargando informe Koti Coliving...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-[#1a3a2a] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-green-300 uppercase tracking-widest mb-1">Informe Ejecutivo</p>
            <h2 className="text-2xl font-bold">Koti Coliving</h2>
            <p className="text-sm text-white/50 mt-1">11 habitaciones · Bogotá</p>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex gap-2">
              {["2024", "2025"].map(y => (
                <button key={y} onClick={() => setAnio(y)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${anio === y ? "bg-[#52b788] text-white" : "bg-white/10 text-white/60 hover:bg-white/20"}`}>
                  {y}
                </button>
              ))}
            </div>
            <div className="flex gap-6">
              <div className="text-center"><p className="text-2xl font-bold text-[#52b788]">{fmt(totalIngreso)}</p><p className="text-xs text-white/40 uppercase tracking-wide">Ingresos {anio}</p></div>
              <div className="text-center"><p className="text-2xl font-bold text-[#e9c46a]">{fmt(totalUtilidad)}</p><p className="text-xs text-white/40 uppercase tracking-wide">Utilidad {anio}</p></div>
              <div className="text-center"><p className="text-2xl font-bold text-white">{ocupPromedio.toFixed(1)}%</p><p className="text-xs text-white/40 uppercase tracking-wide">Ocupación prom.</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ingreso total", val: fmt(totalIngreso), sub: `Año ${anio}`, color: "bg-[#2d6a4f]" },
          { label: "Egreso total", val: fmt(datos.reduce((s, d) => s + d.egreso, 0)), sub: "Costos operativos", color: "bg-[#c0843a]" },
          { label: "Utilidad neta", val: fmt(totalUtilidad), sub: totalIngreso > 0 ? `Margen ${((totalUtilidad / totalIngreso) * 100).toFixed(1)}%` : "—", color: "bg-[#52b788]" },
          { label: "Mejor mes", val: datos.length > 0 ? labels[mejorMes] : "—", sub: maxIngreso > 0 ? fmt(maxIngreso) : "—", color: "bg-[#264653]" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{k.label}</p>
              <div className={`w-2 h-2 rounded-full ${k.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{k.val}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-6">Ingresos vs Egresos por mes — {anio}</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={datos.map((d, i) => ({ mes: labels[i], ingreso: d.ingreso, egreso: d.egreso, utilidad: d.utilidad }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => "$" + (v / 1000000).toFixed(0) + "M"} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: any) => fmtFull(v)} />
            <Legend />
            <Bar dataKey="ingreso" fill="#2d6a4f" radius={[4, 4, 0, 0]} name="Ingresos" />
            <Bar dataKey="egreso" fill="#c0843a" radius={[4, 4, 0, 0]} name="Egresos" />
            <Bar dataKey="utilidad" fill="#52b788" radius={[4, 4, 0, 0]} name="Utilidad" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <OcupacionBars datos={datos} labels={labels} />
      <DetalleTabla datos={datos} labels={labels} anio={anio} />
    </div>
  );
}
