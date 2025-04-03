import { BASE_URL, HEADERS, TABLE_ID, FILTER_CATEGORIES } from 'src/constants';

export async function fetchTagOptionsFromMeta(): Promise<Record<string, string[]>> {
	const res = await fetch(`${BASE_URL}/api/v2/meta/tables/${TABLE_ID}`, {
	  headers: HEADERS,
	});
  
	const meta = await res.json();
  
	const tagOptions: Record<string, string[]> = {};
  
	for (const column of meta.columns) {
	  const name = column.column_name;
	  const rawOptions = column.colOptions?.options;
  
	  if (
		FILTER_CATEGORIES.includes(name) &&
		Array.isArray(rawOptions)
	  ) {
		tagOptions[name] = rawOptions
		  .map((opt: any) => (typeof opt === 'string' ? opt : opt?.title))
		  .filter((x): x is string => typeof x === 'string')
		  .sort((a, b) => a.localeCompare(b, 'ru'));
	  }
	}
  
	return tagOptions;
  }
  