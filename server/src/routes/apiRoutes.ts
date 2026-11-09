import { Router } from 'express';
import { getRobotStatus, getSensorsStatus } from '../controllers/robotController.js';
import { getAllAssets, getAssetById } from '../controllers/assetsController.js';
import { getAllMissions, getMissionById } from '../controllers/missionsController.js';
import { getDetectedChanges, getScanData } from '../controllers/changesController.js';
import { getAnalytics } from '../controllers/analyticsController.js';

export const apiRouter = Router();

// Health Check
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'MineTwin-X Industrial Robotics Backend',
    mode: 'DEMO MODE',
    timestamp: new Date().toISOString()
  });
});

// Assets Endpoints
apiRouter.get('/assets', getAllAssets);
apiRouter.get('/assets/:id', getAssetById);

// Missions Endpoints
apiRouter.get('/missions', getAllMissions);
apiRouter.get('/missions/:id', getMissionById);

// Scan & Changes
apiRouter.get('/scans', getScanData);
apiRouter.get('/changes', getDetectedChanges);

// Analytics
apiRouter.get('/analytics', getAnalytics);

// Robot & Sensor Telemetry
apiRouter.get('/robot/status', getRobotStatus);
apiRouter.get('/sensors/status', getSensorsStatus);

