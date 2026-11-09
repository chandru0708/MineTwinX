import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award, Mail, Github, Youtube, Edit3, Check, MapPin, Building,
  ArrowRight, ShieldCheck, Heart, Terminal, Sparkles
} from 'lucide-react';
import { TEAM_INFO } from '../data/projectData';
import { soundManager } from '../utils/audioEffects';

export const ContactSection: React.FC = () => {
  const [teamData, setTeamData] = useState(TEAM_INFO);
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field: keyof typeof TEAM_INFO, value: string) => {
    setTeamData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveToggle = () => {
    soundManager.playClick();
    setIsEditing(!isEditing);
  };

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-[#080B1A] via-[#101332] to-[#060814] border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-400/40 text-purple-300 font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-purple-500/10">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>L&T TECHGIUM 10TH EDITION SUBMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            Turning Industrial Spaces into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
              Intelligent Digital Twins
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Submitted for the L&T TECHgium 10th Edition Technical Presentation Round (Round 2) under the Robotics & Autonomous Systems domain.
          </p>
        </div>

        {/* Project Credentials Card with Edit Mode */}
        <div className="max-w-4xl mx-auto glass-panel-glow rounded-3xl p-6 sm:p-10 border border-purple-400/40 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-600/15 blur-[90px] pointer-events-none"></div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-6 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400 p-[2px] shadow-xl shadow-purple-500/30">
                <div className="w-full h-full bg-[#080B1A] rounded-[14px] flex items-center justify-center font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  X
                </div>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                  MineTwin-X Engineering Team
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-semibold">
                  Competition ID: {teamData.competitionId}
                </span>
              </div>
            </div>

            <button
              onClick={handleSaveToggle}
              className="px-4 py-2 rounded-xl bg-[#141A38] hover:bg-[#1D254C] text-xs font-mono font-bold text-cyan-300 border border-purple-400/40 flex items-center gap-1.5 transition-all shadow-md"
            >
              {isEditing ? <Check className="w-4 h-4 text-emerald-400" /> : <Edit3 className="w-4 h-4 text-cyan-400" />}
              <span>{isEditing ? 'Save Details' : 'Edit Credentials'}</span>
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">PROJECT TITLE</span>
              <p className="text-sm font-sans font-bold text-white leading-snug">
                An Autonomous Multimodal 4D Digital Twin and Intelligent Inspection Robot for GPS-Denied Environments
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">COMPETITION & ROUND</span>
              <p className="text-sm font-sans font-bold text-cyan-300">
                {teamData.presentationRound}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">TEAM LEAD / APPLICANT</span>
              {isEditing ? (
                <input
                  type="text"
                  value={teamData.teamLead}
                  onChange={(e) => handleFieldChange('teamLead', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D1F] border border-cyan-400 text-white font-sans text-xs"
                />
              ) : (
                <p className="text-sm font-sans text-slate-200">{teamData.teamLead}</p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">INSTITUTION / DEPARTMENT</span>
              {isEditing ? (
                <input
                  type="text"
                  value={teamData.institution}
                  onChange={(e) => handleFieldChange('institution', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D1F] border border-cyan-400 text-white font-sans text-xs"
                />
              ) : (
                <p className="text-sm font-sans text-slate-200">{teamData.institution}</p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">CONTACT EMAIL</span>
              {isEditing ? (
                <input
                  type="email"
                  value={teamData.contactEmail}
                  onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D1F] border border-cyan-400 text-white font-sans text-xs"
                />
              ) : (
                <a href={`mailto:${teamData.contactEmail}`} className="text-sm text-cyan-400 hover:underline flex items-center gap-1.5 font-mono">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{teamData.contactEmail}</span>
                </a>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 uppercase text-[10px] font-bold">OPEN-SOURCE CODEBASE</span>
              <a
                href={teamData.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-300 hover:underline flex items-center gap-1.5 font-mono"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/minetwin-x/platform</span>
              </a>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <footer className="pt-12 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-white text-sm">MineTwin-X</span>
            <span>•</span>
            <span className="text-cyan-400">L&T TECHgium 10th Edition</span>
            <span>•</span>
            <span className="text-purple-300">Robotics & Autonomous Systems</span>
          </div>

          <div className="text-slate-400 text-[11px] text-center sm:text-right">
            <span>Engineering Architecture & 4D Digital Twin Prototype</span>
          </div>
        </footer>
      </div>
    </section>
  );
};
