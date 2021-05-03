export interface WorkInstrFilter {
  filters?: Filters;
  searchQuery?: string;
  title?: string;
  description: string;
  workInstrId?: number;
  isDefaultSearch: boolean;
}
export interface Filters {
  recipes?: string[] | null;
  locations?: string[] | null;
}
