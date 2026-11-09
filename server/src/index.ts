import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import { config } from './config/index.js';
import { apiRouter } from './routes/apiRoutes.js';
import { setupTelemetrySocket } from './sockets/telemetrySocket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Setup WebSockets
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

setupTelemetrySocket(io);

// Static file serving for production client build
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    }
  });
} else {
  // Root fallback in development if client/dist is not yet built
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to MineTwin-X API Gateway',
      documentation: '/api/health',
      status: 'ONLINE',
      mode: 'DEMO MODE (Simulated Telemetry)',
      competition: config.projectInfo.competition
    });
  });
}

// Start server
server.listen(config.port, () => {
  console.log(`=======================================================`);
  console.log(`🚀 MineTwin-X Server running on http://localhost:${config.port}`);
  console.log(`📡 WebSocket Gateway ready on ws://localhost:${config.port}`);
  console.log(`⚙️ Mode: ${config.demoMode ? 'DEMO MODE (Simulated Telemetry)' : 'LIVE'}`);
  console.log(`=======================================================`);
});
