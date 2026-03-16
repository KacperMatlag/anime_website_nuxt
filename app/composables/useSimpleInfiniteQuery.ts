import { useInfiniteQuery, type QueryKey } from '@tanstack/vue-query'
import type { MaybeRefOrGetter } from 'vue'
import type { ApiMediaResponse } from '~/types/global'

type Params<TResponse> = {
  key: MaybeRefOrGetter<QueryKey>
  fn: ({ pageParam }: { pageParam: number }) => Promise<TResponse>
}

export const useSimpleMediaInfiniteQuery = <T>({ fn, key }: Params<ApiMediaResponse<T>>) => {
  return useInfiniteQuery({
    queryKey: typeof key === 'function' ? key() : key,
    initialPageParam: 1,
    queryFn: fn,
    getNextPageParam: lp => lp.pagination.has_next_page ? lp.pagination.current_page + 1 : undefined,
    select: data => data.pages.flatMap(d => d.data),
    retryDelay: 1000
  })
}
