// src/components/FilterModal/SelectedBadges.tsx
import { Badge, Group } from '@mantine/core';
import { columnsTitles } from 'common/constants';
import { Filters } from 'common/types/app';
import { getBadgeColor, twoStateNext } from 'src/utils/filterUtils';

interface SelectedBadgesProps {
  filters: Filters;
  onRemove: (category: string, tag: string) => void;
  onCycleTag?: (category: string, tag: string) => void;
}

const SelectedBadges: React.FC<SelectedBadgesProps> = ({ filters, onRemove, onCycleTag }) => {
  return (
    <Group wrap="wrap" gap="xs">
      {Object.entries(filters).flatMap(([category, tags]) =>
        Object.entries(tags)
          .filter(([, state]) => state !== 0)
          .map(([tag, state]) => (
            <Badge
              key={`${category}:${tag}`}
              color={getBadgeColor(state)}
              variant="filled"
              onClick={() => onCycleTag?.(category, tag)}
              style={{
                userSelect: 'none',
                cursor: 'pointer',
              }}
              rightSection={
                <span
                  style={{ marginLeft: 8, cursor: 'pointer', userSelect: 'none' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(category, tag);
                  }}
                >
                  ✖
                </span>
              }
            >
              {`${columnsTitles[category] || category}: ${tag}`}
            </Badge>
          ))
      )}
    </Group>
  );
};

export default SelectedBadges;