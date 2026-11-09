export interface Asset {
  id: string;
  name: string;
  classType: 'pillar' | 'equipment' | 'pipe' | 'fence' | 'pathway' | 'human' | 'unknown';
  dimensions: {
    height: number;
    width?: number;
    depth?: number;
    radius?: number;
    length?: number;
  };
  position: [number, number, number];
  condition: 'Normal (illustrative)' | 'Requires Review (illustrative)' | 'Degraded (illustrative)' | 'Anomalous (illustrative)';
  confidence: number;
  lastInspection: string;
  firstDiscovered: string;
  hasGeometricChange: boolean;
  changeDetails?: {
    previousGeometry: string;
    currentGeometry: string;
    displacementMm: number;
    detectionConfidence: number;
    reviewStatus: 'Pending Review' | 'Investigated' | 'Resolved';
    notes: string;
  };
  attributes: Record<string, string | number>;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  durationMinutes: number;
  distanceTraveledMeters: number;
  areaCoveredM2: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  keyFindings: string[];
}

export interface RobotTelemetry {
  connectivity: 'Connected (Simulated)' | 'Degraded Mesh' | 'Offline';
  missionStatus: 'AUTONOMOUS_EXPLORATION' | 'POINT_INSPECTION' | 'RETURN_TO_BASE' | 'STANDBY';
  navigationState: 'Nav2 Active Planning' | 'Obstacle Avoidance' | 'Frontier Rescanning';
  position: { x: number; y: number; z: number; headingDeg: number };
  batteryLevel: number;
  temperatureC: number;
  edgeComputeLoad: {
    cpuPercent: number;
    gpuPercent: number;
    memoryPercent: number;
    inferenceFps: number;
  };
  activeSensors: {
    lidar3D: { status: 'Operational'; rateHz: number; pointsPerSec: number };
    rgbCamera: { status: 'Operational'; resolution: string; fps: number };
    imu6Dof: { status: 'Operational'; rateHz: number; driftDegHr: number };
    thermalCamera: { status: 'Standby / Optional'; tempRange: string };
    mmWaveRadar: { status: 'Standby / Optional'; rangeM: number };
  };
  slamDiagnostics: {
    trajectoryErrorRpeCm: number;
    degeneracyFlag: boolean;
    registeredKeyframes: number;
    loopClosures: number;
  };
  mode: 'DEMO MODE (Simulated Hardware Telemetry)';
  timestamp?: string;
}

export interface AnalyticsData {
  summary: {
    totalMappedAssets: number;
    inspectedAreaM2: number;
    mapCoveragePercent: number;
    potentialChangeEvents: number;
    avgConfidencePercent: number;
    activeMissionsCount: number;
    operationalUptimeHours: number;
  };
  classDistribution: { name: string; count: number; color: string }[];
  accuracyMetrics: {
    slamAteMeters: number;
    slamRpePercent: number;
    semanticPrecision: number;
    semanticRecall: number;
    changeDetectionF1: number;
    nextBestViewGainRatio: number;
  };
  historyTimeline: { mission: string; date: string; coverage: number; assets: number; changes: number }[];
}

export type DigitalTwinScanMode = 'previous' | 'current' | 'changes';

export type ExperienceMode = 'explore' | 'digital-twin' | 'deep-dive';

