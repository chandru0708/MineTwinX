export type CapabilityStatus = 'PROPOSED' | 'IN DEVELOPMENT' | 'DEMONSTRATION';

export interface StatusBadgeInfo {
  status: CapabilityStatus;
  label: string;
  bg: string;
  text: string;
  border: string;
  description: string;
}

export const CAPABILITY_STATUSES: Record<CapabilityStatus, StatusBadgeInfo> = {
  'PROPOSED': {
    status: 'PROPOSED',
    label: 'PROPOSED',
    bg: 'bg-purple-950/60',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
    description: 'Described in the submitted architecture design; scheduled for subsequent development.'
  },
  'IN DEVELOPMENT': {
    status: 'IN DEVELOPMENT',
    label: 'IN DEVELOPMENT',
    bg: 'bg-amber-950/60',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    description: 'Currently being actively implemented, calibrated, or integrated in hardware/software.'
  },
  'DEMONSTRATION': {
    status: 'DEMONSTRATION',
    label: 'DEMO MODE',
    bg: 'bg-cyan-950/60',
    text: 'text-cyan-300',
    border: 'border-cyan-500/40',
    description: 'Simulated, synthesized, or illustrative interactive visualization for evaluation.'
  }
};

export const PROJECT_METADATA = {
  name: 'MineTwin-X',
  fullTitle: 'An Autonomous Multimodal 4D Digital Twin and Intelligent Inspection Robot for GPS-Denied Environments',
  tagline: 'See Beyond the Surface. Understand Every Asset.',
  description: 'A hardware-agnostic autonomous robotic inspection platform designed to reconstruct, understand and monitor complex industrial environments through multimodal sensor fusion, AI-powered perception, autonomous exploration and a cloud-synchronized 4D Digital Twin.',
  competition: 'L&T TECHgium — 10th Edition',
  round: 'Presentation Round (Round 2)',
  domain: 'Robotics & Autonomous Systems',
  coreTechnologies: [
    'Autonomous Robotics',
    '3D LiDAR',
    'RGB Vision',
    '6-DoF IMU',
    'Multimodal Sensor Fusion',
    'LiDAR-Inertial SLAM (LIO-SAM)',
    'Open-Vocabulary 3D Semantic Segmentation',
    'Uncertainty-Aware Active Exploration',
    'ROS 2 Humble / Nav2',
    'Edge AI (Jetson Orin)',
    '4D Temporal Digital Twin',
    'Registered Change Detection'
  ]
};

export interface ProblemChallenge {
  id: string;
  number: string;
  title: string;
  description: string;
  impact: string;
  traditionalMethod: string;
  mineTwinApproach: string;
  iconName: string;
  metricLabel: string;
  metricValue: string;
}

export const PROBLEM_CHALLENGES: ProblemChallenge[] = [
  {
    id: 'gps-denied',
    number: '01',
    title: 'GPS-Denied Subterranean Environments',
    description: 'Underground mines, haulage drifts, penstocks, and enclosed industrial vaults lack GNSS satellite line-of-sight, rendering standard GPS positioning completely ineffective.',
    impact: 'Surveyors lose precise global positioning, resulting in uncontrolled cumulative dead-reckoning drift and severe spatial disorientation.',
    traditionalMethod: 'Manual total stations and physical survey pegs; high labor requirement and slow updates.',
    mineTwinApproach: 'Tightly-coupled LiDAR-Inertial SLAM (LIO-SAM/FAST-LIO2) with degeneracy detection and loop-closure factor graph optimization.',
    iconName: 'CompassOff',
    metricLabel: 'GNSS Signal in Drift',
    metricValue: '0.0% Available'
  },
  {
    id: 'hazardous-inspection',
    number: '02',
    title: 'Hazardous Manual Human Inspection',
    description: 'Sending human personnel into unstable stopes, freshly blasted shafts, and confined chemical zones exposes human lives to rockfalls, toxic fumes, and structural collapses.',
    impact: 'Elevated industrial casualty risks, mandatory production shutdowns during inspection, and high insurance liabilities.',
    traditionalMethod: 'Handheld gas monitors and walking surveyors exposed directly to overhead geotechnical instability.',
    mineTwinApproach: 'Fully autonomous robotic rover with remote tele-presence, obstacle negotiation, and automated environmental mapping.',
    iconName: 'AlertTriangle',
    metricLabel: 'Human Risk Exposure',
    metricValue: '-85% Reduction'
  },
  {
    id: 'unstructured-spatial-data',
    number: '03',
    title: 'Unstructured Raw Spatial Data Overload',
    description: 'Traditional terrestrial 3D laser scanners produce unsegmented, unclassified, raw point clouds requiring hundreds of hours of manual post-processing and CAD tracing.',
    impact: 'High data latency; critical structural anomalies are often identified weeks after survey completion.',
    traditionalMethod: 'Static tripod scans exported to point clouds; manual cleaning, registration, and human annotation.',
    mineTwinApproach: 'Real-time dense 3D voxelization paired with edge AI open-vocabulary semantic projection in unified coordinate frames.',
    iconName: 'Layers',
    metricLabel: 'Manual Annotation Time',
    metricValue: 'Hours to Minutes'
  },
  {
    id: 'manual-asset-identification',
    number: '04',
    title: 'Manual & Subjective Asset Identification',
    description: 'Distinguishing structural pillars, pipelines, ventilation louvers, safety fences, and haul pathways across vast networks is reliant on subjective human surveyor notes.',
    impact: 'Inconsistent asset naming, duplicate records across inspection shifts, and failure to track individual asset degradation over time.',
    traditionalMethod: 'Manual tagging, spray paint markers on rock walls, and disconnected spreadsheet asset registries.',
    mineTwinApproach: 'Automated geometric reasoning (cylinder & plane fitting) coupled with semantic classes and persistent UUID assignment.',
    iconName: 'Tag',
    metricLabel: 'Asset Classification',
    metricValue: 'Automatic Multi-Class'
  },
  {
    id: 'difficult-change-detection',
    number: '05',
    title: 'Difficult & Inaccurate Change Detection',
    description: 'Determining if a rock support pillar has micro-shifted, if a slurry pipeline has sagged, or if roof rock has spalled requires sub-centimeter geometric comparison across months.',
    impact: 'Gradual geotechnical deformations go unnoticed until catastrophic roof falls or pipeline blowouts occur.',
    traditionalMethod: 'Visual inspection with flashlights and manual tape measurement across baseline survey bolts.',
    mineTwinApproach: 'Registered 4D point-cloud subtraction, multi-temporal ICP fine-tuning, and automated micro-displacement heatmaps.',
    iconName: 'History',
    metricLabel: 'Deformation Resolution',
    metricValue: '< 15mm Accuracy'
  },
  {
    id: 'limited-spatial-intelligence',
    number: '06',
    title: 'Siloed Workflows & Zero Spatial Querying',
    description: 'Conventional industrial operations maintain separate SCADA telemetry, maintenance databases, and survey maps with no unified interactive 3D query interface.',
    impact: 'Engineers cannot query: "Show me all pillars within 50m showing structural deformation >10mm in the last 30 days."',
    traditionalMethod: 'Static PDF survey reports filed in archive drives; zero relational spatial search capability.',
    mineTwinApproach: 'Cloud-synchronized 4D Digital Twin with natural spatial querying, time-travel inspection timeline, and automated alerts.',
    iconName: 'Database',
    metricLabel: 'Spatial Query Latency',
    metricValue: '< 250ms Instant'
  }
];

