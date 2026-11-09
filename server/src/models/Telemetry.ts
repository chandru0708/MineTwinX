import mongoose, { Schema, Document } from 'mongoose';

export interface ITelemetryRecord extends Document {
  timestamp: string;
  robotPose: {
    x: number;
    y: number;
    z: number;
    yaw: number;
  };
  batteryPercent: number;
  cpuLoadPercent: number;
  activeSensors: {
    lidar3d: boolean;
    rgbCamera: boolean;
    imu: boolean;
    thermalCamera?: boolean;
    mmWave?: boolean;
  };
  currentSector: string;
  linearVelocity: number;
  angularVelocity: number;
}

const TelemetrySchema: Schema = new Schema(
  {
    timestamp: { type: String, required: true, default: () => new Date().toISOString() },
    robotPose: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      z: { type: Number, required: true },
      yaw: { type: Number, required: true },
    },
    batteryPercent: { type: Number, required: true, min: 0, max: 100 },
    cpuLoadPercent: { type: Number, required: true, min: 0, max: 100 },
    activeSensors: {
      lidar3d: { type: Boolean, default: true },
      rgbCamera: { type: Boolean, default: true },
      imu: { type: Boolean, default: true },
      thermalCamera: { type: Boolean, default: false },
      mmWave: { type: Boolean, default: false },
    },
    currentSector: { type: String, required: true },
    linearVelocity: { type: Number, default: 0 },
    angularVelocity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const TelemetryModel = mongoose.model<ITelemetryRecord>('Telemetry', TelemetrySchema);
