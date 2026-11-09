import { Request, Response } from 'express';
import { mockRobotTelemetry } from '../data/mockDatabase.js';

export const getRobotStatus = (req: Request, res: Response) => {
  // Return current telemetry with slight dynamic jitter for realism in demo mode
  const jitterX = (Math.random() - 0.5) * 0.05;
  const jitterY = (Math.random() - 0.5) * 0.05;
  const currentTelemetry = {
    ...mockRobotTelemetry,
    position: {
      ...mockRobotTelemetry.position,
      x: +(mockRobotTelemetry.position.x + jitterX).toFixed(2),
      z: +(mockRobotTelemetry.position.z + jitterY).toFixed(2)
    },
    batteryLevel: +(84 - Math.sin(Date.now() / 100000) * 2).toFixed(1),
    timestamp: new Date().toISOString()
  };
  res.json({
    success: true,
    data: currentTelemetry
  });
};

export const getSensorsStatus = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockRobotTelemetry.activeSensors
  });
};

