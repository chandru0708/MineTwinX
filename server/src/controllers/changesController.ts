import { Request, Response } from 'express';
import { mockAssets } from '../data/mockDatabase.js';

export const getDetectedChanges = (req: Request, res: Response) => {
  const assetsWithChanges = mockAssets.filter(a => a.hasGeometricChange);

  const changes = assetsWithChanges.map(a => ({
    assetId: a.id,
    assetName: a.name,
    classType: a.classType,
    position: a.position,
    ...a.changeDetails
  }));

  res.json({
    success: true,
    total: changes.length,
    data: changes
  });
};

export const getScanData = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      registeredScanFrame: 'lio_sam_map_origin',
      scanTimestamp: '2026-11-09T08:15:00Z',
      pointCount: 1845000,
      voxelResolutionM: 0.05,
      coordinateSystem: 'Mine Local Grid EPSG:Custom (GPS-Denied Localized)',
      uncertaintyStdDevMm: 6.8,
      status: 'DEMO MODE: Synthesized from multi-session point clouds'
    }
  });
};

