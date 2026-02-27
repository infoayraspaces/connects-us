import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { LogOut, Users, TrendingUp, Home, DollarSign, AlertTriangle, CheckCircle, Clock, RefreshCw, Filter } from "lucide-react";

const CREDENTIALS = { username: "Ayracoliving2026", password: "Jamesbarrios1." };
const SHEET_ID = "1q1HjMxsxIjHRSRndbegWuNhyUrcJ9BJW8BKe5YqYFqY";
const SHEET_NAME = "Contratos";
const COLORS = ["#2d6a4f", "#c0843a", "#52b788", "#e9c46a", "#264653", "#e76f51", "#2a9d8f", "#a8dadc"];

// Google Sheets puede enviar fechas como número serial, string DD/MM/YYYY o YYYY-MM-DD
function parseFecha(val: any): Date | null {
  if (!val) return null;
  // Número serial de Google Sheets (días desde 30/12/1899)
  if (typeof val === "number") {
    const ms = (val - 25569) * 86400 * 1000;
    return new Date(ms);
  }
  const str = String(val).trim();
  if (!str) return null;
  // DD/MM/YYYY o D/M/YYYY
  if (str.includes("/")) {
    const parts = str.split("/");
    if (parts.length === 3) {
      const d = parts[0].padStart(2, "0");
      const m = parts[1].padStart(2, "0");
      const y = parts[2];
      return new Date(`${y}-${m}-${d}T00:00:00`);
    }
  }
  // YYYY-MM-DD
  return new Date(str + "T00:00:00");
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

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [filtroProyecto, setFiltroProyecto] = useState("Todos");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
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
    const matchEstado = filtroEstado === "Todos" || estadoReal === filtroEstado;
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
  const proximos = datosFiltrados.filter(d => {
    const fin = parseFecha(d.fecha_fin);
    if (!fin || isNaN(fin.getTime())) return false;
    const diff = Math.ceil((fin.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 60;
  }).sort((a, b) => {
    const fa = parseFecha(a.fecha_fin);
    const fb = parseFecha(b.fecha_fin);
    return (fa?.getTime() || 0) - (fb?.getTime() || 0);
  });

  // Ingreso mensual total activos
  const ingresoTotalMensual = datosFiltrados
    .filter(d => String(d.estado || "").trim() === "Activo")
    .reduce((s, d) => s + (Number(d.valor) || 0), 0);

  // Ocupación
  const proyectosUnicos = Array.from(new Set(data.map((d: any) => d.proyecto).filter(Boolean))) as string[];
  const totalHabs = proyectosUnicos.reduce((s, p) => s + data.filter((d: any) => d.proyecto === p).length, 0);
  const activosHabs = proyectosUnicos.reduce((s, p) => s + data.filter((d: any) => d.proyecto === p && String(d.estado || "").trim() === "Activo").length, 0);
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
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
          <StatCard title="Total Contratos" value={totalContratos} subtitle="Filtrados" icon={Users} color="bg-[#2d6a4f]" />
          <StatCard title="Activos" value={activos} subtitle={`${totalContratos - activos} vencidos`} icon={CheckCircle} color="bg-[#52b788]" />
          <StatCard title="Canon Promedio" value={`$${valorPromedio.toLocaleString("es-CO")}`} subtitle="Por contrato" icon={DollarSign} color="bg-[#c0843a]" />
          <StatCard title="Ingreso Arrendatario" value={`$${ingresoPromedio.toLocaleString("es-CO")}`} subtitle="Promedio mensual" icon={TrendingUp} color="bg-[#264653]" />
          <StatCard title="Facturación Activa" value={`$${ingresoTotalMensual.toLocaleString("es-CO")}`} subtitle="Canon total activos" icon={DollarSign} color="bg-[#1a3a2a]" />
          <StatCard title="Ocupación" value={`${activosHabs}/${totalHabs}`} subtitle={`${pctOcupacion}% ocupado`} icon={Home} color="bg-[#e76f51]" />
          <StatCard title="Estancia Promedio" value={`${estanciaMeses} meses`} subtitle={`${estanciaPromedio > 0 ? estanciaPromedio + " días" : "Sin datos"}`} icon={Clock} color="bg-[#2a9d8f]" />
        </div>

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
