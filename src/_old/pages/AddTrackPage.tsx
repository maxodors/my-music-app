import { useEffect } from 'react';
import { API_TOKEN } from '../constants';

const AddTrackPage = () => {
	useEffect(() => {
		async function fetchDataTags() {
			try {
				const res = await fetch(
					'https://app.nocodb.com/api/v2/meta/tables/m4ylgz2cjhybe4r',
					{
						headers: {
							'xc-token': API_TOKEN,
							'Content-Type': 'application/json',
						},
					}
				);
				const json = await res.json();

				json.columns.forEach((column: any) => {
					const { column_name, dtxp } = column;
					console.log(column_name, dtxp);
				});
			} catch (err) {
				console.error('Fetch error:', err);
			}
		}

		fetchDataTags();
	}, []);

	return <h1>Новый трек</h1>;
};

export default AddTrackPage;
