import { useEffect, useState } from 'react';
import { FilterRequest, RowData } from 'common/types/app';

interface TrackResponse {
  results: RowData[];
  total: number;
  page: number;
  pages: number;
}

export function useFilteredTracks(requestBody: FilterRequest) {
  const [data, setData] = useState<TrackResponse>({
    results: [],
    total: 0,
    page: 1,
    pages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
  
    setLoading(true);
    setError(null);
  
    fetch('http://localhost:4000/api/tracks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then((json: TrackResponse) => {
        setData(json);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('❌ Failed to fetch tracks:', err);
          setError('Failed to load data.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  
    return () => {
      controller.abort();
    };
  }, [JSON.stringify(requestBody)]);
  

  return { ...data, loading, error };
}
