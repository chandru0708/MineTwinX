import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Award } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { JuryTourModal } from './guided-tour/JuryTourModal';
import { TechnicalDossierModal } from './components/TechnicalDossierModal';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProblemSection } from './sections/ProblemSection';
import { SolutionSection } from './sections/SolutionSection';
import { HardwareSection } from './sections/HardwareSection';
import { TechnologySection } from './sections/TechnologySection';
import { ArchitectureSection } from './sections/ArchitectureSection';
import { ExplorationSection } from './sections/ExplorationSection';
import { DigitalTwinSection } from './sections/DigitalTwinSection';
import { PersistentAssetSection } from './sections/PersistentAssetSection';
import { DifferentiationSection } from './sections/DifferentiationSection';
import { ResearchSection } from './sections/ResearchSection';
import { ValidationSection } from './sections/ValidationSection';
import { RoadmapSection } from './sections/RoadmapSection';
import { CostSection } from './sections/CostSection';
import { ApplicationsSection } from './sections/ApplicationsSection';
import { FutureScopeSection } from './sections/FutureScopeSection';
import { ContactSection } from './sections/ContactSection';
import {
  fetchAssets, fetchRobotTelemetry, fetchMissions, fetchAnalytics,
  fallbackAssets, fallbackTelemetry, fallbackMissions, fallbackAnalytics
} from './services/api';
import { Asset, RobotTelemetry, Mission, AnalyticsData, ExperienceMode } from './types';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('explore');
  const [isJuryTourOpen, setIsJuryTourOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const [assets, setAssets] = useState<Asset[]>(fallbackAssets);
  const [telemetry, setTelemetry] = useState<RobotTelemetry>(fallbackTelemetry);
  const [missions, setMissions] = useState<Mission[]>(fallbackMissions);
  const [analytics, setAnalytics] = useState<AnalyticsData>(fallbackAnalytics);

  // Load API data on mount
  useEffect(() => {
    const loadInitialData = async () => {
      const [fetchedAssets, fetchedTele, fetchedMissions, fetchedAnalytics] = await Promise.all([
        fetchAssets(),
        fetchRobotTelemetry(),
        fetchMissions(),
        fetchAnalytics(),
      ]);
      if (fetchedAssets?.length) setAssets(fetchedAssets);
      if (fetchedTele) setTelemetry(fetchedTele);
      if (fetchedMissions?.length) setMissions(fetchedMissions);
      if (fetchedAnalytics) setAnalytics(fetchedAnalytics);
    };

    loadInitialData();

    // Setup Socket.IO for live simulated robot telemetry
    try {
      const socket = io('/', { transports: ['websocket', 'polling'] });
      socket.on('robot:telemetry', (data: RobotTelemetry) => {
        setTelemetry(data);
      });
      return () => {
        socket.disconnect();
      };
    } catch (e) {
      console.warn('Socket connection skipped in standalone demo mode');
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'hero', 'about', 'problem', 'solution', 'hardware', 'technology',
      'architecture', 'exploration', 'digital-twin', 'persistent-asset',
      'differentiation', 'research', 'validation', 'roadmap', 'cost',
      'applications', 'future-scope', 'contact'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle jump to section from tour or buttons
  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-aurora-mesh text-slate-100 flex flex-col font-sans relative selection:bg-cyan-400 selection:text-navy-950">
      {/* Dynamic Background Aurora Glow Spheres */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/15 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="fixed top-2/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      <div className="fixed bottom-10 left-1/3 w-80 h-80 rounded-full bg-teal-500/12 blur-[100px] pointer-events-none -z-10"></div>
      <div className="fixed top-10 right-10 w-80 h-80 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none -z-10"></div>

      {/* Sticky Top Navigation */}
      <Navbar
        activeSection={activeSection}
        experienceMode={experienceMode}
        onExperienceModeChange={(mode) => {
          setExperienceMode(mode);
          if (mode === 'digital-twin') handleJumpToSection('digital-twin');
          if (mode === 'deep-dive') handleJumpToSection('architecture');
        }}
        onStartJuryTour={() => setIsJuryTourOpen(true)}
      />

      {/* Guided Jury Tour Modal */}
      <JuryTourModal
        isOpen={isJuryTourOpen}
        onClose={() => setIsJuryTourOpen(false)}
        onJumpToSection={handleJumpToSection}
      />

      {/* Printable Technical Dossier Spec Sheet Modal */}
      <TechnicalDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 1. Full Hero Section */}
        <HeroSection
          onStartJuryTour={() => setIsJuryTourOpen(true)}
          onExploreClick={() => handleJumpToSection('problem')}
          onTwinClick={() => handleJumpToSection('digital-twin')}
          telemetry={telemetry}
        />

        {/* 2. About Section */}
        <AboutSection />

        {/* 3. Problem Statement Section */}
        <ProblemSection />

        {/* 4. Proposed Solution (4-Stage Pipeline) */}
        <SolutionSection />

        {/* 5. Robot & Hardware Section */}
        <HardwareSection />

        {/* 6. Technology & Sensor Fusion Section */}
        <TechnologySection />

        {/* 7. System Architecture (Interactive Flowchart) */}
        <ArchitectureSection />

        {/* 8. Autonomous Exploration (Simulator) */}
        <ExplorationSection />

        {/* 9. Interactive 4D Digital Twin (Main Attraction) */}
        <DigitalTwinSection
          assets={assets}
          telemetry={telemetry}
          missions={missions}
          analytics={analytics}
        />

        {/* 10. Persistent Asset Identity & 4D Evolution */}
        <PersistentAssetSection />

        {/* 11. Engineering Differentiation & Comparison Table */}
        <DifferentiationSection />

        {/* 12. Research & Verified Citation Foundations */}
        <ResearchSection />

        {/* 13. Engineering Validation, Testing & Analysis */}
        <ValidationSection />

        {/* 14. Implementation Roadmap (5 Phases) */}
        <RoadmapSection />

        {/* 15. Cost Estimation (Practical Lean MVP ~ ₹37,000) */}
        <CostSection />

        {/* 16. Cross-Industry Applications */}
        <ApplicationsSection />

        {/* 17. Future Scope & Horizon Roadmap */}
        <FutureScopeSection />

        {/* 18. Contact, L&T TECHgium Credentials & Footer */}
        <ContactSection />
      </main>

      {/* Floating Bottom-Right Quick Action Button: Technical Dossier */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsDossierOpen(true)}
          className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-mono text-xs font-bold shadow-2xl shadow-purple-600/40 hover:scale-105 transition-all flex items-center gap-2 border border-white/30 backdrop-blur-md"
        >
          <Award className="w-4 h-4 text-yellow-300" />
          <span>TECHNICAL DOSSIER</span>
        </button>
      </div>
    </div>
  );
};
export default App;
