import type { RowData } from '../types';

export let cachedTracks: RowData[] | null = null;
export let lastFetchedTracks: number = 0;

export function clearTrackCache() {
  cachedTracks = null;
  lastFetchedTracks = 0;
}
