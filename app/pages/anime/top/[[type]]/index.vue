<script setup lang="ts">
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'

const route = useRoute()

const {
  data: animeList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  suspense
} = useSimpleMediaInfiniteQuery({
  key: ['topAnime', () => route.params, () => route.query],
  fn: async ({ pageParam: page }) => await throttledFetch<ApiMediaResponse<Anime>>('/api/anime/top', { query: { ...route.query, page, type: route.params.type } })
})

await suspense()

const topMap: { label: string, value: string }[] = [
  {
    label: 'TV',
    value: 'tv'
  },
  {
    label: 'Film',
    value: 'movie'
  },
  {
    label: 'OVA',
    value: 'ova'
  },
  {
    label: 'Special',
    value: 'special'
  },
  {
    label: 'ONA',
    value: 'ona'
  },
  {
    label: 'Music',
    value: 'music'
  },
  {
    label: 'Reklama',
    value: 'cm'
  },
  {
    label: 'Zapowiedź',
    value: 'pv'
  },
  {
    label: 'Tv special',
    value: 'tv_special'
  }
]
</script>

<template>
  <div class="flex flex-col gap-5">
    <UPageHeader
      title="Najlepsze Anime"
      :description="(route.params.type as string)"
    />
    <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
      <NuxtLink
        v-for="item in topMap"
        :key="item.label"
        class="w-full"
        :to="'/anime/top/'+item.value"
      >
        <UButton
          class="w-full"
          size="sm"
          :ui="{ base: 'flex justify-center text-sm' }"
        >
          {{ item.label }}
        </UButton>
      </NuxtLink>
    </div>
    <InfinityScrollGrid
      :items="animeList"
      :load-more-if="hasNextPage&&!isFetchingNextPage"
      @load-more="fetchNextPage"
    >
      <template #default="{ item }">
        <AnimeCard
          :data="item"
          class="w-full"
        />
      </template>
    </InfinityScrollGrid>
  </div>
</template>
