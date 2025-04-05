import { Table } from '@mantine/core';
import { memo } from 'react';

import CellRenderer from './CellRenderer';
import { NocoDBColumn } from 'common/types';
import { MusicTableProps, RowData } from 'common/types/app';

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
            <CellRenderer column={column} rowData={row} />
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
        withTableBorder
      >
        <Table.Thead c="#fff" bg="#228be6">
          <Table.Tr>{tableColumns}</Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableRows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default memo(MusicTable);