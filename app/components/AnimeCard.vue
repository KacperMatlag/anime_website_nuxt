<script setup lang="ts">
import type { Anime } from '~/types'

defineProps<{ anime: Anime }>()
</script>

<template>
  <NuxtLink
    :to="anime.url"
    target="_blank"
  >
    <div class="flex flex-col aspect-9/16 min-w-0">
      <div
        class="overflow-hidden rounded-xl flex-8 relative bg-no-repeat"
      >
        <img
          :src="anime.images.webp.large_image_url"
          class="w-full h-full max-h-full max-w-full object-cover hover:scale-[1.1] transition-all duration-400"
        >
        <div class="absolute bottom-1 right-1 flex gap-2">
          <UBadge
            class="truncate"
            icon="material-symbols:star"
            variant="solid"
            color="warning"
          >
            {{ anime.score?anime.score.toFixed(2):'-' }}
          </UBadge>
        </div>
      </div>
      <div class="flex flex-col flex-1 py-2 gap-1">
        <span class="text-md truncate line-clamp-1">
          {{ anime.title }}
        </span>
        <div class="flex gap-2 items-start">
          <UBadge
            v-for="{ name, mal_id } in anime.genres.slice(0, 2)"
            :key="mal_id"
            :ui="{ base: 'text-center' }"
            variant="soft"
          >
            {{ name }}
          </UBadge>
          <UBadge
            v-if="anime.genres.length-2>0"
          >
            +{{ anime.genres.length-2 }}
          </UBadge>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
