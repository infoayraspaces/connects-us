import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { parseFecha, formatFecha } from "@/lib/dateParser";

interface Contrato {
  nombre: string;
  habitacion: string;
  proyecto: string;
  fecha_fin: unknown;
}

function VencimientoRow({ contrato }: { contrato: Contrato }) {
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

interface Props {
  proximos: Contrato[];
}

export function ExpirationAlerts({ proximos }: Props) {
  return (
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
  );
}
