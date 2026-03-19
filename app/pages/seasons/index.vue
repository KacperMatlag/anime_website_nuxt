<script setup lang="ts">
import SeasonContainer from '~/components/SeasonContainer.vue'
import type { SeasonsResponse } from '~/types/seasons'

const { data: seasons } = useAsyncData('seasons-list', async () => {
  return throttledFetch<SeasonsResponse>('/api/seasons')
}, { lazy: false })
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
    <SeasonContainer
      v-for="season in seasons?.data"
      :key="season.year+season.seasons.toString()"
      :season="season"
    />
  </div>
</template>
