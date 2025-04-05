import { Request, Response } from 'express';
import { fetchMetadata, fetchFilteredTracks } from '../services/trackService';
import { fetchTagOptions } from '../services/tagOptionService';

export const getTracks = async (req: Request, res: Response) => {
  try {
    const result = await fetchFilteredTracks(req.body);
    res.json(result);
  } catch (err) {
    console.error('[getTracks]', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMetadata = async (_req: Request, res: Response) => {
  try {
    const columns = await fetchMetadata();
    res.json({ columns }); 
  } catch (err) {
    console.error('[getMetadata]', err);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
};

export const getTagOptions = async (_req: Request, res: Response) => {
  try {
    const tags = await fetchTagOptions();
    res.json(tags);
  } catch (err) {
    console.error('[getTagOptions]', err);
    res.status(500).json({ error: 'Failed to fetch tag options' });
  }
};