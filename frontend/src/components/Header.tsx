import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-[28px] font-bold text-white tracking-tight">
          CarbonScope <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI</span>
        </h1>
        <p className="text-white/40 text-sm mt-0.5">
          Scope 3 Emission Intelligence —{" "}
          <span className="text-white/60">Transform raw business data into measurable carbon insights</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
          <Search size={16} className="text-white/50" />
        </button>
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06] relative">
          <Bell size={16} className="text-white/50" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
        </button>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center ml-1">
          <span className="text-white text-xs font-semibold">AA</span>
        </div>
      </div>
    </header>
  );
}
