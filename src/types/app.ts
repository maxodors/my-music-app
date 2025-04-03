import { NocoDBColumn } from './api';

export type FilterMode = 0 | 1 | 2; // 0 = none, 1 = include, 2 = exclude

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

export interface Filters {
	[category: string]: {
	  [tag: string]: 0 | 1 | 2; // 0 = neutral, 1 = include, 2 = exclude
	};
  }
  
  export interface RowData {
	Id: string;
	[key: string]: string | string[];
  }
  
  export interface FilterRequest {
	filters: Filters;
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	search?: string;
  }
