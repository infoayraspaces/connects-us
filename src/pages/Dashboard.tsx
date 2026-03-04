import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LogOut, Users, TrendingUp, Home, DollarSign, AlertTriangle, CheckCircle, Clock, RefreshCw, Filter } from "lucide-react";

const CREDENTIALS = { username: "Ayracoliving2026", password: "Jamesbarrios1." };
const SHEET_ID = "1q1HjMxsxIjHRSRndbegWuNhyUrcJ9BJW8BKe5YqYFqY";
const SHEET_NAME = "Contratos";
const COLORS = ["#2d6a4f", "#c0843a", "#52b788", "#e9c46a", "#264653", "#e76f51", "#2a9d8f", "#a8dadc"];
const NEVERA_SHEET_ID = "1yd5JdYg-3lJneBheZht4O9KwKvgvnTeVOy1-0vhX7kU";
const NEVERA_MESES = ["ENE 25","FEB 25","MARZO 25","ABRIL 25","MAYO 25","JUNIO 25","JULIO 25","AGOSTO 25","SEPT 25","OCT 25","NOV 25","DIC 25"];
const NEVERA_MESES_LABELS = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

// Google Sheets puede enviar fechas como número serial, string DD/MM/YYYY o YYYY-MM-DD
function parseFecha(val: any): Date | null {
  if (!val && val !== 0) return null;
  // Número serial de Google Sheets
  if (typeof val === "number") {
    return new Date((val - 25569) * 86400 * 1000);
  }
  const str = String(val).trim();
  if (!str) return null;
  // Formato Google Viz API: "Date(2026,7,31)" — mes base 0
  const idx = str.indexOf("Date(");
  if (idx !== -1) {
    const inner = str.substring(idx + 5, str.indexOf(")", idx));
    const parts = inner.split(",").map(Number);
    if (parts.length >= 3) {
      return new Date(parts[0], parts[1], parts[2], 12, 0, 0);
    }
  }
  // DD/MM/YYYY
  if (str.includes("/")) {
    const parts = str.split("/");
    if (parts.length === 3) {
      const d = parts[0].padStart(2,"0");
      const m = parts[1].padStart(2,"0");
      const y = parts[2].length === 2 ? "20" + parts[2] : parts[2];
      return new Date(Number(y), Number(m) - 1, Number(d), 12, 0, 0);
    }
  }
  // YYYY-MM-DD
  if (str.length >= 10 && str[4] === "-") {
    const p = str.substring(0, 10).split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0);
  }
  return null;
}

