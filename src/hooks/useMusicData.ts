import { useEffect, useState } from "react";

const BASE_URL = "https://app.nocodb.com/api/v2";
const TABLE_ID = "m4ylgz2cjhybe4r";
const VIEW_ID = "vw1m1manwrq5fmp5";
const API_TOKEN = "5gnZxL7hkZs7X9ccjjqMmV7M17_sIDT_nedtkoAQ";

const HEADERS = {
  "xc-token": API_TOKEN,
  "Content-Type": "application/json",
};

export type RowData = Record<string, any>;

export default function useMusicData() {
  const [data, setData] = useState<RowData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch(`${BASE_URL}/tables/${TABLE_ID}/records?offset=0&limit=100&viewId=${VIEW_ID}`, {
          headers: HEADERS,
        });
        const json = await res.json();
        setData(json.list || []);
      } catch (err) {
        setError("Ошибка загрузки данных.");
        console.error("Fetch error:", err);
      }
    }

    fetchRecords();
  }, []);

  return { data, error };
}
