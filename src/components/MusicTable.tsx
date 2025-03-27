import React, { useMemo, useState } from 'react';
import { Table, Anchor, Text, rem, Badge } from '@mantine/core';
import { getTagColor, isRowEmpty, filterRows } from '../utils/musicUtils';
import { Filters } from '../types';
import { columnOrder, columnTitles } from '../constants';

type RowData = Record<string, any>;

interface MusicTableProps {
  data: RowData[];
}

const MusicTable: React.FC<MusicTableProps> = ({ data }) => {
  const [filters, setFilters] = useState<Filters>({});
  const visibleRows = useMemo(() => filterRows(data, filters, columnOrder, isRowEmpty), [data, filters]);

  const renderValue = (col: string, value: any, row: RowData, index: number) => {
    if (col === '#') return index + 1;

    if (col === 'Title') {
      const text = row['Title']?.trim() || '-';
      const url = row['Link'];
      return url ? (
        <Anchor href={url} target="_blank" rel="noreferrer">{text}</Anchor>
      ) : (
        <Text>{text}</Text>
      );
    }

    if (typeof value === 'string' && value.startsWith('http')) {
      return <Anchor href={value} target="_blank" rel="noreferrer">🔗 Link</Anchor>;
    }

    const renderTag = (tag: string, i: number) => (
      <Badge key={i} style={{ backgroundColor: getTagColor(tag), color: '#fff', margin: '2px' }}>
        {tag}
      </Badge>
    );

    if (typeof value === 'string' && value.includes(',')) {
      return value.split(',').map((tag: string, i: number) => renderTag(tag.trim(), i));
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean).map(renderTag);
    }

    const text = value?.toString().trim() || '-';
    if (text === '-') {
      return <Text>{text}</Text>;
    }
    return renderTag(text, 0);
  };

  return (
    <>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        style={{
          margin: '0 auto',
          fontSize: rem(18),
          borderCollapse: 'collapse',
          textAlign: 'center',
          verticalAlign: 'middle',
        }}
      >
        <thead>
          <tr>
            {columnOrder.map((col) => (
              <th
                key={col}
                style={{
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  fontWeight: 'bold',
                  fontSize: 18,
                  padding: '8px',
                  border: '2px solid #ffffff',
                }}
              >
                {columnTitles[col] || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row: RowData, rowIndex: number) => (
            <tr key={rowIndex}>
              {columnOrder.map((col) => (
                <td
                  key={col}
                  style={{
                    border: '2px solid #ffffff',
                    whiteSpace: 'normal',
                    wordBreak: 'keep-all',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }}
                >
                  {renderValue(col, row[col], row, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MusicTable;
