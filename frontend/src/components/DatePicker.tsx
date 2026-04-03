"use client";

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, Check } from "lucide-react";

const mockMonths = [
  { id: "11-2024", label: "Nov 1 — Nov 30, 2024", short: "Nov 2024" },
  { id: "10-2024", label: "Oct 1 — Oct 31, 2024", short: "Oct 2024" },
  { id: "09-2024", label: "Sep 1 — Sep 30, 2024", short: "Sep 2024" },
  { id: "08-2024", label: "Aug 1 — Aug 31, 2024", short: "Aug 2024" },
  { id: "07-2024", label: "Jul 1 — Jul 31, 2024", short: "Jul 2024" },
  { id: "ytd", label: "Year to Date (2024)", short: "YTD 2024" },
];

interface DatePickerProps {
  onDateChange?: (dateId: string, shortLabel: string) => void;
}

export default function DatePicker({ onDateChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(mockMonths[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (month: typeof mockMonths[0]) => {
    setSelected(month);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(month.id, month.short);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06] text-white/80 text-xs"
      >
        <Calendar size={13} className="text-white/50" />
        <span className="min-w-[120px] text-left">{selected.label}</span>
        <ChevronDown size={12} className={`text-white/40 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0d0d14] border border-white/[0.08] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1">
            {mockMonths.map((month) => (
              <button
                key={month.id}
                onClick={() => handleSelect(month)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                  selected.id === month.id 
                    ? "bg-emerald-500/10 text-emerald-400 font-medium" 
                    : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {month.label}
                {selected.id === month.id && <Check size={14} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
