<script setup lang="ts">
import { useInfiniteQuery } from '@tanstack/vue-query'
import useJikanApi from '~/composables/useJikanApi'

const route = useRoute()
const { apiCall } = useJikanApi()

const paramsString = computed(() =>
  new URLSearchParams(route.query as Record<string, string>).toString()
)

const {
  data: anime,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  suspense
} = useInfiniteQuery({
  queryKey: ['animesearch', paramsString],
  queryFn: async ({ pageParam = 1 }) => apiCall({ page: pageParam, params: paramsString.value }),
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    return lastPage.pagination.has_next_page ? lastPage.pagination.current_page + 1 : undefined
  },
  select: data => data.pages.flatMap(({ data }) => data)
})

await suspense()

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

watch(loadMoreTrigger, (el) => {
  if (!el) return

  observer?.disconnect()

  observer = new IntersectionObserver(
    ([entry]) => {
      if (
        entry?.isIntersecting
        && hasNextPage.value
        && !isFetchingNextPage.value
      ) {
        fetchNextPage()
      }
    },
    {
      rootMargin: '200px'
    }
  )

  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
      <AnimeCard
        v-for="value in anime"
        :key="value.mal_id"
        :anime="value"
        class="w-full"
      />

      <div
        ref="loadMoreTrigger"
      />
    </div>
    <p
      v-if="anime?.length == 0"
      class="w-full text-center"
    >
      Nie ma wyników
    </p>
    <FilterSlideover />
  </div>
</template>
