"use client";

import { Upload, FileSearch, Brain, GitBranch, Calculator, FileOutput, Check } from "lucide-react";

const icons = { upload: Upload, "file-search": FileSearch, brain: Brain, "git-branch": GitBranch, calculator: Calculator, "file-output": FileOutput };

import { pipelineSteps } from "@/lib/mock-data";

export default function PipelineStepper() {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
      <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-5">Processing Pipeline</h3>
      <div className="flex items-center justify-between">
        {pipelineSteps.map((step, i) => {
          const Icon = icons[step.icon as keyof typeof icons] || Upload;
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-emerald-500/20 border border-emerald-500/30"
                      : isActive
                      ? "bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "bg-white/[0.04] border border-white/[0.08]"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Icon
                      size={16}
                      className={isActive ? "text-cyan-400" : "text-white/30"}
                    />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    isCompleted ? "text-emerald-400/80" : isActive ? "text-cyan-400" : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < pipelineSteps.length - 1 && (
                <div
                  className={`w-12 h-px mx-2 mt-[-18px] ${
                    isCompleted ? "bg-emerald-500/30" : "bg-white/[0.08]"
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
