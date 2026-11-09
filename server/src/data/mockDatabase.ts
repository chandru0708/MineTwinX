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
  position: [number, number, number]; // [x, y, z] in local coordinate frame
  condition: 'Normal (illustrative)' | 'Requires Review (illustrative)' | 'Degraded (illustrative)' | 'Anomalous (illustrative)';
  confidence: number; // percentage
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
}

export const mockAssets: Asset[] = [
  {
    id: 'P-027',
    name: 'Reinforced Structural Support Pillar 27',
    classType: 'pillar',
    dimensions: { height: 3.2, radius: 0.45 },
    position: [-8, 1.6, -12],
    condition: 'Requires Review (illustrative)',
    confidence: 94.2,
    lastInspection: '2026-11-09T08:15:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: true,
    changeDetails: {
      previousGeometry: 'Cylindrical R=0.45m, Perpendicular deviation 0.4°',
      currentGeometry: 'Surface micro-crack detected, lateral tilt 1.2°, 14mm displacement',
      displacementMm: 14.2,
      detectionConfidence: 91.8,
      reviewStatus: 'Pending Review',
      notes: 'Possible rock subsidence pressure near roof bolt mounting.'
    },
    attributes: {
      material: 'Reinforced High-Tensile Steel & Concrete',
      loadBearingRating: '180 kN/m²',
      vibrationFreqHz: 2.1
    }
  },
  {
    id: 'P-018',
    name: 'North Gallery Support Pillar 18',
    classType: 'pillar',
    dimensions: { height: 3.5, radius: 0.4 },
    position: [6, 1.75, -8],
    condition: 'Normal (illustrative)',
    confidence: 97.4,
    lastInspection: '2026-11-09T08:22:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: false,
    attributes: {
      material: 'Solid Rock Anchor & Shotcrete',
      loadBearingRating: '210 kN/m²',
      vibrationFreqHz: 1.8
    }
  },
  {
    id: 'EQ-014',
    name: 'Automated Hydraulic Continuous Drill Rig 14',
    classType: 'equipment',
    dimensions: { height: 2.4, width: 2.8, depth: 4.6 },
    position: [12, 1.2, -18],
    condition: 'Normal (illustrative)',
    confidence: 95.8,
    lastInspection: '2026-11-09T08:35:00Z',
    firstDiscovered: '2026-10-20T11:00:00Z',
    hasGeometricChange: false,
    attributes: {
      powerSource: 'High Voltage Tethered 6.6 kV',
      operationalState: 'Active Autonomous Extraction',
      surfaceThermalC: 38.6
    }
  },
  {
    id: 'EQ-009',
    name: 'Ventilation Fan Booster Station 09',
    classType: 'equipment',
    dimensions: { height: 2.1, width: 2.0, depth: 2.5 },
    position: [-14, 1.05, -4],
    condition: 'Normal (illustrative)',
    confidence: 96.1,
    lastInspection: '2026-11-09T08:10:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: false,
    attributes: {
      airflowCfm: 42000,
      fanRpm: 1450,
      vibrationIndex: 'Optimal'
    }
  },
  {
    id: 'PIPE-004',
    name: 'High-Pressure Slurry & Dewatering Pipeline 04',
    classType: 'pipe',
    dimensions: { length: 38.0, radius: 0.18, height: 0.36 },
    position: [-3, 2.7, -14],
    condition: 'Requires Review (illustrative)',
    confidence: 93.6,
    lastInspection: '2026-11-09T08:28:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: true,
    changeDetails: {
      previousGeometry: 'Horizontal linear cylinder fit sag delta <4mm',
      currentGeometry: 'Sag deformation between hanging anchors 6 and 7: delta 22mm',
      displacementMm: 22.4,
      detectionConfidence: 89.5,
      reviewStatus: 'Pending Review',
      notes: 'Bracket bolt slack detected via 3D point cloud cylinder fitting residual.'
    },
    attributes: {
      nominalPressureBar: 18.5,
      material: 'HDPE Lined Carbon Steel',
      fluidType: 'Mine Tailings Slurry'
    }
  },
  {
    id: 'PIPE-011',
    name: 'Fresh Air / Compressed Pneumatics Line 11',
    classType: 'pipe',
    dimensions: { length: 45.0, radius: 0.12, height: 0.24 },
    position: [4, 2.9, -15],
    condition: 'Normal (illustrative)',
    confidence: 98.1,
    lastInspection: '2026-11-09T08:25:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: false,
    attributes: {
      nominalPressureBar: 8.0,
      material: 'Galvanized Ductile Iron',
      leakScore: 'Zero Differential'
    }
  },
  {
    id: 'F-008',
    name: 'Exclusion Perimeter Safety Barrier Fence 08',
    classType: 'fence',
    dimensions: { height: 1.8, width: 0.1, depth: 8.5 },
    position: [14, 0.9, -7],
    condition: 'Normal (illustrative)',
    confidence: 91.2,
    lastInspection: '2026-11-09T08:40:00Z',
    firstDiscovered: '2026-10-25T14:15:00Z',
    hasGeometricChange: true,
    changeDetails: {
      previousGeometry: 'Continuous planar barrier along X=14.0m',
      currentGeometry: 'Section 3 inward deflection 85mm from heavy equipment contact',
      displacementMm: 85.0,
      detectionConfidence: 94.0,
      reviewStatus: 'Investigated',
      notes: 'Flagged during Mission 04 change comparison; maintenance team notified.'
    },
    attributes: {
      meshType: 'High-Impact Steel Welded Mesh',
      safetyZone: 'Blast Zone Perimeter'
    }
  },
  {
    id: 'PW-002',
    name: 'Main Haulage Adit Central Pathway',
    classType: 'pathway',
    dimensions: { width: 5.2, length: 65.0, height: 0.05 },
    position: [0, 0.02, -15],
    condition: 'Normal (illustrative)',
    confidence: 99.1,
    lastInspection: '2026-11-09T08:45:00Z',
    firstDiscovered: '2026-10-14T09:30:00Z',
    hasGeometricChange: false,
    attributes: {
      traversabilityCost: 1.05,
      surfaceGrade: 'Graded Compact Aggregate',
      maxSafeSpeedMs: 1.8
    }
  },
  {
    id: 'HM-001',
    name: 'Dynamic Human Worker / Geo-Surveyor',
    classType: 'human',
    dimensions: { height: 1.82, width: 0.5, depth: 0.4 },
    position: [-5, 0.91, -6],
    condition: 'Normal (illustrative)',
    confidence: 96.8,
    lastInspection: '2026-11-09T08:46:12Z',
    firstDiscovered: '2026-11-09T08:46:12Z',
    hasGeometricChange: false,
    attributes: {
      motionState: 'Dynamic Walking (Transitory Entity)',
      exclusionRule: 'Filtered out of static 4D baseline, logged for safety clearance',
      ppeDetected: 'High-Vis Jacket, Hardhat Lamp'
    }
  }
];

