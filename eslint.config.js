import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [
						['src', './src'],
						['assets', './src/assets'],
						['components', './src/components'],
						['constants', './src/constants'],
						['hooks', './src/hooks'],
						['pages', './src/pages'],
						['store', './src/store'],
						['types', './src/types'],
						['utils', './src/utils'],
					],
					extensions: ['.ts', '.tsx', '.js', '.jsx'],
				},
			},
		},
	}
);
