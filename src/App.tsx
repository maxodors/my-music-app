import { Navigate, Route, Routes } from 'react-router';

import { AddTrackPage, TrackListPage } from './pages';

import '@mantine/core/styles.css';

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
