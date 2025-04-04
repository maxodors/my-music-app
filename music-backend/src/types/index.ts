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

  export interface NocoDBColumn {
    id: string;
    column_name: string;
    title: string;
    type?: string;
    description?: string;
    system?: boolean;
    colOptions?: {
      options?: {
        title: string;
        color?: string;
      }[];
    };
  }
  