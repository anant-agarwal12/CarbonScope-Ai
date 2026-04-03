import { Bell, Search, Calendar } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-tight">
          Scope 3{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Intelligence
          </span>
        </h1>
        <p className="text-white/40 text-sm mt-0.5">
          Transform raw invoices into measurable carbon insights —{" "}
          <span className="text-white/60">Nov 2024 batch</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/[0.06] text-white/40 text-xs">
          <Calendar size={13} />
          <span>Nov 1 — Nov 30, 2024</span>
        </div>
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
          <Search size={16} className="text-white/50" />
        </button>
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06] relative">
          <Bell size={16} className="text-white/50" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center ml-1 cursor-pointer">
          <span className="text-white text-xs font-semibold">AA</span>
        </div>
      </div>
    </header>
  );
}
