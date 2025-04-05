// src/components/FilterModal/SearchInputWithDropdown.tsx
import {
    Group,
    TextInput,
    Paper,
    Badge,
    Stack,
    ActionIcon,
    Box,
  } from '@mantine/core';
  import { useClickOutside } from '@mantine/hooks';
  import { useEffect, useMemo, useRef, useState } from 'react';
  import { columnsTitles } from 'common/constants';
  import { Filters } from 'common/types/app';
  import { getBadgeColor } from 'src/utils/filterUtils';
  
  interface TagInfo {
    category: string;
    tag: string;
    label: string;
  }
  
  interface SearchInputWithDropdownProps {
    tagOptions: Record<string, string[]>;
    filters: Filters;
    onTagClick: (category: string, tag: string) => void;
  }
  
  const SearchInputWithDropdown: React.FC<SearchInputWithDropdownProps> = ({
    tagOptions,
    filters,
    onTagClick,
  }) => {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
  
    const ref = useClickOutside(() => setShowDropdown(false));
  
    const allTags = useMemo<TagInfo[]>(
      () =>
        Object.entries(tagOptions).flatMap(([category, tags]) =>
          tags.map((tag) => ({
            category,
            tag,
            label: `${columnsTitles[category] || category}: ${tag}`,
          }))
        ),
      [tagOptions]
    );
  
    const matchingTags = useMemo(() => {
      if (!search.trim()) return [];
      return allTags.filter((t) => t.tag.toLowerCase().includes(search.toLowerCase()));
    }, [search, allTags]);
  
    useEffect(() => {
      if (search.trim()) setShowDropdown(true);
    }, [search]);
  
    return (
      <Box ref={ref} pos="relative">
        <Group gap="xs" align="center">
          <TextInput
            placeholder="Поиск тегов..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onFocus={() => search.trim() && setShowDropdown(true)}
            style={{ flex: 1 }}
          />
          {search && (
            <ActionIcon onClick={() => setSearch('')} variant="light" color="gray">
              ✖
            </ActionIcon>
          )}
        </Group>
  
        {showDropdown && matchingTags.length > 0 && (
          <Paper
            withBorder
            p="xs"
            radius="md"
            mt="xs"
            pos="absolute"
            style={{ zIndex: 10 }}
            bg="white"
            w="100%"
          >
            <Stack gap="xs">
              {matchingTags.map(({ category, tag, label }) => (
                <Badge
                  key={`${category}:${tag}`}
                  color={getBadgeColor(filters[category]?.[tag] ?? 0)}
                  variant="filled"
                  onClick={() => onTagClick(category, tag)}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {label}
                </Badge>
              ))}
            </Stack>
          </Paper>
        )}
      </Box>
    );
  };
  
  export default SearchInputWithDropdown;
  