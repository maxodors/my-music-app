import {
	Center,
	Container,
	Group,
	Pagination,
	Text,
	Title,
} from '@mantine/core';
import { lazy, Suspense, useEffect, useState } from 'react';

import { ContentLoader, FilterModal, PageContainer } from 'src/components';
import { FILTER_CATEGORIES } from 'src/constants';
import { useMetaData, useMusicData } from 'src/hooks';
import { Filters, NocoDBColumn } from 'src/types';
import { extractTagOptions } from 'utils/musicUtils';

const MusicTable = lazy(() => import('src/components/MusicTable/MusicTable'));

const TrackListPage = () => {
	const { dataCells, dataError } = useMusicData();
	const { metaData, metaError } = useMetaData();
	const [visibleColumns, setVisibleColumns] = useState<NocoDBColumn[]>([]);
	const [filters, setFilters] = useState<Filters>({});

	useEffect(() => {
		setVisibleColumns(
			metaData
				.filter((column) => !column.system)
				.filter((column) => column.description)
		);
	}, [metaData]);

	const tagOptions = extractTagOptions(dataCells, FILTER_CATEGORIES);
	// const filteredData = filterRows(data, filters, columnOrder, isRowEmpty);

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

			<Container size="xl" h={'80%'} p={0}>
				<Suspense fallback={<ContentLoader />}>
					{metaError || dataError ? (
						<Text>{dataError ? dataError : metaError}</Text>
					) : (
						<MusicTable data={dataCells} columns={visibleColumns} />
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
