"use client";

import { Flame, BarChart3, Layers, AlertTriangle, FileText, Building2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MetricCard from "@/components/ui/MetricCard";
import PipelineStepper from "@/components/PipelineStepper";
import UploadCard from "@/components/UploadCard";
import ChartsSection from "@/components/ChartsSection";
import DataTable from "@/components/DataTable";
import InsightsPanel from "@/components/InsightsPanel";
import FlagsPanel from "@/components/FlagsPanel";
import ActionsSection from "@/components/ActionsSection";
import { metrics } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      <Sidebar />
      <main className="ml-64 p-8 max-w-[1400px]">
        <Header />

        {/* Metrics row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Scope 3"
            value={`${(metrics.totalEmissions / 1000).toFixed(1)} tCO₂e`}
            icon={Flame}
            trend="+4.2%"
            trendDirection="up"
            accentColor="emerald"
            subtitle="across all categories"
          />
          <MetricCard
            title="Avg Confidence"
            value={`${metrics.avgConfidence}%`}
            icon={BarChart3}
            trend="stable"
            trendDirection="neutral"
            accentColor="cyan"
            subtitle="classification accuracy"
          />
          <MetricCard
            title="Documents Ingested"
            value={metrics.documentsIngested}
            icon={FileText}
            accentColor="amber"
            subtitle="invoices, receipts, POs"
          />
          <MetricCard
            title="Flagged Items"
            value={metrics.highRiskItems}
            icon={AlertTriangle}
            trend="needs review"
            trendDirection="neutral"
            accentColor="rose"
            subtitle="below 80% confidence"
          />
        </div>

        {/* Secondary metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Items Processed</p>
            <p className="text-white text-lg font-bold tabular-nums">{metrics.itemsProcessed}</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Suppliers Tracked</p>
            <p className="text-white text-lg font-bold tabular-nums">{metrics.suppliersTracked}</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Coverage</p>
            <p className="text-white text-lg font-bold">96%</p>
          </div>
          <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
            <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Processing Time</p>
            <p className="text-white text-lg font-bold">7.1s</p>
          </div>
        </div>

        <PipelineStepper />
        <UploadCard />
        <ChartsSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <InsightsPanel />
          <FlagsPanel />
        </div>

        <div className="mb-6">
          <DataTable />
        </div>

        <ActionsSection />
      </main>
    </div>
  );
}
