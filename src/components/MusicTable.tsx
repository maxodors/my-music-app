import React from 'react';

import { MusicTableProps, RowData } from '../types';

import './MusicTable.css';

const columnOrder = [
	'#',
	'Название',
	'Проект',
	'Сеттинг',
	'Истор. Время',
	'Тип',
	'Жанр НРИ',
	'Сцена',
	'Настроение',
	'Пространство',
	'Репетативность',
	'Громкость',
	'Темп',
	'Жанр Музыки',
	'Длина',
	'Местность',
	'Разное',
	'Комментарии',
];

const noBubbleColumns = ['Название'];

const getTagColor = (tag: string) => {
	let hash = 0;
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 50%, 45%)`;
};

const isRowEmpty = (row: RowData) => {
	return Object.entries(row).every(([key, val]) => {
		if (key === 'Id' || key === '#') return true;
		if (Array.isArray(val)) return val.length === 0;
		if (typeof val === 'string') return val.trim() === '';
		return val === null || val === '';
	});
};

const renderValue = (col: string, value: any, row: RowData, index: number) => {
	if (col === '#') return index + 1;

	if (col === 'Название') {
		const text = row['Название']?.trim() || '-';
		const url = row['Ссылка'];
		return url ? (
			<a href={url} target="_blank" rel="noreferrer">
				{text}
			</a>
		) : (
			text
		);
	}

	if (typeof value === 'string' && value.startsWith('http')) {
		return (
			<a href={value} target="_blank" rel="noreferrer">
				🔗 Link
			</a>
		);
	}

	if (typeof value === 'string' && value.includes(',')) {
		return value
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean)
			.map((tag, i) => (
				<React.Fragment key={i}>
					<span className="tag" style={{ backgroundColor: getTagColor(tag) }}>
						{tag}
					</span>
					<br />
				</React.Fragment>
			));
	}

	if (Array.isArray(value)) {
		return value.filter(Boolean).map((tag, i) => (
			<React.Fragment key={i}>
				<span className="tag" style={{ backgroundColor: getTagColor(tag) }}>
					{tag}
				</span>
				<br />
			</React.Fragment>
		));
	}

	const text = value?.toString().trim() || '-';
	if (noBubbleColumns.includes(col) || text === '-') return text;

	return (
		<span className="tag" style={{ backgroundColor: getTagColor(text) }}>
			{text}
		</span>
	);
};

const MusicTable: React.FC<MusicTableProps> = ({ data }) => {
	const visibleRows = data.filter((row) => !isRowEmpty(row));

	return (
		<div className="table-wrapper">
			<table className="music-table">
				<thead>
					<tr>
						{columnOrder.map((col) => (
							<th
								key={col}
								className={`column-${col
									.replace(/\s/g, '-')
									.replace(/[^a-zA-Z0-9-]/g, '')}`}>
								<span className="column-label">{col}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{visibleRows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columnOrder.map((col) => (
								<td key={col}>{renderValue(col, row[col], row, rowIndex)}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MusicTable;