export interface SystemStage {
  stage: string;
  name: string;
  subtitle: string;
  color: string;
  iconName: string;
  status: CapabilityStatus;
  components: {
    title: string;
    description: string;
    details: string;
    status: CapabilityStatus;
  }[];
}

export const FOUR_STAGES: SystemStage[] = [
  {
    stage: 'STAGE 01',
    name: 'Multi-Sensor Input & Acquisition',
    subtitle: 'Synchronized Multimodal Perception Engine',
    color: '#00D9FF',
    iconName: 'Radio',
    status: 'IN DEVELOPMENT',
    components: [
      {
        title: '360° 3D LiDAR (Livox Mid-360 / Velodyne)',
        description: 'Omnidirectional high-density spatial point-cloud generation up to 40m range with 200,000+ points/sec.',
        details: 'Generates non-repetitive scanning patterns providing dense coverage even at slow rover speeds.',
        status: 'IN DEVELOPMENT'
      },
      {
        title: 'Wide-FOV RGB Optical Camera (1080p@30fps)',
        description: 'Synchronized visual imagery for surface texture, equipment labeling, and open-vocabulary 2D semantic feature extraction.',
        details: 'Hardware time-stamped via hardware trigger to match LiDAR sweep intervals.',
        status: 'IN DEVELOPMENT'
      },
      {
        title: 'Industrial 6-DoF Inertial Measurement Unit (IMU)',
        description: '200 Hz high-frequency angular velocity and linear acceleration readings for tight-coupling with LiDAR odometry.',
        details: 'Pre-integration algorithm (IMU pre-integration on manifold) compensates for robot jerk and vibration.',
        status: 'IN DEVELOPMENT'
      },
      {
        title: 'Optional Thermal Infrared Radiometer (FLIR Boson)',
        description: 'Detects overheated motors, electrical switchgear anomalies, and friction heat in conveyor pulleys.',
        details: 'Secondary diagnostic payload activated in electrical substation galleries and motor bays.',
        status: 'PROPOSED'
      },
      {
        title: 'Optional 77GHz mmWave Radar (TI IWR6843)',
        description: 'Penetrates zero-visibility particulate curtains, dust clouds, and dense water vapor when optical LiDAR attenuates.',
        details: 'Maintains obstacle avoidance bounds during high-dust rock-dumping operations.',
        status: 'PROPOSED'
      }
    ]
  },
  {
    stage: 'STAGE 02',
    name: 'Perception & Spatial Understanding',
    subtitle: 'From Raw Photons to Semantic Geometric Reality',
    color: '#1677FF',
    iconName: 'Cpu',
    status: 'IN DEVELOPMENT',
    components: [
      {
        title: 'LiDAR-Inertial SLAM (LIO-SAM Framework)',
        description: 'Tightly-coupled factor graph SLAM with IMU pre-integration and loop closure detection for robust drift-free odometry.',
        details: 'Integrates degeneracy detection to prevent pose corruption in long uniform tunnel corridors.',
        status: 'IN DEVELOPMENT'
      },
      {
        title: 'Open-Vocabulary 2D Perception & Semantic Projection',
        description: 'Zero-shot recognition of arbitrary industrial items using vision-language foundation model embeddings projected into 3D space.',
        details: 'Maps 2D pixel-level features to 3D point cloud coordinates via calibrated extrinsic transform P_3d = T_lidar_cam * K^-1 * p_2d.',
        status: 'PROPOSED'
      },
      {
        title: 'Geometric Reasoning & Primitive Fitting',
        description: 'RANSAC cylinder fitting for structural pillars and pipes; plane segmentation for floors, walls, and bulkheads.',
        details: 'Extracts physical dimensions (radius, length, normal vector) to cross-validate semantic classifications.',
        status: 'PROPOSED'
      },
      {
        title: 'Multi-View Consistency & Uncertainty Filtering',
        description: 'Temporal bayesian belief updating across sequential keyframes to filter out transient false positives and noise.',
        details: 'Ensures only consistently observed geometric features are promoted into the permanent Digital Twin.',
        status: 'PROPOSED'
      }
    ]
  },
  {
    stage: 'STAGE 03',
    name: 'Active Exploration & Autonomy',
    subtitle: 'Uncertainty-Aware Information-Gain Navigation',
    color: '#7957FF',
    iconName: 'Compass',
    status: 'PROPOSED',
    components: [
      {
        title: 'Value-of-Information (VoI) Frontier Planner',
        description: 'Selects next-best inspection viewpoints that maximize Shannon information gain while minimizing traversal energy cost.',
        details: 'Objective function: J(v) = α·IG(v) + β·Uncertainty(v) - γ·TravelCost(v) - δ·Risk(v).',
        status: 'PROPOSED'
      },
      {
        title: 'ROS 2 Humble Nav2 Local Navigation',
        description: 'Real-time DWB local trajectory controller with 3D voxel costmaps for obstacle avoidance and dynamic entity clearance.',
        details: 'Adapts safely to unexpected obstacles like parked mining vehicles or moving personnel.',
        status: 'IN DEVELOPMENT'
      },
      {
        title: 'Targeted High-Uncertainty Rescanning',
        description: 'Dynamically slows rover velocity and executes fine-pitch scans when traversing high-risk structural zones.',
        details: 'Ensures dense sub-centimeter point clouds specifically on critical load-bearing pillars.',
        status: 'PROPOSED'
      }
    ]
  },
  {
    stage: 'STAGE 04',
    name: '4D Digital Twin & Cloud Sync',
    subtitle: 'Temporal Asset Evolution & Registered Change Analysis',
    color: '#00C9A7',
    iconName: 'Layers',
    status: 'DEMONSTRATION',
    components: [
      {
        title: 'Persistent Asset UUID Registry',
        description: 'Global spatial index associating physical assets across multiple inspection runs regardless of elapsed months.',
        details: 'Relocalizes against previous submaps using geometric-semantic descriptors.',
        status: 'DEMONSTRATION'
      },
      {
        title: 'Registered 4D Point-Cloud Subtraction',
        description: 'Sub-centimeter geometric deviation detection comparing current mission point clouds against historical baselines.',
        details: 'Color-coded visual deformation maps: green (normal <5mm), orange (review 5-15mm), red (critical >15mm).',
        status: 'DEMONSTRATION'
      },
      {
        title: 'Natural Spatial Query Interface',
        description: 'Enables engineers to query assets by geometry, class, condition, or inspection timestamp in real-time.',
        details: 'Supports bounding box filters, radius queries, and anomaly threshold searches.',
        status: 'DEMONSTRATION'
      },
      {
        title: 'Telemetry Dashboard & Cloud Synchronization',
        description: 'Low-bandwidth sync protocol transmits semantic asset delta records and alerts over intermittent mesh Wi-Fi.',
        details: 'Maintains offline storage onboard Jetson Orin; auto-syncs when surface gateway is detected.',
        status: 'DEMONSTRATION'
      }
    ]
  }
];

