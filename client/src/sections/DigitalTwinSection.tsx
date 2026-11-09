import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers, Eye, ShieldCheck, Activity, AlertTriangle, CheckCircle2,
  PieChart as PieIcon, BarChart2, Calendar, Database, Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Asset, RobotTelemetry, Mission, AnalyticsData } from '../types';
import { DigitalTwinViewer } from '../digital-twin/DigitalTwinViewer';

interface DigitalTwinSectionProps {
  assets: Asset[];
  telemetry: RobotTelemetry;
  missions: Mission[];
  analytics: AnalyticsData;
}

export const DigitalTwinSection: React.FC<DigitalTwinSectionProps> = ({
  assets,
  telemetry,
  missions,
  analytics,
}) => {
  return (
    <section id="digital-twin" className="relative py-24 bg-gradient-to-b from-[#080B1A] via-[#101432] to-[#0A0D1F] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>INTERACTIVE THREE.JS EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            The Living{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              4D Digital Twin
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Explore the underground mining stope in full 3D. Click on structural pillars, pipes, and equipment to inspect their condition, compare registered scans across multi-month missions, and isolate sub-centimeter geometric deformations.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs font-mono shadow-md">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>DEMO NOTICE: All sensor telemetry and point-cloud metrics are simulated for evaluation demonstration.</span>
          </div>
        </div>

        {/* The 3D Digital Twin Viewer Canvas Component */}
        <div className="mb-14">
          <DigitalTwinViewer
            assets={assets}
            telemetry={telemetry}
            missions={missions}
          />
        </div>

        {/* Digital Twin Analytics Dashboard (Recharts Visualizations) */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Digital Twin Analytics & Asset Inventory
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Multi-Mission Relational Geometry & Condition Metrics
              </p>
            </div>
            <span className="text-xs px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-electric text-navy-950 font-bold font-mono shadow-md">
              Live Database Stream
            </span>
          </div>

          {/* 4 Summary Stat Cards with Colorful Gradients */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-3xl bg-gradient-to-b from-[#141A38] to-[#0A0D1F] border border-cyan-500/40 text-center shadow-xl">
              <span className="text-xs font-mono text-cyan-300 font-bold block mb-1">TOTAL MAPPED ASSETS</span>
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                {analytics.summary.totalMappedAssets}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono block mt-1 font-semibold">Across 6 Semantic Classes</span>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-b from-[#141A38] to-[#0A0D1F] border border-teal-500/40 text-center shadow-xl">
              <span className="text-xs font-mono text-teal-300 font-bold block mb-1">INSPECTED AREA</span>
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-teal-300">
                {analytics.summary.inspectedAreaM2} m²
              </span>
              <span className="text-[10px] text-emerald-400 font-mono block mt-1 font-semibold">
                {analytics.summary.mapCoveragePercent}% Spatial Coverage
              </span>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-b from-[#1A0E22] to-[#0A0D1F] border border-red-500/40 text-center shadow-xl">
              <span className="text-xs font-mono text-red-300 font-bold block mb-1">ANOMALY EVENTS</span>
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-red-400">
                {analytics.summary.potentialChangeEvents}
              </span>
              <span className="text-[10px] text-red-300 font-mono block mt-1 font-semibold">Requiring Geotech Review</span>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-b from-[#1A1438] to-[#0A0D1F] border border-purple-500/40 text-center shadow-xl">
              <span className="text-xs font-mono text-purple-300 font-bold block mb-1">AVG AI CONFIDENCE</span>
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-purple-300">
                {analytics.summary.avgConfidencePercent}%
              </span>
              <span className="text-[10px] text-slate-300 font-mono block mt-1 font-semibold">Bayesian Multi-View</span>
            </div>
          </div>

          {/* Charts Row: Class Breakdown & Historical Scan Evolution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Semantic Asset Class Distribution */}
            <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl">
              <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-cyan-400" />
                <span>Asset Class Distribution</span>
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.classDistribution} layout="vertical">
                    <XAxis type="number" stroke="#94A3B8" fontSize={11} />
                    <YAxis dataKey="name" type="category" stroke="#CBD5E1" fontSize={10} width={130} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B0F24', borderColor: '#7957FF', borderRadius: 12, fontSize: 12 }}
                    />
                    <Bar dataKey="count" fill="#1677FF" radius={[0, 6, 6, 0]}>
                      {analytics.classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: 4D Multi-Mission Area & Asset Growth */}
            <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl">
              <h4 className="text-sm font-bold font-mono text-purple-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-purple-400" />
                <span>4D Inspection Mission Timeline (Oct - Nov 2026)</span>
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.historyTimeline}>
                    <XAxis dataKey="mission" stroke="#94A3B8" fontSize={11} />
                    <YAxis stroke="#94A3B8" fontSize={11} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0B0F24', borderColor: '#00D9FF', borderRadius: 12, fontSize: 12 }}
                    />
                    <Area type="monotone" dataKey="assets" stroke="#00D9FF" fill="#00D9FF" fillOpacity={0.25} name="Mapped Assets" />
                    <Area type="monotone" dataKey="coverage" stroke="#A855F7" fill="#A855F7" fillOpacity={0.25} name="Map Coverage %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
