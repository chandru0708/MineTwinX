import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, X, ChevronRight, ChevronLeft, CheckCircle2, ArrowRight,
  Sparkles, Compass, Shield, Cpu, Layers, Activity, HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { JURY_TOUR_STEPS } from '../data/projectData';

interface JuryTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const JuryTourModal: React.FC<JuryTourModalProps> = ({
  isOpen,
  onClose,
  onJumpToSection,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = JURY_TOUR_STEPS[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / JURY_TOUR_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < JURY_TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      // Auto-scroll background page to the relevant section
      onJumpToSection(JURY_TOUR_STEPS[currentStepIndex + 1].targetSection);
    } else {
      // Completed final step!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      onJumpToSection(JURY_TOUR_STEPS[currentStepIndex - 1].targetSection);
    }
  };

  const handleStepJump = (idx: number) => {
    setCurrentStepIndex(idx);
    onJumpToSection(JURY_TOUR_STEPS[idx].targetSection);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl glass-panel-glow rounded-2xl overflow-hidden border border-cyan-400/50 shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Top Header & Progress */}
        <div className="px-6 py-4 bg-navy-900/90 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-400 to-electric text-navy-950 shadow-md">
              <Award className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300">
                  L&T TECHGIUM 10TH EDITION
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono">
                  ROUND 2 JURY TOUR
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Guided Evaluation Walkthrough (5-7 Min)
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Line */}
        <div className="w-full bg-navy-950 h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 via-electric to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Dots Selector */}
        <div className="px-6 py-2 bg-navy-950/60 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto">
          {JURY_TOUR_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => handleStepJump(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all whitespace-nowrap ${
                idx === currentStepIndex
                  ? 'bg-electric text-white font-bold shadow-md shadow-electric/30 scale-105'
                  : idx < currentStepIndex
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                  : 'bg-navy-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{String(s.step).padStart(2, '0')}</span>
              <span className="hidden sm:inline text-[11px] truncate max-w-[80px]">
                {s.title.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-400/50 text-cyan-300">
              {currentStep.highlightBadge}
            </span>
            <span className="text-xs font-mono text-slate-400">
              STEP {String(currentStep.step).padStart(2, '0')} OF {String(JURY_TOUR_STEPS.length).padStart(2, '0')}
            </span>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-display">
              {currentStep.title}
            </h2>
            <p className="text-sm font-medium text-cyan-400 font-mono mt-0.5">
              {currentStep.subtitle}
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-navy-900/60 p-3.5 rounded-xl border border-slate-800">
            {currentStep.summary}
          </p>

          {/* Key Takeaways Cards */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Key Engineering Points for Evaluators:
            </h4>
            <div className="space-y-2">
              {currentStep.keyPoints.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-navy-950/70 border border-cyan-500/15 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-navy-900/90 border-t border-cyan-500/20 flex items-center justify-between">
          <button
            onClick={() => {
              onJumpToSection(currentStep.targetSection);
              onClose();
            }}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-100 flex items-center gap-1 underline underline-offset-4"
          >
            <span>Jump directly to on-page section</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-1 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-navy-800 text-slate-500'
                  : 'bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-cyan-500 via-electric to-purple-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] flex items-center gap-1.5 transition-all"
            >
              <span>{currentStepIndex === JURY_TOUR_STEPS.length - 1 ? 'Finish Tour 🎉' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