export const mockMissions: Mission[] = [
  {
    id: 'mission-01',
    name: 'Mission 01 — Baseline 3D Mapping & Geometry Initial Registration',
    description: 'Initial GPS-denied autonomous traversal of Gallery B. LiDAR-Inertial SLAM established global coordinate frame and cataloged 112 baseline assets.',
    timestamp: '2026-10-14T09:30:00Z',
    durationMinutes: 42,
    distanceTraveledMeters: 385,
    areaCoveredM2: 3200,
    status: 'Completed',
    keyFindings: [
      'Zero GNSS availability; LiDAR-Inertial SLAM achieved <0.07m drift over 385m trajectory',
      'Extracted initial semantic mesh for 18 support pillars and 2 main extraction haul routes',
      'Established persistent spatial coordinate anchor in Gallery B entry portal'
    ]
  },
  {
    id: 'mission-02',
    name: 'Mission 02 — Multi-view Semantic Association & Relocalization',
    description: 'Active exploration to resolve occlusion boundaries and high-uncertainty regions. Correlated 2D foundation model embeddings to 3D point clusters.',
    timestamp: '2026-10-25T14:15:00Z',
    durationMinutes: 38,
    distanceTraveledMeters: 410,
    areaCoveredM2: 3950,
    status: 'Completed',
    keyFindings: [
      'Relocalized autonomously using prior submap point registration with zero initial pose guess',
      'Assigned persistent global IDs across all structural pillars and utility pipelines',
      'Resolved 14 previously occluded blind corners via Next-Best-View frontier planning'
    ]
  },
  {
    id: 'mission-03',
    name: 'Mission 03 — Multi-Modal Dense Rescan & Condition Benchmarking',
    description: 'Autonomous re-inspection mission following geological blasting in adjacent shaft. Synchronized RGB-LiDAR data capture with local Nav2 path adaptation.',
    timestamp: '2026-11-02T16:00:00Z',
    durationMinutes: 47,
    distanceTraveledMeters: 460,
    areaCoveredM2: 4400,
    status: 'Completed',
    keyFindings: [
      'Registered high-density point clouds against Mission 01 reference mesh',
      'Identified localized rock rubble spallation along eastern drift wall',
      'Verified traversability clearance for autonomous haulage truck PW-002'
    ]
  },
  {
    id: 'mission-04',
    name: 'Mission 04 — Current 4D Scan & Registered Change Detection',
    description: 'Latest operational inspection run. Automated voxel-based geometric subtraction and multi-view semantic consistency checking.',
    timestamp: '2026-11-09T08:15:00Z',
    durationMinutes: 45,
    distanceTraveledMeters: 480,
    areaCoveredM2: 4820,
    status: 'Completed',
    keyFindings: [
      'Flagged 14.2mm lateral displacement on Structural Pillar P-027',
      'Detected 22.4mm sag deflection on Slurry Pipeline PIPE-004 between anchors 6-7',
      'Isolated and reported safety barrier displacement on Fence F-008'
    ]
  }
];

