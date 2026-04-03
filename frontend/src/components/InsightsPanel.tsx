import { Sparkles, AlertTriangle, TrendingDown, Lightbulb } from "lucide-react";
import { insights } from "@/lib/mock-data";

const iconMap = {
  info: Lightbulb,
  warning: AlertTriangle,
  success: TrendingDown,
};

const styleMap = {
  info: "border-cyan-500/15 bg-cyan-500/[0.04] text-cyan-300",
  warning: "border-amber-500/15 bg-amber-500/[0.04] text-amber-300",
  success: "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-300",
};

export default function InsightsPanel() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={16} className="text-violet-400" />
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">AI-Generated Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => {
          const Icon = iconMap[insight.type];
          return (
            <div key={i} className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${styleMap[insight.type]}`}>
              <Icon size={15} className="mt-0.5 shrink-0" />
              <p className="text-sm leading-relaxed">{insight.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
