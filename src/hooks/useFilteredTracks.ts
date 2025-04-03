import { useEffect, useState } from 'react';
import { FilterRequest, RowData } from 'types/app';

interface TrackResponse {
  results: RowData[];
  total: number;
  page: number;
  pages: number;
}

export function useFilteredTracks(
  requestBody: FilterRequest
) {
  const [data, setData] = useState<TrackResponse>({
    results: [],
    total: 0,
    page: 1,
    pages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.debug('[useFilteredTracks] Sending request:', requestBody);
  
  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:4000/tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch tracks:', err);
        setError('Failed to load data.');
        setLoading(false);
      });
  }, [JSON.stringify(requestBody)]); // Re-run if requestBody changes

  return { ...data, loading, error };
}
