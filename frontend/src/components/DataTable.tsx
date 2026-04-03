"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type SortKey = "description" | "category" | "quantity" | "emission" | "confidence";
type SortDir = "asc" | "desc";

function confidenceBadge(conf: number) {
  if (conf >= 85) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/20";
  if (conf >= 75) return "bg-amber-500/15 text-amber-400 border-amber-500/20";
  return "bg-rose-500/15 text-rose-400 border-rose-500/20";
}

export default function DataTable({ records = [] }: { records?: any[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("id" as SortKey);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...records].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });

  const SortIcon = sortDir === "asc" ? ChevronUp : ChevronDown;

  function thClass(key: SortKey, align: string = "left") {
    const base = `text-${align} text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3 cursor-pointer hover:text-white/50 transition-colors select-none`;
    return sortKey === key ? `${base} text-white/60` : base;
  }

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
      <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Emission Records</h3>
        <span className="text-white/30 text-xs">{records.length} items</span>
      </div>
      <div className="overflow-x-auto max-h-[440px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-[#0c0c14]">
            <tr className="border-b border-white/[0.06]">
              <th className={thClass("description")} onClick={() => handleSort("description")}>
                <span className="flex items-center gap-1">
                  Description {sortKey === "description" && <SortIcon size={12} />}
                </span>
              </th>
              <th className={thClass("category")} onClick={() => handleSort("category")}>
                <span className="flex items-center gap-1">
                  Category {sortKey === "category" && <SortIcon size={12} />}
                </span>
              </th>
              <th className="text-left text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3">Supplier</th>
              <th className={thClass("quantity", "right")} onClick={() => handleSort("quantity")}>
                <span className="flex items-center justify-end gap-1">
                  Qty {sortKey === "quantity" && <SortIcon size={12} />}
                </span>
              </th>
              <th className={thClass("emission", "right")} onClick={() => handleSort("emission")}>
                <span className="flex items-center justify-end gap-1">
                  CO₂e (kg) {sortKey === "emission" && <SortIcon size={12} />}
                </span>
              </th>
              <th className="text-right text-[11px] text-white/30 font-medium uppercase tracking-wider px-4 py-3">Range</th>
              <th className={thClass("confidence", "center")} onClick={() => handleSort("confidence")}>
                <span className="flex items-center justify-center gap-1">
                  Conf. {sortKey === "confidence" && <SortIcon size={12} />}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${
                  row.confidence < 75 ? "bg-rose-500/[0.03]" : ""
                }`}
              >
                <td className="px-4 py-3 text-sm text-white/80 max-w-[220px] truncate">{row.description}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/[0.06] text-white/60">
                    {row.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-white/40 max-w-[140px] truncate">{row.supplier}</td>
                <td className="px-4 py-3 text-sm text-white/60 text-right tabular-nums">
                  {row.quantity} <span className="text-white/25 text-[10px]">{row.unit}</span>
                </td>
                <td className="px-4 py-3 text-sm text-white/80 text-right tabular-nums font-medium">
                  {row.emission.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-[11px] text-white/30 text-right tabular-nums">
                  {row.emissionLow.toLocaleString()}–{row.emissionHigh.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
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
