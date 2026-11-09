import { Request, Response } from 'express';
import { mockAssets } from '../data/mockDatabase.js';

export const getAllAssets = (req: Request, res: Response) => {
  const { classType, condition, hasChange, search } = req.query;

  let filtered = [...mockAssets];

  if (classType && typeof classType === 'string' && classType !== 'all') {
    filtered = filtered.filter(a => a.classType.toLowerCase() === classType.toLowerCase());
  }

  if (condition && typeof condition === 'string') {
    filtered = filtered.filter(a => a.condition.toLowerCase().includes(condition.toLowerCase()));
  }

  if (hasChange !== undefined) {
    const isChange = hasChange === 'true';
    filtered = filtered.filter(a => a.hasGeometricChange === isChange);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = filtered.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.classType.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: filtered.length,
    data: filtered
  });
};

export const getAssetById = (req: Request, res: Response) => {
  const idStr = String(req.params.id);
  const asset = mockAssets.find(a => a.id.toLowerCase() === idStr.toLowerCase());

  if (!asset) {
    return res.status(404).json({
      success: false,
      message: `Asset with ID '${idStr}' not found in Digital Twin database.`
    });
  }

  res.json({
    success: true,
    data: asset
  });
};
