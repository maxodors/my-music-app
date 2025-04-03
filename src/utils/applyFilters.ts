import { Filters, RowData } from 'types/app';

export const applyFilters = (data: RowData[], filters: Filters): RowData[] => {
	return data.filter((row) => {
		for (const [categoryKey, tagStates] of Object.entries(filters)) {
			const includedTags: string[] = [];
			const excludedTags: string[] = [];

			for (const [tag, state] of Object.entries(tagStates)) {
				if (state === 1) includedTags.push(tag);
				if (state === 2) excludedTags.push(tag);
			}

			// Skip this category if all tags are neutral
			if (includedTags.length === 0 && excludedTags.length === 0) continue;

			let rawValue = row[categoryKey];

			if (typeof rawValue === 'string') {
				rawValue = rawValue.split(',').map((s) => s.trim()).filter(Boolean);
			}

			if (!Array.isArray(rawValue)) {
				rawValue = [];
			}

			const rowSet = new Set(rawValue);

			for (const tag of includedTags) {
				if (!rowSet.has(tag)) return false;
			}

			for (const tag of excludedTags) {
				if (rowSet.has(tag)) return false;
			}
		}

		return true;
	});
};