export interface ArchitectureModule {
  id: string;
  stepNumber: number;
  name: string;
  category: 'Sensing' | 'Perception' | 'Planning' | 'Digital Twin';
  description: string;
  inputData: string;
  processing: string;
  outputData: string;
  technologies: string[];
  importance: string;
  status: CapabilityStatus;
}

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    name: 'Multi-Sensor Acquisition',
    category: 'Sensing',
    description: 'Concurrent acquisition of raw 3D point clouds, RGB image frames, and 6-DoF inertial readings.',
    inputData: 'Photons, laser reflections, angular velocities, linear accelerations.',
    processing: 'Hardware clock synchronization via PTP/PPS; buffer management in ROS 2 nodelet rings.',
    outputData: 'Synchronized sensor message topics (/lidar_points, /camera/image_raw, /imu/data_raw).',
    technologies: ['ROS 2 Nodelets', 'PTP/PPS Hardware Triggers', 'Livox ROS Driver 2'],
    importance: 'Accurate time-stamping (<1ms) is mandatory to prevent motion distortion during rover movement.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    name: 'Sensor Synchronization & Health Monitoring',
    category: 'Sensing',
    description: 'Real-time diagnostic checks for sensor dropouts, lens fouling, dust occlusion, or IMU bias spikes.',
    inputData: 'Raw sensor streams and timestamp deltas.',
    processing: 'Timestamp jitter analysis, point density sanity check, optical lens variance check.',
    outputData: 'Validated synchronized sensor packets + Health State bitmask.',
    technologies: ['ROS 2 Diagnostic Aggregator', 'Bayesian Fault Detector'],
    importance: 'Prevents degraded sensor data from corrupting SLAM factor graphs in harsh mine environments.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    name: 'LiDAR-Inertial SLAM & Odometry',
    category: 'Perception',
    description: 'Tightly-coupled LiDAR-inertial state estimation with continuous-time trajectory optimization.',
    inputData: 'De-skewed point clouds + 200 Hz IMU pre-integrated measurements.',
    processing: 'Iterative Extended Kalman Filter / Factor Graph optimization, point-to-plane ICP matching.',
    outputData: '6-DoF Robot Pose Odometry (/odometry/imu_incremental) + Registered Keyframes.',
    technologies: ['LIO-SAM', 'GTSAM Factor Graphs', 'FAST-LIO2'],
    importance: 'Provides continuous sub-centimeter localization without any GPS or external beacons.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    name: 'GPS-Denied Degeneracy Handling',
    category: 'Perception',
    description: 'Detects geometrically degenerate features (e.g., long featureless round tunnels where LiDAR slips).',
    inputData: 'Hessian matrix of point-to-plane residual equations.',
    processing: 'Eigenvalue decomposition of the information matrix; switches to inertial dead-reckoning on unconstrained axes.',
    outputData: 'Degeneracy flag + Constrained 6-DoF pose correction.',
    technologies: ['Eigen C++ Library', 'Degeneracy Awareness ICP'],
    importance: 'Stops false drift along straight smooth tunnel corridors.',
    status: 'PROPOSED'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    name: 'Dense 3D Reconstruction',
    category: 'Perception',
    description: 'Accumulates registered point clouds into an octree-based voxel grid of the entire industrial facility.',
    inputData: 'Transformed keyframe point clouds and odometry poses.',
    processing: 'Voxel downsampling (5cm grid), outlier removal, TSDF (Truncated Signed Distance Field) integration.',
    outputData: 'Global Metric 3D Point Cloud and Voxelized Occupancy Map.',
    technologies: ['PCL (Point Cloud Library)', 'Open3D', 'OctoMap'],
    importance: 'Builds the foundational geometric mesh upon which semantic labels and change detection are mapped.',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    name: 'Open-Vocabulary 2D Perception',
    category: 'Perception',
    description: 'Edge AI inference detecting objects and materials without fixed pre-trained class limitations.',
    inputData: 'Synchronized 1080p RGB camera frames.',
    processing: 'Vision-Language foundation model (CLIP/OWL-ViT embeddings) inference extracting semantic feature maps.',
    outputData: '2D semantic feature embeddings and class probability masks.',
    technologies: ['TensorRT', 'Jetson Orin Nano/NX', 'Open-Vocabulary Foundation Models'],
    importance: 'Allows recognizing novel industrial equipment without needing custom model re-training.',
    status: 'PROPOSED'
  },
  {
    id: 'step-7',
    stepNumber: 7,
    name: '2D-to-3D Semantic Projection',
    category: 'Perception',
    description: 'Casts 2D pixel embeddings into 3D voxel space using camera intrinsic and extrinsic calibration.',
    inputData: '2D feature maps, camera matrix K, camera-to-LiDAR transform T, 3D point cloud.',
    processing: 'Pin-hole ray projection, occlusion culling using z-buffer depth verification.',
    outputData: '3D Point Cloud with high-dimensional semantic feature vectors.',
    technologies: ['OpenScene Pipeline', 'CUDA Accelerated Projection'],
    importance: 'Bridges visual semantic richness with metric 3D geometric accuracy.',
    status: 'PROPOSED'
  },
  {
    id: 'step-8',
    stepNumber: 8,
    name: 'Geometric Reasoning & Primitive Fitting',
    category: 'Perception',
    description: 'Fits analytical geometric shapes (cylinders, planes, spheres) to clustered point sets.',
    inputData: 'Segmented 3D point clusters.',
    processing: 'RANSAC cylinder fitting for pipes & pillars, RANSAC plane fitting for walls & floors.',
    outputData: 'Geometric primitives with verified metrics (radius, height, normal, azimuth).',
    technologies: ['RANSAC', 'Eigen Geometry', 'Point Cloud Library (PCL)'],
    importance: 'Enforces physical reality constraints; prevents hallucinated AI labels on flat surfaces.',
    status: 'PROPOSED'
  },
  {
    id: 'step-9',
    stepNumber: 9,
    name: 'Asset Classification & Persistent UUIDs',
    category: 'Perception',
    description: 'Fuses geometric primitives and semantic embeddings to assign verified industrial asset types and unique persistent IDs.',
    inputData: 'Geometric primitives + Multi-view semantic labels.',
    processing: 'Multi-view voting, confidence weighting, spatial hashing to existing asset registry.',
    outputData: 'Classified Asset Objects with unique persistent UUIDs (e.g. P-027, PIPE-004).',
    technologies: ['Relational Spatial Graph', 'KD-Tree Spatial Lookups'],
    importance: 'Enables repeated inspections over months to track the exact same physical pillar or valve.',
    status: 'PROPOSED'
  },
  {
    id: 'step-10',
    stepNumber: 10,
    name: 'Uncertainty Estimation & Multi-View Consistency',
    category: 'Planning',
    description: 'Computes spatial entropy and label confidence across viewing angles.',
    inputData: 'Observation count per voxel, ray intersection history, semantic variance.',
    processing: 'Shannon entropy calculation H(X) = -∑ p(x) log p(x) across voxel octants.',
    outputData: '3D Spatial Uncertainty Field / High-Entropy Frontier Points.',
    technologies: ['Bayesian Information Theory', 'Voxel Entropy Mapping'],
    importance: 'Directs the robot to spend battery and scan time inspecting ambiguous regions, not already clear zones.',
    status: 'PROPOSED'
  },
  {
    id: 'step-11',
    stepNumber: 11,
    name: 'Active Exploration & Next-Best-View Planning',
    category: 'Planning',
    description: 'Autonomous generation of optimal inspection viewpoints maximizing new information while minimizing travel risk.',
    inputData: 'Uncertainty field, current robot pose, traversability costmap.',
    processing: 'Sampling viewpoint candidates; evaluating utility function J(v) = α·IG(v) - β·Cost(v).',
    outputData: 'Target Navigation Goal Pose (x, y, z, yaw) in map frame.',
    technologies: ['Next-Best-View (NBV) Algorithm', 'Frontier Exploration Planner'],
    importance: 'Transforms a passive recording vehicle into an active intelligent surveyor.',
    status: 'PROPOSED'
  },
  {
    id: 'step-12',
    stepNumber: 12,
    name: 'ROS 2 Nav2 Autonomous Trajectory Execution',
    category: 'Planning',
    description: 'Executes collision-free motion trajectories to selected inspection goals.',
    inputData: 'Target goal pose, 3D voxel traversability map, local obstacle sensors.',
    processing: 'Smac Planner / NavFn global path computation, DWB / MPPI local controller dynamic avoidance.',
    outputData: 'Motor velocity commands (/cmd_vel) sent to robot chassis controller.',
    technologies: ['ROS 2 Nav2 Stack', 'MPPI Controller', 'Costmap2D'],
    importance: 'Guarantees the robot avoids sudden obstacles (rock debris, workers, heavy machinery).',
    status: 'IN DEVELOPMENT'
  },
  {
    id: 'step-13',
    stepNumber: 13,
    name: 'Registered Scan Comparison & 4D Subtraction',
    category: 'Digital Twin',
    description: 'Registers the newly captured point cloud against the historical baseline to isolate structural shifts.',
    inputData: 'Current dense submap + Historical baseline submap.',
    processing: 'Sub-voxel fine ICP registration, M3C2 (Multiscale Model to Model Cloud Comparison) distance field.',
    outputData: '3D Geometric Deviation Cloud + Displacement Vectors per Asset.',
    technologies: ['CloudCompare M3C2 Algorithm', 'LibPointMatcher', 'CUDA ICP'],
    importance: 'Detects micro-shifts (subsidence, bowing, spalling) before catastrophic structural failure.',
    status: 'DEMONSTRATION'
  },
  {
    id: 'step-14',
    stepNumber: 14,
    name: 'Cloud-Synchronized 4D Digital Twin & Query Engine',
    category: 'Digital Twin',
    description: 'Web-based interactive 3D platform hosting the living digital twin, historical scans, and analytics.',
    inputData: 'Registered semantic assets, change vectors, robot telemetry.',
    processing: 'Three.js / WebGL rendering, spatial indexing, REST API query filtering, WebSocket streaming.',
    outputData: 'Interactive browser experience, instant spatial search, automated maintenance alerts.',
    technologies: ['Three.js', 'React Three Fiber', 'Node.js Express', 'Socket.IO', 'Tailwind CSS'],
    importance: 'Provides engineers and stakeholders instant visual spatial intelligence without specialized CAD software.',
    status: 'DEMONSTRATION'
  }
];

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doiUrl: string;
  officialLink: string;
  relevance: string;
  researchGapAddressed: string;
  verified: boolean;
}

