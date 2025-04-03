import { columnsTitles } from 'src/constants';
import { RowData } from 'types/app';

export function getTagColor(tag: string): string {
	let hash = 0;
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 50%, 45%)`;
}

export function isRowEmpty(row: Record<string, any>): boolean {
	return Object.entries(row).every(([key, val]) => {
		if (key === 'Id' || key === '#') return true;
		if (Array.isArray(val)) return val.length === 0;
		if (typeof val === 'string') return val.trim() === '';
		return val === null || val === '';
	});
}

export function extractTagOptions(
	data: RowData[],
	categories: string[]
): Record<string, string[]> {
	const options: Record<string, Set<string>> = {};

	for (const category of categories) {
		options[category] = new Set();

		for (const row of data) {
			let rawValue = row[category];

			if (typeof rawValue === 'string') {
				rawValue = rawValue.split(',').map((s) => s.trim());
			}

			if (Array.isArray(rawValue)) {
				for (const val of rawValue) {
					if (val) options[category].add(val);
				}
			}
		}
	}

	// Convert Sets to sorted arrays
	const result: Record<string, string[]> = {};
	for (const key in options) {
		result[key] = Array.from(options[key]).sort((a, b) =>
			a.localeCompare(b, 'ru')
		);
	}

	return result;
}

export function filterRows(
	data: Record<string, any>[],
	filters: Record<string, Record<string, number>>,
	columnOrder: string[],
	isRowEmptyFn: (row: Record<string, any>) => boolean
): Record<string, any>[] {
	return data.filter((row) => {
		if (isRowEmptyFn(row)) return false;
		for (const col of columnOrder) {
			const val = row[col];
			const values = Array.isArray(val)
				? val
				: typeof val === 'string'
				? val.split(',').map((v) => v.trim())
				: [val];
			const rules = filters[col];
			if (!rules) continue;
			for (const [tag, state] of Object.entries(rules)) {
				if (state === 0) continue;
				const match = values.includes(tag);
				if (state === 1 && !match) return false;
				if (state === 2 && match) return false;
			}
		}

		return true;
	});
}

export const getValueForColumnTitle = (item: any, columnTitle: string) => {
	const columnKey = titleToColumnKey[columnTitle];
	return item[columnKey] ?? null;
};

const titleToColumnKey: Record<string, string> = Object.fromEntries(
	Object.entries(columnsTitles).map(([key, value]) => [value, key])
);
