// import MusicTable from './components/MusicTable';
// import useMusicData from './hooks/useMusicData';
// import { Filters } from './types';
// import { extractTagOptions, filterRows, isRowEmpty } from './utils/musicUtils';
// import FilterModal from './components/FilterModal';
// import { FILTER_CATEGORIES } from './constants';

import { Navigate, Route, Routes } from 'react-router';

import { AddTrackPage, TrackListPage } from './pages';
import './style.css';


function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/tracklist" />} />
			<Route path="/tracklist" element={<TrackListPage />} />
			<Route path="/newtrack" element={<AddTrackPage />} />
			<Route path="*" element={'404'} />
		</Routes>
	);
}

export default App;
