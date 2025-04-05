import {
    Badge,
    Box,
    Center,
    Collapse,
    Group,
    Text,
    UnstyledButton,
  } from '@mantine/core';
  import { columnsTitles } from 'common/constants';
  import { Filters } from 'common/types/app';
  import { getBadgeColor } from 'src/utils/filterUtils';
  
  interface CategoryFilterSectionProps {
    category: string;
    tags: string[];
    filters: Filters;
    isOpen: boolean;
    onToggle: (category: string) => void;
    onCycleTag: (category: string, tag: string) => void;
  }
  
  const CategoryFilterSection: React.FC<CategoryFilterSectionProps> = ({
    category,
    tags,
    filters,
    isOpen,
    onToggle,
    onCycleTag,
  }) => {
    return (
      <Box mt="xs">
        <UnstyledButton onClick={() => onToggle(category)} style={{ width: '100%' }}>
          <Group justify="space-between">
            <Text fw={500}>{columnsTitles[category] || category}</Text>
            <Center>{isOpen ? '▼' : '▶'}</Center>
          </Group>
        </UnstyledButton>
  
        <Collapse in={isOpen}>
          <Group wrap="wrap" gap="xs" mt="xs">
            {tags.map((tag) => (
              <Badge
                key={tag}
                color={getBadgeColor(filters[category]?.[tag] ?? 0)}
                variant="filled"
                onClick={() => onCycleTag(category, tag)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {tag}
              </Badge>
            ))}
          </Group>
        </Collapse>
      </Box>
    );
  };
  
  export default CategoryFilterSection;
  