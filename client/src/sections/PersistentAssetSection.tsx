import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers, History, Clock, ArrowRight, ShieldCheck, Tag, GitCompare,
  CheckCircle2, Sparkles, AlertTriangle
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const PersistentAssetSection: React.FC = () => {
  const [activeMission, setActiveMission] = useState(4);

  const missions = [
    {
      num: 1,
      title: 'MISSION 01: Baseline 3D Geometry Mapping',
      date: 'Month 0 (Initial Scan)',
      desc: 'Rover traverses the newly blasted gallery. LiDAR-Inertial SLAM generates dense octree point clouds, fits RANSAC geometric primitives, and registers initial physical assets with global UUIDs.',
      action: 'Created baseline 3D mesh & registered 112 baseline assets.',
      status: 'Initial Spatial Reference Set'
    },
    {
      num: 2,
      title: 'MISSION 02: Relocalization & Semantic Association',
      date: 'Month 1 (+30 Days)',
      desc: 'Rover enters with zero GPS prior. It matches local LiDAR submaps against Mission 01 reference keyframes to relocalize its global pose and associate previously identified asset UUIDs.',
      action: '100% persistent UUID retention without human re-annotation.',
      status: 'Relocalized in GPS-Denied Drift'
    },
    {
      num: 3,
      title: 'MISSION 03: Multi-Temporal Sub-Voxel Registration',
      date: 'Month 2 (+60 Days)',
      desc: 'New dense point clouds are captured following nearby production blasting. Sub-voxel iterative closest point (ICP) aligns the new scan with the baseline coordinate anchor.',
      action: 'Fine-tuned multi-temporal alignment error < 2.5mm.',
      status: 'High-Density Rescan Registered'
    },
    {
      num: 4,
      title: 'MISSION 04: Geometric Subtraction & Change Detection',
      date: 'Month 3 (Current Scan)',
      desc: 'M3C2 (Multiscale Model to Model Cloud Comparison) performs surface-normal subtraction between Mission 01 and Mission 04. Identifies 14.2mm lateral displacement on Structural Pillar P-027.',
      action: 'Isolated 3 structural changes; generated geotech maintenance alert.',
      status: 'Deformation Heatmap Generated'
    },
    {
      num: 5,
      title: 'MISSION 05: Living Historical Evolution Record',
      date: 'Continuous Lifecycle',
      desc: 'Asset degradation rate is updated in the cloud Digital Twin. Mining geotechnical engineers query 12-month displacement trends to plan preventative reinforcement before rockfall risk.',
      action: 'Predictive structural lifecycle management established.',
      status: 'Evolving 4D Asset History'
    }
  ];

  return (
    <section id="persistent-asset" className="relative py-24 bg-gradient-to-b from-[#0A0D1F] via-[#10132E] to-[#080B1A] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <History className="w-4 h-4 text-cyan-400" />
            <span>4D TEMPORAL EVOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            More Than a 3D Map —{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              An Evolving Record
            </span>{' '}
            of Industrial Assets
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            A 3D model is a static freeze-frame. MineTwin-X builds a <strong>4D Digital Twin</strong> — augmenting 3D spatial coordinates with the fourth dimension of <strong>time</strong> and inspection history.
          </p>
        </div>

        {/* 3D vs 4D Conceptual Banner with colorful gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-7 rounded-3xl bg-gradient-to-b from-[#141838] to-[#090D1F] border border-slate-700/80 shadow-xl">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
              CONVENTIONAL 3D MAPPING
            </span>
            <h4 className="text-2xl font-bold font-display text-white mb-2">
              Spatial Coordinates Only (X, Y, Z)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides raw geometric volume at a single moment in time. If a pillar micro-displaces by 15mm six months later, a standard 3D map cannot isolate or quantify the change without laborious manual re-surveying.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-purple-950/80 via-[#18133C] to-[#0C1B38] border border-cyan-400/50 shadow-2xl">
            <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block mb-1">
              MINETWIN-X 4D DIGITAL TWIN
            </span>
            <h4 className="text-2xl font-bold font-display text-white mb-2">
              Spatial + Temporal Evolution (X, Y, Z + Time)
            </h4>
            <p className="text-xs text-cyan-100 leading-relaxed font-medium">
              Assigns immutable UUIDs (e.g. Pillar P-027) persistent across repeated monthly missions. Uses registered point-cloud subtraction to track deformation rates, bolt torque slack, and surface crack propagation over years.
            </p>
          </div>
        </div>

        {/* Mission Progression Interactive Stepper */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-2 border-b border-slate-800">
            <span className="font-bold text-white">5-MISSION PROGRESSION LIFECYCLE:</span>
            <span className="text-cyan-400 font-semibold">Click any mission to inspect mechanism</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {missions.map((m) => (
              <button
                key={m.num}
                onClick={() => { soundManager.playClick(); setActiveMission(m.num); }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  activeMission === m.num
                    ? 'bg-gradient-to-b from-purple-900/80 to-[#12163A] text-white border-cyan-400 shadow-xl shadow-purple-500/25 scale-[1.03]'
                    : 'bg-[#10142E] border-slate-800 hover:border-purple-400 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    MISSION 0{m.num}
                  </span>
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <h5 className="text-xs font-bold text-white line-clamp-1">{m.title.split(':')[1]?.trim() || m.title}</h5>
                <span className="text-[10px] font-mono text-slate-300 block mt-1">{m.date}</span>
              </button>
            ))}
          </div>

          {/* Active Mission Card Detail */}
          {(() => {
            const current = missions.find(m => m.num === activeMission) || missions[3];
            return (
              <motion.div
                key={current.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel-glow rounded-3xl p-7 border border-cyan-400/40 mt-4 shadow-2xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 border-b border-purple-500/20 pb-3.5">
                  <h4 className="text-xl font-bold font-display text-white">{current.title}</h4>
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-electric text-navy-950 font-mono text-xs font-extrabold shadow">
                    {current.status}
                  </span>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4">
                  {current.desc}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#090D1F] border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center gap-2.5 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Impact Deliverable: {current.action}</span>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