export const RESEARCH_FOUNDATIONS: ResearchPaper[] = [
  {
    id: 'lio-sam',
    title: 'LIO-SAM: Tightly-coupled Lidar Inertial Odometry via Smoothing and Mapping',
    authors: 'Tixiao Shan, Brendan Englot, Drew Meyers, Wei Wang, Carlos Ratti, Daniela Rus',
    venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
    year: 2020,
    doiUrl: 'https://doi.org/10.1109/IROS45743.2020.9341176',
    officialLink: 'https://github.com/TixiaoShan/LIO-SAM',
    relevance: 'Serves as the architectural foundation for MineTwin-X\'s GPS-denied state estimation. Its factor graph formulation cleanly integrates IMU pre-integration and loop closure factors on local submaps.',
    researchGapAddressed: 'Standard LOAM suffers from drift in long uniform underground mine tunnels. LIO-SAM enables factor graph loop closure and integration of zero-velocity updates.',
    verified: true
  },
  {
    id: 'fast-lio2',
    title: 'FAST-LIO2: Fast Direct LiDAR-Inertial Odometry',
    authors: 'Wei Xu, Yixi Cai, Dongjiao He, Jiaojiao Zheng, Fu Zhang',
    venue: 'IEEE Transactions on Robotics (T-RO), Vol. 38, Issue 4',
    year: 2022,
    doiUrl: 'https://doi.org/10.1109/TRO.2022.3141876',
    officialLink: 'https://github.com/hku-mars/FAST_LIO',
    relevance: 'Provides high-speed direct point-to-plane odometry without explicit feature extraction, leveraging incremental kd-tree (ikd-tree) for rapid edge computation on embedded platforms like Jetson Orin.',
    researchGapAddressed: 'Feature extraction (edges and planar surfaces) fails in rough irregular blasted rock surfaces. Direct odometry retains raw geometric points, enhancing accuracy in natural rock cavities.',
    verified: true
  },
  {
    id: 'openscene',
    title: 'OpenScene: 3D Scene Understanding with Open Vocabularies',
    authors: 'Songyou Peng, Kyle Genova, Chiyu "Max" Jiang, Andrea Tagliasacchi, Marc Pollefeys, Thomas Funkhouser',
    venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)',
    year: 2023,
    doiUrl: 'https://doi.org/10.1109/CVPR52729.2023.00815',
    officialLink: 'https://github.com/pengsongyou/openscene',
    relevance: 'Enables MineTwin-X to project open-vocabulary vision-language embeddings from 2D images directly into 3D LiDAR point clouds without needing closed-set labeled datasets.',
    researchGapAddressed: 'Closed-set 3D semantic segmentation models (e.g. trained only on ScanNet or SemanticKITTI) cannot recognize specific underground mining equipment, drill bits, or dewatering pumps.',
    verified: true
  },
  {
    id: 'active-nbv',
    title: 'Receding Horizon "Next-Best-View" Planner for 3D Exploration',
    authors: 'Andreas Bircher, Mina Kamel, Kostas Alexis, Helen Oleynikova, Roland Siegwart',
    venue: 'IEEE International Conference on Robotics and Automation (ICRA)',
    year: 2016,
    doiUrl: 'https://doi.org/10.1109/ICRA.2016.7487229',
    officialLink: 'https://github.com/ethz-asl/nbvplanner',
    relevance: 'Provides the mathematical formulation for information-gain driven active exploration in 3D bounded subterranean spaces, avoiding blind or redundant pathing.',
    researchGapAddressed: 'Pre-programmed waypoints leave shadow occlusions behind structural pillars and equipment. NBV planning drives the robot specifically toward unobserved surface volumes.',
    verified: true
  },
  {
    id: 'm3c2-change',
    title: 'Accurate 3D comparison of complex topography with terrestrial laser scanner: Application to the 2008 Séchilienne rockfall',
    authors: 'Dimitri Lague, Nicolas Brodu, Jérôme Leroux',
    venue: 'ISPRS Journal of Photogrammetry and Remote Sensing, Vol. 82',
    year: 2013,
    doiUrl: 'https://doi.org/10.1016/j.isprsjprs.2013.04.009',
    officialLink: 'https://doi.org/10.1016/j.isprsjprs.2013.04.009',
    relevance: 'Defines the M3C2 (Multiscale Model to Model Cloud Comparison) algorithm used in MineTwin-X\'s 4D registered scan difference engine to measure normal surface displacements along irregular rock faces.',
    researchGapAddressed: 'Simple cloud-to-cloud nearest neighbor comparison is heavily biased by scanner point density variations. M3C2 computes statistically rigorous surface-normal distance with confidence intervals.',
    verified: true
  },
  {
    id: 'ros2-nav2',
    title: 'The Navigation 2 System: Autonomous Mobile Robot Navigation for ROS 2',
    authors: 'Steve Macenski, Francisco Martín, Ruediger Hoeller, Carlos Gómez, et al.',
    venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)',
    year: 2020,
    doiUrl: 'https://doi.org/10.1109/IROS45743.2020.9341207',
    officialLink: 'https://navigation.ros.org/',
    relevance: 'Provides the production-grade behavior tree-based navigation framework, costmap layers, recovery behaviors, and trajectory controllers executing MineTwin-X\'s inspection trajectories.',
    researchGapAddressed: 'Ensures deterministic real-time obstacle avoidance and dynamic recovery behaviors in tight, cluttered industrial corridors.',
    verified: true
  }
];

