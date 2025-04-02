import { NocoDBColumn } from './api';

export type FilterMode = 0 | 1 | 2; // 0 = none, 1 = include, 2 = exclude

export type RowData = Record<string, any>;

export type Filters = Record<string, Record<string, FilterMode>>;

export interface MusicTableProps {
	data: RowData[];
	columns: NocoDBColumn[];
}

export type TableColumn = {
	name: string;
	isVisible: boolean;
};

export interface SidebarPanelProps {
	data: RowData[];
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface SidebarToggleProps {
	isOpen: boolean;
	onClick: () => void;
}
