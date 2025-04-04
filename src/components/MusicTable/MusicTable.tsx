import { Anchor, Badge, HoverCard, Table, Tooltip } from '@mantine/core';
import { memo } from 'react';

import { MusicTableItem } from 'src/components';
import { NocoDBColumn } from 'src/types';
import { MusicTableProps, RowData } from 'types/app';

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

const renderTags = (
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
				.map((string) => {
					const color = getOptionColor(column, string);
					return (
						<Tooltip
							key={string}
							label={string}
							transitionProps={{ transition: 'rotate-left', duration: 350 }}
							withArrow
							position="top-start"
							arrowPosition="side"
							arrowOffset={6}
							arrowSize={6}>
							<Badge radius="sm" color={color ?? 'gray'} autoContrast>
								{string}
							</Badge>
						</Tooltip>
					);
				})}
		</div>
	);
};

const renderCellContent = (column: NocoDBColumn, rowData: RowData) => {
	if (column.title === 'Название') {
		const href = Array.isArray(rowData['Ссылка'])
			? rowData['Ссылка'][0]
			: rowData['Ссылка'];

		return (
			<HoverCard
				width={600}
				offset={-8}
				position="right"
				shadow="0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)">
				<HoverCard.Target>
					<div>
						<Anchor href={href} target="_blank" rel="noreferrer">
							{rowData['Название']}
						</Anchor>
					</div>
				</HoverCard.Target>
				<HoverCard.Dropdown>
					<MusicTableItem />
				</HoverCard.Dropdown>
			</HoverCard>
		);
	}

	const cellValue = rowData[column.title];
	return renderTags(column, cellValue);
};

const MusicTable: React.FC<MusicTableProps> = ({ rows, columns }) => {
	const tableColumns = columns.map((column) => (
		<Table.Th key={column.id}>{column.title}</Table.Th>
	));

	const tableRows = rows
		.filter((row) => row && row['Название'])
		.map((row) => (
			<Table.Tr key={row.Id}>
				{columns.map((column) => (
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
				<Table.Thead c="#fff" bg="#228be6">
					<Table.Tr>{tableColumns}</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{tableRows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};

export default memo(MusicTable);
