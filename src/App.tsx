import { useState } from 'react';
import { MusicTable, SidebarPanel } from './components';

import useMusicData from './hooks/useMusicData.ts';
import { Filters } from './types.ts';
import { applyFilters } from './utils/applyFilters.ts';
import { MantineProvider } from '@mantine/core';

import './reset.css';
import './style.css';

function App() {
	const { data, error } = useMusicData();
	const [filters, setFilters] = useState<Filters>({});

	const filteredData = applyFilters(data, filters);

	return (
		<>
			<h1>🎵 Музыкальная база</h1>
			{error && <p>{error}</p>}

			<SidebarPanel data={data} filters={filters} setFilters={setFilters} />
			<MusicTable data={filteredData} />
		</>
	);
}

export default App;
