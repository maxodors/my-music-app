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
	UnstyledButton,
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import { useMemo, useState } from 'react';
  import { columnsTitles } from 'common/constants';
  import { Filters } from 'common/types/app';
  import { getBadgeColor, nextTagState } from 'src/utils/filterUtils';
  import SelectedBadges from './SelectedBadges';
  import SearchInputWithDropdown from './SearchInputWithDropdown';
  import CategoryFilterSection from './CategoryFilterSection';
  
  interface FilterModalProps {
	tagOptions: Record<string, string[]>;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  }
  
  const FilterModal: React.FC<FilterModalProps> = ({ tagOptions, filters, setFilters }) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [openedCategories, setOpenedCategories] = useState<Record<string, boolean>>({});
  
	const cycleBadgeState = (category: string, tag: string) => {
	  setFilters((prev: Filters) => {
		const current = prev[category]?.[tag] || 0;
		const next = nextTagState(current);
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
  
	const toggleCategory = (category: string) => {
	  setOpenedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
	};
  
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
			<SearchInputWithDropdown
			  tagOptions={tagOptions}
			  filters={filters}
			  onTagClick={cycleBadgeState}
			/>
  
			<Box style={{ minHeight: 60 }}>
			  <Group justify="space-between" align="center">
				<Text fw={500}>Выбранные теги:</Text>
				<Button size="xs" variant="light" color="red" onClick={handleClearFilters}>
				  Очистить все
				</Button>
			  </Group>
			  <SelectedBadges filters={filters} onRemove={removeTag} />
			</Box>
  
			{Object.entries(tagOptions).map(([category, tags]) => (
			<CategoryFilterSection
				key={category}
				category={category}
				tags={tags}
				filters={filters}
				isOpen={!!openedCategories[category]}
				onToggle={toggleCategory}
				onCycleTag={cycleBadgeState}
			/>
			))}
		  </Stack>
		</Modal>
  
		<Button onClick={toggle}>
		  {opened ? '❌ Закрыть фильтры' : '📁 Открыть фильтры'}
		</Button>
	  </>
	);
  };
  
  export default FilterModal;