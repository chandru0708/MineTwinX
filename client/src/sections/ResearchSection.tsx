import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, ExternalLink, CheckCircle2, AlertCircle, ArrowUpRight,
  ShieldCheck, FileText, Bookmark
} from 'lucide-react';
import { RESEARCH_FOUNDATIONS } from '../data/projectData';

export const ResearchSection: React.FC = () => {
  return (
    <section id="research" className="relative py-24 bg-navy-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC & LITERATURE FOUNDATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Research Foundations Behind MineTwin-X
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Every software module in MineTwin-X builds upon peer-reviewed robotics and computer vision literature. Below is our verified citation library detailing authors, venues, verified DOIs, and the research gaps addressed.
          </p>
        </div>

        {/* Research Papers Grid (6 Verified Papers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {RESEARCH_FOUNDATIONS.map((paper) => (
            <div
              key={paper.id}
              className="p-6 rounded-2xl bg-navy-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
                  <span className="font-bold">{paper.venue.split('(')[0].trim()}</span>
                  <span className="px-2 py-0.5 rounded bg-navy-900 border border-slate-700 text-slate-300">
                    {paper.year}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {paper.title}
                </h4>

                <p className="text-xs font-mono text-slate-400 mb-3 line-clamp-2">
                  <span className="text-slate-500">Authors:</span> {paper.authors}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="p-3 rounded-lg bg-navy-900/90 border border-slate-800 text-xs">
                    <span className="text-cyan-300 font-mono font-bold block mb-1">
                      Direct Relevance to MineTwin-X:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {paper.relevance}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-xs">
                    <span className="text-purple-300 font-mono font-bold block mb-1">
                      Specific Research Gap Addressed:
                    </span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      {paper.researchGapAddressed}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified DOI Link */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Peer-Reviewed Verified</span>
                </span>
                <a
                  href={paper.doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Official Paper</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Synthesis & Future Academic Scope */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-850 to-navy-950 border border-cyan-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-3xl">
              <h4 className="text-lg font-bold font-display text-white mb-1">
                How MineTwin-X Synthesizes These Academic Breakthroughs
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than treating SLAM, semantic segmentation, active exploration, and point-cloud change detection as disjointed offline research problems, MineTwin-X orchestrates them into a unified runtime ROS 2 pipeline running on an embedded Jetson Orin edge computer.
              </p>
            </div>
            <a
              href="https://github.com/minetwin-x/minetwin-x-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-electric hover:bg-electric/90 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              <Bookmark className="w-4 h-4" />
              <span>Full Bibliography (BibTeX)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

