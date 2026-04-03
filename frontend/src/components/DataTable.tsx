import { emissionRecords } from "@/lib/mock-data";

function confidenceBadge(conf: number) {
  if (conf >= 85) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (conf >= 75) return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

export default function DataTable() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Emission Records</h3>
        <span className="text-white/30 text-xs">{emissionRecords.length} items</span>
      </div>
      <div className="overflow-x-auto max-h-[380px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-[11px] text-white/30 font-medium uppercase tracking-wider px-6 py-3">Description</th>
              <th className="text-left text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3">Category</th>
              <th className="text-right text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3">Qty</th>
              <th className="text-right text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3">Emissions (kg)</th>
              <th className="text-center text-[11px] text-white/30 font-medium uppercase tracking-wider px-6 py-3">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {emissionRecords.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${
                  row.confidence < 75 ? "bg-rose-500/[0.03]" : ""
                }`}
              >
                <td className="px-6 py-3.5 text-sm text-white/80">{row.description}</td>
                <td className="px-4 py-3.5">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/60">
                    {row.category}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-sm text-white/60 text-right tabular-nums">{row.quantity}</td>
                <td className="px-4 py-3.5 text-sm text-white/80 text-right tabular-nums font-medium">{row.emission.toLocaleString()}</td>
                <td className="px-6 py-3.5 text-center">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${confidenceBadge(row.confidence)}`}>
                    {row.confidence}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
