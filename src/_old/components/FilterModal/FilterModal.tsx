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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import { columnTitles } from '../constants';
import { Filters } from '../types';

interface FilterModalProps {
	tagOptions: Record<string, string[]>;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterModal: React.FC<FilterModalProps> = ({
	tagOptions,
	filters,
	setFilters,
}) => {
	const [opened, { toggle }] = useDisclosure(false);
	const [search, setSearch] = useState('');
	const [openedCategories, setOpenedCategories] = useState<
		Record<string, boolean>
	>({});

	const cycleBadgeState = (category: string, tag: string) => {
		setFilters((prev: Filters) => {
			const current = prev?.[category]?.[tag] ?? 0;
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

	const getBadgeColor = (state: number) => {
		switch (state) {
			case 1:
				return 'green';
			case 2:
				return 'red';
			default:
				return 'gray';
		}
	};

	return (
		<>
			<Modal
				opened={opened}
				onClose={toggle}
				title="🎛 Фильтры"
				size="70%"
				centered>
				<Stack>
					<TextInput
						placeholder="Поиск тегов..."
						value={search}
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
					{Object.entries(tagOptions).map(([category, tags]) => {
						const isOpen = openedCategories[category];
						const toggleCategory = () =>
							setOpenedCategories((prev) => ({
								...prev,
								[category]: !prev[category],
							}));

						const filteredTags = tags.filter((tag) =>
							tag.toLowerCase().includes(search.toLowerCase())
						);

						return (
							<Box key={category}>
								<UnstyledButton
									onClick={toggleCategory}
									style={{ width: '100%' }}>
									<Group justify="space-between">
										<Text fw={500}>{columnTitles[category] || category}</Text>
										<Center>
											{isOpen ? (
												<IconChevronDown size={16} />
											) : (
												<IconChevronRight size={16} />
											)}
										</Center>
									</Group>
								</UnstyledButton>
								<Collapse in={isOpen}>
									<Group wrap="wrap" mt="xs">
										{filteredTags.map((tag) => (
											<Badge
												key={tag}
												color={getBadgeColor(filters[category]?.[tag] ?? 0)}
												variant="filled"
												onClick={() => cycleBadgeState(category, tag)}
												style={{ cursor: 'pointer' }}>
												{tag}
											</Badge>
										))}
									</Group>
								</Collapse>
							</Box>
						);
					})}
				</Stack>
			</Modal>

			<Button onClick={toggle} mt="md">
				{opened ? '❌ Закрыть фильтры' : '📁 Открыть фильтры'}
			</Button>
		</>
	);
};

export default FilterModal;
