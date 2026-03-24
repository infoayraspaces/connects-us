import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#2d6a4f", "#c0843a", "#52b788", "#e9c46a", "#264653", "#e76f51", "#2a9d8f", "#a8dadc"];

interface ChartEntry { name: string; value: unknown; }

interface Props {
  byCanal: ChartEntry[];
  byGenero: ChartEntry[];
  byOcupacion: ChartEntry[];
  byProyecto: ChartEntry[];
}

export function AnalyticsCharts({ byCanal, byGenero, byOcupacion, byProyecto }: Props) {
  return (
    <div className="space-y-6">
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
              <Pie data={byGenero} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                dataKey="value" nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {byGenero.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
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
              <Pie data={byProyecto} cx="50%" cy="50%" innerRadius={60} outerRadius={90}
                dataKey="value" nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {byProyecto.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
