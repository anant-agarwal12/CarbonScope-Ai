"use client";

import { Flame, BarChart3, AlertTriangle, FileText, RefreshCw, ExternalLink, Box, FileBarChart2 } from "lucide-react";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

// Tab placeholder views
function ReportsView() {
  const { addToast } = useToast();
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
        <FileBarChart2 size={28} className="text-white/30" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">Reports Generating</h2>
      <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
        Your comprehensive Scope 3 GHG inventory report is currently being generated based on the latest batch data.
      </p>
      <button
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 text-sm font-medium transition-colors border border-white/[0.08]"
        onClick={() => addToast("Report generation is in progress. Estimated completion: 2 minutes.", "info")}
      >
        <RefreshCw size={15} />
        Check Status
      </button>
    </div>
  );
}

function DataSourcesView() {
  const { addToast } = useToast();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-1">Data Sources</h2>
          <p className="text-white/40 text-sm">Manage API connections and SFTP ingestion drops.</p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
          onClick={() => addToast("Integration wizard would open here. Available in enterprise tier.", "info")}
        >
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
          { name: "QuickBooks", status: "Active", type: "Accounting", icon: Box },
          { name: "Custom CSV", status: "Active", type: "Manual Upload", icon: Box },
        ].map((source, i) => {
          const Icon = source.icon;
          return (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 hover:bg-white/[0.05] transition-colors cursor-pointer"
              onClick={() => addToast(`Opening configuration for ${source.name}...`, "info")}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center">
                  <Icon size={18} className="text-white/50" />
                </div>
                <span
                  className={`text-[10px] font-medium px-2 py-1 rounded-lg uppercase tracking-wider ${
                    source.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : source.status === "Syncing"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-white/5 text-white/40"
                  }`}
                >
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
  const { addToast } = useToast();
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
            <label className="flex items-center justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.02] cursor-pointer">
              <div>
                <span className="block font-medium text-emerald-400 mb-1">EPA USEEIO 2024</span>
                <span className="text-xs text-white/40">US primary factors (spend-based) — currently active</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
            </label>
            <label
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer"
              onClick={() => addToast("Ecoinvent 3.9 requires an API key. Contact admin to enable.", "info")}
            >
              <div>
                <span className="block font-medium text-white/80 mb-1">Ecoinvent 3.9 (Global)</span>
                <span className="text-xs text-white/40">Requires API key</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/20" />
            </label>
            <label
              className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] cursor-pointer"
              onClick={() => addToast("DEFRA 2023 UK factors can be enabled alongside EPA.", "info")}
            >
              <div>
                <span className="block font-medium text-white/80 mb-1">DEFRA 2023 (UK)</span>
                <span className="text-xs text-white/40">UK government conversion factors</span>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/20" />
            </label>
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] bg-white/[0.01]">
            <h3 className="font-medium">Confidence Threshold</h3>
            <p className="text-xs text-white/40 mt-1">Items below this threshold will be flagged for manual review.</p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4">
              <input type="range" min="50" max="95" defaultValue="80" className="flex-1 accent-emerald-500" onChange={(e) => addToast(`Confidence threshold set to ${e.target.value}%`, "success")} />
              <span className="text-white/60 text-sm font-mono tabular-nums w-12 text-right">80%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [dashboardMetrics, setDashboardMetrics] = useState({ totalEmissions: 0, avgConfidence: 0, documentsIngested: 0, highRiskItems: 0, itemsProcessed: 0, suppliersTracked: 0 });
  const [dashboardRecords, setDashboardRecords] = useState<any[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<"idle" | "running" | "completed">("idle");
  const { addToast } = useToast();

  useEffect(() => {
    // Auth check
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!isDemoMode) {
      fetchRecords(token);
    } else {
      setDashboardRecords(emissionRecords);
      setDashboardMetrics(initialMetrics);
    }
  }, [isDemoMode, router]);

  const fetchRecords = async (token: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    try {
      const res = await fetch(`${apiUrl}/api/records`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.records) {
        const normalizedRecords = data.records.map((r: any) => ({
          ...r,
          id: r._id || `api-${Math.random()}`
        }));
        setDashboardRecords(normalizedRecords);
        // compute basic metrics for prod
        const totalEmissions = normalizedRecords.reduce((acc: number, r: any) => acc + (r.emission || 0), 0);
        const highRiskItems = normalizedRecords.filter((r: any) => (r.confidence || 0) < 80).length;
        const avgConfidence = normalizedRecords.length ? Math.round(normalizedRecords.reduce((acc: number, r: any) => acc + (r.confidence || 0), 0) / normalizedRecords.length) : 0;
        
        setDashboardMetrics({
          totalEmissions,
          avgConfidence,
          documentsIngested: normalizedRecords.length > 0 ? 1 : 0,
          highRiskItems,
          itemsProcessed: normalizedRecords.length,
          suppliersTracked: new Set(normalizedRecords.map((r: any) => r.category)).size
        });
      }
    } catch(err) {
      console.error(err);
    }
  };

  const toggleDemoMode = () => {
    setIsDemoMode(prev => {
      const newMode = !prev;
      addToast(newMode ? "Demo Mode Enabled using mock data" : "Exited Demo Mode. Viewing your live data.", "info");
      return newMode;
    });
  };

  const handleDataProcessed = (data: any) => {
    // Update pipeline status
    setPipelineStatus("completed");

    // Update metrics
    setDashboardMetrics((prev) => ({
      ...prev,
      totalEmissions: prev.totalEmissions + data.metrics.totalEmissions,
      avgConfidence: Math.round((prev.avgConfidence + data.metrics.avgConfidence) / 2),
      documentsIngested: prev.documentsIngested + 1,
      highRiskItems: prev.highRiskItems + data.metrics.highRiskItems,
      itemsProcessed: prev.itemsProcessed + data.metrics.itemsProcessed,
    }));

    // Map API records to the UI format
    const newRecords = data.records.map((r: any, i: number) => ({
      id: `api-${Date.now()}-${i}`,
      supplier: r.supplier || "From document",
      date: r.date || new Date().toISOString().split("T")[0],
      description: r.description,
      category: r.category,
      quantity: r.quantity,
      unit: r.unit || "units",
      unitPrice: r.unitPrice || 0,
      emission: r.emission,
      emissionLow: r.emissionLow ?? parseFloat((r.emission * 0.9).toFixed(2)),
      emissionHigh: r.emissionHigh ?? parseFloat((r.emission * 1.1).toFixed(2)),
      confidence: r.confidence,
      source: r.source || "API Upload",
    }));

    setDashboardRecords((prev) => [...newRecords, ...prev]);
    addToast(`Successfully processed ${data.records.length} items! Dashboard updated.`, "success");
  };

  const handleUploadStart = () => {
    setPipelineStatus("running");
  };

  return (
    <div className="min-h-screen bg-[#08080d] text-white">

      <Sidebar selected={activeTab} onSelect={setActiveTab} />
      <main className="ml-64 p-8 max-w-[1400px]">
        <Header 
           isDemoMode={isDemoMode}
           onToggleDemo={toggleDemoMode}
        />

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
              <div className="tour-metrics">
                <MetricCard
                  title="Avg Confidence"
                  value={`${dashboardMetrics.avgConfidence}%`}
                  icon={BarChart3}
                  trend="stable"
                  trendDirection="neutral"
                  accentColor="cyan"
                  subtitle="classification accuracy"
                />
              </div>
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
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Categories</p>
                <p className="text-white text-lg font-bold">9</p>
              </div>
              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] px-5 py-4">
                <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Processing Time</p>
                <p className="text-white text-lg font-bold">8.3s</p>
              </div>
            </div>

            <div className="tour-upload-zone">
              <UploadCard onDataProcessed={handleDataProcessed} onUploadStart={handleUploadStart} />
            </div>
            
            <div className="tour-charts">
              <ChartsSection records={dashboardRecords} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <InsightsPanel />
              <FlagsPanel records={dashboardRecords} />
            </div>

            <div className="mb-6">
              <DataTable records={dashboardRecords} />
            </div>

            <ActionsSection records={dashboardRecords} />
          </div>
        )}

        {activeTab === "Reports" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ReportsView />
          </div>
        )}
        {activeTab === "Data Sources" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <DataSourcesView />
          </div>
        )}
        {activeTab === "Settings" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SettingsView />
          </div>
        )}
      </main>
    </div>
  );
}
