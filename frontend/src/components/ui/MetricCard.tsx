import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  accentColor?: string;
}

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, accentColor = "emerald" }: MetricCardProps) {
  const colorMap: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/10",
    cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/10",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/10",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/10",
  };

  const colors = colorMap[accentColor] || colorMap.emerald;
  const textColor = colors.split(" ").find(c => c.startsWith("text-")) || "text-emerald-400";

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-white/[0.05] ${textColor}`}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
      <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
      {subtitle && <p className="text-white/30 text-xs mt-1">{subtitle}</p>}
    </div>
  );
}
