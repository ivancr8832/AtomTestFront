export interface Response<T> {
  ok: boolean;
  message: string | null,
  data: T
}

export interface Pagination<T> {
  totalRecords?: number,
  totalPages?: number,
  items?: T[],
  currentPage?: number
}
