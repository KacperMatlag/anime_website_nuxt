<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'
import apiLimiter from '~/utils/throttle'

const route = useRoute()

const params = computed(() => ({
  year: route.params.year as string,
  season: route.params.season as string
}))

const {
  data,
  hasNextPage,
  isFetchingNextPage,
  suspense,
  fetchNextPage
} = useInfiniteQuery({
  queryKey: ['season', params],
  initialPageParam: 1,
  queryFn: async ({ pageParam }) => {
    return await apiLimiter(async () => await $fetch<ApiMediaResponse<Anime>>(`/api/seasons/season?`, { query: { ...params.value, page: pageParam } }))()
  },
  getNextPageParam: lp => lp.pagination.has_next_page ? lp.pagination.current_page + 1 : undefined,
  select: ({ pages }) => pages.flatMap(({ data }) => data)

})

await suspense()
</script>

<template>
  <div>
    <UPageHeader
      :title="`Sezon ${translateSeason(params.season)} ${params.year}`"
      :ui="{
        root: 'border-none'
      }"
    />
    <InfinityScrollGrid
      v-slot="{ item }"
      :items="data"
      :load-more-if="hasNextPage&&!isFetchingNextPage"
      @load-more="fetchNextPage"
    >
      <AnimeCard :data="item" />
    </InfinityScrollGrid>
  </div>
</template>
