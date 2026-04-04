"use client";

import { CloudUpload, Table, FileText, FileSpreadsheet, CheckCircle, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

const initialRecentFiles = [
  { name: "invoices_nov_batch.csv", rows: 15, status: "processed" },
  { name: "freight_receipts_q4.pdf", rows: 3, status: "processed" },
  { name: "supplier_quotes_dec.xlsx", rows: null, status: "queued" },
];

export default function UploadCard({ onDataProcessed, onUploadStart }: { onDataProcessed?: (data: any) => void; onUploadStart?: () => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentFiles, setRecentFiles] = useState(initialRecentFiles);
  const [preview, setPreview] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);
    if (onUploadStart) onUploadStart();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${apiUrl}/api/pipeline`, {
        method: "POST",
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      
      if (data.status === "success") {
        setRecentFiles((prev) => [
          { name: file.name, rows: data.records.length, status: "processed" },
          ...prev.slice(0, 2),
        ]);
        
        // Take first 3 for preview
        if (data.records && data.records.length > 0) {
           setPreview(data.records.slice(0, 3).map((r: any) => ({
             desc: r.description,
             qty: r.quantity,
             factor: r.emission
           })));
        }

        if (onDataProcessed) {
            onDataProcessed(data);
        }
      } else {
        throw new Error(data.message || "Pipeline error");
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Upload zone */}
      <div 
         className={`rounded-2xl bg-white/[0.03] border border-dashed hover:border-emerald-500/30 transition-colors p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden ${isUploading ? 'border-emerald-500/50 scale-[0.99] opacity-80' : error ? 'border-rose-500/50' : 'border-white/[0.12]'}`}
         onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".csv,.xlsx" 
        />
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${error ? 'bg-rose-500/10 group-hover:bg-rose-500/20' : 'bg-emerald-500/10 group-hover:bg-emerald-500/20'}`}>
          {isUploading ? (
            <Loader2 size={24} className="text-emerald-400 animate-spin" />
          ) : (
            <CloudUpload size={24} className={error ? "text-rose-400" : "text-emerald-400"} />
          )}
        </div>
        <p className="text-white/70 text-sm font-medium mb-1">
          {isUploading ? "Processing with AI..." : error ? "Upload failed" : "Drop files here"}
        </p>
        <p className={`text-xs ${error ? 'text-rose-400/60' : 'text-white/30'}`}>
          {error || "CSV, XLSX, PDF — invoices, receipts, POs"}
        </p>
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
                {file.rows !== null && <p className="text-[10px] text-white/25">{file.rows} rows extracted</p>}
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
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 relative">
        <div className="flex items-center gap-2 mb-4">
          <Table size={14} className="text-white/30" />
          <h4 className="text-white/50 text-xs font-medium uppercase tracking-wider">Parsed Preview</h4>
        </div>
        
        {preview.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left text-[10px] text-white/25 uppercase pb-2">Description</th>
                <th className="text-right text-[10px] text-white/25 uppercase pb-2">Qty</th>
                <th className="text-right text-[10px] text-white/25 uppercase pb-2">CO₂e</th>
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} className="border-b border-white/[0.04] animate-in fade-in slide-in-from-right-4">
                  <td className="py-2 text-xs text-white/60 max-w-[120px] truncate">{row.desc}</td>
                  <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.qty}</td>
                  <td className="py-2 text-xs text-white/50 text-right tabular-nums">{row.factor.toLocaleString()} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
           <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.03] mb-2">
                 <Loader2 size={14} className="text-emerald-500/50 animate-spin" />
              </div>
              <p className="text-[10px] text-white/30 text-center px-4">Upload a file to see live extractions.</p>
           </div>
        )}
      </div>
    </div>
  );
}
