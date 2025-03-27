type FilterMode = 'include' | 'exclude';

export type RowData = Record<string, any>;

export type Filters = Record<string, Record<string, FilterMode>>;

export interface MusicTableProps {
	data: RowData[];
}

export interface SidebarPanelProps {
	data: RowData[];
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface SidebarToggleProps {
	isOpen: boolean;
	onClick: () => void;
}
