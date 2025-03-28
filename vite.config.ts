import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src'),
			assets: path.resolve(__dirname, './src/assets'),
			components: path.resolve(__dirname, './src/components'),
			constants: path.resolve(__dirname, './src/constants'),
			hooks: path.resolve(__dirname, './src/hooks'),
			pages: path.resolve(__dirname, './src/pages'),
			store: path.resolve(__dirname, './src/store'),
			types: path.resolve(__dirname, './src/types'),
			utils: path.resolve(__dirname, './src/utils'),
		},
	},
	// resolve: {
	// 	alias: [
	// 		{
	// 			find: '@',
	// 			replacement: fileURLToPath(new URL('./src', import.meta.url)),
	// 		},
	// 		{
	// 			find: '@assets',
	// 			replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
	// 		},
	// 		{
	// 			find: '@components',
	// 			replacement: fileURLToPath(
	// 				new URL('./src/components', import.meta.url)
	// 			),
	// 		},
	// 		{
	// 			find: '@hooks',
	// 			replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
	// 		},
	// 		{
	// 			find: '@pages',
	// 			replacement: fileURLToPath(new URL('./src/pages', import.meta.url)),
	// 		},
	// 		{
	// 			find: '@utils',
	// 			replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
	// 		},
	// 	],
	// },
});