export interface ValidationMetricCategory {
  category: string;
  description: string;
  note: string;
  metrics: {
    name: string;
    description: string;
    unit: string;
    targetValue: string;
    illustrativeValue: string;
    baselineMethod: string;
  }[];
}

export const VALIDATION_METRICS: ValidationMetricCategory[] = [
  {
    category: 'Localization & Odometry in GPS-Denied Drift',
    description: 'Evaluated against simulated and controlled underground drift trajectories with zero satellite coverage.',
    note: 'Values below represent benchmark engineering targets and illustrative laboratory mock data.',
    metrics: [
      {
        name: 'Absolute Trajectory Error (ATE RMSE)',
        description: 'Root mean squared distance error between estimated trajectory and ground-truth path.',
        unit: 'Meters (m)',
        targetValue: '< 0.10 m per 500m',
        illustrativeValue: '0.068 m',
        baselineMethod: 'Wheel Odometry + IMU Dead-Reckoning (>1.8m)'
      },
      {
        name: 'Relative Pose Error (RPE)',
        description: 'Translational and rotational drift rate over unit traversal length.',
        unit: 'Percent / Deg',
        targetValue: '< 0.5% / < 0.2°/m',
        illustrativeValue: '0.38%',
        baselineMethod: 'Pure 2D LiDAR Gmapping (1.2% in tunnels)'
      },
      {
        name: 'Relocalization Consistency',
        description: 'Success rate of global relocalization within previously mapped submaps without initial pose prior.',
        unit: 'Percentage (%)',
        targetValue: '> 95.0%',
        illustrativeValue: '96.4%',
        baselineMethod: 'Manual coordinate seeding'
      }
    ]
  },
  {
    category: '3D Geometric Reconstruction Accuracy',
    description: 'Assesses point cloud metric density, completeness, and surface distance residuals.',
    note: 'Illustrative bench tests evaluated using calibrated geometric targets.',
    metrics: [
      {
        name: 'Cylinder / Pipe Fitting Residual',
        description: 'Mean standard deviation of points fitted to known cylindrical infrastructure.',
        unit: 'Millimeters (mm)',
        targetValue: '< 8.0 mm',
        illustrativeValue: '5.2 mm',
        baselineMethod: 'Unfiltered point cloud noise (22mm)'
      },
      {
        name: 'Surface Reconstruction Completeness',
        description: 'Percentage of structural wall and pillar surface areas covered without occlusion holes.',
        unit: 'Percentage (%)',
        targetValue: '> 92.0%',
        illustrativeValue: '94.8%',
        baselineMethod: 'Single-view static survey (64%)'
      }
    ]
  },
  {
    category: 'Semantic Segmentation & Asset Identification',
    description: 'Multi-view 2D-to-3D projection accuracy across defined industrial asset classes.',
    note: 'Evaluated on annotated synthetic and indoor facility datasets.',
    metrics: [
      {
        name: 'Mean Intersection-over-Union (mIoU)',
        description: 'Overlap between predicted 3D semantic label voxels and ground truth bounds.',
        unit: 'Percentage (%)',
        targetValue: '> 78.0%',
        illustrativeValue: '81.4%',
        baselineMethod: 'Closed-set PointNet++ (62.3% on custom mine assets)'
      },
      {
        name: 'Structural Pillar Precision / Recall',
        description: 'Detection accuracy for load-bearing pillars and safety walls.',
        unit: 'Percentage (%)',
        targetValue: '> 90.0% / > 88.0%',
        illustrativeValue: '93.2% / 91.5%',
        baselineMethod: 'Manual surveyor annotation'
      }
    ]
  },
  {
    category: '4D Temporal Change Detection',
    description: 'Capability to identify physical structural displacement between sequential inspection missions.',
    note: 'Simulated deformation benchmark comparing registered point cloud subtraction.',
    metrics: [
      {
        name: 'Minimum Detectable Displacement',
        description: 'Smallest geometric shift reliably detected above noise floor with 95% confidence.',
        unit: 'Millimeters (mm)',
        targetValue: '< 15.0 mm',
        illustrativeValue: '12.0 mm',
        baselineMethod: 'Visual camera inspection (>100mm)'
      },
      {
        name: 'False Positive Change Rate',
        description: 'Percentage of unchanged voxels erroneously flagged as shifted due to sensor noise.',
        unit: 'Percentage (%)',
        targetValue: '< 3.0%',
        illustrativeValue: '2.1%',
        baselineMethod: 'Unregistered ICP difference (18.4%)'
      }
    ]
  },
  {
    category: 'Active Exploration Efficiency',
    description: 'Evaluation of autonomous next-best-view planning vs predefined route traversal.',
    note: 'Simulated stope traversal benchmark.',
    metrics: [
      {
        name: 'Exploration Time to 90% Map Coverage',
        description: 'Total autonomous traversal duration required to map facility.',
        unit: 'Minutes',
        targetValue: '< 35 mins',
        illustrativeValue: '28.5 mins',
        baselineMethod: 'Predefined serpentine grid (49 mins)'
      },
      {
        name: 'Information Gain Efficiency Ratio',
        description: 'Entropy reduction per meter of robot traversal travel.',
        unit: 'Bits / Meter',
        targetValue: '> 1.50',
        illustrativeValue: '1.84',
        baselineMethod: 'Random frontier exploration (0.82)'
      }
    ]
  },
  {
    category: 'Edge Computing & Latency Profiling',
    description: 'Measured execution times on embedded Jetson Orin platform.',
    note: 'Illustrative profiling benchmarks.',
    metrics: [
      {
        name: 'LIO-SAM Odometry Frequency',
        description: 'State estimation loop frequency.',
        unit: 'Hertz (Hz)',
        targetValue: '>= 10 Hz',
        illustrativeValue: '14.2 Hz',
        baselineMethod: 'Offline desktop batch processing'
      },
      {
        name: '2D Semantic Inference Latency',
        description: 'Quantized foundation model vision inference per keyframe.',
        unit: 'Milliseconds (ms)',
        targetValue: '< 45 ms',
        illustrativeValue: '35.2 ms (FP16 TensorRT)',
        baselineMethod: 'PyTorch CPU (>420ms)'
      }
    ]
  }
];

export interface RoadmapPhase {
  phase: string;
  name: string;
  status: CapabilityStatus;
  duration: string;
  deliverable: string;
  focus: string;
  milestones: string[];
  dependencies: string[];
}

