import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  accentColor?: string;
}

const colorMap: Record<string, { card: string; text: string; glow: string }> = {
  emerald: {
    card: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/5",
  },
  cyan: {
    card: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/5",
  },
  amber: {
    card: "from-amber-500/20 to-amber-500/5 border-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-amber-500/5",
  },
  rose: {
    card: "from-rose-500/20 to-rose-500/5 border-rose-500/10",
    text: "text-rose-400",
    glow: "shadow-rose-500/5",
  },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = "neutral",
  accentColor = "emerald",
}: MetricCardProps) {
  const colors = colorMap[accentColor] || colorMap.emerald;

  const trendColor =
    trendDirection === "up"
      ? "text-rose-400"
      : trendDirection === "down"
      ? "text-emerald-400"
      : colors.text;

  return (
    <div
      className={`rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] transition-all duration-200 group shadow-xl ${colors.glow}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colors.card} ${colors.text}`}>
          <Icon size={18} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg bg-white/[0.05] ${trendColor}`}>
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
