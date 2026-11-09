import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Layers, Eye, Compass, Activity, CheckCircle2, Sliders, Box,
  Zap, ArrowRight, ShieldCheck, HelpCircle
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fusion' | 'projection' | 'primitives' | 'uncertainty'>('fusion');

  // Interactive primitive fitting calculator demo
  const [cylinderRadius, setCylinderRadius] = useState(0.45);
  const [pillarHeight, setPillarHeight] = useState(3.2);

  const calculateVolume = () => {
    return (Math.PI * Math.pow(cylinderRadius, 2) * pillarHeight).toFixed(2);
  };

  return (
    <section id="technology" className="relative py-24 bg-gradient-to-b from-[#0A0D1F] via-[#101432] to-[#0A0E24] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI PERCEPTION & MULTIMODAL FUSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Giving the Robot{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Spatial Understanding
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            How raw laser returns, camera pixels, and high-frequency inertial forces are fused into verified geometric primitives and semantic asset identities.
          </p>
        </div>

        {/* Technology Navigation Sub-Tabs */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {[
            { id: 'fusion', label: '1. Multimodal Sensor Fusion', icon: Activity },
            { id: 'projection', label: '2. 2D-to-3D Open-Vocabulary', icon: Eye },
            { id: 'primitives', label: '3. Geometric Reasoning & RANSAC', icon: Box },
            { id: 'uncertainty', label: '4. Multi-View Uncertainty Filter', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 via-electric to-purple-600 text-white border-white shadow-xl shadow-purple-500/25 scale-105'
                    : 'bg-[#10142D] text-slate-300 border-slate-800 hover:border-purple-400'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Multimodal Sensor Fusion */}
        {activeTab === 'fusion' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#121636] to-[#0A0D1F] border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold mb-3">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>LIDAR PIPELINE</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Geometric Density</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Raw time-of-flight point reflections are captured at 200,000 pts/sec. Point-to-plane residual matching creates continuous metric 3D surfaces without requiring external lighting.
              </p>
              <div className="p-3.5 rounded-xl bg-[#090D1F] border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                <div>• De-skewing via IMU motion prior</div>
                <div>• 5cm Octree Voxel Downsampling</div>
                <div>• Degeneracy awareness in corridors</div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#121636] to-[#0A0D1F] border border-purple-500/30 hover:border-purple-400 transition-all shadow-xl">
              <div className="flex items-center gap-2 text-purple-400 text-xs font-mono font-bold mb-3">
                <Eye className="w-5 h-5 text-purple-400" />
                <span>RGB VISION PIPELINE</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Semantic Context</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                1080p wide-angle camera frames extract high-dimensional semantic feature representations. Vision-language models (CLIP/OWL-ViT) recognize unknown industrial machinery zero-shot.
              </p>
              <div className="p-3.5 rounded-xl bg-[#090D1F] border border-slate-800 font-mono text-[11px] text-purple-300 space-y-1">
                <div>• Global shutter exposure control</div>
                <div>• Vision-language embeddings</div>
                <div>• Color texture & label detection</div>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#121636] to-[#0A0D1F] border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold mb-3">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>6-DOF IMU INTEGRATION</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">High-Rate Motion Prior</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                200 Hz angular velocities and accelerations are pre-integrated on manifold within GTSAM factor graphs, bridging the 100ms interval between successive LiDAR sweeps.
              </p>
              <div className="p-3.5 rounded-xl bg-[#090D1F] border border-slate-800 font-mono text-[11px] text-amber-300 space-y-1">
                <div>• Continuous-time manifold integration</div>
                <div>• Real-time gyro bias estimation</div>
                <div>• High-shock vibration compensation</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: 2D-to-3D Open-Vocabulary Projection */}
        {activeTab === 'projection' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  RESEARCH PILLAR: OPENSCENE PIPELINE
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1 mb-3">
                  Open-Vocabulary 2D-to-3D Projection
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Standard neural networks fail in underground mining because closed-set datasets (e.g. COCO, ScanNet) lack classes like "dewatering slurry pump" or "mine stope support bolt."
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  MineTwin-X employs vision-language foundation models on synchronized camera frames to produce 512-dimensional semantic vectors, which are then ray-cast onto the 3D LiDAR point cloud using pinhole camera intrinsic matrices:
                </p>
                <div className="p-3.5 rounded-2xl bg-[#090D1F] font-mono text-xs text-cyan-300 border border-purple-500/30 mb-4 shadow-inner">
                  <code>P_3D = T_lidar_cam · K⁻¹ · [u, v, 1]ᵀ · Depth(u, v)</code>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enables zero-shot querying for any industrial object without custom retraining.</span>
                </div>
              </div>

              {/* Graphic Flow Representation */}
              <div className="p-6 rounded-2xl bg-[#090D1F] border border-purple-500/30 font-mono text-xs space-y-3.5 shadow-xl">
                <div className="p-3.5 rounded-xl bg-[#141A38] border border-slate-700 flex justify-between items-center">
                  <span className="text-slate-200">1. Synchronized RGB Camera Frame</span>
                  <span className="text-cyan-400 font-bold">1920x1080</span>
                </div>
                <div className="text-center text-purple-400 font-bold">↓ Vision-Language Embedding</div>
                <div className="p-3.5 rounded-xl bg-[#141A38] border border-cyan-500/40 flex justify-between items-center shadow-md">
                  <span className="text-cyan-200">2. Open-Vocabulary 2D Feature Map</span>
                  <span className="text-purple-300 font-bold">512-D Vectors</span>
                </div>
                <div className="text-center text-purple-400 font-bold">↓ Ray Projection + Depth Occlusion Culling</div>
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-electric/30 to-purple-600/30 border border-cyan-400 flex justify-between items-center shadow-lg">
                  <span className="text-white font-bold">3. Dense Semantic 3D Point Cloud</span>
                  <span className="text-emerald-400 font-bold">Metric XYZ + Semantics</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Geometric Reasoning & RANSAC Primitive Fitting */}
        {activeTab === 'primitives' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  ANALYTICAL RIGOR OVER PURE DEEP LEARNING
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1 mb-3">
                  RANSAC Geometric Primitive Extraction
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  AI neural networks can hallucinate false predictions on unfamiliar textured walls. MineTwin-X cross-verifies every semantic label with analytical geometric shapes:
                </p>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-[#090D1F] border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold block mb-1">RANSAC Cylinder Fitting (Pillars & Pipes):</span>
                    <span className="text-slate-300">Extracts cylinder radius R, height H, and normal axis orientation. Rejects labels if surface residual variance &gt; 8mm.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#090D1F] border border-purple-500/30">
                    <span className="text-purple-400 font-bold block mb-1">RANSAC Plane Fitting (Floor, Walls, Ceiling):</span>
                    <span className="text-slate-300">Identifies planar equations ax + by + cz + d = 0 to establish traversable ground planes and sidewalls.</span>
                  </div>
                </div>
              </div>

              {/* Interactive Primitive Fitting Calculator Widget */}
              <div className="p-6 rounded-3xl bg-[#090D1F] border border-cyan-400/50 font-mono shadow-2xl">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <span className="text-xs text-cyan-300 font-bold flex items-center gap-1.5">
                    <Sliders className="w-4 h-4" />
                    INTERACTIVE CYLINDER ESTIMATOR
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-bold">
                    P-027 Model
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-200 mb-1">
                      <span>Cylinder Radius (R):</span>
                      <span className="text-cyan-400 font-bold">{cylinderRadius} m</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.2"
                      step="0.05"
                      value={cylinderRadius}
                      onChange={(e) => setCylinderRadius(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-200 mb-1">
                      <span>Pillar Height (H):</span>
                      <span className="text-cyan-400 font-bold">{pillarHeight} m</span>
                    </div>
                    <input
                      type="range"
                      min="1.0"
                      max="6.0"
                      step="0.2"
                      value={pillarHeight}
                      onChange={(e) => setPillarHeight(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-2xl bg-[#141A38] border border-slate-800 shadow">
                      <span className="text-[10px] text-slate-400 block font-semibold">ESTIMATED VOLUME</span>
                      <span className="text-lg font-bold text-cyan-300">{calculateVolume()} m³</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-[#141A38] border border-slate-800 shadow">
                      <span className="text-[10px] text-slate-400 block font-semibold">FITTING RESIDUAL</span>
                      <span className="text-lg font-bold text-emerald-400">4.8 mm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Multi-View Consistency & Bayesian Uncertainty */}
        {activeTab === 'uncertainty' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                  RELIABILITY-AWARE FUSION
                </span>
                <h3 className="text-2xl font-bold font-display text-white mt-1 mb-2">
                  Multi-View Bayesian Consistency & Entropy
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Single-camera viewpoints can suffer from glare, shadow occlusion, or motion blur. MineTwin-X maintains a recursive Bayesian probability distribution for each 3D voxel across multiple observations:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-5 rounded-2xl bg-[#090D1F] border border-cyan-500/30 shadow-lg">
                  <div className="text-cyan-400 font-bold mb-1 text-sm">1. Temporal Voting</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Labels must achieve &gt;85% consensus across at least 4 independent viewpoint angles before being committed to the permanent Digital Twin.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#090D1F] border border-amber-500/30 shadow-lg">
                  <div className="text-amber-400 font-bold mb-1 text-sm">2. Shannon Entropy H(X)</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Quantifies voxel ambiguity: H(X) = -∑ p(x) log p(x). Voxels with high entropy are marked as exploration frontiers for the active planner.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#090D1F] border border-purple-500/30 shadow-lg">
                  <div className="text-purple-400 font-bold mb-1 text-sm">3. Model Distillation</div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Large vision-language foundation models run asynchronously on keyframes; high-confidence labels are used to distill lightweight onboard TensorRT classifiers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
