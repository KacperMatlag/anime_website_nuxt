import { useInfiniteQuery } from '@tanstack/vue-query'

const { apiCall } = useJikanApi()

const simpleInfinityQuery = (key: [string, unknown], params: string) => {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam }) => {
      return await apiCall({ params, page: pageParam })
    },
    initialPageParam: 1,
    getNextPageParam: (lp) => {
      return lp.pagination.has_next_page ? lp.pagination.current_page + 1 : undefined
    },
    select: ({ pages }) => {
      return pages.flatMap(({ data }) => data)
    }
  })
}

export default simpleInfinityQuery
