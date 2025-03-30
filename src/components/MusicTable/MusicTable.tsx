import { Anchor, Badge, Table } from '@mantine/core';
import { useState } from 'react';

import { initTableColumns } from 'src/constants';
import { MusicTableProps } from 'src/types';
import { getValueForColumnTitle } from 'src/utils/musicUtils';

const renderBadges = (value: string | undefined) => {
	if (!value) return null;

	if (value.includes(',')) {
		return (
			<div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
				{value.split(',').map((string, idx) => (
					<Badge key={idx} radius="sm">
						{string.trim()}
					</Badge>
				))}
			</div>
		);
	}

	return <Badge radius="sm">{value}</Badge>;
};

const renderCellContent = (columnName: string, item: any) => {
	if (columnName === 'Название') {
		return (
			<Anchor href={item.Link} target="_blank" rel="noreferrer">
				{item.Title}
			</Anchor>
		);
	}
	return renderBadges(getValueForColumnTitle(item, columnName));
};

const MusicTable: React.FC<MusicTableProps> = ({ data }) => {
	const [visibleColumns, setVisibleColumns] = useState(initTableColumns);

	setVisibleColumns(visibleColumns);

	const tableColumns = visibleColumns
		.filter((column) => column.isVisible)
		.map((column) => <Table.Th key={column.name}>{column.name}</Table.Th>);

	const tableRows = data.map((item) => {
		return (
			<Table.Tr key={item.Id}>
				{visibleColumns
					.filter((column) => column.isVisible)
					.map((column) => (
						<Table.Td key={column.name}>
							{renderCellContent(column.name, item)}
						</Table.Td>
					))}
			</Table.Tr>
		);
	});

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
