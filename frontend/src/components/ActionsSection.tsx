"use client";

import { Download, FileSpreadsheet, RefreshCw, FileText, ExternalLink } from "lucide-react";

export default function ActionsSection({ records = [] }: { records?: any[] }) {
  const handleExportCSV = () => {
    if (!records || records.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["description", "category", "supplier", "quantity", "unit", "emission", "confidence"];
    const csvContent = [
      headers.join(","),
      ...records.map(row => headers.map(fieldName => {
        let val = row[fieldName] || "";
        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      }).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `carbonscope_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-4">Actions</h3>
      <div className="flex flex-wrap gap-3">
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20" 
          onClick={handleExportCSV}
        >
          <Download size={15} />
          Download Report (CSV)
        </button>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]"
          onClick={handleExportCSV}
        >
          <FileSpreadsheet size={15} />
          Export CSV
        </button>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]" 
          onClick={handleExportCSV}
        >
          <FileText size={15} />
          Generate Report (CSV)
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]" onClick={() => window.location.reload()}>
          <RefreshCw size={15} />
          Re-run Pipeline
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]" onClick={() => window.open('http://127.0.0.1:8000/docs', '_blank')}>
          <ExternalLink size={15} />
          API Docs
        </button>
      </div>
    </div>
  );
}
