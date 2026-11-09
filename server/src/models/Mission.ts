import mongoose, { Schema, Document } from 'mongoose';

export interface IMission extends Document {
  id: string;
  name: string;
  description: string;
  timestamp: Date;
  durationMinutes: number;
  distanceTraveledMeters: number;
  areaCoveredM2: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  keyFindings: string[];
}

const MissionSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  durationMinutes: { type: Number, required: true },
  distanceTraveledMeters: { type: Number, required: true },
  areaCoveredM2: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Completed', 'In Progress', 'Scheduled'],
    default: 'Completed'
  },
  keyFindings: [{ type: String }]
}, {
  timestamps: true
});

export const MissionModel = mongoose.models.Mission || mongoose.model<IMission>('Mission', MissionSchema);
