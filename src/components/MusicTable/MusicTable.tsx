import { Anchor, Badge, Table } from '@mantine/core';
import { useEffect, useState } from 'react';

import { useMetaData } from 'src/hooks';
import { NocoDBColumn } from 'src/types';
import { MusicTableProps } from 'types/app';

const getOptionColor = (
	column: NocoDBColumn,
	value: string
): string | undefined => {
	if (!column.colOptions?.options) return undefined;

	const option = column.colOptions.options.find(
		(opt) => opt.title.trim() === value.trim()
	);

	return option?.color;
};

const renderBadges = (
	column: NocoDBColumn,
	tag: string | string[] | undefined
) => {
	if (!tag) return null;

	const tags = Array.isArray(tag) ? tag : tag?.split(',');

	return (
		<div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
			{tags
				?.map((tag) => tag.trim())
				.filter((tag) => tag)
				.map((string, idx) => {
					const color = getOptionColor(column, string);
					return (
						<Badge
							key={idx}
							radius="sm"
							color={color ? color : 'gray'}
							autoContrast>
							{string}
						</Badge>
					);
				})}
		</div>
	);
};

const renderCellContent = (column: NocoDBColumn, rowData: any) => {
	if (column.title === 'Название') {
		return (
			<Anchor href={rowData['Ссылка']} target="_blank" rel="noreferrer">
				{rowData['Название']}
			</Anchor>
		);
	}

	const cellValue = rowData[column.title];

	return renderBadges(column, cellValue);
};

const MusicTable: React.FC<MusicTableProps> = ({ data }) => {
	const { metaData, metaError } = useMetaData();
	const [visibleColumns, setVisibleColumns] = useState<NocoDBColumn[] | []>();

	useEffect(() => {
		setVisibleColumns(
			metaData
				.filter((column) => !column.system)
				.filter((column) => column.description)
		);
	}, [metaData]);

	const tableColumns = visibleColumns?.map((column) => (
		<Table.Th key={column.id}>{column.title}</Table.Th>
	));

	const tableRows = data.map((row) => (
		<Table.Tr key={row.Id}>
			{visibleColumns?.map((column) => (
				<Table.Td key={`${row.Id}-${column.id}`}>
					{renderCellContent(column, row)}
				</Table.Td>
			))}
		</Table.Tr>
	));

	return (
		<Table.ScrollContainer minWidth={500}>
			<Table
				stickyHeader
				verticalSpacing="sm"
				striped
				highlightOnHover
				withColumnBorders
				withTableBorder>
				<Table.Thead>
					<Table.Tr>{tableColumns}</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{tableRows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};

export default MusicTable;
