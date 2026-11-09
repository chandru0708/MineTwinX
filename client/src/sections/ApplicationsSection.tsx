import React from 'react';
import { motion } from 'framer-motion';
import {
  Pickaxe, Zap, Building2, Flame, GitBranch, Anchor, ShieldAlert,
  ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles
} from 'lucide-react';
import { INDUSTRIAL_APPLICATIONS, IndustrialApplication } from '../data/projectData';

export const ApplicationsSection: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Pickaxe': return Pickaxe;
      case 'Zap': return Zap;
      case 'Building2': return Building2;
      case 'Flame': return Flame;
      case 'GitBranch': return GitBranch;
      case 'Anchor': return Anchor;
      case 'ShieldAlert': return ShieldAlert;
      default: return Layers;
    }
  };

  const domainStyles: Record<string, { iconGrad: string; border: string; glow: string; text: string }> = {
    'mining': { iconGrad: 'from-amber-400 to-orange-500', border: 'border-amber-400/40', glow: 'shadow-amber-500/15', text: 'text-amber-300' },
    'tunnels': { iconGrad: 'from-cyan-400 to-electric', border: 'border-cyan-400/40', glow: 'shadow-cyan-500/15', text: 'text-cyan-300' },
    'power-plants': { iconGrad: 'from-yellow-400 to-amber-500', border: 'border-yellow-400/40', glow: 'shadow-yellow-500/15', text: 'text-yellow-300' },
    'construction': { iconGrad: 'from-orange-400 to-red-500', border: 'border-orange-400/40', glow: 'shadow-orange-500/15', text: 'text-orange-300' },
    'petrochemical': { iconGrad: 'from-rose-500 to-red-600', border: 'border-rose-400/40', glow: 'shadow-rose-500/15', text: 'text-rose-300' },
    'bridges': { iconGrad: 'from-purple-400 to-violet-600', border: 'border-purple-400/40', glow: 'shadow-purple-500/15', text: 'text-purple-300' },
    'marine': { iconGrad: 'from-teal-400 to-emerald-500', border: 'border-teal-400/40', glow: 'shadow-teal-500/15', text: 'text-teal-300' },
    'disaster': { iconGrad: 'from-red-500 to-pink-600', border: 'border-red-400/40', glow: 'shadow-red-500/15', text: 'text-red-300' },
  };

  return (
    <section id="applications" className="relative py-24 bg-gradient-to-b from-[#0A0D1F] via-[#120F2E] to-[#080B1A] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>CROSS-INDUSTRY DEPLOYMENT DOMAINS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Where MineTwin-X Can{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 via-purple-400 to-amber-300">
              Make a Difference
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Beyond subterranean mining, MineTwin-X delivers automated spatial intelligence across infrastructure, energy, civil tunneling, and hazardous confined facilities.
          </p>
        </div>

        {/* 8 Industrial Application Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIAL_APPLICATIONS.map((app) => {
            const Icon = getIcon(app.iconName);
            const style = domainStyles[app.id] || domainStyles['mining'];
            return (
              <div
                key={app.id}
                className={`glass-panel p-6 rounded-3xl border ${style.border} hover:scale-[1.03] transition-all flex flex-col justify-between shadow-xl ${style.glow} group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${style.iconGrad} text-navy-950 shadow-lg group-hover:scale-110 transition-transform font-bold`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      Sector
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    {app.name}
                  </h4>

                  <div className="space-y-3 text-xs font-sans mb-4">
                    <div className="p-3 rounded-2xl bg-[#080B1A] border border-slate-800">
                      <span className="text-[10px] font-mono text-red-400 uppercase font-bold block mb-0.5">
                        Inspection Challenge:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{app.challenge}</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#080B1A] border border-purple-500/20">
                      <span className={`text-[10px] font-mono ${style.text} uppercase font-bold block mb-0.5`}>
                        Robot & Digital Twin Value:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{app.digitalTwinValue}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{app.operationalBenefit.split(',')[0]}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
