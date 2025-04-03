import { Anchor, Badge, Table, Tooltip } from '@mantine/core';

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
							<Badge
								radius="sm"
								color={color ? color : 'gray'}
								autoContrast>
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
		return (
			<Anchor href={rowData['Ссылка']} target="_blank" rel="noreferrer">
				{rowData['Название']}
			</Anchor>
		);
	}

	const cellValue = rowData[column.title];

	return renderTags(column, cellValue);
};

const MusicTable: React.FC<MusicTableProps> = ({ data, columns }) => {
	const tableColumns = columns.map((column) => (
		<Table.Th key={column.id}>{column.title}</Table.Th>
	));

	const tableRows = data.map((row) => (
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
				<Table.Thead>
					<Table.Tr>{tableColumns}</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{tableRows}</Table.Tbody>
			</Table>
		</Table.ScrollContainer>
	);
};

export default MusicTable;
