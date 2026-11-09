import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, X, Play, RefreshCw, Copy, Check, Radio, Cpu, Layers
} from 'lucide-react';
import { RobotTelemetry } from '../types';

interface Ros2TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: RobotTelemetry;
}

export const Ros2TerminalModal: React.FC<Ros2TerminalModalProps> = ({
  isOpen,
  onClose,
  telemetry,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('odom');
  const [copied, setCopied] = useState(false);
  const [simulatedTime, setSimulatedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const topics = [
    { id: 'odom', cmd: 'ros2 topic echo /odometry/imu_incremental', label: 'Odometry (/odom)' },
    { id: 'assets', cmd: 'ros2 topic echo /minetwin/asset_registry', label: 'Semantic Assets' },
    { id: 'nav2', cmd: 'ros2 topic echo /cmd_vel', label: 'Nav2 Velocity (/cmd_vel)' },
    { id: 'diagnostics', cmd: 'ros2 topic echo /diagnostics', label: 'Diagnostics & Health' },
    { id: 'nodes', cmd: 'ros2 node list', label: 'Active ROS 2 Nodes' },
  ];

  const getTopicOutput = () => {
    const timestampSec = Math.floor(simulatedTime / 1000);
    const timestampNanosec = (simulatedTime % 1000) * 1000000;

    switch (selectedTopic) {
      case 'odom':
        return `header:
  stamp:
    sec: ${timestampSec}
    nanosec: ${timestampNanosec}
  frame_id: "lio_sam_map"
child_frame_id: "robot_base_link"
pose:
  pose:
    position:
      x: ${telemetry.position.x}
      y: ${telemetry.position.y}
      z: ${telemetry.position.z}
    orientation:
      x: 0.0012
      y: -0.0034
      z: ${(Math.sin(telemetry.position.headingDeg * 0.0174 / 2)).toFixed(4)}
      w: ${(Math.cos(telemetry.position.headingDeg * 0.0174 / 2)).toFixed(4)}
  covariance: [0.0004, 0.0, 0.0, ..., 0.0001]
twist:
  twist:
    linear:
      x: 0.35
      y: 0.00
      z: 0.01
    angular:
      x: 0.00
      y: 0.00
      z: 0.08
---`;

      case 'assets':
        return `header:
  stamp:
    sec: ${timestampSec}
  frame_id: "lio_sam_map"
asset_id: "P-027"
class: "structural_pillar"
confidence: 0.942
geometric_primitive:
  type: "cylinder"
  radius: 0.450
  height: 3.200
  axis_normal: [0.002, 0.008, 0.999]
condition: "REQUIRES_REVIEW"
temporal_change:
  baseline_displacement_mm: 14.2
  previous_scan_timestamp: "2026-10-14T09:30:00Z"
  status: "PENDING_GEOTECH_REVIEW"
---`;

      case 'nav2':
        return `linear:
  x: 0.350
  y: 0.000
  z: 0.000
angular:
  x: 0.000
  y: 0.000
  z: 0.045
controller: "MPPIController"
recovery_status: "NOMINAL_TRACKING"
costmap_clearance_m: 1.45
---`;

      case 'diagnostics':
        return `status:
  - name: "LiDAR Driver (Livox Mid-360)"
    level: 0 (OK)
    message: "Point rate 240,000 pts/s (10.0 Hz nominal)"
  - name: "IMU Driver (6-DoF 200Hz)"
    level: 0 (OK)
    message: "Pre-integration drift <0.12 deg/hr"
  - name: "Corridor Degeneracy Detection"
    level: 0 (OK)
    message: "Eigenvalue condition ratio: 1.42 (Non-degenerate)"
  - name: "Edge AI Foundation Model"
    level: 0 (OK)
    message: "Jetson Orin TensorRT FP16 latency: 35.2 ms (28.4 FPS)"
---`;

      case 'nodes':
        return `/minetwin/sensor_sync_nodelet
/minetwin/lio_sam_imuPreintegration
/minetwin/lio_sam_imageProjection
/minetwin/lio_sam_mapOptmization
/minetwin/openscene_2d3d_projection
/minetwin/ransac_primitive_extractor
/minetwin/spatial_entropy_frontier_planner
/minetwin/active_exploration_server
/nav2/bt_navigator
/nav2/controller_server
/nav2/planner_server
/nav2/costmap_2d_recovery
/minetwin/digital_twin_socket_bridge`;

      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTopicOutput());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl glass-panel-glow rounded-2xl overflow-hidden border border-cyan-400/50 shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Terminal Header */}
        <div className="px-5 py-3.5 bg-navy-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="font-mono text-xs font-bold text-cyan-300 ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROS 2 Humble Terminal Monitor (Simulated Subterranean Node)</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Topic Selector Tabs */}
        <div className="px-4 py-2 bg-navy-900 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                selectedTopic === t.id
                  ? 'bg-electric text-white font-bold'
                  : 'bg-navy-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Terminal Shell Output */}
        <div className="p-4 bg-[#040D1A] overflow-y-auto font-mono text-xs leading-relaxed text-cyan-300 flex-1 relative">
          <div className="text-slate-500 mb-2 flex items-center justify-between">
            <span>$ {topics.find(t => t.id === selectedTopic)?.cmd}</span>
            <button
              onClick={handleCopy}
              className="px-2 py-0.5 rounded bg-navy-900 hover:bg-navy-800 text-[10px] text-slate-300 border border-slate-700 flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <pre className="text-slate-200 font-mono whitespace-pre-wrap selection:bg-cyan-500 selection:text-navy-950">
            {getTopicOutput()}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-navy-950 border-t border-cyan-500/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Radio className="w-3 h-3 animate-ping text-cyan-400" />
            <span>Active DDS Middleware: CycloneDDS • Latency &lt; 0.8ms</span>
          </span>
          <span className="text-slate-500">ROS_DOMAIN_ID=42</span>
        </div>
      </motion.div>
    </div>
  );
};

