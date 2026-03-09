import type { ResponseData } from '~/types'
import apiLimiter from '~/utils/thtottle'

type ApiCallParams = { page: number, params: string }

const useJikanApi = () => {
  const apiCall = ({ page, params }: ApiCallParams) => {
    console.log(`/api/anime?${params}&page=${page}`)
    return apiLimiter(async () => await $fetch<ResponseData>(`/api/anime?${params}&page=${page}`))()
  }

  return { apiCall }
}
export default useJikanApi
