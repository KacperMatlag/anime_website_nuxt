<script setup lang="ts">
import type { Anime } from '~/types/anime'
import type { Manga } from '~/types/manga'

defineProps<{ data: Anime | Manga }>()
</script>

<template>
  <NuxtLink
    :to="data.url"
    target="_blank"
  >
    <div class="flex flex-col min-w-0">
      <div
        class="overflow-hidden aspect-5/8 rounded-xl flex-8 relative bg-no-repeat"
      >
        <img
          :src="data.images.webp.large_image_url"
          class="w-full h-full max-h-full max-w-full object-cover hover:scale-[1.1] transition-all duration-400"
        >
        <div class="absolute bottom-1 right-1 flex gap-2">
          <UBadge
            class="truncate"
            icon="material-symbols:star"
            variant="solid"
            color="warning"
          >
            {{ data.score?data.score.toFixed(2):'-' }}
          </UBadge>
        </div>
      </div>
      <div class="flex flex-col flex-2 py-2 gap-1">
        <div class="flex flex-1 items-center">
          <p class="text-md truncate line-clamp-1">
            {{ data.title }}
          </p>
        </div>
        <div class="flex gap-2 flex-1 items-center">
          <UBadge
            v-for="{ name, mal_id } in data.genres.slice(0, 2)"
            :key="mal_id"
            :ui="{ base: 'text-center' }"
            variant="soft"
            size="md"
          >
            {{ name }}
          </UBadge>
          <UBadge
            v-if="data.genres.length-2>0"
            size="md"
          >
            +{{ data.genres.length-2 }}
          </UBadge>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
