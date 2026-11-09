import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Cpu, Compass, Layers, Activity, Award, CheckCircle2,
  Terminal, ArrowRight, Sparkles
} from 'lucide-react';
import { PROJECT_METADATA } from '../data/projectData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-[#0A0D1F] via-[#10132B] to-[#0A0E22] border-t border-purple-500/20 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-cyan-500/12 blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Identity */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-500/10">
              <Award className="w-3.5 h-3.5 text-yellow-400" />
              <span>ABOUT THE PLATFORM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              An Autonomous Robotic Platform for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                GPS-Denied Industrial Frontiers
              </span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed font-sans">
              Developed for the <strong className="text-cyan-300">L&T TECHgium 10th Edition</strong>, MineTwin-X bridges the critical void between physical subterranean inspection and real-time digital asset intelligence.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              By combining tightly-coupled <strong className="text-purple-300">LiDAR-Inertial SLAM</strong>, <strong className="text-cyan-300">open-vocabulary vision foundation models</strong>, and <strong className="text-amber-300">active Shannon-entropy exploration</strong>, MineTwin-X navigates hazardous underground stopes, classifies structural assets without manual annotation, and synchronizes a <strong className="text-teal-300">4D Digital Twin</strong> that tracks micro-deformations over time.
            </p>

            {/* 3 Core Platform Pillars (Vibrant Colorful Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141838] to-[#0D1026] border border-cyan-500/30 shadow-lg hover:border-cyan-400 transition-colors">
                <span className="font-mono text-cyan-400 text-xs font-bold block mb-1">01. AUTONOMOUS</span>
                <span className="text-xs text-slate-200 leading-snug block">Active next-best-view planning with Nav2 obstacle avoidance.</span>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141838] to-[#0D1026] border border-purple-500/30 shadow-lg hover:border-purple-400 transition-colors">
                <span className="font-mono text-purple-400 text-xs font-bold block mb-1">02. MULTIMODAL</span>
                <span className="text-xs text-slate-200 leading-snug block">LiDAR geometry, RGB visual context, and 200 Hz IMU state estimation.</span>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141838] to-[#0D1026] border border-teal-500/30 shadow-lg hover:border-teal-400 transition-colors">
                <span className="font-mono text-teal-400 text-xs font-bold block mb-1">03. 4D DIGITAL TWIN</span>
                <span className="text-xs text-slate-200 leading-snug block">Persistent UUIDs with sub-centimeter geometric subtraction over time.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technology Matrix Card */}
          <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-400/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-purple-500/20">
              <span className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                CORE TECHNOLOGY STACK
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-mono font-bold shadow">
                12 Integrated Pillars
              </span>
            </div>

            <div className="space-y-2">
              {PROJECT_METADATA.coreTechnologies.map((tech, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#090D1F]/90 border border-slate-800 text-xs text-slate-200 font-mono hover:border-cyan-400/40 hover:bg-[#101633] transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 shadow-sm shadow-cyan-400/50"></span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Domain: Robotics & Autonomous Systems</span>
              <span className="text-cyan-400 font-bold">Round 2 Finalist</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
