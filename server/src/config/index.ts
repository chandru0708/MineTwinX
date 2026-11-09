import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
  demoMode: true,
  projectInfo: {
    name: 'MineTwin-X',
    title: 'An Autonomous Multimodal 4D Digital Twin and Intelligent Inspection Robot for GPS-Denied Environments',
    competition: 'L&T TECHgium — 10th Edition (Presentation Round 2)',
    domain: 'Robotics & Autonomous Systems'
  }
};

