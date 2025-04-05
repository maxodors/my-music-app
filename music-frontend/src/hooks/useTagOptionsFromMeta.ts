import { useEffect, useState } from 'react';

export const useTagOptionsFromMeta = () => {
  const [tagOptions, setTagOptions] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('http://localhost:4000/api/tags');
        const data = await res.json();
        setTagOptions(data);
      } catch (err) {
        setError('Ошибка загрузки тегов.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  return { tagOptions, loading, error };
};
