<script setup lang="ts">
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'

const {
  data: animeList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
} = useSimpleMediaInfiniteQuery({
  key: ['currentSeason'],
  fn: async ({ pageParam: page }) => {
    return throttledFetch<ApiMediaResponse<Anime>>('/api/seasons/current', { query: { page } })
  }
})
</script>

<template>
  <InfinityScrollGrid
    v-slot="{ item }"
    :items="animeList"
    :load-more-if="hasNextPage&&!isFetchingNextPage"
    @load-more="fetchNextPage"
  >
    <AnimeCard :data="item" />
  </InfinityScrollGrid>
</template>
