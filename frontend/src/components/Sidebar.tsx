"use client";

import { LayoutDashboard, FileBarChart2, Database, Settings, Activity, ChevronRight } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Reports", icon: FileBarChart2 },
  { label: "Data Sources", icon: Database },
  { label: "Settings", icon: Settings },
];

interface SidebarProps {
  selected: string;
  onSelect: (item: string) => void;
}

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col z-[100]">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-[15px] tracking-tight">CarbonScope</h1>
            <p className="text-[11px] text-white/40 -mt-0.5">AI Platform</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selected === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group ${
                isActive
                  ? "bg-white/[0.08] text-white font-medium shadow-sm"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight size={14} className="text-white/30 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Pipeline status */}
      <div className="px-4 py-2 border-t border-white/[0.06]">
        <div className="px-3 py-2 mb-2">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">Pipeline Status</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
            <span className="text-[10px] text-white/40 tabular-nums">4/6</span>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/10">
          <Activity size={14} className="text-emerald-400 shrink-0" />
          <span className="text-emerald-400 text-xs font-medium">System Active</span>
        </div>
      </div>
    </aside>
  );
}
