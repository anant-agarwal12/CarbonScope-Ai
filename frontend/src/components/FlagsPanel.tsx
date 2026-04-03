import { ShieldAlert, AlertCircle, Eye } from "lucide-react";
import { emissionRecords } from "@/lib/mock-data";

export default function FlagsPanel() {
  const flagged = emissionRecords.filter((r) => r.confidence < 80);

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
      <div className="flex items-center gap-2 mb-5">
        <ShieldAlert size={16} className="text-amber-400" />
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Flags &amp; Warnings</h3>
        <span className="ml-auto text-[11px] text-rose-400 font-medium">{flagged.length} items</span>
      </div>

      <div className="space-y-2.5 mb-4">
        {flagged.map((item) => {
          const severity = item.confidence < 70 ? "high" : "medium";
          const borderColor = severity === "high" ? "border-rose-500/20" : "border-amber-500/15";
          const bgColor = severity === "high" ? "bg-rose-500/[0.05]" : "bg-amber-500/[0.04]";
          const badgeColor = severity === "high" ? "text-rose-400" : "text-amber-400";

          return (
            <div key={item.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${bgColor} border ${borderColor}`}>
              <AlertCircle size={14} className={`${badgeColor} shrink-0`} />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white/70 block truncate">{item.description}</span>
                <span className="text-[10px] text-white/30">{item.source}</span>
              </div>
              <span className={`text-xs font-semibold ${badgeColor} shrink-0`}>{item.confidence}%</span>
              <button className="p-1 rounded-lg hover:bg-white/[0.06] transition-colors">
                <Eye size={13} className="text-white/30" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <p className="text-white/40 text-xs leading-relaxed">
          ⚠️ Items below 80% confidence need manual category verification before final reporting.
        </p>
      </div>
    </div>
  );
}
