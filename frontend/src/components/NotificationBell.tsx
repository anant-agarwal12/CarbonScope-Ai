"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle2, AlertTriangle, FileText, Info } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "Pipeline Completed",
    message: "Nov 2024 invoice batch processed successfully.",
    time: "2m ago",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    id: 2,
    type: "warning",
    title: "High Risk Items Detected",
    message: "4 items flagged with <80% confidence score.",
    time: "1h ago",
    icon: AlertTriangle,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    id: 3,
    type: "info",
    title: "New Integration Sync",
    message: "AWS Billing connector synced 1,204 new records.",
    time: "4h ago",
    icon: FileText,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    id: 4,
    type: "system",
    title: "System Update",
    message: "Emission factors database updated to v2.1.",
    time: "1d ago",
    icon: Info,
    color: "text-white/60",
    bg: "bg-white/5",
  }
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0); // Mark as read when opening
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleOpen}
        className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06] relative"
      >
        <Bell size={16} className="text-white/50" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#0d0d14] border border-white/[0.08] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
            <h3 className="font-semibold text-white/90">Notifications</h3>
            <button className="text-xs text-white/40 hover:text-white/80 transition-colors">
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {mockNotifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className="group px-5 py-4 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors cursor-pointer flex gap-3 last:border-0">
                  <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notif.bg}`}>
                    <Icon size={14} className={notif.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-white/90 truncate">{notif.title}</p>
                      <span className="text-[10px] text-white/30 whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="p-3 border-t border-white/[0.06] bg-white/[0.01]">
            <button className="w-full py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors text-center">
              View all activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
