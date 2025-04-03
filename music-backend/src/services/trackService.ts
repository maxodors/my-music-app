import axios from 'axios';
import { FilterRequest, RowData } from '../types';
import { applyFilters, applySearch, applySort, paginate } from '../utils/filterUtils';

const BASE_URL = 'https://app.nocodb.com';
const TABLE_ID = 'm4ylgz2cjhybe4r';
const API_TOKEN = '5gnZxL7hkZs7X9ccjjqMmV7M17_sIDT_nedtkoAQ';

const HEADERS = {
  'xc-token': API_TOKEN,
  'Content-Type': 'application/json',
};

export async function fetchRawData(): Promise<RowData[]> {
    const res = await axios.get(
      `${BASE_URL}/api/v2/tables/${TABLE_ID}/records?page=1&limit=1000`,
      { headers: HEADERS }
    );
  
    const valid = res.data.list.filter((row: RowData) => {
      return row && Object.keys(row).length > 0 && row['Название'];
    });
  
    return valid;
  }

export const fetchFilteredTracks = async ({
  filters,
  page = 1,
  limit = 50,
  sortBy,
  sortOrder = 'asc',
  search,
}: FilterRequest) => {
  const raw = await fetchRawData();

  const normalized = raw.map((row) => {
    const clone = { ...row };
    for (const key of Object.keys(filters)) {
      const val = clone[key];
      if (typeof val === 'string') {
        clone[key] = val
          .split(',')
          .map((v) => v.trim())
          .filter(Boolean); 
      }
    }
    return clone;
  });

  let result = applyFilters(normalized, filters);

  if (search?.trim()) result = applySearch(result, search);
  result = applySort(result, sortBy, sortOrder);

  const { paginated, total, pages, page: safePage } = paginate(result, page, limit);

  return {
    results: paginated,
    total,
    pages,
    page: safePage,
  };
};
