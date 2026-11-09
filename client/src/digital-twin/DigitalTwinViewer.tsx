import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Search, Sliders, Eye, RefreshCw, AlertTriangle, CheckCircle,
  Battery, Cpu, Radio, Shield, ChevronRight, X, Compass, Activity, Info,
  Terminal, Download, Volume2, VolumeX, Camera, Sparkles
} from 'lucide-react';
import { Asset, DigitalTwinScanMode, RobotTelemetry, Mission } from '../types';
import { MiningTunnelScene } from './MiningTunnelScene';
import { Ros2TerminalModal } from '../components/Ros2TerminalModal';
import { soundManager } from '../utils/audioEffects';

interface DigitalTwinViewerProps {
  assets: Asset[];
  telemetry: RobotTelemetry;
  missions: Mission[];
}

export const DigitalTwinViewer: React.FC<DigitalTwinViewerProps> = ({
  assets,
  telemetry,
  missions,
}) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(assets[0] || null);
  const [scanMode, setScanMode] = useState<DigitalTwinScanMode>('current');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPointCloud, setShowPointCloud] = useState(true);
  const [showTunnelArches, setShowTunnelArches] = useState(true);
  const [selectedMissionId, setSelectedMissionId] = useState('mission-04');
  const [cameraKey, setCameraKey] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 8, 12]);

  // Sync selected mission with scanMode
  const handleMissionSelect = (missionId: string) => {
    soundManager.playClick();
    setSelectedMissionId(missionId);
    if (missionId === 'mission-01' || missionId === 'mission-02') {
      setScanMode('previous');
    } else if (missionId === 'mission-03') {
      setScanMode('current');
    } else {
      setScanMode('changes');
      soundManager.playAlert();
    }
  };

  // Filter assets by search query
  const searchResults = assets.filter(a => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return a.id.toLowerCase().includes(q) ||
           a.name.toLowerCase().includes(q) ||
           a.classType.toLowerCase().includes(q);
  });

  const handleAssetClick = (asset: Asset) => {
    soundManager.playClick();
    if (asset.hasGeometricChange) {
      soundManager.playAlert();
    }
    setSelectedAsset(asset);
  };

  const handleScanModeChange = (mode: DigitalTwinScanMode) => {
    soundManager.playClick();
    if (mode === 'changes') {
      soundManager.playAlert();
    }
    setScanMode(mode);
  };

  const handleCameraPreset = (preset: 'overview' | 'walkway' | 'topdown' | 'pillar') => {
    soundManager.playClick();
    if (preset === 'overview') setCameraPosition([0, 8, 12]);
    if (preset === 'walkway') setCameraPosition([0, 1.8, -4]);
    if (preset === 'topdown') setCameraPosition([0, 22, -15]);
    if (preset === 'pillar') {
      setCameraPosition([-8, 3, -8]);
      const p27 = assets.find(a => a.id === 'P-027');
      if (p27) setSelectedAsset(p27);
    }
    setCameraKey(prev => prev + 1);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playClick();
  };

  const exportReport = () => {
    soundManager.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      reportTitle: "MineTwin-X Industrial Inspection Summary Report",
      competition: "L&T TECHgium 10th Edition",
      timestamp: new Date().toISOString(),
      activeMission: selectedMissionId,
      flaggedAnomalies: assets.filter(a => a.hasGeometricChange),
      totalAssetsAudited: assets.length,
      robotTelemetry: telemetry,
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `minetwin_x_inspection_${selectedMissionId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="relative w-full h-[750px] lg:h-[820px] rounded-3xl overflow-hidden border border-purple-500/30 bg-[#090C1A] shadow-2xl flex flex-col">
      {/* Top Colorful Interactive HUD Bar */}
      <div className="z-10 px-4 py-3 bg-[#0D1226]/90 backdrop-blur-md border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/40 text-xs font-mono text-cyan-300 font-bold shadow-lg shadow-purple-500/10">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>4D DIGITAL TWIN VIEWER</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-[11px] font-semibold hidden sm:inline-block">
            DEMO MODE (SYNTHESIZED STOPE)
          </span>
        </div>

        {/* Center: 3 Scan Modes */}
        <div className="flex items-center bg-[#141A36] p-1 rounded-xl border border-purple-500/30 text-xs font-medium">
          <button
            onClick={() => handleScanModeChange('previous')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              scanMode === 'previous'
                ? 'bg-gradient-to-r from-electric to-purple-600 text-white shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>1. Baseline Scan</span>
          </button>
          <button
            onClick={() => handleScanModeChange('current')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              scanMode === 'current'
                ? 'bg-gradient-to-r from-cyan-500 to-electric text-navy-950 shadow-md font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>2. Current Scan</span>
          </button>
          <button
            onClick={() => handleScanModeChange('changes')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              scanMode === 'changes'
                ? 'bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white shadow-lg font-bold animate-pulse'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
            <span>3. Detected Changes (Heatmap)</span>
          </button>
        </div>

        {/* Right: Quick Tools (Terminal, Export, Sound, Reset) */}
        <div className="flex items-center gap-2">
          {/* ROS 2 Terminal Button */}
          <button
            onClick={() => { soundManager.playClick(); setIsTerminalOpen(true); }}
            className="px-3 py-1.5 rounded-lg text-xs font-mono bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800 hover:to-indigo-800 border border-purple-400/50 text-purple-200 flex items-center gap-1.5 font-bold transition-all shadow-md"
            title="Open Live ROS 2 Node Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">ROS 2 Shell</span>
          </button>

          {/* Export Report */}
          <button
            onClick={exportReport}
            className="p-2 rounded-lg bg-[#141A36] hover:bg-[#1D254C] border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            title="Export Inspection Audit Report (JSON)"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-[#141A36] hover:bg-[#1D254C] border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            title={soundEnabled ? 'Mute Procedural Audio' : 'Unmute Procedural Audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={() => { setCameraPosition([0, 8, 12]); setCameraKey(prev => prev + 1); }}
            className="p-2 rounded-lg bg-[#141A36] hover:bg-[#1D254C] border border-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
            title="Reset 3D Camera"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-300" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative flex-1 w-full h-full">
        <Canvas
          key={cameraKey}
          camera={{ position: cameraPosition, fov: 50 }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <MiningTunnelScene
            assets={searchResults}
            selectedAsset={selectedAsset}
            scanMode={scanMode}
            onSelectAsset={handleAssetClick}
            telemetry={telemetry}
            showPointCloud={showPointCloud}
            showTunnelArches={showTunnelArches}
            activeFilter={activeFilter}
          />
        </Canvas>

        {/* Overlay 1: Spatial Query & Search Bar (Top Left) */}
        <div className="absolute top-4 left-4 z-10 w-72 md:w-84">
          <div className="glass-panel p-3 rounded-2xl border border-cyan-400/40 shadow-2xl">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-cyan-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search assets (e.g. P-027, pipe, drill rig)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 text-xs bg-[#090D1F] rounded-xl border border-slate-700 focus:border-cyan-400 text-slate-100 placeholder-slate-400 focus:outline-none font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Colorful Semantic Filter Pills */}
            <div className="flex flex-wrap gap-1 mt-2.5">
              {[
                { id: 'all', label: 'All', color: 'bg-cyan-500 text-navy-950 font-bold' },
                { id: 'pillar', label: 'Pillars', color: 'bg-red-500/20 text-red-300 border-red-500/40' },
                { id: 'equipment', label: 'Equipment', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
                { id: 'pipe', label: 'Pipes', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
                { id: 'fence', label: 'Fences', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
                { id: 'pathway', label: 'Pathways', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
                { id: 'human', label: 'Humans', color: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => { soundManager.playClick(); setActiveFilter(pill.id); }}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono border transition-all ${
                    activeFilter === pill.id
                      ? 'bg-gradient-to-r from-cyan-400 to-electric text-navy-950 font-bold border-white scale-105 shadow-md shadow-cyan-400/30'
                      : `${pill.color} hover:brightness-125`
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Camera Preset Quick View Buttons */}
            <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-300">
              <span className="flex items-center gap-1 text-cyan-400 font-bold">
                <Camera className="w-3.5 h-3.5" />
                <span>Views:</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCameraPreset('overview')}
                  className="px-2 py-0.5 rounded-md bg-[#141A36] hover:text-white border border-slate-700"
                >
                  Overview
                </button>
                <button
                  onClick={() => handleCameraPreset('walkway')}
                  className="px-2 py-0.5 rounded-md bg-[#141A36] hover:text-white border border-slate-700"
                >
                  Rover Eye
                </button>
                <button
                  onClick={() => handleCameraPreset('topdown')}
                  className="px-2 py-0.5 rounded-md bg-[#141A36] hover:text-white border border-slate-700"
                >
                  Top-Down
                </button>
                <button
                  onClick={() => handleCameraPreset('pillar')}
                  className="px-2 py-0.5 rounded-md bg-red-950 text-red-200 border border-red-500/50 font-bold"
                >
                  P-027 Focus
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay 2: Heatmap Legend (when scanMode === 'changes') */}
        {scanMode === 'changes' && (
          <div className="absolute top-4 right-4 z-10 glass-panel p-3.5 rounded-2xl border border-red-500/50 text-xs font-mono max-w-xs shadow-2xl">
            <div className="font-bold text-slate-100 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>4D Registered Scan Subtraction</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/40"></span>
                <span className="text-slate-200">Delta &lt; 5mm (Stable / Baseline)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/40"></span>
                <span className="text-amber-200 font-bold">Delta 5-20mm (Review Required)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping shadow-md shadow-red-500/40"></span>
                <span className="text-red-300 font-extrabold">Delta &gt; 20mm (Significant Shift)</span>
              </div>
            </div>
          </div>
        )}

        {/* Overlay 3: Colorful Robot Telemetry HUD (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-10 glass-panel-glow p-3.5 rounded-2xl border border-cyan-400/40 text-xs font-mono max-w-xs hidden sm:block shadow-2xl">
          <div className="flex items-center justify-between text-[11px] text-cyan-300 border-b border-cyan-500/20 pb-1.5 mb-2 font-bold">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              ROBOT TELEMETRY
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px]">
              DEMO STREAM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-[11px] text-slate-200">
            <div>
              <span className="text-slate-400 text-[10px] block">LOCAL POSE (XYZ)</span>
              <p className="font-bold text-cyan-300">
                [{telemetry.position.x}, {telemetry.position.y}, {telemetry.position.z}]
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">BATTERY / TEMP</span>
              <p className="font-bold text-emerald-400">
                {telemetry.batteryLevel}% / {telemetry.temperatureC}°C
              </p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">SLAM ATE DRIFT</span>
              <p className="font-bold text-teal-300">&lt; 0.068 m</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">EDGE AI INFERENCE</span>
              <p className="font-bold text-purple-300">28.4 FPS (Jetson)</p>
            </div>
          </div>
        </div>

        {/* Overlay 4: Asset Details Drawer (Bottom Right) */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute bottom-4 right-4 z-10 w-80 md:w-96 glass-panel-glow p-4.5 rounded-2xl border border-purple-400/50 text-xs shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-purple-500/20 pb-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-cyan-500 to-electric text-navy-950 font-mono font-bold text-xs shadow">
                      {selectedAsset.id}
                    </span>
                    <span className="text-[11px] font-mono uppercase text-purple-300 font-bold">
                      {selectedAsset.classType}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                    {selectedAsset.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Asset Key Metrics */}
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px] mb-3">
                <div className="bg-[#090D1F] p-2.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 text-[10px] block font-semibold">CONDITION</span>
                  <span className={`font-bold ${
                    selectedAsset.hasGeometricChange ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {selectedAsset.condition}
                  </span>
                </div>
                <div className="bg-[#090D1F] p-2.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 text-[10px] block font-semibold">AI CONFIDENCE</span>
                  <span className="font-bold text-cyan-300">
                    {selectedAsset.confidence}% (demo data)
                  </span>
                </div>
                <div className="bg-[#090D1F] p-2.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 text-[10px] block font-semibold">DIMENSIONS</span>
                  <span className="text-slate-200">
                    H: {selectedAsset.dimensions.height}m
                    {selectedAsset.dimensions.radius ? ` · R: ${selectedAsset.dimensions.radius}m` : ''}
                    {selectedAsset.dimensions.width ? ` · W: ${selectedAsset.dimensions.width}m` : ''}
                  </span>
                </div>
                <div className="bg-[#090D1F] p-2.5 rounded-xl border border-slate-700/80">
                  <span className="text-slate-400 text-[10px] block font-semibold">LAST INSPECTION</span>
                  <span className="text-purple-300">
                    {new Date(selectedAsset.lastInspection).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* 4D Geometric Change Alert Box (if detected) */}
              {selectedAsset.hasGeometricChange && selectedAsset.changeDetails && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/60 mb-3 text-[11px] font-mono shadow-lg shadow-red-950/40">
                  <div className="flex items-center gap-1.5 text-red-300 font-bold mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>DETECTED GEOMETRIC ANOMALY</span>
                  </div>
                  <div className="text-slate-200 space-y-0.5">
                    <p><span className="text-slate-400">Baseline:</span> {selectedAsset.changeDetails.previousGeometry}</p>
                    <p><span className="text-slate-400">Current:</span> {selectedAsset.changeDetails.currentGeometry}</p>
                    <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-red-500/40 text-xs">
                      <span className="text-amber-300 font-bold">Displacement: {selectedAsset.changeDetails.displacementMm} mm</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-900 text-[10px] text-amber-200 font-semibold">
                        {selectedAsset.changeDetails.reviewStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Attributes Table */}
              <div className="bg-[#090D1F] rounded-xl p-2.5 border border-slate-800 text-[10px] font-mono text-slate-300">
                <span className="text-slate-400 block mb-1 font-semibold">ASSET ATTRIBUTES</span>
                {Object.entries(selectedAsset.attributes).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-slate-800/60 last:border-0">
                    <span className="text-slate-400 capitalize">{key}:</span>
                    <span className="text-cyan-200 font-medium truncate max-w-[170px]">{String(val)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom 4D Inspection Timeline Strip */}
      <div className="z-10 px-4 py-2.5 bg-[#0D1226]/95 backdrop-blur-md border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-white">4D TIMELINE MISSIONS:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {missions.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMissionSelect(m.id)}
              className={`px-3 py-1 rounded-xl border transition-all text-[11px] whitespace-nowrap flex items-center gap-1.5 ${
                selectedMissionId === m.id
                  ? 'bg-gradient-to-r from-electric to-purple-600 text-white border-cyan-400 shadow-md font-bold'
                  : 'bg-[#141A36] text-slate-300 border-slate-700 hover:border-cyan-400/50'
              }`}
            >
              <span>{m.name.split('—')[0].trim()}</span>
              {m.id === 'mission-04' && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-[9px] text-white font-bold animate-pulse">
                  3 Changes
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-400 hidden lg:block">
          Click and drag in 3D to rotate • Scroll to zoom • Click assets for metrics
        </div>
      </div>

      {/* Live ROS 2 Terminal Modal */}
      <Ros2TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        telemetry={telemetry}
      />
    </div>
  );
};
