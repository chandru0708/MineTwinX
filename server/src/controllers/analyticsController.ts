import { Request, Response } from 'express';
import { mockAnalytics } from '../data/mockDatabase.js';

export const getAnalytics = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: mockAnalytics
  });
};

