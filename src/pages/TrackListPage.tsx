import {
	Center,
	Container,
	Group,
	Pagination,
	Text,
	Title,
  } from '@mantine/core';
  import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
  
  import { ContentLoader, FilterModal, PageContainer } from 'src/components';
  import { FILTER_CATEGORIES } from 'src/constants';
  import { useMetaData, useMusicData } from 'src/hooks';
  import { Filters, NocoDBColumn, RowData } from 'src/types';
  import { useTagOptionsFromMeta } from 'src/hooks/useTagOptionsFromMeta';
  import { applyFilters } from 'src/utils/applyFilters';
  
  const MusicTable = lazy(() => import('src/components/MusicTable/MusicTable'));
  
  const TrackListPage = () => {
	const { dataCells, dataError } = useMusicData();
	const { metaData, metaError } = useMetaData();
	const [visibleColumns, setVisibleColumns] = useState<NocoDBColumn[]>([]);
	const [filters, setFilters] = useState<Filters>({});
	
	const { tagOptions, loading, error } = useTagOptionsFromMeta();

	useEffect(() => {
	  setVisibleColumns(
		metaData
		  .filter((column) => !column.system)
		  .filter((column) => column.description)
	  );
	}, [metaData]);

	const processedData = useMemo(() => {
	  if (!dataCells) return [];
  
	  return dataCells.map((row) => {
		const newRow: RowData = { ...row };
  
		for (const category of FILTER_CATEGORIES) {
		  let value = newRow[category];
  
		  if (typeof value === 'string') {
			newRow[category] = value
			  .split(',')
			  .map((s) => s.trim())
			  .filter(Boolean);
		  }
		}
  
		return newRow;
	  });
	}, [dataCells]);
  
	const filteredData = useMemo(() => {
	  if (!processedData) return [];
	  const result = applyFilters(processedData, filters);
  
	  if (process.env.NODE_ENV !== 'production') {
		console.debug('[Filter] Filters:', filters);
		console.debug(`[Filter] Showing ${result.length} / ${processedData.length} tracks`);
	  }
  
	  return result;
	}, [processedData, filters]);
  
	return (
	  <PageContainer>
		<Title order={1}>🎵 Музыкальная база</Title>
		
		<Group justify="flex-end">
		  <FilterModal
			filters={filters}
			setFilters={setFilters}
			tagOptions={tagOptions}
		  />
		</Group>
  
		<Container size="xl" h="80%" p={0}>
		  <Suspense fallback={<ContentLoader />}>
			{metaError || dataError ? (
			  <Text>{dataError || metaError}</Text>
			) : filteredData.length === 0 ? (
			  <Text mt="lg" c="dimmed">
				Ничего не найдено по текущим фильтрам.
			  </Text>
			) : (
			  <MusicTable data={filteredData} columns={visibleColumns} />
			)}
		  </Suspense>
		</Container>
  
		<Center>
		  <Pagination total={10} siblings={2} disabled />
		</Center>
	  </PageContainer>
	);
  };
  
  export default TrackListPage;
  