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
  