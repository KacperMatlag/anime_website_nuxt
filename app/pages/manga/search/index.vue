<script setup lang="ts">
import type { ApiMediaResponse } from '~/types/global'
import type { Manga } from '~/types/manga'

definePageMeta({
  layout: 'filter-page-layout'
})

const route = useRoute()

const {
  data: mangaList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  suspense
} = useSimpleMediaInfiniteQuery({
  key: ['mangaSearch', () => route.query],
  fn: async ({ pageParam: page }) => {
    return await throttledFetch<ApiMediaResponse<Manga>>('/api/manga', { query: { ...route.query, page } })
  }
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
