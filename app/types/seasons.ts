export type SeasonsResponse = {
  pagination: Pagination
  data: Season[]
}

export type Pagination = {
  last_visible_page: number
  has_next_page: boolean
}

export type Season = {
  year: number
  seasons: string[]
}
