// src/services/trackService.ts
import { FilterRequest, RowData, NocoDBColumn } from '../types';
import { applyFilters, applySearch, applySort, paginate } from '../utils/filterUtils';
import { fetchTrackRows, fetchTableMetadata } from '../repositories/trackRepository';

let cachedColumns: NocoDBColumn[] | null = null;
let lastFetchedColumns = 0;
const COLUMN_CACHE_DURATION = 5 * 60 * 1000;

let cachedData: RowData[] | null = null;
let lastFetchedData: number = 0;
const DATA_CACHE_DURATION = 5 * 60 * 1000;

export async function fetchRawData(forceRefresh = false): Promise<RowData[]> {
  const now = Date.now();

  if (!forceRefresh && cachedData && now - lastFetchedData < DATA_CACHE_DURATION) {
    return cachedData;
  }

  const data = await fetchTrackRows();

  cachedData = data;
  lastFetchedData = now;

  return data;
}

export const fetchFilteredTracks = async ({
  filters,
  page = 1,
  limit = 50,
  sortBy,
  sortOrder = 'asc',
  search,
}: FilterRequest) => {
  const rawRows = await fetchRawData();

  const normalizedRows = rawRows.map((row) => {
    const clone = { ...row };
    for (const key of Object.keys(filters)) {
      const val = clone[key];
      if (typeof val === 'string') {
        clone[key] = val.split(',').map((v) => v.trim()).filter(Boolean);
      }
    }
    return clone;
  });

  let filteredRows = applyFilters(normalizedRows, filters);
  if (search?.trim()) filteredRows = applySearch(filteredRows, search);
  filteredRows = applySort(filteredRows, sortBy, sortOrder);

  const { paginated, total, pages, page: safePage } = paginate(filteredRows, page, limit);

  return {
    results: paginated,
    total,
    pages,
    page: safePage,
  };
};

export async function fetchMetadata(): Promise<NocoDBColumn[]> {
  const now = Date.now();

  if (cachedColumns && now - lastFetchedColumns < COLUMN_CACHE_DURATION) {
    return cachedColumns;
  }

  const columns = await fetchTableMetadata();

  cachedColumns = columns;
  lastFetchedColumns = now;

  return columns;
}
