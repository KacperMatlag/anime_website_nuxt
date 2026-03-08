<script setup lang="ts">
import type { Anime } from '~/types'

defineProps<{ anime: Anime }>()
</script>

<template>
  <NuxtLink
    :to="anime.url"
    class="flex flex-1 justify-center"
    target="_blank"
  >
    <div class="flex flex-col aspect-9/16 min-w-0">
      <div class="overflow-hidden rounded-xl flex-8">
        <img
          :src="anime.images.webp.image_url"
          class="w-full h-full max-h-full max-w-full object-cover"
        >
      </div>
      <div class="flex flex-col p-2 flex-1">
        <span class="text-sm truncate">{{ anime.title }}</span>
        <div class="flex items-center flex-1 gap-1 text-gray-400">
          <span class="text-xs">{{ anime.year ?? '-' }}</span>
          <div>•</div>
          <span class="text-xs">{{ anime.type }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
