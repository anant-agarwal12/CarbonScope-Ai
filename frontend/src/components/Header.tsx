"use client";

import { Search, LogOut, Layout } from "lucide-react";
import NotificationBell from "./NotificationBell";
import DatePicker from "./DatePicker";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header({ 
  onDateChange,
  isDemoMode,
  onToggleDemo
}: { 
  onDateChange?: (dateId: string, shortLabel: string) => void,
  isDemoMode?: boolean,
  onToggleDemo?: () => void
}) {
  const router = useRouter();
  const [initials, setInitials] = useState("US");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.company_name) {
          setInitials(user.company_name.substring(0, 2).toUpperCase());
        } else if (user.email) {
          setInitials(user.email.substring(0, 2).toUpperCase());
        }
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
          Scope 3{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Intelligence
          </span>
          {isDemoMode && (
            <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 uppercase tracking-widest border border-emerald-500/30">Demo Mode</span>
          )}
        </h1>
        <p className="text-white/40 text-sm mt-0.5">
          Transform raw invoices into measurable carbon insights —{" "}
          <span className="text-white/60">Nov 2024 batch</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleDemo}
          className={`tour-demo-toggle flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors ${isDemoMode ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/[0.05] border-white/[0.06] text-white/60 hover:bg-white/[0.08]'}`}
        >
          <Layout size={14} />
          <span className="text-xs font-medium">{isDemoMode ? "Exit Demo" : "View Demo"}</span>
        </button>

        <DatePicker onDateChange={onDateChange} />
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
          <Search size={16} className="text-white/50" />
        </button>
        <NotificationBell />
        
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center ml-1 cursor-pointer"
          >
            <span className="text-white text-xs font-semibold">{initials}</span>
          </div>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#141420] border border-white/10 shadow-2xl py-2 z-50">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-white/[0.04] flex items-center gap-2 transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