export const mockRobotTelemetry: RobotTelemetry = {
  connectivity: 'Connected (Simulated)',
  missionStatus: 'AUTONOMOUS_EXPLORATION',
  navigationState: 'Nav2 Active Planning',
  position: { x: -2.4, y: 0.35, z: -10.8, headingDeg: 34.5 },
  batteryLevel: 84,
  temperatureC: 44.8,
  edgeComputeLoad: {
    cpuPercent: 48.2,
    gpuPercent: 67.5,
    memoryPercent: 54.0,
    inferenceFps: 28.4
  },
  activeSensors: {
    lidar3D: { status: 'Operational', rateHz: 10, pointsPerSec: 240000 },
    rgbCamera: { status: 'Operational', resolution: '1920x1080', fps: 30 },
    imu6Dof: { status: 'Operational', rateHz: 200, driftDegHr: 0.12 },
    thermalCamera: { status: 'Standby / Optional', tempRange: '-20°C to +550°C' },
    mmWaveRadar: { status: 'Standby / Optional', rangeM: 40 }
  },
  slamDiagnostics: {
    trajectoryErrorRpeCm: 3.4,
    degeneracyFlag: false,
    registeredKeyframes: 1420,
    loopClosures: 19
  },
  mode: 'DEMO MODE (Simulated Hardware Telemetry)'
};

export const mockAnalytics = {
  summary: {
    totalMappedAssets: 148,
    inspectedAreaM2: 4820,
    mapCoveragePercent: 98.4,
    potentialChangeEvents: 3,
    avgConfidencePercent: 94.6,
    activeMissionsCount: 4,
    operationalUptimeHours: 18.5
  },
  classDistribution: [
    { name: 'Pillars (Structural)', count: 42, color: '#EF4444' },
    { name: 'Equipment & Machinery', count: 24, color: '#3B82F6' },
    { name: 'Pipelines & Conduits', count: 36, color: '#FACC15' },
    { name: 'Safety Fences & Gates', count: 18, color: '#A855F7' },
    { name: 'Pathways & Haul Roads', count: 22, color: '#10B981' },
    { name: 'Transient / Humans', count: 6, color: '#F97316' }
  ],
  accuracyMetrics: {
    slamAteMeters: 0.068,
    slamRpePercent: 0.42,
    semanticPrecision: 92.4,
    semanticRecall: 89.8,
    changeDetectionF1: 91.2,
    nextBestViewGainRatio: 1.84
  },
  historyTimeline: [
    { mission: 'Mission 01', date: 'Oct 14', coverage: 65, assets: 112, changes: 0 },
    { mission: 'Mission 02', date: 'Oct 25', coverage: 82, assets: 128, changes: 1 },
    { mission: 'Mission 03', date: 'Nov 02', coverage: 91, assets: 140, changes: 2 },
    { mission: 'Mission 04', date: 'Nov 09', coverage: 98.4, assets: 148, changes: 3 }
  ]
};

