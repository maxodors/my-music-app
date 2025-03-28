import { useState } from 'react';

import { FilterModal, MusicTable } from '../components';
import { columnOrder, FILTER_CATEGORIES } from '../constants';
import useMusicData from '../hooks/useMusicData';
import { Filters } from '../types';
import { extractTagOptions, filterRows, isRowEmpty } from '../utils/musicUtils';

const MusicList = () => {
	const { data, error } = useMusicData();
	const [filters, setFilters] = useState<Filters>({});

	const tagOptions = extractTagOptions(data, FILTER_CATEGORIES);
	const filteredData = filterRows(data, filters, columnOrder, isRowEmpty);

	return (
		<>
			<h1>🎵 Музыкальная база</h1>
			{error && <p>{error}</p>}

			<FilterModal
				filters={filters}
				setFilters={setFilters}
				tagOptions={tagOptions}
			/>
			<MusicTable data={filteredData} />
		</>
	);
};

export default MusicList;
