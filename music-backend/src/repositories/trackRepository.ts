import axios from 'axios';
import { BASE_URL, TABLE_ID, HEADERS } from 'common/constants';
import { RowData, NocoDBColumn } from 'common/types';

export async function fetchTrackRows(): Promise<RowData[]> {
  const res = await axios.get<{ list: RowData[] }>(
    `${BASE_URL}/api/v2/db/data/${TABLE_ID}`,
    { headers: HEADERS }
  );
  return res.data.list;
}

export async function fetchTableMetadata(): Promise<NocoDBColumn[]> {
  const res = await axios.get<{ columns: NocoDBColumn[] }>(
    `${BASE_URL}/api/v2/meta/tables/${TABLE_ID}`,
    { headers: HEADERS }
  );
  return res.data.columns;
}
