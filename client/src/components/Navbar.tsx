import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Menu, X, ChevronRight, Eye, Shield, Radio, Terminal, Award, Sparkles
} from 'lucide-react';
import { ExperienceMode } from '../types';
import { soundManager } from '../utils/audioEffects';

interface NavbarProps {
  activeSection: string;
  experienceMode: ExperienceMode;
  onExperienceModeChange: (mode: ExperienceMode) => void;
  onStartJuryTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  experienceMode,
  onExperienceModeChange,
  onStartJuryTour,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'technology', label: 'Perception' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'exploration', label: 'Exploration' },
    { id: 'digital-twin', label: 'Digital Twin' },
    { id: 'differentiation', label: 'Why Us' },
    { id: 'research', label: 'Research' },
    { id: 'validation', label: 'Validation' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'cost', label: 'Cost' },
    { id: 'applications', label: 'Applications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080B1A]/92 backdrop-blur-lg border-b border-purple-500/25 shadow-2xl py-2.5'
            : 'bg-gradient-to-b from-[#080B1A]/95 via-[#0A0D1F]/70 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity with vibrant gradient */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-amber-400 p-[2px] shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-all">
                <div className="w-full h-full bg-[#080B1A] rounded-[14px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-xl">
                    X
                  </span>
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-lg text-white tracking-wide">
                    MineTwin<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">-X</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-purple-400/40 hidden sm:inline-block font-bold">
                    L&T TECHgium
                  </span>
                </div>
                <span className="text-[9px] font-mono text-purple-300/80 tracking-wider">
                  4D DIGITAL TWIN & ROBOTICS
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-1">
              {navLinks.slice(0, 10).map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => soundManager.playClick()}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeSection === link.id
                      ? 'text-cyan-300 bg-gradient-to-r from-cyan-950/80 to-purple-950/80 font-bold border border-cyan-400/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Experience Modes & Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Experience Mode Toggle */}
              <div className="flex items-center bg-[#0D122B] border border-purple-500/30 rounded-xl p-1 text-xs shadow-inner">
                <button
                  onClick={() => { soundManager.playClick(); onExperienceModeChange('explore'); }}
                  className={`px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold ${
                    experienceMode === 'explore'
                      ? 'bg-gradient-to-r from-electric to-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Full Comprehensive Project Journey"
                >
                  Explore
                </button>
                <button
                  onClick={() => { soundManager.playClick(); onExperienceModeChange('digital-twin'); }}
                  className={`px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold ${
                    experienceMode === 'digital-twin'
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-navy-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Direct 3D Digital Twin Viewer"
                >
                  3D Twin
                </button>
                <button
                  onClick={() => { soundManager.playClick(); onExperienceModeChange('deep-dive'); }}
                  className={`px-3 py-1.5 rounded-lg transition-all text-[11px] font-bold ${
                    experienceMode === 'deep-dive'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Engineering Deep Dive Architecture"
                >
                  Deep Dive
                </button>
              </div>

              {/* Jury Experience Mode CTA */}
              <button
                onClick={() => { soundManager.playClick(); onStartJuryTour(); }}
                className="relative group px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 text-navy-950 text-xs font-extrabold font-mono tracking-wide shadow-xl shadow-purple-500/30 hover:shadow-cyan-400/50 transition-all hover:scale-105 flex items-center gap-1.5 border border-white/40"
              >
                <Award className="w-4 h-4 text-navy-950 animate-pulse" />
                <span>START JURY TOUR</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => { soundManager.playClick(); onStartJuryTour(); }}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 text-navy-950 text-[11px] font-mono font-extrabold shadow"
              >
                Jury Tour
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#141A38] text-slate-300 hover:text-white border border-slate-700"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-[#080B1A]/98 border-b border-purple-500/25 px-4 py-4 space-y-3"
            >
              <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-800">
                <button
                  onClick={() => { onExperienceModeChange('explore'); setMobileMenuOpen(false); }}
                  className={`py-2 text-xs text-center rounded-xl font-bold ${
                    experienceMode === 'explore' ? 'bg-electric text-white' : 'bg-[#141A38] text-slate-300'
                  }`}
                >
                  Explore
                </button>
                <button
                  onClick={() => { onExperienceModeChange('digital-twin'); setMobileMenuOpen(false); }}
                  className={`py-2 text-xs text-center rounded-xl font-bold ${
                    experienceMode === 'digital-twin' ? 'bg-cyan-400 text-navy-950' : 'bg-[#141A38] text-slate-300'
                  }`}
                >
                  3D Twin
                </button>
                <button
                  onClick={() => { onExperienceModeChange('deep-dive'); setMobileMenuOpen(false); }}
                  className={`py-2 text-xs text-center rounded-xl font-bold ${
                    experienceMode === 'deep-dive' ? 'bg-purple-600 text-white' : 'bg-[#141A38] text-slate-300'
                  }`}
                >
                  Deep Dive
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2 rounded-xl bg-[#0D122B] text-slate-200 hover:text-cyan-300 hover:bg-[#151D42] flex items-center justify-between border border-slate-800"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Section Progress Indicator (on desktop right margin) */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-2 p-2 rounded-full bg-[#080B1A]/85 backdrop-blur-md border border-purple-500/30 shadow-xl">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            title={link.label}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeSection === link.id
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 scale-150 shadow-md shadow-cyan-400/50'
                : 'bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </>
  );
};
