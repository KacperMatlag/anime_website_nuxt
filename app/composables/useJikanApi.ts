import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'
import apiLimiter from '~/utils/throttle'

type ApiCallParams = { page: number, params: string }

const throttledFetch = apiLimiter(async (url: string) => {
  return await $fetch<ApiMediaResponse<Anime>>(url)
})

const useJikanApi = () => {
  const apiCall = ({ page, params }: ApiCallParams) => {
    return throttledFetch(`/api/anime?${params}&page=${page}`)
  }

  return { apiCall }
}
export default useJikanApi
