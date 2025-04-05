import { useEffect, useState } from 'react';
import { NocoDBColumn } from 'src/types';

const useMetaData = () => {
	const [metaData, setMetaData] = useState<NocoDBColumn[]>([]);
	const [metaError, setMetaError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchRecords() {
			try {
				const res = await fetch('http://localhost:4000/api/columns');
				const data = await res.json();

				setMetaData(Array.isArray(data.columns) ? data.columns : []);
			} catch (err) {
				setMetaError('Ошибка загрузки данных.');
				console.error('Fetch error:', err);
			}
		}

		fetchRecords();
	}, []);

	return { metaData, metaError };
};

export default useMetaData;
