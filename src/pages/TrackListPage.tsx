import { useState } from 'react';

import { FilterModal, MusicTable, PageContainer } from 'src/components';
import { FILTER_CATEGORIES } from 'src/constants';
import { useMusicData } from 'src/hooks';
import { Filters } from 'src/types';
import { extractTagOptions } from 'utils/musicUtils';
import { applyFilters } from 'utils/applyFilters'
import { useMemo } from 'react';
import { RowData } from 'types/app';


const TrackListPage = () => {
	const { data, error } = useMusicData();

	const [filters, setFilters] = useState<Filters>({});

	const tagOptions = extractTagOptions(data, FILTER_CATEGORIES);

	const processedData = useMemo(() => {
		return data.map((row) => {
			const newRow: RowData = { ...row };
	
			for (const category of FILTER_CATEGORIES) {
				let value = newRow[category];
	
				if (typeof value === 'string') {
					newRow[category] = value
						.split(',')
						.map((s) => s.trim())
						.filter(Boolean);
				}
			}
	
			return newRow;
		});
	}, [data]);

	const filteredData = useMemo(() => applyFilters(processedData, filters), [processedData, filters]);

	return (
		<PageContainer>
			<h1>🎵 Музыкальная база</h1>
			{error && <p>{error}</p>}

			<FilterModal
				tagOptions={tagOptions}
				filters={filters}
				setFilters={setFilters}
			/>
			<MusicTable data={filteredData} />
		</PageContainer>
	);
};

export default TrackListPage;
