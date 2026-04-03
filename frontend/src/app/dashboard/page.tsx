"use client";

import { Flame, BarChart3, Layers, AlertTriangle } from "lucide-react";
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

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Emissions"
            value={`${(metrics.totalEmissions / 1000).toFixed(1)} tCO₂e`}
            icon={Flame}
            trend="+4.2%"
            accentColor="emerald"
            subtitle="across all categories"
          />
          <MetricCard
            title="Avg Confidence"
            value={`${metrics.avgConfidence}%`}
            icon={BarChart3}
            trend="stable"
            accentColor="cyan"
            subtitle="classification accuracy"
          />
          <MetricCard
            title="Items Processed"
            value={metrics.itemsProcessed}
            icon={Layers}
            accentColor="amber"
            subtitle="from latest upload"
          />
          <MetricCard
            title="High-Risk Items"
            value={metrics.highRiskItems}
            icon={AlertTriangle}
            trend="needs review"
            accentColor="rose"
            subtitle="below 80% confidence"
          />
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
