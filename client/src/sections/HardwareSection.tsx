import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass, Radio, Camera, Cpu, Zap, Eye, Sliders, Shield, CheckCircle2,
  ChevronRight, Layers, Bot, Truck, Footprints, Briefcase
} from 'lucide-react';
import { CAPABILITY_STATUSES } from '../data/projectData';

export const HardwareSection: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState('lidar');

  const primarySensors = [
    {
      id: 'lidar',
      name: '360° 3D LiDAR (Livox Mid-360 / Velodyne)',
      type: 'Primary Baseline Sensor',
      status: 'IN DEVELOPMENT' as const,
      color: 'border-cyan-400 text-cyan-300',
      range: '40 meters',
      pointsPerSec: '200,000+ pts/sec',
      fov: '360° Horizontal x 59° Vertical',
      purpose: 'Dense 3D metric geometry acquisition, sub-centimeter surface mapping, and obstacle collision perimeter generation.',
      whyBaseline: 'Essential for geometry. LiDAR provides non-contact distance measurements unaffected by dark underground mine voids where ambient sunlight is zero.',
      specs: [
        'Non-repetitive scanning pattern',
        'Point cloud distance precision: 1.5 cm',
        'Laser wavelength: 905 nm Class 1 Eye-Safe',
        'Weight: ~265g (ultra-compact payload)'
      ]
    },
    {
      id: 'camera',
      name: 'Industrial Wide-FOV RGB Camera',
      type: 'Primary Baseline Sensor',
      status: 'IN DEVELOPMENT' as const,
      color: 'border-purple-400 text-purple-300',
      range: 'Optical FOV 120°',
      pointsPerSec: '1080p @ 30 FPS',
      fov: '120° Diagonal',
      purpose: 'Visual context acquisition, surface crack detection, equipment color markings, and zero-shot open-vocabulary 2D semantic feature extraction.',
      whyBaseline: 'LiDAR lacks high-resolution color texture. The camera provides rich visual embeddings required to identify specific equipment labels, fire extinguishers, and hazard signs.',
      specs: [
        'Resolution: 1920x1080 Global Shutter',
        'Low-distortion wide-angle M12 lens',
        'Hardware PPS hardware time-sync',
        'Direct MIPI / USB 3.0 interface'
      ]
    },
    {
      id: 'imu',
      name: 'Industrial 6-DoF Inertial Measurement Unit (IMU)',
      type: 'Primary Baseline Sensor',
      status: 'IN DEVELOPMENT' as const,
      color: 'border-amber-400 text-amber-300',
      range: '200 Hz Sampling',
      pointsPerSec: 'High-speed Gyro/Accel',
      fov: '3-axis Gyro + 3-axis Accel',
      purpose: 'High-frequency motion estimation and orientation pre-integration between LiDAR scan intervals to prevent distortion during rover jerk.',
      whyBaseline: 'LiDAR sweeps occur at 10 Hz; during rough terrain transit, high-frequency IMU integration ensures continuous, non-jittered pose tracking.',
      specs: [
        'Gyro bias stability: < 10°/hr',
        'Accelerometer range: ±16g',
        'Manifold pre-integration in GTSAM',
        'SPI interface directly into real-time driver'
      ]
    }
  ];

  const optionalSensors = [
    {
      id: 'thermal',
      name: 'FLIR Radiometric Thermal Infrared Camera',
      type: 'Optional Enhancement Module',
      status: 'PROPOSED' as const,
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      purpose: 'Detects thermal hotspots, overheated conveyor bearings, short-circuiting electrical conduits, and friction build-up inside mechanical mine winches.',
      advantage: 'Operates in complete total darkness and heavy smoke atmospheres.'
    },
    {
      id: 'mmwave',
      name: '77 GHz mmWave FMCW Radar (TI IWR6843)',
      type: 'Optional Enhancement Module',
      status: 'PROPOSED' as const,
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      purpose: 'Provides robust radar cross-section reflection in zero-visibility dust storms, rock-blasting plumes, and water fog where optical lasers attenuate.',
      advantage: 'Guarantees emergency collision stop when dust obscures LiDAR beams.'
    }
  ];

  const deploymentPlatforms = [
    {
      name: 'Wheeled All-Terrain UGV',
      role: 'Baseline MVP Configuration',
      icon: Truck,
      color: 'from-cyan-900/60 to-[#0A0D1F] border-cyan-400/50',
      status: 'IN DEVELOPMENT' as const,
      desc: '4WD high-torque differential drive chassis optimized for graded haulage drifts, gravel roads, and gentle incline adits.'
    },
    {
      name: 'Tracked Rubber-Crawler UGV',
      role: 'Rough Stope Configuration',
      icon: Bot,
      color: 'from-purple-900/60 to-[#0A0D1F] border-purple-400/50',
      status: 'PROPOSED' as const,
      desc: 'High-traction rubber treads capable of traversing broken muck piles, wet slurry mud, and sharp rock debris up to 35° incline.'
    },
    {
      name: 'Quadruped Legged Robot',
      role: 'Extreme Obstacle Configuration',
      icon: Footprints,
      color: 'from-amber-900/60 to-[#0A0D1F] border-amber-400/50',
      status: 'PROPOSED' as const,
      desc: 'Agile quadruped walker capable of stepping over large blasted boulders, stairwells, and collapsed pipe culverts.'
    },
    {
      name: 'Handheld / Backpack Rig',
      role: 'Human-Carried Configuration',
      icon: Briefcase,
      color: 'from-teal-900/60 to-[#0A0D1F] border-teal-400/50',
      status: 'PROPOSED' as const,
      desc: 'Ultra-lightweight sensor pack for rapid manual walk-through surveys in confined vertical shafts or ladder ways.'
    }
  ];

  const currentSensor = primarySensors.find(s => s.id === selectedSensor) || primarySensors[0];

  return (
    <section id="hardware" className="relative py-24 bg-gradient-to-b from-[#080B1A] via-[#0E122A] to-[#0A0D1F] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span>ROBOT & MULTIMODAL SENSING SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            The Autonomous Inspection Platform
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Engineered with a lean, reliable multimodal baseline: 3D LiDAR, RGB vision, and high-rate IMU, accompanied by optional thermal and radar modules via a standardized ROS 2 hardware-agnostic adapter.
          </p>
        </div>

        {/* Primary Sensor Selector Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {primarySensors.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSensor(s.id)}
              className={`px-5 py-3 rounded-2xl border text-xs font-mono font-bold transition-all flex items-center gap-2.5 ${
                selectedSensor === s.id
                  ? 'bg-gradient-to-r from-cyan-500 via-electric to-purple-600 text-white border-white shadow-xl shadow-cyan-500/30 scale-105'
                  : 'bg-[#10142D] text-slate-300 border-slate-800 hover:border-purple-400'
              }`}
            >
              <span>{s.name.split('(')[0].trim()}</span>
              <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-cyan-300 border border-white/20">
                {s.status}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Sensor Deep-Dive Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-purple-400/40 shadow-2xl mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-purple-500/20 pb-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                {currentSensor.type}
              </span>
              <h3 className="text-2xl font-bold font-display text-white mt-1">
                {currentSensor.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-3.5 py-1 rounded-xl bg-[#090D1F] border border-cyan-400/40 text-cyan-300 font-bold">
                Rate: {currentSensor.pointsPerSec}
              </span>
              <span className="px-3.5 py-1 rounded-xl bg-[#090D1F] border border-amber-400/40 text-amber-300 font-bold">
                FOV: {currentSensor.fov}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Functional Purpose:
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#090D1F] p-4 rounded-2xl border border-slate-800">
                  {currentSensor.purpose}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                  Why Essential in Baseline Architecture:
                </h4>
                <p className="text-sm text-cyan-100/90 leading-relaxed bg-gradient-to-br from-cyan-950/60 to-[#0A1828] p-4 rounded-2xl border border-cyan-500/30">
                  {currentSensor.whyBaseline}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                Engineering Specifications & Interfaces:
              </h4>
              <div className="space-y-2.5">
                {currentSensor.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#090D1F] border border-slate-800 text-xs text-slate-200 font-mono shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Optional Modular Upgrades Row */}
        <div className="mb-14">
          <h3 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-purple-400" />
            <span>Optional Environmental Expansion Modules (Plug-and-Play)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optionalSensors.map((sensor) => (
              <div
                key={sensor.id}
                className="p-6 rounded-3xl bg-gradient-to-br from-[#12102E] via-[#0E142B] to-[#0A0D1F] border border-purple-500/40 hover:border-purple-400 transition-all shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-white">{sensor.name}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${sensor.badgeColor}`}>
                    {sensor.status}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {sensor.purpose}
                </p>
                <div className="text-[11px] font-mono text-purple-200 bg-purple-950/60 p-3 rounded-xl border border-purple-500/30">
                  <span className="text-purple-400 font-bold">Specialized Capability: </span>
                  {sensor.advantage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hardware-Agnostic Deployment Matrix */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Hardware-Agnostic Deployment Compatibility
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Standardized ROS 2 robot adapter topics (/cmd_vel, /odom, /scan, /image_raw)
              </p>
            </div>
            <span className="text-xs px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-electric text-navy-950 font-bold font-mono shadow-md">
              ROS 2 Humble Standard
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deploymentPlatforms.map((plat, idx) => {
              const Icon = plat.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl bg-gradient-to-b ${plat.color} border hover:scale-[1.02] transition-all flex flex-col justify-between shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-black/40 text-cyan-300 border border-white/10 shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        plat.status === 'IN DEVELOPMENT'
                          ? 'bg-amber-500/20 border border-amber-400/50 text-amber-300'
                          : 'bg-purple-500/20 border border-purple-400/50 text-purple-300'
                      }`}>
                        {plat.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{plat.name}</h4>
                    <span className="text-xs font-mono text-cyan-300 block mb-2 font-semibold">{plat.role}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{plat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
