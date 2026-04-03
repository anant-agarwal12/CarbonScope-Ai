import { Download, FileSpreadsheet, RefreshCw, FileText, ExternalLink } from "lucide-react";

export default function ActionsSection() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-4">Actions</h3>
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
          <Download size={15} />
          Download Report
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]">
          <FileSpreadsheet size={15} />
          Export CSV
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]">
          <FileText size={15} />
          Generate PDF
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]">
          <RefreshCw size={15} />
          Re-run Pipeline
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]">
          <ExternalLink size={15} />
          API Docs
        </button>
      </div>
    </div>
  );
}
