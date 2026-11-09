# MineTwin-X 🚀
### An Autonomous Multimodal 4D Digital Twin and Intelligent Inspection Robot for GPS-Denied Environments

**Competition:** L&T TECHgium — 10th Edition (Presentation Round 2)  
**Domain:** Robotics & Autonomous Systems  
**Identity:** Hardware-Agnostic Autonomous Inspection Platform & Cloud-Synchronized 4D Digital Twin  

---

## 🌟 Executive Summary

**MineTwin-X** is an autonomous industrial inspection and 4D spatial intelligence system developed for hazardous, GPS-deprived environments such as underground mines, hydroelectric penstocks, civil tunnels, and confined industrial facilities.

Conventional inspection workflows rely on hazardous manual walk-throughs or disjointed static tripod laser scans that produce millions of unclassified, raw 3D points requiring weeks of manual CAD tracing.

MineTwin-X resolves this crisis through a **4-stage coordinated engineering pipeline**:
1. **Multi-Sensor Synchronized Acquisition:** 360° 3D LiDAR, wide-angle RGB optical camera, and 200 Hz 6-DoF IMU pre-integration (with modular expansion for thermal LWIR and 77GHz mmWave radar).
2. **Perception & Spatial Understanding:** Tightly-coupled LiDAR-Inertial SLAM (LIO-SAM) with corridor degeneracy mitigation, open-vocabulary 2D-to-3D foundation model projection, and RANSAC analytical primitive fitting (cylinders for pillars/pipes, planes for walls/floors).
3. **Active Exploration & Autonomy:** Value-of-Information (VoI) frontier planning based on Shannon spatial entropy, driving the robot to unobserved occlusions, paired with real-time ROS 2 Nav2 dynamic obstacle avoidance.
4. **4D Digital Twin & Temporal Subtraction:** Persistent UUID asset indexing across repeated monthly missions, sub-centimeter geometric point-cloud subtraction, and an interactive WebGL 3D browser platform.

---

## 🏛️ System Architecture

```
                          [ MULTI-SENSOR ACQUISITION ]
              (Livox Mid-360 LiDAR, RGB Camera, 6-DoF IMU, Radar/Thermal)
                                      │
                                      ▼
                        [ SENSOR SYNCHRONIZATION ]
                        (Hardware PTP/PPS Time-Sync)
                                      │
                                      ▼
                    [ TIGHTLY-COUPLED LIDAR-INERTIAL SLAM ]
                     (LIO-SAM Factor Graphs & ikd-Tree)
                                      │
               ┌──────────────────────┴──────────────────────┐
               ▼                                             ▼
     [ DENSE 3D VOXEL MAP ]                     [ OPEN-VOCABULARY 2D VISION ]
     (Octree 5cm Downsampling)                    (CLIP / OWL-ViT Embeddings)
               │                                             │
               └──────────────────────┬──────────────────────┘
                                      ▼
                       [ 2D-TO-3D SEMANTIC PROJECTION ]
                     P_3D = T_lidar_cam · K⁻¹ · [u, v, 1]ᵀ
                                      │
                                      ▼
                      [ RANSAC GEOMETRIC REASONING ]
                    (Cylinder & Planar Primitive Fitting)
                                      │
                                      ▼
                  [ SHANNON ENTROPY UNCERTAINTY ESTIMATION ]
                                      │
                                      ▼
                 [ ACTIVE EXPLORATION & NEXT-BEST-VIEW (NBV) ]
                     J(v) = α·IG(v) + β·Uncertainty - Cost
                                      │
                                      ▼
                      [ ROS 2 NAV2 LOCAL CONTROLLER ]
                      (Dynamic Real-Time Obstacle Avoid)
                                      │
                                      ▼
                 [ 4D DIGITAL TWIN & TEMPORAL SUBTRACTION ]
                     (M3C2 Multi-Mission Deformation Δ)
                                      │
                                      ▼
                   [ WEBGL CLOUD DASHBOARD & SPATIAL QUERY ]
```

---

## 📦 Project Structure

```
MineTwinX/
├── client/                     # React + Vite + TypeScript Frontend
│   ├── public/                 # Static assets & SVG favicon
│   ├── src/
│   │   ├── digital-twin/       # Three.js & React Three Fiber components
│   │   │   ├── MiningTunnelScene.tsx  # 3D underground stope, arches, point clouds
│   │   │   ├── Asset3DObject.tsx      # Semantic 3D selectable mesh objects
│   │   │   ├── Rover3D.tsx            # Inspection rover model with LiDAR sweep
│   │   │   └── DigitalTwinViewer.tsx  # Canvas HUD, search bar, scan switcher, drawer
│   │   ├── guided-tour/        # Dedicated 9-step Jury Experience Walkthrough
│   │   ├── sections/           # 17 interactive deep-dive sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ProblemSection.tsx
│   │   │   ├── SolutionSection.tsx
│   │   │   ├── HardwareSection.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── ExplorationSection.tsx
│   │   │   ├── DigitalTwinSection.tsx
│   │   │   ├── PersistentAssetSection.tsx
│   │   │   ├── DifferentiationSection.tsx
│   │   │   ├── ResearchSection.tsx
│   │   │   ├── ValidationSection.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   ├── CostSection.tsx
│   │   │   ├── ApplicationsSection.tsx
│   │   │   ├── FutureScopeSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── components/         # Navigation, badges, HUD widgets
│   │   ├── data/               # Project specifications, research citations, metrics
│   │   ├── services/           # REST API & Socket.IO client with resilient fallback
│   │   ├── types/              # Full TypeScript definitions
│   │   └── index.css           # Tailwind custom styling & cybernetic glassmorphism
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── config/             # Environment & runtime settings
│   │   ├── data/               # Mock datasets & relational asset schema
│   │   ├── controllers/        # REST endpoint handlers
│   │   ├── routes/             # API router declarations
│   │   ├── sockets/            # Live telemetry WebSocket broadcaster
│   │   └── index.ts            # Server entrypoint with static serving support
│   ├── package.json
│   └── tsconfig.json
├── package.json                # Root concurrent scripts
├── render.yaml                 # Render cloud deployment blueprint
├── .env.example                # Sample environment configuration
└── README.md                   # This master documentation
```

