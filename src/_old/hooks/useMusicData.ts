import { useEffect, useState } from 'react';

import { API_TOKEN, BASE_URL, TABLE_ID, VIEW_ID } from '../constants';
import { RowData } from '../types';

const HEADERS = {
	'xc-token': API_TOKEN,
	'Content-Type': 'application/json',
};

export default function useMusicData() {
	const [data, setData] = useState<RowData[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchRecords() {
			try {
				const res = await fetch(
					`${BASE_URL}/api/v2/tables/${TABLE_ID}/records?offset=0&limit=100&viewId=${VIEW_ID}`,
					{
						headers: HEADERS,
					}
				);
				const json = await res.json();
				setData(json.list || []);
			} catch (err) {
				setError('Ошибка загрузки данных.');
				console.error('Fetch error:', err);
			}
		}

		fetchRecords();
	}, []);

	return { data, error };
}
