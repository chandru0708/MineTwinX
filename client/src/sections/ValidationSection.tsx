import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, AlertTriangle, Activity, Sliders, Cpu, Compass,
  Layers, BarChart2, HelpCircle
} from 'lucide-react';
import { VALIDATION_METRICS, ValidationMetricCategory } from '../data/projectData';

export const ValidationSection: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  const selectedCategory = VALIDATION_METRICS[selectedCategoryIdx];

  return (
    <section id="validation" className="relative py-24 bg-navy-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>RIGOROUS EVALUATION BENCHMARKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Engineering Validation — Measure What Matters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Quantifying robotics performance across localization drift, semantic precision, 4D change detection sensitivity, and embedded edge compute constraints.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>HONEST BENCHMARK INTEGRITY: Values below reflect simulation targets and laboratory prototype test mockups (clearly labelled illustrative).</span>
          </div>
        </div>

        {/* Validation Category Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {VALIDATION_METRICS.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategoryIdx(idx)}
              className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all text-left ${
                selectedCategoryIdx === idx
                  ? 'bg-electric text-white border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                  : 'bg-navy-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span className="block text-[10px] text-cyan-300 mb-1">
                VECTOR {idx + 1}
              </span>
              <span className="line-clamp-2">{cat.category.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>

        {/* Active Category Deep-Dive Table & Card */}
        <motion.div
          key={selectedCategory.category}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-cyan-500/30"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-cyan-500/20 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                EVALUATION VECTOR {selectedCategoryIdx + 1}
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                {selectedCategory.category}
              </h3>
              <p className="text-xs text-slate-300 mt-1">{selectedCategory.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-amber-300 px-3 py-1 rounded bg-amber-950/60 border border-amber-500/40">
                {selectedCategory.note}
              </span>
            </div>
          </div>

          {/* Metrics Table */}
          <div className="space-y-4">
            {selectedCategory.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-navy-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="max-w-md">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm font-bold text-white">{m.name}</h5>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 border border-slate-700 text-cyan-300">
                      Unit: {m.unit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.description}</p>
                  <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                    Conventional Baseline: <span className="text-red-400/90">{m.baselineMethod}</span>
                  </span>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono">
                  <div className="text-right p-2.5 rounded-lg bg-navy-900 border border-slate-800">
                    <span className="text-[9px] text-slate-400 uppercase block">ENGINEERING TARGET</span>
                    <span className="text-xs font-bold text-amber-300">{m.targetValue}</span>
                  </div>

                  <div className="text-right p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/40">
                    <span className="text-[9px] text-cyan-400 uppercase block font-bold">ILLUSTRATIVE RESULT</span>
                    <span className="text-sm font-bold text-cyan-200">{m.illustrativeValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

