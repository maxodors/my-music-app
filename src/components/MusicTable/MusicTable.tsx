import { Anchor, Badge, Table } from '@mantine/core';
import { columnTitles } from 'src/constants';
import { MusicTableProps } from 'src/types';

import './MusicTable.css';

const headers = [
	'Название',
	'Длина',
	'Тип',
	'Темп',
	'Сцена',
	'Настроение',
	'Репетативность',
	'Ссылка',
];

const filterByHeaders = (data: any[], headers: string[]) => {
	return data.map((item) => {
		const filteredItem: any = { Id: item.Id };

		headers.forEach((header) => {
			const englishKey = Object.keys(columnTitles).find(
				(key) => columnTitles[key] === header
			);
			const actualKey = header === 'Длина' ? 'SongLength' : englishKey;

			if (actualKey) {
				filteredItem[actualKey] =
					item[actualKey] === null ? '' : item[actualKey];
			}
		});

		return filteredItem;
	});
};

const MusicTable: React.FC<MusicTableProps> = ({ data }) => {
	const filteredData = filterByHeaders(data, headers);

	const tableColumns = headers.map((header) => {
		if (header === 'Ссылка') return;
		return <Table.Th key={header}>{header}</Table.Th>;
	});

	const renderBadges = (value: string | undefined) => {
		if (!value) return null;

		if (value.includes(',')) {
			return (
				<div style={{ display: 'flex', rowGap: '3px', flexWrap: 'wrap' }}>
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

	const tableRows = filteredData.map((item) => {
		return (
			<Table.Tr key={item.Id}>
				<Table.Td>
					<Anchor href={item.Link} target="_blank" rel="noreferrer">
						{item.Title}
					</Anchor>
				</Table.Td>
				<Table.Td>{renderBadges(item.SongLength)}</Table.Td>
				<Table.Td>{renderBadges(item.Type)}</Table.Td>
				<Table.Td>{renderBadges(item.Tempo)}</Table.Td>
				<Table.Td>{renderBadges(item.Scene)}</Table.Td>
				<Table.Td>{renderBadges(item.Mood)}</Table.Td>
				<Table.Td>{renderBadges(item.Repetitiveness)}</Table.Td>
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
