import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, CheckCircle2, Clock, ArrowRight, ShieldCheck, Cpu,
  Layers, Compass, Eye
} from 'lucide-react';
import { IMPLEMENTATION_ROADMAP, CAPABILITY_STATUSES } from '../data/projectData';

export const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="relative py-24 bg-navy-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>5-PHASE DEVELOPMENT ROADMAP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            From Engineering Design to Working Prototype
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            A staged 10-month engineering execution plan with explicit deliverables, hardware milestones, and algorithmic dependencies.
          </p>
        </div>

        {/* Roadmap Vertical / Step Cards */}
        <div className="space-y-6">
          {IMPLEMENTATION_ROADMAP.map((phase, idx) => {
            const badge = CAPABILITY_STATUSES[phase.status];
            return (
              <div
                key={phase.phase}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-colors relative overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-electric/20 border border-electric/40 text-cyan-400 font-mono font-bold text-sm flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">
                        {phase.phase} • {phase.duration}
                      </span>
                      <h4 className="text-xl font-bold font-display text-white mt-0.5">
                        {phase.name}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {badge.label}
                    </span>
                  </div>
                </div>

                {/* Focus & Deliverable Banner */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">
                      TECHNICAL FOCUS
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">{phase.focus}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-1">
                      KEY DELIVERABLE
                    </span>
                    <p className="text-xs text-cyan-100 font-semibold font-mono">{phase.deliverable}</p>
                  </div>
                </div>

                {/* Milestones Checklist */}
                <div>
                  <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Engineering Milestones & Activities:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    {phase.milestones.map((ms, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-navy-950/60 border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-[11px]">{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dependencies */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <span className="text-slate-500 font-bold uppercase">Pre-requisite Dependencies:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.dependencies.map((dep, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-navy-900 text-slate-300 border border-slate-800">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

