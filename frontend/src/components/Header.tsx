import { Search } from "lucide-react";
import NotificationBell from "./NotificationBell";
import DatePicker from "./DatePicker";

export default function Header({ onDateChange }: { onDateChange?: (dateId: string, shortLabel: string) => void }) {
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
        <DatePicker onDateChange={onDateChange} />
        <button className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06]">
          <Search size={16} className="text-white/50" />
        </button>
        <NotificationBell />
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center ml-1 cursor-pointer">
          <span className="text-white text-xs font-semibold">AA</span>
        </div>
      </div>
    </header>
  );
}
