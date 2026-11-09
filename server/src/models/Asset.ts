import mongoose, { Schema, Document } from 'mongoose';

export interface IAsset extends Document {
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
  position: [number, number, number];
  condition: string;
  confidence: number;
  lastInspection: Date;
  firstDiscovered: Date;
  hasGeometricChange: boolean;
  changeDetails?: {
    previousGeometry: string;
    currentGeometry: string;
    displacementMm: number;
    detectionConfidence: number;
    reviewStatus: string;
    notes: string;
  };
  attributes: Map<string, any>;
}

const AssetSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  classType: {
    type: String,
    enum: ['pillar', 'equipment', 'pipe', 'fence', 'pathway', 'human', 'unknown'],
    required: true,
    index: true
  },
  dimensions: {
    height: { type: Number, required: true },
    width: { type: Number },
    depth: { type: Number },
    radius: { type: Number },
    length: { type: Number }
  },
  position: {
    type: [Number],
    required: true,
    validate: [(val: number[]) => val.length === 3, 'Position must have [x, y, z] coordinates']
  },
  condition: { type: String, required: true },
  confidence: { type: Number, required: true },
  lastInspection: { type: Date, default: Date.now },
  firstDiscovered: { type: Date, default: Date.now },
  hasGeometricChange: { type: Boolean, default: false, index: true },
  changeDetails: {
    previousGeometry: { type: String },
    currentGeometry: { type: String },
    displacementMm: { type: Number },
    detectionConfidence: { type: Number },
    reviewStatus: { type: String },
    notes: { type: String }
  },
  attributes: { type: Map, of: Schema.Types.Mixed }
}, {
  timestamps: true
});

export const AssetModel = mongoose.models.Asset || mongoose.model<IAsset>('Asset', AssetSchema);
