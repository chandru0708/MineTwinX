import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Compass, Layers, Tag, History, Database, CheckCircle2,
  XCircle, ArrowRight, ShieldAlert, Cpu
} from 'lucide-react';
import { PROBLEM_CHALLENGES } from '../data/projectData';

export const ProblemSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(PROBLEM_CHALLENGES[0].id);

  const selectedChallenge = PROBLEM_CHALLENGES.find(c => c.id === activeTab) || PROBLEM_CHALLENGES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'CompassOff': return Compass;
      case 'AlertTriangle': return AlertTriangle;
      case 'Layers': return Layers;
      case 'Tag': return Tag;
      case 'History': return History;
      case 'Database': return Database;
      default: return AlertTriangle;
    }
  };

  const tabColors: Record<string, { activeBorder: string; activeBg: string; text: string }> = {
    'gps-denied': { activeBorder: 'border-cyan-400', activeBg: 'from-cyan-900/60 to-[#0F142D]', text: 'text-cyan-400' },
    'hazardous-inspection': { activeBorder: 'border-red-400', activeBg: 'from-red-950/70 to-[#0F142D]', text: 'text-red-400' },
    'unstructured-spatial-data': { activeBorder: 'border-purple-400', activeBg: 'from-purple-950/70 to-[#0F142D]', text: 'text-purple-400' },
    'manual-asset-identification': { activeBorder: 'border-amber-400', activeBg: 'from-amber-950/70 to-[#0F142D]', text: 'text-amber-400' },
    'difficult-change-detection': { activeBorder: 'border-pink-400', activeBg: 'from-pink-950/70 to-[#0F142D]', text: 'text-pink-400' },
    'limited-spatial-intelligence': { activeBorder: 'border-teal-400', activeBg: 'from-teal-950/70 to-[#0F142D]', text: 'text-teal-400' },
  };

  return (
    <section id="problem" className="relative py-24 bg-gradient-to-b from-[#0A0E22] via-[#0E1026] to-[#090C1C] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-red-500/40 text-red-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-red-900/20">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>THE CORE INDUSTRIAL CRISIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Why Industrial Inspection Needs Intelligence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Subterranean mining drifts, hydroelectric penstocks, and enclosed industrial vaults present an unforgiving convergence of GPS-deprivation, life-threatening human risks, and unorganized spatial data overload.
          </p>
        </div>

        {/* 6 Problem Challenges Grid / Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PROBLEM_CHALLENGES.map((challenge) => {
            const Icon = getIcon(challenge.iconName);
            const isSelected = activeTab === challenge.id;
            const theme = tabColors[challenge.id] || tabColors['gps-denied'];
            return (
              <button
                key={challenge.id}
                onClick={() => setActiveTab(challenge.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? `bg-gradient-to-b ${theme.activeBg} ${theme.activeBorder} shadow-xl shadow-purple-500/20 scale-[1.03]`
                    : 'bg-[#10142D]/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isSelected ? theme.text : 'text-slate-500'}`}>
                    #{challenge.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? theme.text : 'text-slate-500'}`} />
                </div>
                <h4 className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? 'text-white font-bold' : 'text-slate-300'}`}>
                  {challenge.title.split(' ')[0]} {challenge.title.split(' ')[1] || ''}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Challenge Deep-Dive Card */}
        <motion.div
          key={selectedChallenge.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-purple-500/20 pb-4">
            <div>
              <span className="font-mono text-xs font-bold text-cyan-400 tracking-wider">
                CHALLENGE #{selectedChallenge.number}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                {selectedChallenge.title}
              </h3>
            </div>
            <div className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-950/90 to-navy-950 border border-purple-400/40 text-right font-mono shadow-md">
              <span className="text-[10px] text-purple-300 uppercase block font-semibold">{selectedChallenge.metricLabel}</span>
              <span className="text-lg font-bold text-amber-300">{selectedChallenge.metricValue}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Problem & Impact */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  The Operational Reality:
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#0A0D1F] p-4 rounded-2xl border border-slate-800">
                  {selectedChallenge.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold mb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  Industrial Impact & Hazard:
                </h4>
                <p className="text-sm text-red-100/90 leading-relaxed bg-gradient-to-br from-red-950/60 to-[#1A0A14] p-4 rounded-2xl border border-red-500/40 shadow-lg shadow-red-950/30">
                  {selectedChallenge.impact}
                </p>
              </div>
            </div>

            {/* Right: Before vs After Comparison */}
            <div className="space-y-4">
              {/* Conventional Practice */}
              <div className="p-4 rounded-2xl bg-[#0A0D1F] border border-red-500/30">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 mb-2">
                  <XCircle className="w-4 h-4" />
                  <span>CONVENTIONAL INDUSTRY PRACTICE (BEFORE)</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedChallenge.traditionalMethod}
                </p>
              </div>

              {/* MineTwin-X Proposed Approach */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/70 via-[#101938] to-[#120E2E] border border-cyan-400/60 shadow-xl shadow-cyan-500/15">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>MINETWIN-X PROPOSED ARCHITECTURE (AFTER)</span>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed">
                  {selectedChallenge.mineTwinApproach}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