---

## ⚡ Quickstart & Local Execution

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **NPM:** v9.0.0 or higher

### 1. Installation
Install all dependencies for root, client, and server:
```bash
npm run install:all
```
*(Or individually: `cd client && npm install` and `cd server && npm install`)*

### 2. Development Mode
Run both backend and frontend concurrently:
```bash
npm run dev
```
- **Frontend Web Application:** [http://localhost:5173](http://localhost:5173)
- **Backend API Gateway:** [http://localhost:5000](http://localhost:5000)
- **WebSocket Telemetry Stream:** `ws://localhost:5000`

### 3. Production Build & Execution
Build the client and server for production deployment:
```bash
npm run build
npm start
```
The server will automatically serve the built client from `client/dist` on port 5000 with unified REST endpoints and WebSocket telemetry.

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service status, mode, and backend diagnostics |
| `GET` | `/api/assets` | Query all semantic assets (supports `?classType=`, `?search=`, `?hasChange=`) |
| `GET` | `/api/assets/:id` | Fetch detailed asset metadata, dimensions, and change history |
| `GET` | `/api/missions` | Retrieve 4D historical inspection missions (Missions 01 - 04) |
| `GET` | `/api/missions/:id` | Retrieve specific mission telemetry and key findings |
| `GET` | `/api/changes` | List all assets exhibiting verified geometric displacements |
| `GET` | `/api/scans` | Point cloud registration metadata, coordinate frame, and voxel settings |
| `GET` | `/api/analytics` | High-level metrics, class distribution, and accuracy statistics |
| `GET` | `/api/robot/status` | Real-time simulated robot telemetry (XYZ pose, battery, SLAM drift) |
| `GET` | `/api/sensors/status`| Operational status of all primary and optional sensor payloads |

---

## 📚 Academic & Research Foundations

All algorithmic choices in MineTwin-X are grounded in peer-reviewed literature:
1. **LIO-SAM:** T. Shan et al., *IROS 2020* — [DOI: 10.1109/IROS45743.2020.9341176](https://doi.org/10.1109/IROS45743.2020.9341176)
2. **FAST-LIO2:** W. Xu et al., *IEEE T-RO 2022* — [DOI: 10.1109/TRO.2022.3141876](https://doi.org/10.1109/TRO.2022.3141876)
3. **OpenScene:** S. Peng et al., *CVPR 2023* — [DOI: 10.1109/CVPR52729.2023.00815](https://doi.org/10.1109/CVPR52729.2023.00815)
4. **Active NBV Planner:** A. Bircher et al., *ICRA 2016* — [DOI: 10.1109/ICRA.2016.7487229](https://doi.org/10.1109/ICRA.2016.7487229)
5. **M3C2 Point-Cloud Comparison:** D. Lague et al., *ISPRS 2013* — [DOI: 10.1016/j.isprsjprs.2013.04.009](https://doi.org/10.1016/j.isprsjprs.2013.04.009)
6. **ROS 2 Nav2:** S. Macenski et al., *IROS 2020* — [DOI: 10.1109/IROS45743.2020.9341207](https://doi.org/10.1109/IROS45743.2020.9341207)

---

## 💰 Cost-Conscious MVP Architecture

To ensure immediate academic viability, the initial prototype cost assumes access to institutional lab equipment:
- **Shared / Borrowed Lab Assets (₹0 Outlay):** 3D LiDAR (Livox Mid-360) and NVIDIA Jetson Orin edge computer.
- **Mandatory Purchases (~₹37,000 Preliminary Planning Assumption):** 4WD heavy-duty chassis, 6-DoF industrial IMU, global shutter RGB camera, LiPo 6S power system, structural vibration dampening mounts, and Cytron motor drivers.
- **Optional Upgrades:** FLIR LWIR radiometric core and TI 77GHz mmWave radar for zero-visibility particulate penetration.

---

## 🏆 L&T TECHgium 10th Edition Presentation Compliance

- **Capability Status Transparency:** Every module is clearly tagged as `[PROPOSED]`, `[IN DEVELOPMENT]`, or `[DEMO MODE]`.
- **Honest Evaluation Standards:** Benchmark values are explicitly marked illustrative/simulation targets; no fabricated physical test claims.
- **Standalone Evaluator Experience:** The platform features a dedicated **Jury Experience Mode** that guides judges step-by-step through the industrial problem, robotics hardware, algorithms, interactive 3D twin, validation, and cost feasibility.

**MineTwin-X: Autonomous Intelligence. Spatial Understanding. Industrial Transformation.**

