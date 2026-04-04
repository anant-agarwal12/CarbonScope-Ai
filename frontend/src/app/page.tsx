"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Brain, BarChart3, Shield, Zap, FileSearch } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#08080d] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">CarbonScope AI</span>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20"
        >
          Launch Dashboard
          <ArrowRight size={15} />
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
          <Leaf size={13} />
          AI-Powered Scope 3 Intelligence
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
          Turn{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400">
            invoices
          </span>{" "}
          into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            carbon insights
          </span>
        </h1>

        <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-10">
          CarbonScope AI ingests unstructured supply chain documents — invoices, receipts, POs — and
          automatically classifies items, maps emission factors, and delivers audit-ready Scope 3 GHG estimates
          in seconds, not weeks.
        </p>

        <div className="flex items-center gap-4 mb-20">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold transition-all shadow-2xl shadow-emerald-500/25 text-sm"
          >
            Open Live Dashboard
            <ArrowRight size={16} />
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/docs` : "http://127.0.0.1:8000/docs"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] text-white/80 font-semibold transition-colors border border-white/[0.08] text-sm"
          >
            API Documentation
          </a>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {[
            { icon: FileSearch, title: "OCR + NLP Pipeline", desc: "Extract line items from PDFs, images, and spreadsheets automatically." },
            { icon: Brain, title: "AI Classification", desc: "9-category keyword classifier maps items to GHG Protocol Scope 3 categories." },
            { icon: BarChart3, title: "Emission Calculation", desc: "EPA USEEIO factors with uncertainty ranges for audit-ready reporting." },
            { icon: Shield, title: "Confidence Scoring", desc: "Every item gets a confidence score — low-confidence items are flagged." },
            { icon: Zap, title: "Real-time Processing", desc: "Upload a CSV and see results in under 10 seconds on the live dashboard." },
            { icon: Leaf, title: "Actionable Insights", desc: "AI-generated recommendations to reduce Scope 3 emissions." },
          ].map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div key={i} className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 text-left hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-semibold text-white/90 mb-2 text-sm">{feat.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/[0.06]">
        <p className="text-white/20 text-xs">
          CarbonScope AI — Built for SME sustainability intelligence. Research prototype.
        </p>
      </footer>
    </div>
  );
}
