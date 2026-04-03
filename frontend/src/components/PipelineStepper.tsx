"use client";

import { Upload, FileSearch, Brain, GitBranch, Calculator, FileOutput, Check, Loader2 } from "lucide-react";
import { pipelineSteps } from "@/lib/mock-data";

const icons: Record<string, typeof Upload> = {
  upload: Upload,
  "file-search": FileSearch,
  brain: Brain,
  "git-branch": GitBranch,
  calculator: Calculator,
  "file-output": FileOutput,
};

export default function PipelineStepper() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Processing Pipeline</h3>
        <span className="text-[11px] text-white/30">4 of 6 steps complete</span>
      </div>
      <div className="flex items-center justify-between">
        {pipelineSteps.map((step, i) => {
          const Icon = icons[step.icon] || Upload;
          const done = step.status === "completed";
          const active = step.status === "active";

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    done
                      ? "bg-emerald-500/20 border border-emerald-500/30"
                      : active
                      ? "bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.04] border border-white/[0.08]"
                  }`}
                >
                  {done ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : active ? (
                    <Loader2 size={16} className="text-cyan-400 animate-spin" />
                  ) : (
                    <Icon size={16} className="text-white/30" />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    done ? "text-emerald-400/80" : active ? "text-cyan-400" : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
                {step.duration && (
                  <span className="text-[9px] text-white/20 -mt-1 tabular-nums">{step.duration}</span>
                )}
              </div>
              {i < pipelineSteps.length - 1 && (
                <div
                  className={`w-12 h-px mx-2 mt-[-18px] ${
                    done ? "bg-emerald-500/30" : "bg-white/[0.08]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
