import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, ArrowDown, ChevronRight, X, Cpu, Radio, Compass, Box,
  ShieldCheck, Activity, Terminal, Database, CheckCircle2
} from 'lucide-react';
import { ARCHITECTURE_MODULES, ArchitectureModule, CAPABILITY_STATUSES } from '../data/projectData';

export const ArchitectureSection: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ArchitectureModule | null>(ARCHITECTURE_MODULES[2]); // LIO-SAM default

  const renderBadge = (status: ArchitectureModule['status']) => {
    const b = CAPABILITY_STATUSES[status];
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${b.bg} ${b.text} ${b.border}`}>
        {b.label}
      </span>
    );
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Sensing': return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'Perception': return 'text-purple-300 bg-purple-950/60 border-purple-500/40';
      case 'Planning': return 'text-amber-300 bg-amber-950/60 border-amber-500/40';
      case 'Digital Twin': return 'text-teal-300 bg-teal-950/60 border-teal-500/40';
      default: return 'text-slate-300 bg-navy-950 border-slate-700';
    }
  };

  return (
    <section id="architecture" className="relative py-24 bg-gradient-to-b from-[#0A0E24] via-[#0E1026] to-[#090C1A] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>END-TO-END DATA FLOW PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            From Multimodal Sensors to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Spatial Intelligence
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Explore every module in the MineTwin-X software architecture. Click any stage in the data flow pipeline to inspect its exact inputs, algorithm processing, outputs, and underlying technologies.
          </p>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Pipeline Cards (14 modules) */}
          <div className="lg:col-span-6 space-y-2.5 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
            {ARCHITECTURE_MODULES.map((mod, idx) => {
              const isSelected = selectedModule?.id === mod.id;
              return (
                <div key={mod.id} className="relative">
                  <button
                    onClick={() => setSelectedModule(mod)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 via-[#18123B] to-[#121638] border-cyan-400 shadow-xl shadow-purple-500/25 scale-[1.01]'
                        : 'bg-[#0E1329]/80 border-slate-800 hover:border-purple-400 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold shadow ${
                        isSelected ? 'bg-gradient-to-r from-cyan-400 to-electric text-navy-950' : 'bg-[#181F42] text-slate-300'
                      }`}>
                        {mod.stepNumber}
                      </span>
                      <div>
                        <h4 className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white font-bold' : 'text-slate-200'}`}>
                          {mod.name}
                        </h4>
                        <span className="text-[10px] font-mono text-cyan-300 block font-medium">
                          Category: {mod.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {renderBadge(mod.status)}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 rotate-90' : 'text-slate-500'}`} />
                    </div>
                  </button>

                  {/* Flow Arrow connecting to next node */}
                  {idx < ARCHITECTURE_MODULES.length - 1 && (
                    <div className="flex justify-center my-0.5">
                      <ArrowDown className="w-3 h-3 text-cyan-400/50" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Module Deep-Dive Inspector Panel */}
          <div className="lg:col-span-6 sticky top-24">
            <AnimatePresence mode="wait">
              {selectedModule && (
                <motion.div
                  key={selectedModule.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-400/50 shadow-2xl"
                >
                  <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-cyan-400">
                          STEP {String(selectedModule.stepNumber).padStart(2, '0')} OF 14
                        </span>
                        {renderBadge(selectedModule.status)}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                        {selectedModule.name}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getCategoryColor(selectedModule.category)}`}>
                      {selectedModule.category}
                    </span>
                  </div>

                  <div className="space-y-4 text-xs font-sans">
                    {/* What it does */}
                    <div>
                      <h5 className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] mb-1">
                        Functional Description:
                      </h5>
                      <p className="text-slate-200 leading-relaxed bg-[#090D1F] p-3.5 rounded-2xl border border-slate-800">
                        {selectedModule.description}
                      </p>
                    </div>

                    {/* Input & Output */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                      <div className="p-3.5 rounded-2xl bg-[#090D1F] border border-slate-800">
                        <span className="text-slate-400 text-[10px] block font-bold mb-1">INPUT DATA</span>
                        <p className="text-slate-300 leading-snug">{selectedModule.inputData}</p>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#090D1F] border border-cyan-500/30">
                        <span className="text-cyan-400 text-[10px] block font-bold mb-1">OUTPUT GENERATED</span>
                        <p className="text-cyan-200 leading-snug">{selectedModule.outputData}</p>
                      </div>
                    </div>

                    {/* Processing Performed */}
                    <div>
                      <h5 className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] mb-1">
                        Processing & Algorithmic Execution:
                      </h5>
                      <p className="text-slate-200 leading-relaxed bg-[#0D122B] p-3.5 rounded-2xl border border-slate-800 font-mono text-[11px]">
                        {selectedModule.processing}
                      </p>
                    </div>

                    {/* Technologies Involved */}
                    <div>
                      <h5 className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] mb-1.5">
                        Technologies & Frameworks Involved:
                      </h5>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                        {selectedModule.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-xl bg-purple-950/80 text-cyan-300 border border-purple-400/40 font-bold shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Why Important */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/50 to-purple-950/50 border border-cyan-400/40 shadow-lg">
                      <span className="font-mono font-bold text-cyan-300 text-[11px] block mb-1">
                        Why this is critical for MineTwin-X:
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px]">
                        {selectedModule.importance}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
