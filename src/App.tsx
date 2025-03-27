import { useState, useMemo } from 'react';
import MusicTable from './components/MusicTable';
import useMusicData from './hooks/useMusicData';
import { Filters } from './types';
import { extractTagOptions, filterRows, isRowEmpty } from './utils/musicUtils';
import FilterModal from './components/FilterModal';
import { FILTER_CATEGORIES } from './constants';

import './style.css';
import './reset.css';

const columnOrder = [
  '#', 'Title', 'Project', 'Setting', 'Timeline', 'Type', 'GenreTTRPG',
  'Scene', 'Mood', 'Space', 'Repetitiveness', 'Volume',
  'Tempo', 'SongGenre', 'Instruments', 'SongLength', 'Location', 'Unique', 'Comments'
];

function App() {
  const { data, error } = useMusicData();
  const [filters, setFilters] = useState<Filters>({});

  const tagOptions = useMemo(() => extractTagOptions(data, FILTER_CATEGORIES), [data]);
  const filteredData = useMemo(() => filterRows(data, filters, columnOrder, isRowEmpty), [data, filters]);

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
}

export default App;
