import { useEffect, useState } from 'react';
import { BASE_URL, HEADERS, TABLE_ID } from 'src/constants';
import { NocoDBColumn } from 'src/types';

const useMetaData = () => {
	const [metaData, setMetaData] = useState<NocoDBColumn[] | []>([]);
	const [metaError, setMetaError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchRecords() {
			try {
				const res = await fetch(`${BASE_URL}/api/v2/meta/tables/${TABLE_ID}`, {
					headers: HEADERS,
				});
				const data = await res.json();
				setMetaData(data.columns || []);
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
