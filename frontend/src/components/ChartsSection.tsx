"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from "recharts";
import { categoryBreakdown, monthlyTrend } from "@/lib/mock-data";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#141420] border border-white/10 rounded-xl px-4 py-2.5 shadow-2xl">
      <p className="text-white/50 text-xs mb-0.5">{label}</p>
      <p className="text-white font-semibold text-sm">{payload[0].value.toLocaleString()} kg CO₂e</p>
    </div>
  );
}

export default function ChartsSection() {
  return (
    <div className="space-y-6 mb-6">
      {/* Top row: bar + pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
          <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-5">Emissions by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryBreakdown} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
          <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-5">Contribution Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend line */}
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Monthly Emissions Trend</h3>
          <span className="text-[11px] text-rose-400 font-medium">+28.5% over 6 months</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="emGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="emissions"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#emGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
