import { Server } from 'socket.io';
import { mockRobotTelemetry } from '../data/mockDatabase.js';

export const setupTelemetrySocket = (io: Server) => {
  let simulatedHeading = 34.5;
  let simulatedX = -2.4;
  let simulatedZ = -10.8;
  let waypointIndex = 0;

  const waypoints = [
    { x: -2.4, z: -10.8 },
    { x: -5.0, z: -8.0 },
    { x: -8.0, z: -12.0 },
    { x: -3.0, z: -14.0 },
    { x: 2.0, z: -12.0 },
    { x: 6.0, z: -8.0 },
    { x: 0.0, z: -5.0 }
  ];

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Send initial status immediately
    socket.emit('robot:telemetry', {
      ...mockRobotTelemetry,
      timestamp: new Date().toISOString()
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });

  // Broadcast telemetry loop every 2 seconds
  setInterval(() => {
    // Smooth waypoint interpolation
    const targetWp = waypoints[waypointIndex];
    const dx = targetWp.x - simulatedX;
    const dz = targetWp.z - simulatedZ;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 0.3) {
      waypointIndex = (waypointIndex + 1) % waypoints.length;
    } else {
      simulatedX += (dx / dist) * 0.15;
      simulatedZ += (dz / dist) * 0.15;
      simulatedHeading = Math.atan2(dx, dz) * (180 / Math.PI);
    }

    const payload = {
      ...mockRobotTelemetry,
      position: {
        x: +simulatedX.toFixed(2),
        y: 0.35 + (Math.sin(Date.now() / 800) * 0.02),
        z: +simulatedZ.toFixed(2),
        headingDeg: +simulatedHeading.toFixed(1)
      },
      edgeComputeLoad: {
        cpuPercent: +(45 + Math.random() * 8).toFixed(1),
        gpuPercent: +(65 + Math.random() * 12).toFixed(1),
        memoryPercent: 54.0,
        inferenceFps: +(27 + Math.random() * 4).toFixed(1)
      },
      timestamp: new Date().toISOString()
    };

    io.emit('robot:telemetry', payload);
  }, 2000);
};

