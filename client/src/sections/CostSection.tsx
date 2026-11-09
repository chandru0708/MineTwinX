import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IndianRupee, Sliders, CheckCircle2, AlertTriangle, ShieldCheck,
  RefreshCw, Info, HelpCircle
} from 'lucide-react';
import { INITIAL_COST_BREAKDOWN, CostLineItem } from '../data/projectData';
import { soundManager } from '../utils/audioEffects';

export const CostSection: React.FC = () => {
  const [costItems, setCostItems] = useState<CostLineItem[]>(INITIAL_COST_BREAKDOWN);

  const handleCostChange = (id: string, newCost: number) => {
    setCostItems(prev => prev.map(item => item.id === id ? { ...item, estimatedCostInr: Math.max(0, newCost) } : item));
  };

  const resetCosts = () => {
    soundManager.playClick();
    setCostItems(INITIAL_COST_BREAKDOWN);
  };

  const mandatoryItems = costItems.filter(i => i.category === 'Mandatory MVP Purchases');
  const sharedItems = costItems.filter(i => i.category === 'Shared / Borrowed Lab Hardware');
  const optionalItems = costItems.filter(i => i.category === 'Optional Future Upgrades');

  const mandatoryTotal = mandatoryItems.reduce((acc, curr) => acc + curr.estimatedCostInr, 0);

  return (
    <section id="cost" className="relative py-24 bg-gradient-to-b from-[#080B1A] via-[#101432] to-[#0A0D1F] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <IndianRupee className="w-4 h-4 text-amber-400" />
            <span>PRAGMATIC BUDGET ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Practical &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300">
              Cost-Conscious MVP
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Designed from day one for academic feasibility and industrial practicality. By leveraging institutional robotics lab hardware (shared 3D LiDAR & Jetson Orin), our lean baseline MVP is budgeted at approximately ₹37,000.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs font-mono shadow-md">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>PLANNING ASSUMPTION: ₹37,000 is an editable preliminary estimate based on market component pricing, subject to lab inventory access.</span>
          </div>
        </div>

        {/* Total Cost Highlight Banner with colorful gradient */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-amber-400/50 mb-10 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div>
            <span className="text-xs font-mono text-amber-300 uppercase font-bold tracking-wider block">
              LEAN MVP PROCUREMENT ESTIMATE
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
                ₹{mandatoryTotal.toLocaleString('en-IN')}
              </span>
              <span className="text-sm font-mono text-emerald-400 font-bold">
                (Mandatory Initial Outlay)
              </span>
            </div>
            <p className="text-xs text-slate-300 font-mono mt-1">
              Assumes access to institutional shared 3D LiDAR and NVIDIA Jetson compute.
            </p>
          </div>

          <button
            onClick={resetCosts}
            className="px-4 py-2.5 rounded-2xl bg-[#141A38] hover:bg-[#1D254C] text-slate-200 border border-slate-700 text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Baseline Values</span>
          </button>
        </div>

        {/* 3 Categories Breakdown */}
        <div className="space-y-8">
          {/* Category A: Mandatory Purchases */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center font-mono text-xs font-bold">
                  A
                </span>
                <span>Mandatory New MVP Purchases</span>
              </h3>
              <span className="text-xs font-mono text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40">
                Subtotal: ₹{mandatoryTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="divide-y divide-slate-800/80">
                {mandatoryItems.map((item) => (
                  <div key={item.id} className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                    <div className="max-w-xl">
                      <h5 className="font-bold text-white text-sm">{item.item}</h5>
                      <p className="text-slate-400 text-xs mt-0.5">{item.notes}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono">
                      <span className="text-amber-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={item.estimatedCostInr}
                        onChange={(e) => handleCostChange(item.id, parseInt(e.target.value) || 0)}
                        className="w-28 px-3 py-1.5 rounded-xl bg-[#090D1F] border border-amber-400/50 focus:border-amber-300 text-amber-300 font-bold text-right shadow-inner"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category B: Shared Lab Assets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center justify-center font-mono text-xs font-bold">
                  B
                </span>
                <span>Shared / Borrowed Institutional Lab Assets</span>
              </h3>
              <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40">
                Incremental Outlay: ₹0
              </span>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="divide-y divide-slate-800/80">
                {sharedItems.map((item) => (
                  <div key={item.id} className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                    <div className="max-w-xl">
                      <h5 className="font-bold text-white text-sm">{item.item}</h5>
                      <p className="text-slate-400 text-xs mt-0.5">{item.notes}</p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 font-mono font-bold text-xs shrink-0 shadow-md">
                      ₹0 (Shared Lab Asset)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category C: Optional Upgrades */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center justify-center font-mono text-xs font-bold">
                  C
                </span>
                <span>Optional Future Sensor Enhancements</span>
              </h3>
              <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40">
                Post-MVP Phase
              </span>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="divide-y divide-slate-800/80">
                {optionalItems.map((item) => (
                  <div key={item.id} className="p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
                    <div className="max-w-xl">
                      <h5 className="font-bold text-white text-sm">{item.item}</h5>
                      <p className="text-slate-400 text-xs mt-0.5">{item.notes}</p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-[#090D1F] border border-purple-500/50 text-purple-300 font-mono font-bold text-xs shrink-0 shadow-md">
                      Est. ₹{item.estimatedCostInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
