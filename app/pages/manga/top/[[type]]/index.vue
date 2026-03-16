<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { MangaListResponse } from '~/types/manga'
import apiLimiter from '~/utils/throttle'

const route = useRoute()

const {
  data: mangaList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  suspense
} = useInfiniteQuery({
  queryKey: ['mangaTop', () => route.query],
  queryFn: async ({ pageParam = 1 }) => {
    return await apiLimiter(async () => await $fetch<MangaListResponse>('/api/manga/top', { query: { ...route.query, page: pageParam } }))()
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    return lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined
  },
  select: ({ pages }) => pages.flatMap(({ data }) => data)
})

await suspense()
</script>

<template>
  <InfinityScrollGrid
    v-slot="{ item }"
    :items="mangaList"
    :load-more-if="hasNextPage&&!isFetchingNextPage"
    @load-more="async() => await fetchNextPage()"
  >
    <AnimeCard :data="item" />
  </InfinityScrollGrid>
</template>
