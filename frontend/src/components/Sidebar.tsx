"use client";

import { LayoutDashboard, FileBarChart2, Database, Settings, Activity } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Reports", icon: FileBarChart2, active: false },
  { label: "Data Sources", icon: Database, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export default function Sidebar() {
  const [selected, setSelected] = useState("Dashboard");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
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
              onClick={() => setSelected(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                isActive
                  ? "bg-white/[0.08] text-white font-medium"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Status */}
      <div className="px-4 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/[0.08]">
          <Activity size={14} className="text-emerald-400" />
          <span className="text-emerald-400 text-xs font-medium">System Active</span>
        </div>
      </div>
    </aside>
  );
}
