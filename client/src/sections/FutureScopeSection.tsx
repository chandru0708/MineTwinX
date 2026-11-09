import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Radio, Cpu, Network, Activity, ShieldCheck, Database,
  ArrowRight, CheckCircle2
} from 'lucide-react';

export const FutureScopeSection: React.FC = () => {
  const futureItems = [
    {
      title: 'Heterogeneous Multi-Robot Swarm Coordination',
      icon: Network,
      desc: 'Collaborative SLAM where wheeled rovers, legged quadrupeds, and aerial drones share a unified distributed factor graph to map an entire mine simultaneously.',
      timeline: 'Phase 6 (Post-MVP)',
      status: 'FUTURE SCOPE'
    },
    {
      title: 'Thermal & mmWave Full Radiometric Fusion',
      icon: Radio,
      desc: 'Integrating continuous thermal emissivity heatmaps onto 3D voxel faces to automatically flag overheated conveyor motors and steam piping hotspots.',
      timeline: 'Phase 6 (Post-MVP)',
      status: 'FUTURE SCOPE'
    },
    {
      title: 'Predictive Geotechnical Failure Modeling',
      icon: Activity,
      desc: 'Coupling 4D point-cloud deformation vectors with Finite Element Analysis (FEA) rock mechanics software to forecast rockfall collapses days in advance.',
      timeline: 'Phase 7 (Enterprise)',
      status: 'FUTURE SCOPE'
    },
    {
      title: 'Autonomous Docking & Subterranean Wireless Charging',
      icon: Cpu,
      desc: 'Self-guided magnetic docking stations installed inside refuge chambers for automated battery replenishment without human handling.',
      timeline: 'Phase 7 (Enterprise)',
      status: 'FUTURE SCOPE'
    },
    {
      title: 'Subterranean 5G & Mesh Relay Droppers',
      icon: Database,
      desc: 'Robot autonomously deposits wireless mesh relay pucks at tunnel junctions to extend high-bandwidth video tele-operation across deep shaft corridors.',
      timeline: 'Phase 8 (Production)',
      status: 'FUTURE SCOPE'
    },
    {
      title: 'Natural Language Spatial Query Agent',
      icon: Sparkles,
      desc: 'Voice & text conversational AI interface enabling engineers to ask: "Summarize all structural pillar displacements over 10mm detected this week."',
      timeline: 'Phase 8 (Production)',
      status: 'FUTURE SCOPE'
    }
  ];

  return (
    <section id="future-scope" className="relative py-24 bg-navy-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>HORIZON TECHNOLOGIES & ROADMAP EXTENSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Building the Next Generation of Intelligent Inspection
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Our long-term vision extends beyond single-robot inspection into multi-agent swarms, predictive structural mechanics, and automated subterranean docking.
          </p>
        </div>

        {/* Future Scope Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-navy-900/60 border border-purple-500/20 hover:border-purple-400/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-500/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 border border-purple-500/40 text-purple-300">
                      {item.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                  Target Horizon: {item.timeline}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

