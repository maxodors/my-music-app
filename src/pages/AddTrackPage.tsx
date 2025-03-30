import { useEffect } from 'react';
import { PageContainer } from 'src/components';
import { BASE_URL, HEADERS, TABLE_ID } from 'src/constants';

const AddTrackPage = () => {
	useEffect(() => {
		async function fetchDataTags() {
			try {
				const res = await fetch(`${BASE_URL}/api/v2/meta/tables/${TABLE_ID}`, {
					headers: HEADERS,
				});
				const json = await res.json();
				console.log(json);
				// json.columns.forEach((column: any) => {
				// 	const { column_name, colOptions } = column;
				// 	console.log(column_name, colOptions?.options);
				// });
			} catch (err) {
				console.error('Fetch error:', err);
			}
		}

		fetchDataTags();
	}, []);

	return (
		<PageContainer>
			<h1>Новый трек</h1>
		</PageContainer>
	);
};

export default AddTrackPage;
