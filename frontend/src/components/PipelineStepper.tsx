"use client";

import { Upload, FileSearch, Brain, GitBranch, Calculator, FileOutput, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const defaultSteps = [
  { label: "Ingestion",     icon: "upload",      duration: 1200 },
  { label: "OCR / Parse",   icon: "file-search",  duration: 2400 },
  { label: "NLP Extract",   icon: "brain",        duration: 1800 },
  { label: "Classify",      icon: "git-branch",   duration: 1500 },
  { label: "Factor Lookup", icon: "calculator",   duration: 800 },
  { label: "Report",        icon: "file-output",  duration: 600 },
];

const icons: Record<string, typeof Upload> = {
  upload: Upload,
  "file-search": FileSearch,
  brain: Brain,
  "git-branch": GitBranch,
  calculator: Calculator,
  "file-output": FileOutput,
};

type PipelineStatus = "idle" | "running" | "completed";

export default function PipelineStepper({ status = "idle" as PipelineStatus }: { status?: PipelineStatus }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [stepTimings, setStepTimings] = useState<string[]>(defaultSteps.map(() => "—"));

  useEffect(() => {
    if (status === "running") {
      setActiveStep(0);
      setStepTimings(defaultSteps.map(() => "—"));

      let current = 0;
      const advance = () => {
        if (current >= defaultSteps.length) return;
        const step = defaultSteps[current];
        setTimeout(() => {
          setStepTimings((prev) => {
            const next = [...prev];
            next[current] = `${(step.duration / 1000).toFixed(1)}s`;
            return next;
          });
          current++;
          setActiveStep(current);
          if (current < defaultSteps.length) advance();
        }, step.duration);
      };
      advance();
    } else if (status === "completed") {
      setActiveStep(defaultSteps.length);
      setStepTimings(defaultSteps.map((s) => `${(s.duration / 1000).toFixed(1)}s`));
    } else {
      // idle: show clean initial state
      setActiveStep(-1);
      setStepTimings(defaultSteps.map(() => "—"));
    }
  }, [status]);

  const completedCount = status === "completed" ? defaultSteps.length : Math.min(activeStep, defaultSteps.length);

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 mb-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white/60 text-xs font-medium uppercase tracking-wider">Processing Pipeline</h3>
        <span className="text-[11px] text-white/30">
          {completedCount} of {defaultSteps.length} steps complete
          {status === "running" && <Loader2 size={10} className="inline ml-1.5 animate-spin text-cyan-400" />}
        </span>
      </div>
      <div className="flex items-center justify-between">
        {defaultSteps.map((step, i) => {
          const Icon = icons[step.icon] || Upload;
          const done = i < activeStep;
          const active = i === activeStep;

          return (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
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
                  className={`text-[11px] font-medium transition-colors duration-300 ${
                    done ? "text-emerald-400/80" : active ? "text-cyan-400" : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-[9px] text-white/20 -mt-1 tabular-nums">{stepTimings[i]}</span>
              </div>
              {i < defaultSteps.length - 1 && (
                <div
                  className={`w-12 h-px mx-2 mt-[-18px] transition-colors duration-500 ${
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
