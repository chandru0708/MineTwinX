import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Radio, Cpu, Compass, Layers, ArrowRight, ShieldCheck, CheckCircle2,
  Activity, Sparkles, Sliders
} from 'lucide-react';
import { FOUR_STAGES, CAPABILITY_STATUSES, CapabilityStatus } from '../data/projectData';

export const SolutionSection: React.FC = () => {
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  const selectedStage = FOUR_STAGES[selectedStageIdx];

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return Radio;
      case 'Cpu': return Cpu;
      case 'Compass': return Compass;
      case 'Layers': return Layers;
      default: return Activity;
    }
  };

  const stageThemes = [
    { border: 'border-cyan-400', glow: 'shadow-cyan-500/20', bgGrad: 'from-cyan-950/70 via-[#101938] to-[#0A0D1F]', text: 'text-cyan-400' },
    { border: 'border-electric', glow: 'shadow-blue-500/20', bgGrad: 'from-blue-950/70 via-[#101438] to-[#0A0D1F]', text: 'text-electric' },
    { border: 'border-purple-400', glow: 'shadow-purple-500/20', bgGrad: 'from-purple-950/70 via-[#181038] to-[#0A0D1F]', text: 'text-purple-400' },
    { border: 'border-teal-400', glow: 'shadow-teal-500/20', bgGrad: 'from-teal-950/70 via-[#0E2038] to-[#0A0D1F]', text: 'text-teal-400' },
  ];

  const renderBadge = (status: CapabilityStatus) => {
    const badge = CAPABILITY_STATUSES[status];
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${badge.bg} ${badge.text} ${badge.border}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <section id="solution" className="relative py-24 bg-gradient-to-b from-[#090C1C] via-[#10132B] to-[#080B1A] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>THE 4-STAGE SOLUTION ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Introducing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              MineTwin-X
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            A cohesive robotic ecosystem integrating multi-sensor acquisition, tightly-coupled SLAM, open-vocabulary semantic projection, active exploration, and a cloud-synchronized 4D Digital Twin.
          </p>
        </div>

        {/* 4 Connected Stages Pipeline Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mb-10">
          {FOUR_STAGES.map((stage, idx) => {
            const Icon = getStageIcon(stage.iconName);
            const isSelected = selectedStageIdx === idx;
            const theme = stageThemes[idx];
            return (
              <button
                key={stage.stage}
                onClick={() => setSelectedStageIdx(idx)}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-b ${theme.bgGrad} ${theme.border} shadow-2xl ${theme.glow} scale-[1.03]`
                    : 'bg-[#0E132B]/80 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                {/* Glow border on selection */}
                {isSelected && (
                  <span
                    className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400"
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isSelected ? theme.text : 'text-slate-500'}`}>
                    {stage.stage}
                  </span>
                  <Icon className={`w-5 h-5 ${isSelected ? theme.text : 'text-slate-500'}`} />
                </div>
                <h4 className="text-base font-bold text-white mb-1 leading-snug">
                  {stage.name}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 mb-3 font-mono">
                  {stage.subtitle}
                </p>
                <div className="flex justify-between items-center pt-2.5 border-t border-slate-800/80">
                  {renderBadge(stage.status)}
                  <span className={`text-[11px] font-mono ${theme.text} flex items-center gap-0.5 font-bold`}>
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Decomposition */}
        <motion.div
          key={selectedStage.stage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-purple-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {selectedStage.stage}
                </span>
                {renderBadge(selectedStage.status)}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {selectedStage.name}
              </h3>
              <p className="text-sm text-cyan-300 font-mono mt-0.5">
                {selectedStage.subtitle}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-mono block">MODULAR STAGE</span>
              <span className="text-xs px-3 py-1 rounded-full bg-[#0A0D1F] border border-purple-500/40 text-purple-300 font-mono font-bold">
                {selectedStage.components.length} Key Subsystems
              </span>
            </div>
          </div>

          {/* Subsystem Components Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedStage.components.map((comp, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#090D1F]/90 border border-slate-800 hover:border-purple-400/50 transition-all flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400">
                      SUBMODULE {i + 1}
                    </span>
                    {renderBadge(comp.status)}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {comp.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {comp.description}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-r from-purple-950/40 to-navy-950 border border-purple-500/20 text-[11px] font-mono text-cyan-300/90">
                  <span className="text-purple-400 block text-[9px] uppercase font-bold">Execution Mechanism</span>
                  {comp.details}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
