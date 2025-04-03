import { Request, Response } from 'express';
import { fetchFilteredTracks } from '../services/trackService';

export const getTracks = async (req: Request, res: Response) => {
  try {
    const result = await fetchFilteredTracks(req.body);
    res.json(result);
  } catch (err) {
    console.error('[getTracks]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
