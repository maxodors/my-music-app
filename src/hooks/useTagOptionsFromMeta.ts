import { useEffect, useState } from 'react';
import { fetchTagOptionsFromMeta } from 'src/utils/musicUtils';

export function useTagOptionsFromMeta() {
  const [tagOptions, setTagOptions] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTagOptionsFromMeta()
      .then((data) => {
        setTagOptions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch tag options:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { tagOptions, loading, error };
}
