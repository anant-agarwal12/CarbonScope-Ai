"use client";

import { CloudUpload, Table, FileText, FileSpreadsheet, CheckCircle } from "lucide-react";

const recentFiles = [
  { name: "invoices_nov_batch.csv", rows: 15, status: "processed" },
  { name: "freight_receipts_q4.pdf", rows: 3, status: "processed" },
  { name: "supplier_quotes_dec.xlsx", rows: null, status: "queued" },
];

const samplePreview = [
  { desc: "Cold-rolled steel coils", qty: 120, factor: "2.50" },
  { desc: "LDPE packaging film", qty: 500, factor: "3.10" },
  { desc: "40ft container — port to warehouse", qty: 3, factor: "1.80" },
];

export default function UploadCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Upload zone */}
      <div className="rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.12] hover:border-emerald-500/30 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
          <CloudUpload size={24} className="text-emerald-400" />
        </div>
        <p className="text-white/70 text-sm font-medium mb-1">Drop files here</p>
        <p className="text-white/30 text-xs">CSV, XLSX, PDF — invoices, receipts, POs</p>
      </div>

      {/* Recent files */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={14} className="text-white/30" />
          <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider">Recent Uploads</h4>
        </div>
        <div className="space-y-2">
          {recentFiles.map((file, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors">
              <FileSpreadsheet size={14} className="text-white/25 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/60 truncate">{file.name}</p>
                {file.rows && <p className="text-[10px] text-white/25">{file.rows} rows extracted</p>}
              </div>
              {file.status === "processed" ? (
                <CheckCircle size={13} className="text-emerald-400/60 shrink-0" />
              ) : (
                <span className="text-[10px] text-amber-400/60">queued</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sample preview */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Table size={14} className="text-white/30" />
          <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider">Parsed Preview</h4>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-[10px] text-white/25 uppercase pb-2">Description</th>
              <th className="text-right text-[10px] text-white/25 uppercase pb-2">Qty</th>
              <th className="text-right text-[10px] text-white/25 uppercase pb-2">Factor</th>
            </tr>
          </thead>
          <tbody>
            {samplePreview.map((row, i) => (
              <tr key={i} className="border-b border-white/[0.04]">
                <td className="py-2 text-xs text-white/60 max-w-[120px] truncate">{row.desc}</td>
                <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.qty}</td>
                <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.factor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
