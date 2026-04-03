"use client";

import { CloudUpload, Table } from "lucide-react";

const samplePreview = [
  { desc: "Steel coils from supplier A", qty: 120, price: "2.50" },
  { desc: "Polyethylene packaging film", qty: 500, price: "3.10" },
  { desc: "Freight shipping — port to warehouse", qty: 3, price: "1.80" },
];

export default function UploadCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Upload zone */}
      <div className="rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.12] hover:border-emerald-500/30 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
          <CloudUpload size={24} className="text-emerald-400" />
        </div>
        <p className="text-white/70 text-sm font-medium mb-1">Drop your CSV here</p>
        <p className="text-white/30 text-xs">or click to browse — supports .csv, .xlsx</p>
      </div>

      {/* Sample preview */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Table size={14} className="text-white/30" />
          <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider">Sample Preview</h4>
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
                <td className="py-2 text-xs text-white/60">{row.desc}</td>
                <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.qty}</td>
                <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
