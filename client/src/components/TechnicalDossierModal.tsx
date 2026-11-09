import React from 'react';
import { motion } from 'framer-motion';
import {
  Printer, Download, X, Award, CheckCircle2, ShieldCheck, Cpu,
  Compass, Layers, IndianRupee, BookOpen, ExternalLink, Calendar
} from 'lucide-react';
import {
  PROJECT_METADATA, PROBLEM_CHALLENGES, FOUR_STAGES,
  RESEARCH_FOUNDATIONS, VALIDATION_METRICS, INITIAL_COST_BREAKDOWN,
  TEAM_INFO
} from '../data/projectData';

interface TechnicalDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalDossierModal: React.FC<TechnicalDossierModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl glass-panel-glow rounded-3xl overflow-hidden border border-purple-400/50 shadow-2xl flex flex-col max-h-[90vh] bg-[#0A0D1E]"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0F142D] border-b border-purple-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 text-navy-950 font-bold shadow">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-300 font-bold">
                L&T TECHGIUM 10TH EDITION • PRESENTATION ROUND
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                MineTwin-X Engineering Technical Dossier
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-electric text-navy-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Technical Content */}
        <div className="p-8 overflow-y-auto space-y-8 font-sans text-xs text-slate-300 leading-relaxed print:text-black print:bg-white">
          {/* Executive Overview */}
          <div className="border-b border-slate-800 pb-6">
            <h2 className="text-2xl font-bold font-display text-white mb-2">
              MineTwin-X: Technical Executive Summary
            </h2>
            <p className="text-sm text-cyan-200 font-mono mb-3">
              {PROJECT_METADATA.fullTitle}
            </p>
            <p className="text-slate-300">
              {PROJECT_METADATA.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 font-mono text-[11px]">
              <div className="p-2.5 rounded-xl bg-[#141A38] border border-slate-800">
                <span className="text-slate-400 block text-[9px]">COMPETITION ID</span>
                <span className="text-white font-bold">{TEAM_INFO.competitionId}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141A38] border border-slate-800">
                <span className="text-slate-400 block text-[9px]">DOMAIN</span>
                <span className="text-cyan-300 font-bold">{PROJECT_METADATA.domain}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141A38] border border-slate-800">
                <span className="text-slate-400 block text-[9px]">ROUND</span>
                <span className="text-purple-300 font-bold">{PROJECT_METADATA.round}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#141A38] border border-slate-800">
                <span className="text-slate-400 block text-[9px]">ESTIMATED MVP COST</span>
                <span className="text-amber-300 font-bold">~₹37,000 INR</span>
              </div>
            </div>
          </div>

          {/* 4 Connected Stages */}
          <div className="border-b border-slate-800 pb-6">
            <h4 className="text-sm font-bold font-mono text-cyan-300 uppercase tracking-wider mb-3">
              1. The 4-Stage Architecture Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FOUR_STAGES.map((s) => (
                <div key={s.stage} className="p-3.5 rounded-xl bg-[#090D1F] border border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs font-bold text-cyan-400">{s.stage}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-black/40 border border-slate-700 text-slate-300 font-mono">
                      {s.status}
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-xs mb-1">{s.name}</h5>
                  <p className="text-[11px] text-slate-400">{s.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hardware & Sensing Suite */}
          <div className="border-b border-slate-800 pb-6">
            <h4 className="text-sm font-bold font-mono text-purple-300 uppercase tracking-wider mb-3">
              2. Multimodal Hardware & Sensor Configuration
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#090D1F] border border-slate-800 flex justify-between">
                <div>
                  <strong className="text-white">Primary 360° 3D LiDAR (Livox Mid-360 / Velodyne Puck):</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">40m range, 200,000+ pts/sec, non-repetitive scanning for dense subterranean geometry.</p>
                </div>
                <span className="font-mono text-cyan-300 font-bold text-xs shrink-0 ml-4">10 Hz Scan</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090D1F] border border-slate-800 flex justify-between">
                <div>
                  <strong className="text-white">Wide-FOV Industrial RGB Camera (Global Shutter):</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">1080p @ 30 FPS, hardware PPS triggered sync, zero-shot open-vocabulary vision embeddings.</p>
                </div>
                <span className="font-mono text-purple-300 font-bold text-xs shrink-0 ml-4">120° FOV</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090D1F] border border-slate-800 flex justify-between">
                <div>
                  <strong className="text-white">Industrial 6-DoF Inertial Measurement Unit (IMU):</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">Continuous manifold pre-integration in GTSAM factor graphs, gyro drift &lt;10°/hr.</p>
                </div>
                <span className="font-mono text-amber-300 font-bold text-xs shrink-0 ml-4">200 Hz Rate</span>
              </div>
              <div className="p-3 rounded-xl bg-[#090D1F] border border-purple-500/30 flex justify-between">
                <div>
                  <strong className="text-purple-200">Optional Modules (FLIR Boson Thermal & TI 77GHz mmWave Radar):</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">Thermal bearing hotspot detection and zero-visibility dust particulate penetration.</p>
                </div>
                <span className="font-mono text-purple-400 text-xs shrink-0 ml-4">Modular</span>
              </div>
            </div>
          </div>

          {/* Academic Verification Citations */}
          <div className="border-b border-slate-800 pb-6">
            <h4 className="text-sm font-bold font-mono text-teal-300 uppercase tracking-wider mb-3">
              3. Verified Peer-Reviewed Literature Foundations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              {RESEARCH_FOUNDATIONS.map((r) => (
                <div key={r.id} className="p-2.5 rounded-xl bg-[#090D1F] border border-slate-800">
                  <span className="text-cyan-300 font-bold block">{r.id.toUpperCase()}</span>
                  <span className="text-white block line-clamp-1">{r.title}</span>
                  <span className="text-slate-400 text-[10px] block mt-0.5">{r.venue} ({r.year})</span>
                  <a href={r.doiUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline text-[10px] block mt-1">
                    DOI: {r.doiUrl.replace('https://doi.org/', '')}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Lean MVP Budget Table */}
          <div>
            <h4 className="text-sm font-bold font-mono text-amber-300 uppercase tracking-wider mb-3">
              4. Lean Budget Assumption Breakdown (~₹37,000 INR)
            </h4>
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-800 font-mono text-[10px] text-slate-400">
                  <th className="py-2">Item Category</th>
                  <th className="py-2">Component Name</th>
                  <th className="py-2 text-right">Est. Outlay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {INITIAL_COST_BREAKDOWN.slice(0, 8).map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 text-slate-400">{c.category.split(' ')[0]}</td>
                    <td className="py-2 text-white font-sans">{c.item}</td>
                    <td className="py-2 text-right text-cyan-300 font-bold">
                      {c.estimatedCostInr === 0 ? '₹0 (Lab Asset)' : `₹${c.estimatedCostInr.toLocaleString('en-IN')}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0F142D] border-t border-purple-500/20 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>MineTwin-X Engineering Team • L&T TECHgium 10th Edition</span>
          <span className="text-cyan-400 font-bold">Confidential Evaluator Dossier</span>
        </div>
      </motion.div>
    </div>
  );
};