function formatFecha(val: any): string {
  const d = parseFecha(val);
  if (!d || isNaN(d.getTime())) return String(val || "");
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === CREDENTIALS.username && pass === CREDENTIALS.password) {
      localStorage.setItem("ayra_dashboard_auth", "true");
      onLogin();
    } else setError("Usuario o contraseña incorrectos");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2d6a4f] rounded-2xl mx-auto flex items-center justify-center mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">AYRA Coliving</h1>
          <p className="text-gray-500 text-sm mt-1">Panel de Control</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]" placeholder="Ingresa tu usuario" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]" placeholder="Ingresa tu contraseña" />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-[#2d6a4f] text-white py-3 rounded-lg font-medium hover:bg-[#1e4d38] transition-colors">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}

function VencimientoRow({ contrato }: { contrato: any }) {
  const today = new Date();
  const fechaFin = parseFecha(contrato.fecha_fin);
  if (!fechaFin) return null;
  const diffDays = Math.ceil((fechaFin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  let color = "bg-green-100 text-green-700";
  let icon = <CheckCircle className="w-4 h-4" />;
  let label = `${diffDays} días`;
  if (diffDays < 0) { color = "bg-red-100 text-red-700"; icon = <AlertTriangle className="w-4 h-4" />; label = "Vencido"; }
  else if (diffDays <= 15) { color = "bg-red-100 text-red-700"; icon = <AlertTriangle className="w-4 h-4" />; label = `${diffDays} días`; }
  else if (diffDays <= 30) { color = "bg-yellow-100 text-yellow-700"; icon = <Clock className="w-4 h-4" />; label = `${diffDays} días`; }
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{contrato.nombre}</p>
        <p className="text-xs text-gray-400">Hab. {contrato.habitacion} · {contrato.proyecto} · Vence: {formatFecha(contrato.fecha_fin)}</p>
      </div>
      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        {icon}{label}
      </div>
    </div>
  );
}


async function fetchNeveraMes(mes: string): Promise<{ingreso:number,egreso:number,utilidad:number,ocupacion:number}> {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${NEVERA_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(mes)}`;
    const res = await fetch(url);
    const text = await res.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows.map((r: any) => r.c.map((c: any) => c?.v ?? ""));
    
    let ingreso = 0, egreso = 0, utilidad = 0, ocupacion = 0;
    for (const row of rows) {
      const labels = row.map((v: any) => String(v).trim().toLowerCase());
      const fullRow = row.map((v: any) => String(v).trim());
      
      // Buscar Total Ingresos
      for (let i = 0; i < labels.length; i++) {
        if (labels[i].includes("total ingresos") || labels[i] === "total ingreso") {
          for (let j = i+1; j < row.length; j++) {
            const v = Number(String(row[j]).replace(/[^0-9.-]/g,''));
            if (!isNaN(v) && v > 0) { ingreso = v; break; }
          }
        }
        if (labels[i].includes("total egresos") || labels[i] === "total egreso") {
          for (let j = i+1; j < row.length; j++) {
            const v = Number(String(row[j]).replace(/[^0-9.-]/g,''));
            if (!isNaN(v) && v > 0) { egreso = v; break; }
          }
        }
        if (labels[i].includes("utilidad operativa")) {
          for (let j = i+1; j < row.length; j++) {
            const v = Number(String(row[j]).replace(/[^0-9.-]/g,''));
            if (!isNaN(v) && v !== 0) { utilidad = v; break; }
          }
        }
        if (labels[i].includes("% de ocupaci")) {
          for (let j = i+1; j < row.length; j++) {
            const v = Number(String(row[j]).replace(/[^0-9.-]/g,''));
            if (!isNaN(v) && v > 0) { ocupacion = v; break; }
          }
        }
      }
    }
    if (utilidad === 0 && ingreso > 0 && egreso > 0) utilidad = ingreso - egreso;
    return { ingreso, egreso, utilidad, ocupacion };
  } catch(e) { return { ingreso:0, egreso:0, utilidad:0, ocupacion:0 }; }
}

function InformeNevera() {
  const [datos, setDatos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all(NEVERA_MESES.map(m => fetchNeveraMes(m))).then(results => {
      setDatos(results);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
      <div className="inline-block w-6 h-6 border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin mb-3"></div>
      <p className="text-sm text-gray-400">Cargando informe La Nevera Living...</p>
    </div>
  );

  const totalIngreso = datos.reduce((s,d) => s + d.ingreso, 0);
  const totalEgreso = datos.reduce((s,d) => s + d.egreso, 0);
  const totalUtilidad = datos.reduce((s,d) => s + d.utilidad, 0);
  const ocupPromedio = datos.filter(d => d.ocupacion > 0).reduce((s,d) => s + d.ocupacion, 0) / datos.filter(d => d.ocupacion > 0).length;
  const mejorMes = datos.reduce((best, d, i) => d.ingreso > (datos[best]?.ingreso || 0) ? i : best, 0);
  const maxIngreso = Math.max(...datos.map(d => d.ingreso));
  const maxEgreso = Math.max(...datos.map(d => d.egreso));
  const fmt = (v: number) => '$' + (v/1000000).toFixed(1) + 'M';
  const fmtFull = (v: number) => '$' + Math.round(v).toLocaleString('es-CO');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1a3a2a] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-green-300 uppercase tracking-widest mb-1">Informe Ejecutivo 2025</p>
            <h2 className="text-2xl font-bold">La Nevera Living</h2>
            <p className="text-sm text-white/50 mt-1">9 habitaciones · Bogotá</p>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#52b788]">{fmt(totalIngreso)}</p>
              <p className="text-xs text-white/40 uppercase tracking-wide">Ingresos 2025</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#e9c46a]">{fmt(totalUtilidad)}</p>
              <p className="text-xs text-white/40 uppercase tracking-wide">Utilidad 2025</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{(ocupPromedio*100).toFixed(1)}%</p>
              <p className="text-xs text-white/40 uppercase tracking-wide">Ocupación prom.</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Ingreso total", val: fmt(totalIngreso), sub: "Año 2025", color: "bg-[#2d6a4f]" },
          { label: "Egreso total", val: fmt(totalEgreso), sub: "Costos operativos", color: "bg-[#c0843a]" },
          { label: "Utilidad neta", val: fmt(totalUtilidad), sub: `Margen ${((totalUtilidad/totalIngreso)*100).toFixed(1)}%`, color: "bg-[#52b788]" },
          { label: "Mejor mes", val: NEVERA_MESES_LABELS[mejorMes], sub: fmt(maxIngreso), color: "bg-[#264653]" },
        ].map((k,i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">{k.label}</p>
              <div className={`w-2 h-2 rounded-full ${k.color}`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{k.val}</p>
            <p className="text-xs text-gray-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Gráfica ingresos vs egresos */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-6">Ingresos vs Egresos por mes</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={datos.map((d,i) => ({ mes: NEVERA_MESES_LABELS[i], ingreso: d.ingreso, egreso: d.egreso, utilidad: d.utilidad }))}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => '$'+(v/1000000).toFixed(0)+'M'} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(v: any) => fmtFull(v)} />
            <Legend />
            <Bar dataKey="ingreso" fill="#2d6a4f" radius={[4,4,0,0]} name="Ingresos" />
            <Bar dataKey="egreso" fill="#c0843a" radius={[4,4,0,0]} name="Egresos" />
            <Bar dataKey="utilidad" fill="#52b788" radius={[4,4,0,0]} name="Utilidad" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Ocupación */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-6">Ocupación mensual</h3>
        <div className="flex items-end gap-3 h-32">
          {datos.map((d,i) => {
            const pct = Math.min(d.ocupacion / 100, 1.1);
            const color = d.ocupacion >= 100 ? '#2d6a4f' : d.ocupacion >= 90 ? '#52b788' : d.ocupacion >= 80 ? '#c0843a' : '#e76f51';
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-700">{d.ocupacion > 0 ? d.ocupacion.toFixed(1)+'%' : '—'}</span>
                <div className="w-full rounded-t-md" style={{ height: `${(pct/1.1)*90}%`, background: color }}></div>
                <span className="text-xs text-gray-400">{NEVERA_MESES_LABELS[i]}</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#2d6a4f] inline-block"></span>≥100%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#52b788] inline-block"></span>90-99%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#c0843a] inline-block"></span>80-89%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-[#e76f51] inline-block"></span>&lt;80%</span>
        </div>
      </div>

      {/* Tabla detalle */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Detalle mensual</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Mes</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Ingresos</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Egresos</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Utilidad</th>
                <th className="text-right py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Margen</th>
                <th className="text-center py-3 px-3 text-gray-500 font-medium text-xs uppercase tracking-wide">Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((d,i) => {
                const margen = d.ingreso > 0 ? (d.utilidad/d.ingreso)*100 : 0;
                const ocupColor = d.ocupacion >= 95 ? 'bg-green-100 text-green-700' : d.ocupacion >= 80 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700';
                return (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-800">{NEVERA_MESES_LABELS[i]} 2025</td>
                    <td className="py-3 px-3 text-right text-gray-700">{d.ingreso > 0 ? fmtFull(d.ingreso) : '—'}</td>
                    <td className="py-3 px-3 text-right text-gray-500">{d.egreso > 0 ? fmtFull(d.egreso) : '—'}</td>
                    <td className="py-3 px-3 text-right font-medium" style={{color: d.utilidad > 0 ? '#2d6a4f' : '#e76f51'}}>{d.utilidad !== 0 ? fmtFull(d.utilidad) : '—'}</td>
                    <td className="py-3 px-3 text-right text-gray-500">{d.ingreso > 0 ? margen.toFixed(1)+'%' : '—'}</td>
                    <td className="py-3 px-3 text-center">
                      {d.ocupacion > 0 ? <span className={`px-2 py-1 rounded-full text-xs font-medium ${ocupColor}`}>{(d.ocupacion*100).toFixed(1)}%</span> : '—'}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-50 font-semibold">
                <td className="py-3 px-3 text-gray-800">Total 2025</td>
                <td className="py-3 px-3 text-right text-gray-800">{fmtFull(totalIngreso)}</td>
                <td className="py-3 px-3 text-right text-gray-600">{fmtFull(totalEgreso)}</td>
                <td className="py-3 px-3 text-right" style={{color:'#2d6a4f'}}>{fmtFull(totalUtilidad)}</td>
                <td className="py-3 px-3 text-right text-gray-600">{((totalUtilidad/totalIngreso)*100).toFixed(1)}%</td>
                <td className="py-3 px-3 text-center"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{(ocupPromedio*100).toFixed(1)}%</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [filtroProyecto, setFiltroProyecto] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("NoVencido");
  const [filtroAnio, setFiltroAnio] = useState("Todos");

  useEffect(() => { if (localStorage.getItem("ayra_dashboard_auth") === "true") setAuthed(true); }, []);
  useEffect(() => { if (authed) fetchData(); }, [authed]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));
      const cols = json.table.cols.map((c: any) => c.label);
      const rows = json.table.rows.map((r: any) => {
        const obj: any = {};
        r.c.forEach((cell: any, i: number) => { obj[cols[i]] = cell?.v ?? ""; });
        return obj;
      });
      setData(rows.filter((r: any) => r.nombre));
      setLastUpdate(new Date().toLocaleTimeString("es-CO"));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleLogout = () => { localStorage.removeItem("ayra_dashboard_auth"); setAuthed(false); };
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  const today = new Date();
  const proyectos = ["Todos", ...Array.from(new Set(data.map(d => d.proyecto).filter(Boolean)))];

  // Años disponibles para filtro de estancia
  const anios = ["Todos", ...Array.from(new Set(data.map(d => {
    const f = parseFecha(d.fecha_inicio);
    return f ? String(f.getFullYear()) : null;
  }).filter(Boolean))).sort()];

  // Datos filtrados para tabla, KPIs y alertas
  const datosFiltrados = data.filter(d => {
    const matchProyecto = filtroProyecto === "Todos" || d.proyecto === filtroProyecto;
    const estadoReal = String(d.estado || "").trim();
    const matchEstado = filtroEstado === "Todos" || estadoReal === filtroEstado || (filtroEstado === "NoVencido" && estadoReal !== "Vencido");
    return matchProyecto && matchEstado;
  });

  // Datos para estancia con filtro de año
  const datosEstancia = datosFiltrados.filter(d => {
    if (filtroAnio === "Todos") return true;
    const f = parseFecha(d.fecha_inicio);
    return f ? String(f.getFullYear()) === filtroAnio : false;
  });

  // Datos para gráficas (solo filtro por proyecto)
  const datosGraficas = filtroProyecto === "Todos" ? data : data.filter(d => d.proyecto === filtroProyecto);

  // KPIs
  const totalContratos = datosFiltrados.length;
  const activos = datosFiltrados.filter(d => String(d.estado || "").trim() === "Activo").length;
  const valorPromedio = datosFiltrados.length > 0 ? Math.round(datosFiltrados.reduce((s, d) => s + (Number(d.valor) || 0), 0) / datosFiltrados.length) : 0;
  const ingresoPromedio = datosFiltrados.length > 0 ? Math.round(datosFiltrados.reduce((s, d) => s + (Number(d.ingreso_mensual) || 0), 0) / datosFiltrados.length) : 0;

  // Estancia promedio
  const estancias = datosEstancia.filter(d => d.fecha_inicio && d.fecha_fin).map(d => {
    const inicio = parseFecha(d.fecha_inicio);
    const fin = parseFecha(d.fecha_fin);
    if (!inicio || !fin || isNaN(inicio.getTime()) || isNaN(fin.getTime())) return null;
    return Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  }).filter((v): v is number => v !== null && v > 0);
  const estanciaPromedio = estancias.length > 0 ? Math.round(estancias.reduce((a, b) => a + b, 0) / estancias.length) : 0;
  const estanciaMeses = estanciaPromedio > 0 ? (estanciaPromedio / 30).toFixed(1) : "—";

  // Próximos a vencer (60 días)
  const proximos = data.filter(d => {
    const matchProy = filtroProyecto === "Todos" || d.proyecto === filtroProyecto;
    if (!matchProy) return false;
    const fin = parseFecha(d.fecha_fin);
    if (!fin || isNaN(fin.getTime())) return false;
    const diff = Math.ceil((fin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 60;
  }).sort((a, b) => {
    const fa = parseFecha(a.fecha_fin);
    const fb = parseFecha(b.fecha_fin);
    return (fa?.getTime() || 0) - (fb?.getTime() || 0);
  });

  // Ingreso mensual total activos
  const ingresoTotalMensual = datosFiltrados
    .filter(d => String(d.estado || "").trim() === "Activo")
    .reduce((s, d) => s + (Number(d.valor) || 0), 0);

  // Ocupación — habitaciones totales por proyecto (hardcoded)
  const HABS_POR_PROYECTO: Record<string, number> = {
    "Ecoliving TEU": 8,
    "La Nevera Living": 9,
    "Koti Coliving": 11,
  };
  const proyectosUnicos = Array.from(new Set(data.map((d: any) => d.proyecto).filter(Boolean))) as string[];
  const totalHabs = filtroProyecto === "Todos"
    ? Object.values(HABS_POR_PROYECTO).reduce((a, b) => a + b, 0)
    : (HABS_POR_PROYECTO[filtroProyecto] || 0);
  const activosHabs = datosFiltrados.filter(d => String(d.estado || "").trim() === "Activo").length;
  const pctOcupacion = totalHabs > 0 ? Math.round(activosHabs / totalHabs * 100) : 0;

  // Gráficas
  const byCanal = Object.entries(datosGraficas.reduce((acc: any, d) => { acc[d.canal_adquisicion || "Sin dato"] = (acc[d.canal_adquisicion || "Sin dato"] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const byGenero = Object.entries(datosGraficas.reduce((acc: any, d) => { acc[d.genero || "Sin dato"] = (acc[d.genero || "Sin dato"] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const byOcupacion = Object.entries(datosGraficas.reduce((acc: any, d) => { acc[d.ocupacion || "Sin dato"] = (acc[d.ocupacion || "Sin dato"] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const byProyecto = Object.entries(datosGraficas.reduce((acc: any, d) => { acc[d.proyecto || "Sin dato"] = (acc[d.proyecto || "Sin dato"] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a3a2a] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#52b788] rounded-lg flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">AYRA Coliving</h1>
            <p className="text-xs text-green-300">Panel de Control</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdate && <span className="text-xs text-green-300 hidden sm:block">Actualizado: {lastUpdate}</span>}
          <button onClick={fetchData} disabled={loading} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm hover:bg-white/10 px-3 py-2 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /><span className="hidden sm:block">Salir</span>
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto space-y-6">

        {/* Filtros */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Proyecto:</label>
            <select value={filtroProyecto} onChange={e => setFiltroProyecto(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]">
              {proyectos.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Estado:</label>
            <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]">
              <option value="Todos">Todos</option>
              <option value="Activo">Activos</option>
              <option value="Vencido">Vencidos</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500">Año estancia:</label>
            <select value={filtroAnio} onChange={e => setFiltroAnio(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]">
              {anios.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          {(filtroProyecto !== "Todos" || filtroEstado !== "Todos" || filtroAnio !== "Todos") && (
            <button onClick={() => { setFiltroProyecto("Todos"); setFiltroEstado("Todos"); setFiltroAnio("Todos"); }} className="text-xs text-[#2d6a4f] hover:underline">Limpiar filtros</button>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Activos" value={activos} subtitle={`${totalContratos - activos} vencidos`} icon={CheckCircle} color="bg-[#52b788]" />
          <StatCard title="Canon Promedio" value={`$${valorPromedio.toLocaleString("es-CO")}`} subtitle="Por contrato" icon={DollarSign} color="bg-[#c0843a]" />
          <StatCard title="Ingreso Arrendatario" value={`$${ingresoPromedio.toLocaleString("es-CO")}`} subtitle="Promedio mensual" icon={TrendingUp} color="bg-[#264653]" />
          <StatCard title="Facturación Activa" value={`$${ingresoTotalMensual.toLocaleString("es-CO")}`} subtitle="Canon total activos" icon={DollarSign} color="bg-[#1a3a2a]" />
          <StatCard title="Ocupación" value={`${activosHabs}/${totalHabs}`} subtitle={`${pctOcupacion}% ocupado`} icon={Home} color="bg-[#e76f51]" />
          <StatCard title="Estancia Promedio" value={`${estanciaMeses} meses`} subtitle={`${estanciaPromedio > 0 ? estanciaPromedio + " días" : "Sin datos"}`} icon={Clock} color="bg-[#2a9d8f]" />
        </div>

        {/* Informe Nevera Living */}
        {filtroProyecto === "La Nevera Living" && (
          <InformeNevera />
        )}

        {/* Alertas vencimiento */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            Contratos próximos a vencer (próximos 60 días)
          </h2>
          {proximos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No hay contratos próximos a vencer</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {proximos.map((c, i) => <VencimientoRow key={i} contrato={c} />)}
            </div>
          )}
        </div>

        {/* Canal + Género */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Canal de adquisición</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byCanal} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#2d6a4f" radius={[0, 4, 4, 0]} name="Contratos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Distribución por género</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byGenero} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {byGenero.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Área profesional + Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Área profesional</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byOcupacion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={160} />
                <Tooltip />
                <Bar dataKey="value" fill="#c0843a" radius={[0, 4, 4, 0]} name="Arrendatarios" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">Contratos por proyecto</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={byProyecto} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {byProyecto.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Contratos</h2>
            <span className="text-xs text-gray-400">{datosFiltrados.length} registros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Nombre</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Proyecto</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Hab.</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Canon</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Inicio</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Fin</th>
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((c, i) => {
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
            {datosFiltrados.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No hay contratos con los filtros seleccionados</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