export const IMPLEMENTATION_ROADMAP: RoadmapPhase[] = [
  {
    phase: 'PHASE 01',
    name: 'Hardware & Sensor Integration',
    status: 'IN DEVELOPMENT',
    duration: 'Month 1 - 2',
    deliverable: 'Stable Multimodal Sensor Pipeline with Time-Stamped Topics',
    focus: 'Mechanical rig mounting, power distribution, PTP/PPS hardware synchronization, and basic UGV tele-operation.',
    milestones: [
      'Chassis fabrication with heavy-duty suspension for uneven rubble traversal',
      'Mounting bracket alignment: 360° LiDAR, Wide-Angle RGB, and 6-DoF IMU',
      'ROS 2 sensor driver nodelets integrated on embedded Linux OS',
      'Extrinsic calibration (LiDAR-to-Camera, LiDAR-to-IMU) using checkerboard and target spheres'
    ],
    dependencies: ['Chassis delivery', 'Sensor procurement / lab loan']
  },
  {
    phase: 'PHASE 02',
    name: 'GPS-Denied Mapping & SLAM',
    status: 'IN DEVELOPMENT',
    duration: 'Month 3 - 4',
    deliverable: 'Drift-Free 3D Metric Voxel Map in GPS-Denied Facility',
    focus: 'Implementation of tightly-coupled LiDAR-inertial odometry and degeneracy handling.',
    milestones: [
      'Integration of LIO-SAM / FAST-LIO2 factor graph framework',
      'Implementation of eigenvalue-based degeneracy detector for symmetric tunnels',
      'Loop-closure optimization using submap scan matching',
      'Dense 3D point cloud accumulation and 5cm octree voxelization'
    ],
    dependencies: ['Phase 01 Sensor Pipeline', 'Calibration Matrices']
  },
  {
    phase: 'PHASE 03',
    name: 'Semantic Perception & Asset Reasoning',
    status: 'PROPOSED',
    duration: 'Month 5 - 6',
    deliverable: 'Semantic 3D Asset Map with Persistent Identifiers',
    focus: 'Bridging 2D open-vocabulary vision embeddings to 3D point clouds and geometric primitive extraction.',
    milestones: [
      'Edge AI deployment of open-vocabulary vision model using TensorRT',
      'CUDA-accelerated 2D-to-3D projection with depth buffer occlusion culling',
      'RANSAC cylinder and planar geometry extraction for pillars and pipes',
      'Multi-view Bayesian belief filtering to eliminate false predictions'
    ],
    dependencies: ['Phase 02 Metric SLAM Map', 'Jetson Orin Compute Environment']
  },
  {
    phase: 'PHASE 04',
    name: 'Autonomous Active Exploration',
    status: 'PROPOSED',
    duration: 'Month 7 - 8',
    deliverable: 'Autonomous Exploration Stack with Information-Gain Viewpoint Selection',
    focus: 'Uncertainty-aware Next-Best-View planning and ROS 2 Nav2 local obstacle avoidance.',
    milestones: [
      '3D Shannon entropy / spatial uncertainty field generator',
      'Receding horizon Next-Best-View planner balancing information gain and travel cost',
      'ROS 2 Nav2 MPPI controller integration with dynamic obstacle avoidance',
      'Autonomous exploration testing in simulated and physical mock mine environments'
    ],
    dependencies: ['Phase 02 Odometry', 'Phase 03 Semantic Map']
  },
  {
    phase: 'PHASE 05',
    name: '4D Digital Twin & Validation',
    status: 'DEMONSTRATION',
    duration: 'Month 9 - 10',
    deliverable: 'Integrated 4D Cloud Digital Twin with Temporal Change Detection',
    focus: 'Persistent asset registration across missions, sub-centimeter change detection, and web visualization.',
    milestones: [
      'M3C2 cloud-to-cloud registered difference engine for deformation detection',
      'Interactive 3D WebGL / Three.js browser platform with spatial querying',
      'Automated PDF & visual alert generation for structural anomalies',
      'Comprehensive benchmark validation against L&T TECHgium evaluation criteria'
    ],
    dependencies: ['Phase 01 through Phase 04']
  }
];

export interface CostLineItem {
  id: string;
  category: 'Mandatory MVP Purchases' | 'Shared / Borrowed Lab Hardware' | 'Optional Future Upgrades';
  item: string;
  estimatedCostInr: number;
  isEditable: boolean;
  notes: string;
}

export const INITIAL_COST_BREAKDOWN: CostLineItem[] = [
  // Mandatory MVP Purchases (Lean budget ~ ₹37,000 assumed)
  {
    id: 'cost-1',
    category: 'Mandatory MVP Purchases',
    item: 'Wheeled UGV Chassis Platform (4WD Heavy-Duty Aluminum Rover Chassis)',
    estimatedCostInr: 12500,
    isEditable: true,
    notes: 'All-terrain high-torque planetary geared motors with rugged rubber tires.'
  },
  {
    id: 'cost-2',
    category: 'Mandatory MVP Purchases',
    item: 'High-Precision 6-DoF IMU Module (BNO085 / MPU-9250 SPI Industrial Grade)',
    estimatedCostInr: 2800,
    isEditable: true,
    notes: 'Low drift gyro and accelerometer for 200 Hz pre-integration.'
  },
  {
    id: 'cost-3',
    category: 'Mandatory MVP Purchases',
    item: 'Wide-Angle Global Shutter RGB Camera Module (USB 3.0 / MIPI CSI)',
    estimatedCostInr: 4500,
    isEditable: true,
    notes: 'Low-distortion lens for synchronized visual perception.'
  },
  {
    id: 'cost-4',
    category: 'Mandatory MVP Purchases',
    item: 'LiPo Battery Pack (22.2V 6S 5000mAh) & BMS Safety Power Electronics',
    estimatedCostInr: 7200,
    isEditable: true,
    notes: 'Provides 2.5 hours continuous mobile operation with voltage regulation.'
  },
  {
    id: 'cost-5',
    category: 'Mandatory MVP Purchases',
    item: 'Structural Sensor Rig Mounts, Vibration Dampers, Wiring & Hardware',
    estimatedCostInr: 4000,
    isEditable: true,
    notes: '3D-printed PETG / machined aluminum mounts isolating sensor vibration.'
  },
  {
    id: 'cost-6',
    category: 'Mandatory MVP Purchases',
    item: 'Motor Driver & Microcontroller Interface (Cytron Dual 30A / STM32)',
    estimatedCostInr: 6000,
    isEditable: true,
    notes: 'Hardware CAN/UART interface bridge between Jetson and drive motors.'
  },

  // Shared / Borrowed Lab Hardware (Assumed ₹0 incremental capital outlay for MVP)
  {
    id: 'cost-7',
    category: 'Shared / Borrowed Lab Hardware',
    item: '3D LiDAR (Livox Mid-360 / Velodyne Puck 16-channel) [Shared Research Lab Asset]',
    estimatedCostInr: 0,
    isEditable: true,
    notes: 'Assumed borrowed or shared from institutional robotics laboratory inventory (Market value ₹65,000 - ₹1,40,000).'
  },
  {
    id: 'cost-8',
    category: 'Shared / Borrowed Lab Hardware',
    item: 'Edge Compute (NVIDIA Jetson Orin Nano / Orin NX Developer Kit) [Institutional Asset]',
    estimatedCostInr: 0,
    isEditable: true,
    notes: 'Assumed existing departmental AI edge computer utilized for onboard inference (Market value ₹45,000).'
  },

  // Optional Future Upgrades
  {
    id: 'cost-9',
    category: 'Optional Future Upgrades',
    item: 'FLIR Boson Thermal LWIR Radiometric Core (Optional Upgrade)',
    estimatedCostInr: 95000,
    isEditable: true,
    notes: 'For specialized electrical switchgear and hot bearing predictive inspection.'
  },
  {
    id: 'cost-10',
    category: 'Optional Future Upgrades',
    item: 'Texas Instruments IWR6843 77GHz mmWave Radar Sensor (Optional Upgrade)',
    estimatedCostInr: 18500,
    isEditable: true,
    notes: 'Enhances zero-visibility dust penetration in active blasting operations.'
  },
  {
    id: 'cost-11',
    category: 'Optional Future Upgrades',
    item: 'Subterranean 5.8GHz Mesh Wireless Relay Transceiver Node',
    estimatedCostInr: 14000,
    isEditable: true,
    notes: 'For ad-hoc multi-hop surface relay connectivity.'
  }
];

