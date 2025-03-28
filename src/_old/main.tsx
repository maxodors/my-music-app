import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // ✅ Critical for layout and modal styles
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<MantineProvider withGlobalClasses>
				<App />
			</MantineProvider>
		</BrowserRouter>
	</StrictMode>
);
