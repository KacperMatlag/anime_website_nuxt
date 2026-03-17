<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ApiMediaResponse } from '~/types/global'
import type { Manga } from '~/types/manga'

const route = useRoute()

const {
  data: mangaList,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  suspense
} = useInfiniteQuery({
  queryKey: ['mangaTop', () => route.params],
  queryFn: async ({ pageParam: page }) => {
    return await throttledFetch<ApiMediaResponse<Manga>>('/api/manga/top', { query: { page, type: route.params.type } })
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    return lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined
  },
  select: ({ pages }) => pages.flatMap(({ data }) => data)
})

await suspense()

const mangaType: { label: string, value: string }[] = [
  {
    label: 'Manga',
    value: 'manga'
  },
  {
    label: 'Novel',
    value: 'novel'
  },
  {
    label: 'Lightnovel',
    value: 'lightnovel'
  },
  {
    label: 'Oneshot',
    value: 'oneshot'
  },
  {
    label: 'Doujin',
    value: 'doujin'
  },
  {
    label: 'Manhwa',
    value: 'manhwa'
  },
  {
    label: 'Manhua',
    value: 'manhua'
  }
]
</script>

<template>
  <div class="flex flex-col gap-5">
    <UPageHeader
      title="Najlepsze Mangi"
      :description="(route.params.type as string)"
    />
    <div class="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
      <NuxtLink
        v-for="item in mangaType"
        :key="item.label"
        class="w-full"
        :to="'/manga/top/'+item.value"
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
      v-slot="{ item }"
      :items="mangaList"
      :load-more-if="hasNextPage&&!isFetchingNextPage"
      @load-more="async() => await fetchNextPage()"
    >
      <AnimeCard :data="item" />
    </InfinityScrollGrid>
  </div>
</template>
