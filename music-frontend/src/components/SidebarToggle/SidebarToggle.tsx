import React from 'react';

import { SidebarToggleProps } from 'src/types';

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, onClick }) => {
	return (
		<div id="sidebar-toggle" onClick={onClick}>
			<span className="icon arrow">{isOpen ? '◀' : '▶'}</span>
			<span className="label">Фильтры</span>
			<span className="icon folder">📁</span>
		</div>
	);
};

export default SidebarToggle;
