import { useState } from 'react';

import useMusicData from 'hooks/useMusicData';
import { FilterModal, MusicTable, PageContainer } from 'src/components';
import { FILTER_CATEGORIES } from 'src/constants';
import { Filters } from 'src/types';
import { extractTagOptions } from 'utils/musicUtils';

const TrackListPage = () => {
	const { data, error } = useMusicData();
	const [filters, setFilters] = useState<Filters>({});

	const tagOptions = extractTagOptions(data, FILTER_CATEGORIES);
	// const filteredData = filterRows(data, filters, columnOrder, isRowEmpty);

	return (
		<PageContainer>
			<h1>🎵 Музыкальная база</h1>
			{error && <p>{error}</p>}

			<FilterModal
				filters={filters}
				setFilters={setFilters}
				tagOptions={tagOptions}
			/>
			<MusicTable data={data} />
		</PageContainer>
	);
};

export default TrackListPage;
