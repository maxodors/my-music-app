import { columnsTitles } from 'src/constants';

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
	data: Record<string, any>[],
	columnOrder: string[],
	skipColumns: string[] = []
): Record<string, string[]> {
	const tags: Record<string, Set<string>> = {};

	data.forEach((row) => {
		columnOrder.forEach((col) => {
			if (skipColumns.includes(col)) return; // ✅ skip non-tag columns

			const val = row[col];
			if (!val) return;

			const values = Array.isArray(val) ? val : val.toString().split(',');
			values.forEach((v: string) => {
				const clean = v.trim();
				if (!clean) return;
				tags[col] = tags[col] || new Set();
				tags[col].add(clean);
			});
		});
	});

	return Object.fromEntries(
		Object.entries(tags).map(([k, v]) => [k, Array.from(v)])
	);
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
		// console.log('applying filters:', filters);

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
