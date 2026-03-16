import type { Pagination } from './anime'

export type ApiMediaResponse<T> = {
  data: T[]
  pagination: Pagination
}
