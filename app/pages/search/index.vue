<script setup lang="ts">
import type { ResponseData } from '~/types'

const route = useRoute()

const paramsString = computed(() =>
  new URLSearchParams(
    Object.entries(route.query) as [string, string][]
  ).toString()
)

const { data: anime, pending } = await useAsyncData<ResponseData>(
  () => `anime-${paramsString.value}`,
  () => $fetch('/api/anime?' + paramsString.value),
  {
    lazy: true
  }
)
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
    <AnimeCardSkeletonMap
      v-if="pending"
      :quantity="40"
    />
    <AnimeCard
      v-for="value in anime?.data"
      v-else
      :key="value.mal_id"
      :anime="value"
      class="w-full"
    />
    <FilterSlideover />
  </div>
</template>
