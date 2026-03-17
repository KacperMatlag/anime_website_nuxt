<script setup lang="ts">
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'

definePageMeta({
  layout: 'filter-page-layout'
})

const route = useRoute()

const paramsString = computed(() =>
  new URLSearchParams(route.query as Record<string, string>).toString()
)

const {
  data: animeList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  suspense,
  isFetching
} = useSimpleMediaInfiniteQuery({
  key: ['animeSearch', paramsString],
  fn: async ({ pageParam = 1 }) => throttledFetch<ApiMediaResponse<Anime>>('/api/anime', { query: { ...route.query, page: pageParam } })
})
// = useInfiniteQuery({
//   queryKey: ['animesearch', paramsString],
//   queryFn: async ({ pageParam = 1 }) => await apiCall({ page: pageParam, params: paramsString.value }),
//   initialPageParam: 1,
//   getNextPageParam: (lastPage) => {
//     return lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined
//   },
//   select: ({ pages }) => pages.flatMap(({ data }) => data)
// })

await suspense()

const message = computed(() => {
  if (isFetching.value || isFetchingNextPage.value) return ''
  if (animeList.value?.length === 0) return 'Nie ma dopasowań'
  if (!hasNextPage.value) return 'Koniec wyników'
  return ''
})
</script>

<template>
  <div>
    <InfinityScrollGrid
      v-slot="{ item }"
      :items="animeList"
      :load-more-if="hasNextPage&&!isFetchingNextPage"
      @load-more="fetchNextPage"
    >
      <AnimeCard
        :data="item"
        class="w-full"
      />
    </InfinityScrollGrid>
    <p
      class="h-50 text-white/80 text-center"
    >
      {{ message }}
    </p>
    <FilterSlideover />
  </div>
</template>
