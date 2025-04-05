import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import React from 'react';
import App from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<MantineProvider>
				<App />
			</MantineProvider>
		</BrowserRouter>
	</StrictMode>
);
