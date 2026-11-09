import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Compass, Play, RotateCcw, ShieldCheck, ArrowRight, Activity, CheckCircle2,
  AlertCircle, Sparkles, Navigation
} from 'lucide-react';
import { soundManager } from '../utils/audioEffects';

export const ExplorationSection: React.FC = () => {
  const [simStep, setSimStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const explorationSequence = [
    {
      step: 1,
      title: '1. Stope Entry',
      description: 'Robot traverses into the uncharted GPS-denied excavation gallery.',
      detail: 'Initial LIO-SAM point cloud registers entry portal anchor coordinates.',
      robotPos: { x: 15, y: 85 },
      targetPos: { x: 30, y: 70 },
      frontierCount: 6,
      mapCoverage: '18%',
      entropyBits: '4.82 bits'
    },
    {
      step: 2,
      title: '2. Baseline Map & Voxelization',
      description: 'Initial 360° LiDAR sweep populates immediate 5cm occupancy octree.',
      detail: 'Floor plane and sidewall boundaries segmented via RANSAC.',
      robotPos: { x: 30, y: 70 },
      targetPos: { x: 45, y: 55 },
      frontierCount: 5,
      mapCoverage: '35%',
      entropyBits: '3.91 bits'
    },
    {
      step: 3,
      title: '3. High Uncertainty Frontier Detection',
      description: 'Voxel entropy evaluator identifies occluded shadow zones behind rock pillar.',
      detail: 'High spatial uncertainty flagged: H(X) = -∑ p(x) log p(x) > 0.85.',
      robotPos: { x: 30, y: 70 },
      targetPos: { x: 45, y: 55 },
      frontierCount: 4,
      mapCoverage: '44%',
      entropyBits: '3.40 bits'
    },
    {
      step: 4,
      title: '4. Value-of-Information (VoI) Optimization',
      description: 'Planner samples candidate viewpoints and computes utility function.',
      detail: 'J(v) = α·InformationGain(v) + β·Uncertainty(v) - γ·TravelCost(v) - δ·Risk(v).',
      robotPos: { x: 30, y: 70 },
      targetPos: { x: 55, y: 40 },
      frontierCount: 3,
      mapCoverage: '52%',
      entropyBits: '2.85 bits'
    },
    {
      step: 5,
      title: '5. Next-Best-View (NBV) Selection',
      description: 'Selects optimal inspection pose maximizing visibility of pillar blind spot.',
      detail: 'Discards risky route close to blast muck pile in favor of stable haul way.',
      robotPos: { x: 42, y: 58 },
      targetPos: { x: 55, y: 40 },
      frontierCount: 3,
      mapCoverage: '62%',
      entropyBits: '2.10 bits'
    },
    {
      step: 6,
      title: '6. ROS 2 Nav2 Trajectory Execution',
      description: 'Nav2 MPPI local controller avoids dynamic rock debris and steers toward goal.',
      detail: 'Smooth continuous velocity profile (/cmd_vel) generated at 20 Hz.',
      robotPos: { x: 55, y: 40 },
      targetPos: { x: 75, y: 25 },
      frontierCount: 2,
      mapCoverage: '78%',
      entropyBits: '1.45 bits'
    },
    {
      step: 7,
      title: '7. Targeted Rescan & Verification',
      description: 'Robot slows velocity at viewpoint to capture dense sub-centimeter point cloud.',
      detail: 'Resolves occluded crack geometry on Pillar P-027 with multi-view camera verification.',
      robotPos: { x: 75, y: 25 },
      targetPos: { x: 75, y: 25 },
      frontierCount: 1,
      mapCoverage: '92%',
      entropyBits: '0.62 bits'
    },
    {
      step: 8,
      title: '8. Digital Twin Update & Closure',
      description: 'New verified geometric primitives and semantic UUIDs synchronized to 4D Twin.',
      detail: 'Exploration mission concludes; coverage threshold of 98% achieved.',
      robotPos: { x: 80, y: 20 },
      targetPos: { x: 80, y: 20 },
      frontierCount: 0,
      mapCoverage: '98.4%',
      entropyBits: '0.12 bits'
    }
  ];

  const currentSeq = explorationSequence[simStep - 1];

  // Auto-play simulation loop
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        soundManager.playClick();
        setSimStep((prev) => (prev < explorationSequence.length ? prev + 1 : 1));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="exploration" className="relative py-24 bg-gradient-to-b from-[#090C1A] via-[#101432] to-[#0A0E24] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>VALUE-OF-INFORMATION FRONTIER PLANNING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Explore Smarter,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Not Just Further
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Pre-programmed waypoints leave dangerous inspection blind spots. MineTwin-X uses Shannon entropy to autonomously identify unobserved areas and compute optimal next-best viewpoints.
          </p>
        </div>

        {/* Interactive Top-Down Simulation Canvas & State */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Top-Down Map Graphic Simulator */}
          <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 border border-purple-500/40 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3 mb-4">
              <span className="font-mono text-xs font-bold text-cyan-300 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                TOP-DOWN 2D/3D FRONTIER EXPLORATION SIMULATOR
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { soundManager.playClick(); setIsPlaying(!isPlaying); }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md ${
                    isPlaying ? 'bg-amber-500 text-navy-950' : 'bg-gradient-to-r from-cyan-500 to-electric text-navy-950'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
                </button>
                <button
                  onClick={() => { soundManager.playClick(); setSimStep(1); }}
                  className="p-1.5 rounded-xl bg-[#141A38] hover:bg-[#1C244E] text-slate-300 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-300" />
                </button>
              </div>
            </div>

            {/* 2D Grid Exploration Area */}
            <div className="relative w-full h-80 rounded-2xl bg-[#070A18] border border-purple-500/30 overflow-hidden bg-tech-pattern shadow-inner">
              {/* Obstacles & Mine Pillars */}
              <div className="absolute top-[30%] left-[25%] w-12 h-12 rounded-full bg-red-900/60 border border-red-500/80 flex items-center justify-center text-[9px] font-mono text-red-200 shadow-lg shadow-red-500/30">
                P-018
              </div>
              <div className="absolute top-[45%] left-[55%] w-14 h-14 rounded-full bg-red-900/60 border border-red-500/80 flex items-center justify-center text-[9px] font-mono text-red-200 shadow-lg shadow-red-500/30">
                P-027
              </div>
              <div className="absolute top-[20%] left-[70%] w-16 h-10 rounded-xl bg-blue-900/60 border border-blue-500/80 flex items-center justify-center text-[9px] font-mono text-blue-200 shadow-lg shadow-blue-500/30">
                EQ-014
              </div>

              {/* Frontier Uncertainty Field Rings */}
              {simStep < 7 && (
                <div
                  className="absolute top-[40%] left-[50%] w-28 h-28 rounded-full border-2 border-dashed border-amber-400 animate-ping opacity-70 pointer-events-none"
                  style={{ animationDuration: '2.5s' }}
                />
              )}

              {/* Trajectory Path Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <polyline
                  points="50,280 120,230 180,180 250,130 320,80"
                  fill="none"
                  stroke="#00D9FF"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Robot Rover Marker */}
              <motion.div
                animate={{
                  left: `${currentSeq.robotPos.x}%`,
                  top: `${currentSeq.robotPos.y}%`
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-400 to-electric border-2 border-white shadow-xl shadow-cyan-400/60 flex items-center justify-center text-navy-950 font-bold">
                  <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <span className="text-[9px] font-mono font-bold text-cyan-300 mt-1 px-1.5 py-0.5 rounded-full bg-[#080B1A]/95 border border-cyan-400/40 whitespace-nowrap shadow">
                  MineTwin Rover
                </span>
              </motion.div>

              {/* Next-Best-View Goal Target */}
              <motion.div
                animate={{
                  left: `${currentSeq.targetPos.x}%`,
                  top: `${currentSeq.targetPos.y}%`
                }}
                transition={{ duration: 0.8 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none"
              >
                <div className="w-7 h-7 rounded-full border-2 border-amber-400 border-dashed animate-spin flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-md shadow-amber-400/80"></span>
                </div>
                <span className="text-[8px] font-mono text-amber-300 mt-0.5 font-bold">
                  NBV Goal
                </span>
              </motion.div>
            </div>

            {/* Step Selection Buttons */}
            <div className="flex items-center justify-between gap-1.5 mt-4 overflow-x-auto">
              {explorationSequence.map((seq) => (
                <button
                  key={seq.step}
                  onClick={() => { soundManager.playClick(); setSimStep(seq.step); }}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all font-semibold ${
                    simStep === seq.step
                      ? 'bg-gradient-to-r from-cyan-400 to-electric text-navy-950 font-bold shadow-md scale-105'
                      : 'bg-[#141A38] text-slate-300 hover:text-white'
                  }`}
                >
                  Step {seq.step}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Step Telemetry & Mathematical Objective Function */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 font-mono text-xs shadow-xl">
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-2 mb-3">
                <span className="text-cyan-400 font-bold uppercase">{currentSeq.title}</span>
                <span className="text-slate-400">STEP {simStep} OF 8</span>
              </div>
              <p className="text-sm text-white font-sans mb-2 font-bold leading-snug">{currentSeq.description}</p>
              <p className="text-slate-300 text-xs font-mono bg-[#090D1F] p-3 rounded-xl border border-slate-800 mb-4">
                {currentSeq.detail}
              </p>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#090D1F] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">MAP COVERAGE</span>
                  <span className="text-lg font-bold text-emerald-400">{currentSeq.mapCoverage}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#090D1F] border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-semibold">SPATIAL ENTROPY</span>
                  <span className="text-lg font-bold text-cyan-300">{currentSeq.entropyBits}</span>
                </div>
              </div>
            </div>

            {/* Mathematical Objective Function Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/80 via-[#18123A] to-[#0A0D1F] border border-purple-400/40 text-xs font-mono shadow-2xl">
              <span className="text-purple-300 font-bold block mb-1">
                VALUE-OF-INFORMATION (VoI) OBJECTIVE FUNCTION
              </span>
              <div className="p-3.5 rounded-xl bg-[#070A18] text-cyan-300 border border-purple-500/40 my-2 shadow-inner">
                <code>J(v) = α·IG(v) + β·Uncertainty(v) - γ·TravelCost(v) - δ·Risk(v)</code>
              </div>
              <div className="space-y-1 text-[11px] text-slate-200 font-sans">
                <p>• <strong className="text-cyan-400">IG(v):</strong> Volume of newly visible unobserved voxels.</p>
                <p>• <strong className="text-purple-400">Uncertainty(v):</strong> Shannon entropy of observed assets.</p>
                <p>• <strong className="text-amber-400">TravelCost(v):</strong> Euclidean distance & energy expended.</p>
                <p>• <strong className="text-red-400">Risk(v):</strong> Proximity to unbolted rock ceilings or ledges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Comparison: Predefined Path vs Active Exploration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#120E1E] border border-red-500/40 shadow-xl">
            <h4 className="text-sm font-bold font-mono text-red-400 uppercase tracking-wider mb-2">
              Conventional: Predefined Path Following
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              The robot executes a blind serpentine route regardless of geometry. It wastes battery traversing empty corridors while leaving complex structural pillar occlusions unscanned.
            </p>
            <div className="space-y-1 text-xs font-mono text-slate-400">
              <div>❌ Ignores asset geometry occlusions</div>
              <div>❌ High energy expenditure on low-value zones</div>
              <div>❌ Zero awareness of inspection uncertainty</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/70 via-[#101A38] to-[#120E2E] border border-cyan-400/60 shadow-xl">
            <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider mb-2">
              MineTwin-X: Active Next-Best-View Exploration
            </h4>
            <p className="text-xs text-white leading-relaxed mb-3">
              The robot actively plans inspection goals based on Shannon spatial entropy. It specifically routes toward obscured faces, verifying pillar micro-cracks before concluding the mission.
            </p>
            <div className="space-y-1 text-xs font-mono text-cyan-200">
              <div>✔ Concentrates sensor sweeps on high-risk pillars</div>
              <div>✔ Minimizes travel distance via Value-of-Information</div>
              <div>✔ Real-time ROS 2 Nav2 dynamic obstacle avoidance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
