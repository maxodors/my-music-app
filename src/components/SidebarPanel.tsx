import React, { useState } from 'react';

import { FilterPanel, SidebarToggle } from '../components';
import { FILTER_CATEGORIES } from '../constants';
import { SidebarPanelProps } from '../types';

import '../components/SidebarToggle.css';

const SidebarPanel: React.FC<SidebarPanelProps> = ({
	data,
	filters,
	setFilters,
}) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<aside className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
			<SidebarToggle
				isOpen={sidebarOpen}
				onClick={() => setSidebarOpen(!sidebarOpen)}
			/>
			<section id="sidebar-wrapper">
				<h3>🎧 Фильтры</h3>
				<FilterPanel
					data={data}
					filters={filters}
					setFilters={setFilters}
					filterCategories={FILTER_CATEGORIES}
				/>
			</section>
		</aside>
	);
};

export default SidebarPanel;
