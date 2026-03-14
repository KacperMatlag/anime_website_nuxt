<script setup lang="ts">
import SeasonContainer from '~/components/SeasonContainer.vue'
import type { SeasonsResponse } from '~/types/seasons'
import apiLimiter from '~/utils/throttle'

const { data: seasons } = useAsyncData('seasons-list', async () => {
  return apiLimiter(async () => await $fetch<SeasonsResponse>('/api/seasons'))()
}, { lazy: false })
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
    <SeasonContainer
      v-for="(season, index) in seasons?.data"
      :key="index"
      :season="season"
    />
  </div>
</template>
