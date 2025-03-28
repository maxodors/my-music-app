import React, { useEffect, useRef, useState } from 'react';
import './FilterPanel.css';

type FilterMode = 'include' | 'exclude';

interface FilterPanelProps {
	data: Record<string, any>[];
	filters: Record<string, Record<string, FilterMode>>;
	setFilters: React.Dispatch<
		React.SetStateAction<Record<string, Record<string, FilterMode>>>
	>;
	filterCategories: string[];
}

const getTagColor = (tag: string) => {
	let hash = 0;
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 50%, 45%)`;
};

const FilterPanel: React.FC<FilterPanelProps> = ({
	data,
	filters,
	setFilters,
	filterCategories,
}) => {
	const [openCategory, setOpenCategory] = useState<string | null>(null);
	const [dropAbove, setDropAbove] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const categoryRefs = useRef<Record<string, HTMLLIElement | null>>({});
	const clickStartedInsideToggleButton = useRef(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (clickStartedInsideToggleButton.current) {
				clickStartedInsideToggleButton.current = false;
				return;
			}

			const dropdownEl = dropdownRef.current;
			if (
				openCategory &&
				dropdownEl &&
				!dropdownEl.contains(event.target as Node)
			) {
				setOpenCategory(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openCategory]);

	const toggleFilter = (category: string, value: string, mode: FilterMode) => {
		setFilters((prev) => {
			const updated = {
				...prev,
				[category]: { ...(prev[category] || {}) },
			};

			if (updated[category][value] === mode) {
				delete updated[category][value];
				if (Object.keys(updated[category]).length === 0) {
					delete updated[category];
				}
			} else {
				updated[category][value] = mode;
			}

			return updated;
		});
	};

	const getValuesForCategory = (category: string): string[] => {
		const values = new Set<string>();
		data.forEach((row) => {
			const val = row[category];
			if (typeof val === 'string') {
				val
					.split(',')
					.map((v) => v.trim())
					.forEach((tag) => {
						if (tag) values.add(tag);
					});
			} else if (Array.isArray(val)) {
				val.forEach((tag) => values.add(tag));
			}
		});
		return Array.from(values).sort();
	};

	const handlePanelClick = (category: string) => {
		if (openCategory === category) {
			setOpenCategory(null);
			return;
		}

		const refEl = categoryRefs.current[category];
		if (refEl) {
			const rect = refEl.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;
			setDropAbove(spaceBelow < 250 && spaceAbove > 250);
		}

		setOpenCategory(category);
	};

	return (
		<ul className="filter-panel">
			{filterCategories.map((category) => {
				const isOpen = openCategory === category;
				const selected = filters[category] || {};
				const setCategoryRef =
					(category: string) => (el: HTMLLIElement | null) => {
						categoryRefs.current[category] = el;
					};

				return (
					<li
						className={`filter-category ${isOpen ? 'open' : ''}`}
						key={category}
						ref={setCategoryRef(category)}>
						<div className="filter-row">
							<button
								className="filter-label"
								aria-expanded={isOpen}
								onMouseDown={() => {
									clickStartedInsideToggleButton.current = true;
								}}
								onClick={() => handlePanelClick(category)}>
								&#9672; {category}
							</button>

							<div className="selected-bubbles-inline">
								{Object.entries(selected).map(([value, mode]) => (
									<div
										key={value}
										className={`tag-bubble ${
											mode === 'include' ? 'included' : 'excluded'
										}`}>
										{value}
										<button
											className="close"
											onClick={(e) => {
												e.stopPropagation();
												toggleFilter(category, value, mode);
											}}
											aria-label={`Remove filter ${value}`}>
											×
										</button>
									</div>
								))}
							</div>
						</div>

						<div
							className={`filter-dropdown ${
								isOpen ? (dropAbove ? 'top' : 'bottom') : 'hidden'
							}`}
							ref={isOpen ? dropdownRef : null}>
							{getValuesForCategory(category).map((value) => {
								const current = selected[value];

								return (
									<div
										key={value}
										className={`dropdown-item ${
											current === 'include'
												? 'included'
												: current === 'exclude'
												? 'excluded'
												: ''
										}`}>
										<button
											type="button"
											className="mark"
											onClick={(e) => {
												e.stopPropagation();
												toggleFilter(category, value, 'include');
											}}>
											✔
										</button>
										<button
											type="button"
											className="cross"
											onClick={(e) => {
												e.stopPropagation();
												toggleFilter(category, value, 'exclude');
											}}>
											✖
										</button>
										<span
											className="tag"
											style={{ backgroundColor: getTagColor(value) }}>
											{value}
										</span>
									</div>
								);
							})}
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default FilterPanel;
