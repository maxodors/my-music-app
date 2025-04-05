// src/components/MusicTable/TagBadge.tsx
import { Badge, Tooltip } from '@mantine/core';
import { NocoDBColumn } from 'common/types';

interface TagBadgeProps {
  column: NocoDBColumn;
  tag: string;
}

const TagBadge: React.FC<TagBadgeProps> = ({ column, tag }) => {
  const color = column.colOptions?.options?.find(
    (opt) => opt.title.trim() === tag.trim()
  )?.color ?? 'gray';

  return (
    <Tooltip
      label={tag}
      transitionProps={{ transition: 'rotate-left', duration: 350 }}
      withArrow
      position="top-start"
      arrowPosition="side"
      arrowOffset={6}
      arrowSize={6}
    >
      <Badge radius="sm" color={color} autoContrast>
        {tag}
      </Badge>
    </Tooltip>
  );
};

export default TagBadge;
