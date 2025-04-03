import { Filters, RowData } from '../types';

export const applyFilters = (data: RowData[], filters: Filters): RowData[] => {
  return data.filter((row) => {
    for (const [categoryKey, tagStates] of Object.entries(filters)) {
      const includedTags: string[] = [];
      const excludedTags: string[] = [];

      for (const [tag, state] of Object.entries(tagStates)) {
        if (state === 1) includedTags.push(tag);
        if (state === 2) excludedTags.push(tag);
      }

      if (includedTags.length === 0 && excludedTags.length === 0) continue;

      let rawValue = row[categoryKey];

      if (typeof rawValue === 'string') {
        rawValue = rawValue.split(',').map((s) => s.trim()).filter(Boolean);
      }

      if (!Array.isArray(rawValue)) rawValue = [];

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

export const applySearch = (data: RowData[], search: string): RowData[] => {
  const term = search.toLowerCase();

  return data.filter((row) =>
    Object.values(row).some((val) => {
      if (typeof val === 'string') return val.toLowerCase().includes(term);
      if (Array.isArray(val)) return val.some((v) => v.toLowerCase().includes(term));
      return false;
    })
  );
};

export const applySort = (
  data: RowData[],
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): RowData[] => {
  if (!sortBy) return data;

  return [...data].sort((a, b) => {
    const aVal = a[sortBy] ?? '';
    const bVal = b[sortBy] ?? '';

    return sortOrder === 'asc'
      ? String(aVal).localeCompare(String(bVal), 'ru')
      : String(bVal).localeCompare(String(aVal), 'ru');
  });
};

export const paginate = (
    data: RowData[],
    page: number,
    limit: number
  ): { paginated: RowData[]; total: number; pages: number; page: number } => {
    const total = data.length;
    const pages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(Math.max(page, 1), pages);
    const start = (safePage - 1) * limit;
    const end = start + limit;
  
    return {
      paginated: data.slice(start, end),
      total,
      pages,
      page: safePage,
    };
  };