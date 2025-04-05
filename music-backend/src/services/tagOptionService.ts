// src/services/tagOptionService.ts
import { FILTER_CATEGORIES } from 'common/constants';
import { NocoDBColumn } from 'common/types';
import { fetchTableMetadata } from '../repositories/trackRepository';

let cachedTags: Record<string, string[]> | null = null;
let lastFetched = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchTagOptions(): Promise<Record<string, string[]>> {
  const now = Date.now();

  if (cachedTags && now - lastFetched < CACHE_DURATION) {
    return cachedTags;
  }

  const meta: NocoDBColumn[] = await fetchTableMetadata();

  const tagOptions: Record<string, string[]> = {};

  for (const column of meta) {
    const name = column.column_name;
    const rawOptions = column.colOptions?.options;

    if (FILTER_CATEGORIES.includes(name) && Array.isArray(rawOptions)) {
      tagOptions[name] = rawOptions
        .map((opt: any) => (typeof opt === 'string' ? opt : opt?.title))
        .filter((x): x is string => typeof x === 'string')
        .sort((a, b) => a.localeCompare(b, 'ru'));
    }
  }

  cachedTags = tagOptions;
  lastFetched = now;

  return tagOptions;
}