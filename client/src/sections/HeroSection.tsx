import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Compass, Eye, ArrowRight, Award, Radio, Activity, Cpu, Layers, Sparkles
} from 'lucide-react';
import * as THREE from 'three';
import { PROJECT_METADATA } from '../data/projectData';
import { RobotTelemetry } from '../types';

interface HeroSectionProps {
  onStartJuryTour: () => void;
  onExploreClick: () => void;
  onTwinClick: () => void;
  telemetry: RobotTelemetry;
}

// Background 3D Particle LiDAR Ring Scanner for Hero with vibrant multi-tone particles
const HeroLidarScanner = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const [positions, colors] = React.useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#00D9FF'); // Cyan
    const colorB = new THREE.Color('#A855F7'); // Violet
    const colorC = new THREE.Color('#FF9F43'); // Vibrant Orange
    const colorD = new THREE.Color('#00C9A7'); // Teal

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.75;
      const radius = 3.5 + Math.random() * 5.5;

      pos[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);

      const r = Math.random();
      const mixed = r > 0.75 ? colorA : (r > 0.5 ? colorB : (r > 0.25 ? colorC : colorD));
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.18;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      const s = 1 + Math.sin(Date.now() / 600) * 0.12;
      ringRef.current.scale.set(s, s, s);
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.6} />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.07} vertexColors transparent opacity={0.8} />
      </points>

      {/* Rotating Dual LiDAR Horizon Sweep Rings */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 48]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ringRef2} rotation={[-Math.PI / 2.1, 0, Math.PI / 4]}>
        <ringGeometry args={[4.1, 4.25, 48]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJuryTour,
  onExploreClick,
  onTwinClick,
  telemetry,
}) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090B18] via-[#0E1026] to-[#0A0D1F]">
      {/* 3D LiDAR Particle Field Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 7], fov: 60 }}>
          <HeroLidarScanner />
        </Canvas>
      </div>

      {/* Colorful Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/25 to-pink-600/10 blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400/20 to-teal-400/15 blur-[90px] pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-amber-500/10 blur-[110px] pointer-events-none z-0"></div>

      {/* Technical HUD Grid Lines & Vignette */}
      <div className="absolute inset-0 bg-tech-pattern opacity-30 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#080A14] via-transparent to-[#080A14]/70 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badges & Competition Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 via-navy-900/90 to-cyan-950/80 border border-purple-400/40 text-xs font-mono text-cyan-300 shadow-xl shadow-purple-500/15 mb-6 backdrop-blur-md"
        >
          <Award className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="font-bold text-white">L&T TECHgium 10th Edition</span>
          <span className="text-purple-400 font-bold">•</span>
          <span className="text-purple-200">Robotics & Autonomous Systems</span>
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-electric text-navy-950 font-extrabold text-[10px] shadow">
            Round 2
          </span>
        </motion.div>

        {/* Main Heading with vibrant multi-stop gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white max-w-5xl mx-auto leading-[1.1]"
        >
          See Beyond the Surface.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 via-purple-400 to-amber-300 glow-cyan">
            Understand Every Asset.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-medium text-cyan-200/90 font-display max-w-4xl mx-auto mt-4"
        >
          Autonomous Multimodal 4D Digital Twin and Intelligent Inspection Robot for GPS-Denied Environments.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mt-4 leading-relaxed font-sans"
        >
          {PROJECT_METADATA.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8"
        >
          {/* JURY TOUR BUTTON (High Priority with vibrant animated glow) */}
          <button
            onClick={onStartJuryTour}
            className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 text-navy-950 font-extrabold font-mono text-sm tracking-wide shadow-2xl shadow-purple-500/30 hover:shadow-cyan-400/50 hover:scale-105 transition-all flex items-center gap-2 border border-white/40"
          >
            <Award className="w-5 h-5 text-navy-950 animate-spin" style={{ animationDuration: '6s' }} />
            <span>START JURY EXPERIENCE</span>
            <ArrowRight className="w-4 h-4 text-navy-950" />
          </button>

          {/* EXPERIENCE DIGITAL TWIN */}
          <button
            onClick={onTwinClick}
            className="px-6 py-4 rounded-2xl bg-[#141A38]/90 hover:bg-[#1D254C] text-cyan-300 font-bold font-mono text-sm border border-cyan-400/60 hover:border-cyan-300 shadow-xl hover:shadow-cyan-500/30 hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>EXPERIENCE DIGITAL TWIN</span>
          </button>

          {/* START PROJECT EXPLORATION */}
          <button
            onClick={onExploreClick}
            className="px-5 py-4 rounded-2xl bg-[#0D1226]/80 hover:bg-[#151C3B] text-slate-200 font-mono text-sm border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-1.5"
          >
            <span>EXPLORE TECHNOLOGY</span>
          </button>
        </motion.div>

        {/* Colorful Core Capability Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mt-12"
        >
          {[
            { label: 'GPS-Denied Navigation', value: 'LIO-SAM Odometry', icon: Compass, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'from-cyan-950/40 to-navy-900/40' },
            { label: '3D Mapping', value: 'Dense Octree Voxel', icon: Layers, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-950/40 to-navy-900/40' },
            { label: 'Semantic AI', value: 'Open-Vocabulary', icon: Cpu, color: 'text-pink-400', border: 'border-pink-500/30', bg: 'from-pink-950/40 to-navy-900/40' },
            { label: 'Active Exploration', value: 'Next-Best-View', icon: Activity, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'from-amber-950/40 to-navy-900/40' },
            { label: '4D Digital Twin', value: 'Temporal Changes', icon: Sparkles, color: 'text-teal-400', border: 'border-teal-500/30', bg: 'from-teal-950/40 to-navy-900/40' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border ${item.border} bg-gradient-to-b ${item.bg} backdrop-blur-md text-center hover:scale-105 transition-all shadow-lg`}
              >
                <div className={`flex items-center justify-center gap-1.5 mb-1 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                  <span className="text-[11px] font-mono font-bold tracking-wide">{item.label}</span>
                </div>
                <p className="text-xs text-slate-200 font-mono font-medium">{item.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Live Simulated Telemetry Ticker (Demo Mode) with colorful status badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0D1226]/90 border border-purple-500/30 text-xs font-mono text-slate-300 shadow-xl"
        >
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>ROVER TELEMETRY:</span>
          </span>
          <span className="text-cyan-200 font-semibold">POSE [X:{telemetry.position.x} Y:{telemetry.position.y} Z:{telemetry.position.z}]</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-bold">BATTERY {telemetry.batteryLevel}%</span>
          <span className="text-slate-500">•</span>
          <span className="text-amber-400 font-bold">STATE: {telemetry.navigationState}</span>
          <span className="text-slate-500">•</span>
          <span className="text-purple-300 font-bold">JETSON 28.4 FPS</span>
        </motion.div>
      </div>
    </section>
  );
};
