<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ResponseData } from '~/types'
import apiLimiter from '~/utils/throttle'

const route = useRoute()

const params = computed(() => ({
  year: route.params.year,
  season: route.params.season
}))

const { data, hasNextPage, isFetchingNextPage, suspense, fetchNextPage } = useInfiniteQuery({
  queryKey: ['season', params],
  initialPageParam: 1,
  queryFn: async ({ pageParam }) => {
    return await apiLimiter(async () => await $fetch<ResponseData>(`/api/seasons/season?`, { query: { ...params.value, page: pageParam } }))()
  },
  getNextPageParam: lp => lp.pagination.has_next_page ? lp.pagination.current_page + 1 : undefined,
  select: ({ pages }) => pages.flatMap(({ data }) => data)

})

await suspense()
</script>

<template>
  <InfinityScrollGrid
    v-slot="{ item }"
    :items="data"
    :load-more-if="hasNextPage&&!isFetchingNextPage"
    @load-more="fetchNextPage"
  >
    <AnimeCard :anime="item" />
  </InfinityScrollGrid>
</template>
