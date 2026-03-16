<script setup lang="ts">
import type { Season } from '~/types/seasons'
import { getIcon, translateSeason } from '~/utils/seasonUtils'

defineProps<{ season: Season }>()
</script>

<template>
  <div class="aspect-square flex flex-col rounded-2xl overflow-hidden bg-gray-500/9 border-2 border-dashed border-gray-500/50">
    <div class="flex-2 flex justify-center items-center text-2xl bg-gray-950/90 border-b-2 border-dashed border-gray-500/50">
      {{ season.year }}
    </div>
    <div class="grid grid-cols-2 grid-rows-2 flex-5">
      <NuxtLink
        v-for="s in season.seasons"
        :key="s"
        :to="`/seasons/${season.year}/${s}`"
        class="flex flex-col justify-center items-center gap-2"
      >
        <div class="flex flex-col gap-2 justify-center items-center">
          <Icon
            :name="getIcon(s)"
            size="25"
          />
          <span class="text-xl">{{ translateSeason(s) }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
