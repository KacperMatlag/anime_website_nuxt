<script setup lang="ts">
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'

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
} = useSimpleMediaInfiniteQuery({
  key: ['season', params],
  fn: async ({ pageParam: page }) => {
    return await throttledFetch<ApiMediaResponse<Anime>>(`/api/seasons/season/${params.value.year}/${params.value.season}`, { query: { page } })
  }
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
