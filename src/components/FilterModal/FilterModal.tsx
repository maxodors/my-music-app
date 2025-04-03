import {
	Badge,
	Box,
	Button,
	Center,
	Collapse,
	Group,
	Modal,
	Stack,
	Text,
	TextInput,
	UnstyledButton,
	Paper,
	ActionIcon,
  } from '@mantine/core';
  import { useDisclosure, useClickOutside } from '@mantine/hooks';
  import { useMemo, useState, useRef, useEffect } from 'react';
  import { columnsTitles } from 'src/constants';
  import { Filters } from 'types/app';
  
  interface FilterModalProps {
	tagOptions: Record<string, string[]>;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  }
  
  const FilterModal: React.FC<FilterModalProps> = ({ tagOptions, filters, setFilters }) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [openedCategories, setOpenedCategories] = useState<Record<string, boolean>>({});
	const [search, setSearch] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
  
	const searchRef = useClickOutside(() => setShowDropdown(false));
  
	const allTags = useMemo(
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
  
	const cycleBadgeState = (category: string, tag: string) => {
	  setFilters((prev: Filters) => {
		const current = prev[category]?.[tag] || 0;
		const next = ((current + 1) % 3) as 0 | 1 | 2;
		return {
		  ...prev,
		  [category]: {
			...prev[category],
			[tag]: next,
		  },
		};
	  });
	};
  
	const removeTag = (category: string, tag: string) => {
	  setFilters((prev) => {
		const updated = { ...prev };
		delete updated[category]?.[tag];
		if (updated[category] && Object.keys(updated[category]).length === 0) {
		  delete updated[category];
		}
		return updated;
	  });
	};
  
	const handleClearFilters = () => setFilters({});
  
	const getBadgeColor = (state: number) => ['gray', 'green', 'red'][state];
  
	const selectedBadges = useMemo(
	  () =>
		Object.entries(filters).flatMap(([category, tags]) =>
		  Object.entries(tags)
			.filter(([, state]) => state !== 0)
			.map(([tag, state]) => (
			  <Badge
				key={`${category}:${tag}`}
				color={getBadgeColor(state)}
				variant="filled"
				rightSection={
				  <span style={{ marginLeft: 8, cursor: 'pointer' }} onClick={() => removeTag(category, tag)}>
					✖
				  </span>
				}
			  >
				{`${columnsTitles[category] || category}: ${tag}`}
			  </Badge>
			))
		),
	  [filters]
	);
  
	const toggleCategory = (category: string) => {
	  setOpenedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
	};
  
	useEffect(() => {
	  if (search.trim()) setShowDropdown(true);
	}, [search]);
  
	return (
	  <>
		<Modal
		  opened={opened}
		  onClose={toggle}
		  title="🎛 Фильтры"
		  size="70%"
		  centered
		  overlayProps={{ blur: 3 }}
		>
		  <Stack gap="md">
			<Box ref={searchRef} pos="relative">
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
						onClick={() => cycleBadgeState(category, tag)}
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
  
			<Box style={{ minHeight: 60 }}>
			  <Group justify="space-between" align="center">
				<Text fw={500}>Выбранные теги:</Text>
				<Button size="xs" variant="light" color="red" onClick={handleClearFilters}>
				  Очистить все
				</Button>
			  </Group>
			  <Group wrap="wrap" gap="xs" mt="xs">
				{selectedBadges}
			  </Group>
			</Box>
  
			{Object.entries(tagOptions).map(([category, tags]) => (
			  <Box key={category} mt="xs">
				<UnstyledButton onClick={() => toggleCategory(category)} style={{ width: '100%' }}>
				  <Group justify="space-between">
					<Text fw={500}>{columnsTitles[category] || category}</Text>
					<Center>{openedCategories[category] ? '▼' : '▶'}</Center>
				  </Group>
				</UnstyledButton>
				<Collapse in={openedCategories[category]}>
				  <Group wrap="wrap" gap="xs" mt="xs">
					{tags.map((tag) => (
					  <Badge
						key={tag}
						color={getBadgeColor(filters[category]?.[tag] ?? 0)}
						variant="filled"
						onClick={() => cycleBadgeState(category, tag)}
						style={{ cursor: 'pointer', userSelect: 'none' }}
						onMouseDown={(e) => e.preventDefault()}
					  >
						{tag}
					  </Badge>
					))}
				  </Group>
				</Collapse>
			  </Box>
			))}
		  </Stack>
		</Modal>
  
		<Button onClick={toggle} >
		  {opened ? '❌ Закрыть фильтры' : '📁 Открыть фильтры'}
		</Button>
	  </>
	);
  };
  
  export default FilterModal;