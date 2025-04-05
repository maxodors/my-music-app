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
  import { useMetaData } from 'src/hooks';
  import { useTagOptionsFromMeta } from 'src/hooks/useTagOptionsFromMeta';
  import { useFilteredTracks } from 'src/hooks/useFilteredTracks';
  import { Filters, NocoDBColumn, FilterRequest } from 'common/types';
  
  const MusicTable = lazy(() => import('src/components/MusicTable/MusicTable'));
  
  const TrackListPage = () => {
	useEffect(() => {
		import('src/components/MusicTable/MusicTable');
	  }, []);	
	
	const { metaData, metaError } = useMetaData();
	const { tagOptions, error: tagError } = useTagOptionsFromMeta();
  
	const [filters, setFilters] = useState<Filters>({});
	const [visibleColumns, setVisibleColumns] = useState<NocoDBColumn[]>([]);
	const [page, setPage] = useState(1);
	const limit = 10;
  

	const requestBody = useMemo<FilterRequest>(
		() => ({
		  filters,
		  page,
		  limit,
		  sortOrder: 'asc',
		  sortBy: undefined,
		}),
		[filters, page, limit]
	  );
  
	const {
	  results: filteredData,
	  total,
	  page: safePage,
	  loading,
	  error,
	} = useFilteredTracks(requestBody);
  
	useEffect(() => {
	  const visible = metaData.filter(
		(column) => !column.system && column.description
	  );
	  setVisibleColumns(visible);
	}, [metaData]);
  
	useEffect(() => {
	  setPage(1);
	}, [JSON.stringify(filters)]);
  
	useEffect(() => {
	  if (page !== safePage) {
		setPage(safePage);
	  }
	}, [safePage]);
  
	const totalPages = useMemo(
	  () => Math.max(1, Math.ceil(total / limit)),
	  [total, limit]
	);
  
	return (
	  <PageContainer>
		<Title order={1}>🎵 Музыкальная база</Title>
  
		<Group justify="flex-end" mb="md">
		  <FilterModal
			filters={filters}
			setFilters={setFilters}
			tagOptions={tagOptions}
		  />
		</Group>
  
		<Container size="xl" h="80%" p={0}>
			{error || metaError || tagError ? (
			  <Text color="red">
				{error?.toString() ||
				  metaError?.toString() ||
				  tagError?.toString()}
			  </Text>
			) : loading ? (
			  <ContentLoader />
			) : !filteredData || filteredData.length === 0 ? (
			  <Text mt="lg" c="dimmed">
				Ничего не найдено по текущим фильтрам.
			  </Text>
			) : (
			  <MusicTable rows={filteredData} columns={visibleColumns} />
			)}
		</Container>
  
		<Center mt="lg">
		  <Pagination
			total={totalPages}
			value={page}
			onChange={setPage}
			siblings={2}
			disabled={loading}
		  />
		</Center>
	  </PageContainer>
	);
  };
  
  export default TrackListPage;
  