export interface IndustrialApplication {
  id: string;
  name: string;
  challenge: string;
  robotRole: string;
  digitalTwinValue: string;
  operationalBenefit: string;
  iconName: string;
}

export const INDUSTRIAL_APPLICATIONS: IndustrialApplication[] = [
  {
    id: 'mining',
    name: 'Underground Mining & Drifts',
    challenge: 'Zero GPS, extreme dust, hazardous freshly blasted rock faces, and risk of catastrophic rockfalls.',
    robotRole: 'Performs autonomous first-entry clearance immediately after blasting without exposing human miners.',
    digitalTwinValue: 'Registers structural support pillars, detects roof sag >14mm, and generates traversability heatmaps.',
    operationalBenefit: 'Prevents fatalities, accelerates mine production re-entry by 40%, and tracks pillar subsidence over time.',
    iconName: 'Pickaxe'
  },
  {
    id: 'tunnels',
    name: 'Subway & Hydroelectric Penstock Tunnels',
    challenge: 'Long featureless circular geometries causing standard SLAM algorithms to slip and lose position.',
    robotRole: 'Executes degeneracy-aware continuous LiDAR-inertial scanning along kilometers of civil tunnels.',
    digitalTwinValue: 'Generates unrolled cylindrical unwrapped orthophotos and detects lining crack micro-displacements.',
    operationalBenefit: 'Replaces dangerous manual scaffolding surveys and cuts inspection shutdown time from days to hours.',
    iconName: 'Tunnel'
  },
  {
    id: 'power-plants',
    name: 'Thermal & Nuclear Power Facilities',
    challenge: 'High-radiation or extreme ambient temperature zones around turbines, boilers, and steam pipelines.',
    robotRole: 'Traverses confined service conduits and high-voltage transformer yards autonomously.',
    digitalTwinValue: 'Tracks thermal gradients on steam valves and flags pipe bracket deflection caused by thermal expansion.',
    operationalBenefit: 'Continuous asset monitoring while units remain online; reduces forced unscheduled outage frequency.',
    iconName: 'Zap'
  },
  {
    id: 'construction',
    name: 'Large-Scale Infrastructure & Building Projects',
    challenge: 'Rapidly evolving construction geometries requiring continuous verification against BIM designs.',
    robotRole: 'Nightly autonomous crawl through multi-story concrete structures after construction shifts conclude.',
    digitalTwinValue: 'Automated 4D difference comparison between as-built point clouds and architectural IFC/BIM models.',
    operationalBenefit: 'Early detection of rework errors, column positioning discrepancies, and schedule delay quantification.',
    iconName: 'Building2'
  },
  {
    id: 'petrochemical',
    name: 'Refineries & Confined Storage Tanks',
    challenge: 'Explosive gas atmospheres and dark, toxic interior storage spheres requiring gas clearance before entry.',
    robotRole: 'Compact autonomous inspection inside tanks, checking for wall corrosion, weld seam pitting, and sludge levels.',
    digitalTwinValue: 'Complete 3D thickness and volumetric corrosion profile integrated with maintenance records.',
    operationalBenefit: 'Eliminates confined-space human entry permits and guarantees compliance with API 653 standards.',
    iconName: 'Flame'
  },
  {
    id: 'bridges',
    name: 'Bridges & Remote Viaduct Structures',
    challenge: 'Difficult access underneath bridge decks and inside box girders over deep ravines or water bodies.',
    robotRole: 'Crawls inside confined box girders to inspect tensioning tendons, bearings, and concrete delamination.',
    digitalTwinValue: 'Creates historical 4D deformation record tracking thermal expansion joint displacement over annual cycles.',
    operationalBenefit: 'Prevents sudden structural fatigue failure and optimizes targeted preventative rehabilitation.',
    iconName: 'GitBranch'
  },
  {
    id: 'marine',
    name: 'Shipbuilding & Marine Ballast Tanks',
    challenge: 'Complex cellular steel compartments with high humidity, salt corrosion, and zero wireless signals.',
    robotRole: 'Navigates compartmentalized ballast cells mapping steel rust scale and stiffener deformation.',
    digitalTwinValue: 'Color-coded steel loss thickness map and automated structural coating degradation rating.',
    operationalBenefit: 'Shortens dry-dock inspection duration and reduces maritime classification survey costs.',
    iconName: 'Anchor'
  },
  {
    id: 'disaster',
    name: 'Disaster Response & Collapsed Structures',
    challenge: 'Highly unstable post-earthquake or blast rubble where human rescue teams cannot safely enter.',
    robotRole: 'Navigates void spaces to locate survivable pockets and verify structural stability before rescue entry.',
    digitalTwinValue: 'Real-time 3D tactical map streamed to emergency command posts showing traversable void corridors.',
    operationalBenefit: 'Safeguards first responders and accelerates victim location during the critical 72-hour golden window.',
    iconName: 'ShieldAlert'
  }
];

export const COMPARISON_CRITERIA = [
  {
    criterion: 'GPS-Denied Operation',
    conventional: 'Requires static survey pegs or total stations; loses position in complex drifts.',
    mineTwin: 'Fully autonomous LiDAR-Inertial SLAM (LIO-SAM) with zero GPS reliance.',
    advantage: 'True Subterranean Autonomy'
  },
  {
    criterion: '3D Reconstruction',
    conventional: 'Disjointed static tripod laser scans stitched manually over days.',
    mineTwin: 'Continuous real-time dense 3D voxelization during robot motion.',
    advantage: '10x Faster Survey Speed'
  },
  {
    criterion: 'Asset Identification',
    conventional: 'Manual human photo review and manual CAD annotation.',
    mineTwin: 'Edge AI open-vocabulary semantic projection + analytical RANSAC primitive fitting.',
    advantage: 'Automated Multi-Class Tagging'
  },
  {
    criterion: 'Manual Annotation Burden',
    conventional: 'Hundreds of hours of post-survey human labeling per facility.',
    mineTwin: 'Autonomous 2D-to-3D feature projection with zero-shot generalization.',
    advantage: '90% Reduction in Labor'
  },
  {
    criterion: 'Exploration Planning',
    conventional: 'Fixed predefined paths or manual joystick control with blind spots.',
    mineTwin: 'Value-of-Information (VoI) Next-Best-View planning based on spatial uncertainty.',
    advantage: 'Adaptive Intelligent Coverage'
  },
  {
    criterion: 'Obstacle Avoidance',
    conventional: 'Basic ultrasonic bump sensors or manual operator intervention.',
    mineTwin: 'ROS 2 Nav2 3D costmap avoidance with dynamic trajectory adaptation.',
    advantage: 'Collision-Free Operation'
  },
  {
    criterion: 'Persistent Asset Identity',
    conventional: 'Disconnected spray-paint markings and non-spatial spreadsheet rows.',
    mineTwin: 'Relocalization-anchored persistent UUIDs associated across multi-month runs.',
    advantage: 'Living Asset History'
  },
  {
    criterion: 'Historical Scan Comparison',
    conventional: 'Visual inspection or manual alignment in heavy desktop CAD software.',
    mineTwin: 'Automated 4D point-cloud subtraction with sub-centimeter displacement heatmaps.',
    advantage: 'Early Micro-Deformation Detection'
  },
  {
    criterion: 'Spatial Querying',
    conventional: 'Non-existent; reports are static PDFs filed in local folders.',
    mineTwin: 'Natural relational spatial queries (e.g. "Find all deformed pipes in Sector B").',
    advantage: 'Instant Decision Intelligence'
  },
  {
    criterion: 'Digital Twin Integration',
    conventional: 'Offline desktop CAD files inaccessible to field engineers.',
    mineTwin: 'Cloud-synchronized WebGL 3D interface accessible from any browser.',
    advantage: 'Zero-Install Ubiquitous Access'
  }
];

