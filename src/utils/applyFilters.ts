import { RowData } from 'src/types';

export function applyFilters(
	data: RowData[],
	filters: Record<string, Record<string, 'include' | 'exclude'>>
): RowData[] {
	return data.filter((row) => {
		return Object.entries(filters).every(([category, values]) => {
			const raw = row[category];
			const rowVals =
				typeof raw === 'string'
					? raw.split(',').map((v) => v.trim())
					: Array.isArray(raw)
					? raw
					: [raw];

			return Object.entries(values).every(([val, mode]) => {
				return (
					(mode === 'include' && rowVals.includes(val)) ||
					(mode === 'exclude' && !rowVals.includes(val))
				);
			});
		});
	});
}
