// src/components/MusicTable/CellRenderer.tsx
import { Anchor, HoverCard } from '@mantine/core';
import { MusicTableItem } from 'src/components';
import TagBadge from './TagBadge';
import { NocoDBColumn } from 'common/types';
import { RowData } from 'common/types/app';

interface CellRendererProps {
  column: NocoDBColumn;
  rowData: RowData;
}

const CellRenderer: React.FC<CellRendererProps> = ({ column, rowData }) => {
  const cellValue = rowData[column.title];

  if (column.title === 'Название') {
    const href = Array.isArray(rowData['Ссылка'])
      ? rowData['Ссылка'][0]
      : rowData['Ссылка'];

    return (
      <HoverCard
        width={600}
        offset={-8}
        position="right"
        shadow="0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)"
      >
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

  const tags = Array.isArray(cellValue)
    ? cellValue
    : typeof cellValue === 'string'
    ? cellValue.split(',').map((t) => t.trim())
    : [];

  return (
    <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
      {tags.filter(Boolean).map((tag) => (
        <TagBadge key={tag} tag={tag} column={column} />
      ))}
    </div>
  );
};

export default CellRenderer;
