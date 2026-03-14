<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import type { ResponseData } from '~/types'
import apiLimiter from '~/utils/throttle'

const route = useRoute()

const {
  data: animeList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  suspense
} = useInfiniteQuery({
  queryKey: ['anime', () => route.path],
  initialPageParam: 1,
  queryFn: async ({ pageParam }) => {
    return await apiLimiter(async () => await $fetch<ResponseData>(`/api/anime/top`, { query: { page: pageParam, type: route.params.type } }))()
  },
  getNextPageParam: lp => lp.pagination.has_next_page ? lp.pagination.current_page + 1 : undefined,
  select: ({ pages }) => pages.flatMap(({ data }) => data)
})

await suspense()

const topMap: { label: string, value: string }[] = [
  {
    label: 'TV',
    value: 'tv'
  },
  {
    label: 'Movie',
    value: 'movie'
  },
  {
    label: 'Ova',
    value: 'ova'
  },
  {
    label: 'Special',
    value: 'special'
  },
  {
    label: 'Ona',
    value: 'ona'
  },
  {
    label: 'Music',
    value: 'music'
  },
  {
    label: 'Cm',
    value: 'cm'
  },
  {
    label: 'Pv',
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
          :anime="item"
          class="w-full"
        />
      </template>
    </InfinityScrollGrid>
  </div>
</template>
