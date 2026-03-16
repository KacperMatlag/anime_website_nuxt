<script setup lang="ts" generic="T extends Anime | Manga">
import type { ButtonProps, PageHeaderProps } from '@nuxt/ui'
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'
import type { Manga } from '~/types/manga'
import apiLimiter from '~/utils/throttle'

const props = defineProps<{
  fn: () => Promise<ApiMediaResponse<T>>
  header: PageHeaderProps
  buttons?: ButtonProps[]
}>()

const { data: anime } = await useAsyncData<ApiMediaResponse<T>>(props.fn.toString(), () => apiLimiter(props.fn)())
</script>

<template>
  <UPageHeader
    v-bind="header"
    :ui="{
      title: 'hover:underline',
      description: 'mt-2',
      root: 'border-0'
    }"
    :links="buttons"
  />
  <UCarousel
    v-slot="{ item }"
    :items="anime?.data"
    :ui="{
      item: 'basis-auto shrink-0 w-50',
      prev: 'left-4 sm:left-3 lg:left-5',
      next: 'right-4 sm:right-3 lg:right-5'
    }"
    arrows
  >
    <AnimeCard
      :key="item.mal_id"
      :data="item"
    />
  </UCarousel>
</template>
