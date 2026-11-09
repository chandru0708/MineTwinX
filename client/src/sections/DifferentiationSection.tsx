import React from 'react';
import { motion } from 'framer-motion';
import {
  Award, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Cpu,
  Sparkles, Layers, Sliders
} from 'lucide-react';
import { COMPARISON_CRITERIA } from '../data/projectData';

export const DifferentiationSection: React.FC = () => {
  const contributions = [
    { num: '01', title: 'Hardware-Agnostic Robotic Deployment', desc: 'Standardized ROS 2 adapter interface for wheeled, tracked, or legged platforms.' },
    { num: '02', title: 'GPS-Denied LiDAR-Inertial Mapping', desc: 'Tightly-coupled LIO-SAM state estimation with corridor degeneracy mitigation.' },
    { num: '03', title: 'Reliability-Aware Multimodal Fusion', desc: 'Synchronized LiDAR geometry, RGB visual context, and 200 Hz IMU pre-integration.' },
    { num: '04', title: 'Open-Vocabulary Semantic Understanding', desc: 'Zero-shot recognition of arbitrary mining assets without closed-set dataset retraining.' },
    { num: '05', title: 'Geometric Reasoning & RANSAC Fitting', desc: 'Physical cylinder & plane dimension validation preventing neural hallucination.' },
    { num: '06', title: 'Uncertainty-Aware Active Exploration', desc: 'Value-of-Information frontier planner targeting high-entropy occluded volumes.' },
    { num: '07', title: 'Persistent Asset IDs Across Missions', desc: 'Geometric-semantic relocalization maintaining persistent UUIDs across multi-month runs.' },
    { num: '08', title: 'Registered 4D Point-Cloud Subtraction', desc: 'Sub-centimeter structural deformation heatmaps comparing baseline against current scans.' },
    { num: '09', title: 'Cloud-Synchronized 4D Digital Twin', desc: 'Zero-install interactive WebGL platform streaming live telemetry and inspection logs.' },
    { num: '10', title: 'Integrated Natural Spatial Querying', desc: 'Instant multi-attribute querying across geometry, condition, and timestamp.' },
  ];

  return (
    <section id="differentiation" className="relative py-24 bg-navy-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING DIFFERENTIATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Why Our Approach Matters
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Our core engineering novelty lies in the holistic integration of multimodal sensing, open-vocabulary projection, active exploration, and 4D temporal subtraction into a single coordinated industrial platform.
          </p>
        </div>

        {/* 10 Proposed Engineering Contributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-16">
          {contributions.map((c) => (
            <div
              key={c.num}
              className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-cyan-400 block mb-1">
                  #{c.num}
                </span>
                <h4 className="text-xs font-bold text-white mb-2 leading-snug">
                  {c.title}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Comprehensive 10-Criteria Comparison Table */}
        <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border border-cyan-500/30 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-cyan-500/20 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Conventional Inspection vs. MineTwin-X Proposed Approach
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Head-to-head architectural capability comparison across key evaluation criteria
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded bg-navy-950 text-cyan-300 border border-slate-700 font-mono">
              10 Evaluation Vectors
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 font-mono text-[11px] text-slate-400">
                  <th className="py-3 px-3 uppercase">Inspection Vector</th>
                  <th className="py-3 px-3 uppercase text-red-400">Conventional Industry Practice</th>
                  <th className="py-3 px-3 uppercase text-cyan-400">MineTwin-X Proposed Architecture</th>
                  <th className="py-3 px-3 uppercase text-emerald-400">Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {COMPARISON_CRITERIA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-navy-850/50 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">
                      {row.criterion}
                    </td>
                    <td className="py-3 px-3 text-slate-400">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <span>{row.conventional}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-cyan-100 font-medium">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{row.mineTwin}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                      {row.advantage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