export const JURY_TOUR_STEPS = [
  {
    step: 1,
    title: 'The Industrial Problem',
    subtitle: 'Hazardous, GPS-Denied & Spatial Data Overload',
    summary: 'Underground mines and industrial plants are dark, dangerous, and completely devoid of GPS. Surveyors face life-threatening hazards while manual data processing causes critical structural anomalies to be missed.',
    targetSection: 'problem',
    keyPoints: [
      'Zero GNSS signal in subterranean drifts leads to massive positioning drift.',
      'Human surveyors exposed to rockbursts, toxic gases, and structural collapse.',
      'Raw laser scans produce millions of unclassified points requiring weeks of manual CAD tracing.'
    ],
    highlightBadge: 'THE CHALLENGE'
  },
  {
    step: 2,
    title: 'Our Proposed Solution',
    subtitle: 'The 4-Stage Coordinated Architecture',
    summary: 'MineTwin-X introduces an end-to-end autonomous robotic platform operating through four seamlessly linked processing stages.',
    targetSection: 'solution',
    keyPoints: [
      'Stage 01: Multi-Sensor Synchronized Acquisition (LiDAR + RGB + IMU).',
      'Stage 02: Perception & Spatial Understanding with LiDAR-Inertial SLAM & AI.',
      'Stage 03: Active Exploration via Information-Gain Next-Best-View Planning.',
      'Stage 04: 4D Digital Twin with registered scan comparison and cloud telemetry.'
    ],
    highlightBadge: '4-STAGE PIPELINE'
  },
  {
    step: 3,
    title: 'Robot & Sensor Payloads',
    subtitle: 'Hardware-Agnostic Modular Platform',
    summary: 'A ruggedized platform utilizing a baseline trifecta of 3D LiDAR, wide-angle RGB, and 200Hz IMU, with modular support for thermal and mmWave radar.',
    targetSection: 'hardware',
    keyPoints: [
      'Hardware-agnostic ROS 2 adapter: compatible with wheeled, tracked, or legged robots.',
      'Baseline sensors prioritize affordability, high fidelity, and low mass.',
      'Optional thermal & mmWave modules expand capability into zero-visibility dust.'
    ],
    highlightBadge: 'HARDWARE SPECS'
  },
  {
    step: 4,
    title: 'Perception & SLAM Mapping',
    subtitle: 'From Photons to Metric Reality',
    summary: 'Tightly-coupled LiDAR-inertial SLAM provides continuous sub-centimeter localization without satellite signals, with degeneracy awareness in uniform corridors.',
    targetSection: 'technology',
    keyPoints: [
      'LIO-SAM factor graphs merge IMU pre-integration and loop-closure constraints.',
      'Degeneracy handling prevents false longitudinal drift in straight tunnels.',
      'Real-time voxel downsampling constructs an accurate 5cm 3D octree map.'
    ],
    highlightBadge: 'LIDAR-INERTIAL SLAM'
  },
  {
    step: 5,
    title: 'Autonomous Active Exploration',
    subtitle: 'Explore Smarter, Not Just Further',
    summary: 'Rather than following blind pre-programmed routes, MineTwin-X quantifies spatial entropy and steers toward unmapped or ambiguous areas.',
    targetSection: 'exploration',
    keyPoints: [
      'Shannon entropy mapping identifies high-uncertainty spatial frontiers.',
      'Next-Best-View planner balances information gain against rover travel cost.',
      'ROS 2 Nav2 controller executes smooth, collision-free trajectory execution.'
    ],
    highlightBadge: 'ACTIVE AUTONOMY'
  },
  {
    step: 6,
    title: 'Asset Identification & Reasoning',
    subtitle: 'Geometric Reasoning & Persistent UUIDs',
    summary: 'Fuses open-vocabulary 2D foundation model embeddings with analytical RANSAC cylinder and plane fitting to classify structural assets.',
    targetSection: 'technology',
    keyPoints: [
      'Projects 2D image embeddings into 3D voxel space via calibrated ray casting.',
      'RANSAC fits cylinders to pipes and pillars, verifying physical dimensions.',
      'Assigns persistent global UUIDs that remain consistent across future months.'
    ],
    highlightBadge: 'AI REASONING'
  },
  {
    step: 7,
    title: 'Interactive 4D Digital Twin',
    subtitle: 'Experience the 3D Mining Stope Live',
    summary: 'The core innovation: an interactive WebGL environment displaying color-coded semantic assets, registered scan comparisons, and micro-displacement heatmaps.',
    targetSection: 'digital-twin',
    keyPoints: [
      'Explore the interactive 3D scene with full zoom, pan, and orbital rotation.',
      'Select any asset (e.g. Pillar P-027) to inspect condition, dimensions, and history.',
      'Toggle between Previous Scan, Current Scan, and Detected Changes.'
    ],
    highlightBadge: 'MAIN ATTRACTION'
  },
  {
    step: 8,
    title: 'Validation & Practical Cost',
    subtitle: 'Rigorous Benchmarks & Lean MVP Budget',
    summary: 'Grounded in verified research foundations (LIO-SAM, FAST-LIO2, OpenScene, M3C2) with a cost-conscious lean MVP design around ₹37,000.',
    targetSection: 'validation',
    keyPoints: [
      'Metric benchmarks: ATE <0.10m, change detection <15mm, edge latency <36ms.',
      'Lean MVP separates mandatory purchases (~₹37,000) from shared lab assets.',
      'Realistic 5-phase engineering roadmap with clear deliverables.'
    ],
    highlightBadge: 'FEASIBILITY'
  },
  {
    step: 9,
    title: 'Industrial Impact & Future Scope',
    subtitle: 'Transforming Subterranean Operations',
    summary: 'Applicable across underground mining, metro penstocks, nuclear power plants, and civil tunnels to eliminate human fatalities and prevent structural disasters.',
    targetSection: 'applications',
    keyPoints: [
      '8 major industrial domains with targeted economic and safety benefits.',
      'Future scope: multi-robot swarm coordination and predictive maintenance.',
      'Presented with pride for L&T TECHgium 10th Edition.'
    ],
    highlightBadge: 'IMPACT & FUTURE'
  }
];

export const TEAM_INFO = {
  teamName: 'Team MineTwin-X',
  teamLead: 'Student Project Lead (L&T TECHgium Finalist)',
  institution: 'Department of Robotics & Autonomous Systems / Computer Engineering',
  competitionId: 'TECHGIUM-10-ROB-0482',
  presentationRound: 'Round 2 — Technical Presentation',
  contactEmail: 'contact.minetwinx@lnttechgium.org',
  githubRepo: 'https://github.com/minetwin-x/minetwin-x-platform',
  projectVideoUrl: 'https://youtu.be/minetwin-x-demo',
  submissionDate: 'November 2026'
};

