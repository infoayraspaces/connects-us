import { useState, useEffect } from "react";
import { LogOut, Users, TrendingUp, Home, DollarSign, Clock, RefreshCw, Filter, CheckCircle } from "lucide-react";
import { verifyCredentials, createSession, isSessionValid, clearSession } from "@/lib/auth";
import { parseFecha } from "@/lib/dateParser";
import { InformeNevera, InformeKoti } from "@/components/dashboard/FinancialReport";
import { ExpirationAlerts } from "@/components/dashboard/ExpirationAlerts";
import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { ContractsTable } from "@/components/dashboard/ContractsTable";
import { OccupancyCalendar } from "@/components/dashboard/OccupancyCalendar";

const SHEET_ID = "1q1HjMxsxIjHRSRndbegWuNhyUrcJ9BJW8BKe5YqYFqY";
const SHEET_NAME = "Contratos";

const HABS_POR_PROYECTO: Record<string, number> = {
  "Ecoliving TEU": 8,
  "La Nevera Living": 9,
  "Koti Coliving": 11,
};

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

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await verifyCredentials(user, pass);
    if (ok) { createSession(); onLogin(); }
    else setError("Usuario o contraseña incorrectos");
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

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");
  const [filtroProyecto, setFiltroProyecto] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("NoVencido");
  const [filtroAnio, setFiltroAnio] = useState("Todos");

  useEffect(() => { if (isSessionValid()) setAuthed(true); }, []);
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

  const handleLogout = () => { clearSession(); setAuthed(false); };
  if (!authed) return <LoginPage onLogin={() => setAuthed(true)} />;

  const today = new Date();
  const proyectos = ["Todos", ...Array.from(new Set(data.map((d: any) => d.proyecto).filter(Boolean)))];
  const anios = ["Todos", ...Array.from(new Set(data.map((d: any) => {
    const f = parseFecha(d.fecha_inicio);
    return f ? String(f.getFullYear()) : null;
  }).filter(Boolean))).sort()];

  const datosFiltrados = data.filter((d: any) => {
    const matchProyecto = filtroProyecto === "Todos" || d.proyecto === filtroProyecto;
    const estadoReal = String(d.estado || "").trim();
    const matchEstado = filtroEstado === "Todos" || estadoReal === filtroEstado || (filtroEstado === "NoVencido" && estadoReal !== "Vencido");
    return matchProyecto && matchEstado;
  });

  const datosEstancia = datosFiltrados.filter((d: any) => {
    if (filtroAnio === "Todos") return true;
    const f = parseFecha(d.fecha_inicio);
    return f ? String(f.getFullYear()) === filtroAnio : false;
  });

  const datosGraficas = filtroProyecto === "Todos" ? data : data.filter((d: any) => d.proyecto === filtroProyecto);

  // KPIs
  const totalContratos = datosFiltrados.length;
  const activos = datosFiltrados.filter((d: any) => String(d.estado || "").trim() === "Activo").length;
  const valorPromedio = datosFiltrados.length > 0 ? Math.round(datosFiltrados.reduce((s: number, d: any) => s + (Number(d.valor) || 0), 0) / datosFiltrados.length) : 0;
  const ingresoPromedio = datosFiltrados.length > 0 ? Math.round(datosFiltrados.reduce((s: number, d: any) => s + (Number(d.ingreso_mensual) || 0), 0) / datosFiltrados.length) : 0;

  const estancias = datosEstancia
    .filter((d: any) => d.fecha_inicio && d.fecha_fin)
    .map((d: any) => {
      const inicio = parseFecha(d.fecha_inicio);
      const fin = parseFecha(d.fecha_fin);
      if (!inicio || !fin || isNaN(inicio.getTime()) || isNaN(fin.getTime())) return null;
      return Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
    })
    .filter((v): v is number => v !== null && v > 0);
  const estanciaPromedio = estancias.length > 0 ? Math.round(estancias.reduce((a, b) => a + b, 0) / estancias.length) : 0;
  const estanciaMeses = estanciaPromedio > 0 ? (estanciaPromedio / 30).toFixed(1) : "—";

  const proximos = data
    .filter((d: any) => {
      const matchProy = filtroProyecto === "Todos" || d.proyecto === filtroProyecto;
      if (!matchProy) return false;
      const fin = parseFecha(d.fecha_fin);
      if (!fin || isNaN(fin.getTime())) return false;
      const diff = Math.ceil((fin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff <= 60 && String(d.estado || "").trim() !== "Vencido";
    })
    .sort((a: any, b: any) => (parseFecha(a.fecha_fin)?.getTime() ?? 0) - (parseFecha(b.fecha_fin)?.getTime() ?? 0));

  const ingresoTotalMensual = datosFiltrados
    .filter((d: any) => String(d.estado || "").trim() === "Activo")
    .reduce((s: number, d: any) => s + (Number(d.valor) || 0), 0);

  const totalHabs = filtroProyecto === "Todos"
    ? Object.values(HABS_POR_PROYECTO).reduce((a, b) => a + b, 0)
    : (HABS_POR_PROYECTO[filtroProyecto] || 0);
  const activosHabs = datosFiltrados.filter((d: any) => String(d.estado || "").trim() === "Activo").length;
  const pctOcupacion = totalHabs > 0 ? Math.round(activosHabs / totalHabs * 100) : 0;

  const toChartData = (field: string) =>
    Object.entries(datosGraficas.reduce((acc: any, d: any) => {
      acc[d[field] || "Sin dato"] = (acc[d[field] || "Sin dato"] || 0) + 1;
      return acc;
    }, {})).map(([name, value]) => ({ name, value }));

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

        {filtroProyecto === "Koti Coliving" && <InformeKoti />}
        {filtroProyecto === "La Nevera Living" && <InformeNevera />}

        <OccupancyCalendar contratos={data} filtroProyecto={filtroProyecto} />

        <ExpirationAlerts proximos={proximos} />

        <AnalyticsCharts
          byCanal={toChartData("canal_adquisicion")}
          byGenero={toChartData("genero")}
          byOcupacion={toChartData("ocupacion")}
          byProyecto={toChartData("proyecto")}
        />

        <ContractsTable contratos={datosFiltrados} />
      </div>
    </div>
  );
}
