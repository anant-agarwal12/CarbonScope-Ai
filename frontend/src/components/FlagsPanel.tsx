import { ShieldAlert, AlertCircle } from "lucide-react";
import { emissionRecords } from "@/lib/mock-data";

export default function FlagsPanel() {
  const flagged = emissionRecords.filter((r) => r.confidence < 80);

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
      <div className="flex items-center gap-2 mb-5">
        <ShieldAlert size={16} className="text-amber-400" />
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Flags & Warnings</h3>
      </div>

      <div className="space-y-2.5 mb-4">
        {flagged.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-rose-500/[0.05] border border-rose-500/10">
            <AlertCircle size={14} className="text-rose-400 shrink-0" />
            <span className="text-sm text-white/70 flex-1">{item.description}</span>
            <span className="text-xs text-rose-400 font-semibold">{item.confidence}%</span>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <p className="text-white/40 text-xs leading-relaxed">
          ⚠️ AI-generated estimates — review flagged items for accuracy before reporting.
        </p>
      </div>
    </div>
  );
}
