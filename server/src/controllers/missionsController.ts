import { Request, Response } from 'express';
import { mockMissions } from '../data/mockDatabase.js';

export const getAllMissions = (req: Request, res: Response) => {
  res.json({
    success: true,
    total: mockMissions.length,
    data: mockMissions
  });
};

export const getMissionById = (req: Request, res: Response) => {
  const idStr = String(req.params.id);
  const mission = mockMissions.find(m => m.id.toLowerCase() === idStr.toLowerCase());

  if (!mission) {
    return res.status(404).json({
      success: false,
      message: `Mission with ID '${idStr}' not found.`
    });
  }

  res.json({
    success: true,
    data: mission
  });
};
