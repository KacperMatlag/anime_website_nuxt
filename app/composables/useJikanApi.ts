import type { ResponseData } from '~/types'
import apiLimiter from '~/utils/throttle'

type ApiCallParams = { page: number, params: string }

const throttledFetch = apiLimiter(async (url: string) => {
  return await $fetch<ResponseData>(url)
})

const useJikanApi = () => {
  const apiCall = ({ page, params }: ApiCallParams) => {
    return throttledFetch(`/api/anime?${params}&page=${page}`)
  }

  return { apiCall }
}
export default useJikanApi
