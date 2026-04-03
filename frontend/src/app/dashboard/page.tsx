"use client";

import { Flame, BarChart3, Layers, AlertTriangle, FileText, Download, FileSpreadsheet, RefreshCw, ExternalLink, Box, FileBarChart2 } from "lucide-react";
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
import { metrics as initialMetrics, emissionRecords } from "@/lib/mock-data";
import { useState } from "react";

// Minimal Placeholder Components for other tabs
function ReportsView() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
        <FileBarChart2 size={28} className="text-white/30" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Reports Generating</h2>
      <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
        Your comprehensive Scope 3 GHG inventory report is currently being generated based on the Nov 2024 batch.
      </p>
      <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]" onClick={() => alert("Reporting module is configured for API integration in Phase 3.")}>
        <RefreshCw size={15} />
        Check Status
      </button>
    </div>
  );
}

function DataSourcesView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Data Sources</h2>
          <p className="text-white/40 text-sm">Manage API connections and SFTP ingestion drops.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20" onClick={() => alert("Integration modal placeholder.")}>
          <ExternalLink size={15} />
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: "SAP Ariba", status: "Active", type: "Procurement", icon: Box },
          { name: "Coupa", status: "Active", type: "Spend Mgt", icon: Box },
          { name: "AWS Billing", status: "Syncing", type: "Cloud", icon: Box },
          { name: "Legacy ERP Dump", status: "Disconnected", type: "SFTP Drop", icon: Box },
        ].map((source, i) => {
          const Icon = source.icon;
          return (
            <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] transition-colors cursor-pointer" onClick={() => alert(`Settings for ${source.name}`)}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                  <Icon size={18} className="text-white/50" />
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-lg uppercase tracking-wider ${source.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : source.status === 'Syncing' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/5 text-white/40'}`}>
                  {source.status}
                </span>
              </div>
              <h3 className="font-semibold text-white/90 mb-1">{source.name}</h3>
              <p className="text-xs text-white/40">{source.type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight mb-1">Settings</h2>
      <p className="text-white/40 text-sm mb-8">Organization configuration and global thresholds.</p>
      
      <div className="space-y-6">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
            <h3 className="font-medium">Emission Factor Databases</h3>
            <p className="text-xs text-white/40 mt-1">Select the primary sources for classification mappings.</p>
          </div>
          <div className="p-6 space-y-4">
            <label className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.02] cursor-pointer" onClick={() => {}}>
              <div>
                <span className="block font-medium text-emerald-400 mb-1">EPA USEEIO 2024</span>
                <span className="text-xs text-white/40">US primary factors (spend-based)</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </label>
            <label className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer" onClick={() => alert('Only one database active in demo mode.')}>
              <div>
                <span className="block font-medium text-white/80 mb-1">Ecoinvent 3.9 (Global)</span>
                <span className="text-xs text-white/40">Requires API key</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/20" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dashboardMetrics, setDashboardMetrics] = useState(initialMetrics);
  const [dashboardRecords, setDashboardRecords] = useState(emissionRecords);

  const handleDataProcessed = (data: any) => {
    // Process backend response and merge with existing UI state
    setDashboardMetrics(prev => ({
      ...prev,
      totalEmissions: prev.totalEmissions + data.metrics.totalEmissions,
      avgConfidence: Math.round((prev.avgConfidence + data.metrics.avgConfidence) / 2),
      documentsIngested: prev.documentsIngested + 1,
      highRiskItems: prev.highRiskItems + data.metrics.highRiskItems,
      itemsProcessed: prev.itemsProcessed + data.metrics.itemsProcessed
    }));

    const newRecords = data.records.map((r: any, i: number) => ({
      id: `api-record-${Date.now()}-${i}`,
      supplier: "Captured from document", 
      date: new Date().toISOString().split("T")[0],
      description: r.description,
      category: r.category,
      quantity: r.quantity,
      unit: "items",
      unitPrice: "N/A",
      emission: r.emission,
      emissionLow: parseFloat((r.emission * 0.9).toFixed(2)),
      emissionHigh: parseFloat((r.emission * 1.1).toFixed(2)),
      confidence: r.confidence
    }));

    setDashboardRecords(prev => [...newRecords, ...prev]);
  };

  const handleDateChange = (dateId: string, shortLabel: string) => {
    // Mock scramble of dashboard metrics to simulate loading different historic months
    const randomMultiplier = 0.4 + Math.random() * 0.8; 
    setDashboardMetrics({
      totalEmissions: Math.round(initialMetrics.totalEmissions * randomMultiplier),
      avgConfidence: Math.min(99, Math.round(initialMetrics.avgConfidence * (0.9 + Math.random() * 0.2))),
      documentsIngested: Math.round(initialMetrics.documentsIngested * randomMultiplier),
      highRiskItems: Math.round(initialMetrics.highRiskItems * randomMultiplier),
      itemsProcessed: Math.round(initialMetrics.itemsProcessed * randomMultiplier),
      suppliersTracked: Math.round(initialMetrics.suppliersTracked * randomMultiplier)
    });
    
    setDashboardRecords([...emissionRecords].sort(() => Math.random() - 0.5).slice(0, Math.max(3, Math.floor(emissionRecords.length * randomMultiplier))));
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white">
      <Sidebar selected={activeTab} onSelect={setActiveTab} />
      <main className="ml-64 p-8 max-w-[1400px]">
        <Header onDateChange={handleDateChange} />

        {activeTab === "Dashboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Scope 3"
                value={`${(dashboardMetrics.totalEmissions / 1000).toFixed(1)} tCO₂e`}
                icon={Flame}
                trend="+4.2%"
                trendDirection="up"
                accentColor="emerald"
                subtitle="across all categories"
              />
              <MetricCard
                title="Avg Confidence"
                value={`${dashboardMetrics.avgConfidence}%`}
                icon={BarChart3}
                trend="stable"
                trendDirection="neutral"
                accentColor="cyan"
                subtitle="classification accuracy"
              />
              <MetricCard
                title="Documents Ingested"
                value={dashboardMetrics.documentsIngested}
                icon={FileText}
                accentColor="amber"
                subtitle="invoices, receipts, POs"
              />
              <MetricCard
                title="Flagged Items"
                value={dashboardMetrics.highRiskItems}
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
                <p className="text-white text-lg font-bold tabular-nums">{dashboardMetrics.itemsProcessed}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Suppliers Tracked</p>
                <p className="text-white text-lg font-bold tabular-nums">{dashboardMetrics.suppliersTracked}</p>
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
            <UploadCard onDataProcessed={handleDataProcessed} />
            <ChartsSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <InsightsPanel />
              <FlagsPanel />
            </div>

            <div className="mb-6">
              <DataTable records={dashboardRecords} />
            </div>

            <ActionsSection records={dashboardRecords} />
          </div>
        )}

        {activeTab === "Reports" && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><ReportsView /></div>}
        {activeTab === "Data Sources" && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><DataSourcesView /></div>}
        {activeTab === "Settings" && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500"><SettingsView /></div>}

      </main>
    </div>
  );
}
