export interface APIResponse<T> {
  success: boolean;
  data: T | undefined;
  message: string | undefined;
  errcode: number | undefined;
  error: T | undefined;
}

export interface PaginationData<T> {
  limit: number;
  page: number;
  sort: string;
  total_rows: number;
  total_pages: number;
  rows: T[] | null;
}
