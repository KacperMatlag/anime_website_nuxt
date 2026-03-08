<script setup lang="ts">
import type { PageHeaderProps } from '@nuxt/ui'
import type { ResponseData } from '~/types'

const { query, header } = defineProps<{
  query?: string
  header: PageHeaderProps
}>()

const { data: anime } = await useFetch<ResponseData>('/api/anime?' + query, {
  lazy: true
})
</script>

<template>
  <UPageHeader
    v-bind="header"
    :ui="{
      title: 'hover:underline',
      description: 'mt-2',
      root: 'border-0'
    }"
    :links="[
      {
        label: 'view more',
        to: '/search?' + query
      }
    ]"
  />
  <UCarousel
    v-slot="{ item }"
    :items="anime?.data"
    :ui="{
      item: 'basis-auto shrink-0 w-50'
    }"
    arrows
  >
    <AnimeCard :anime="item" />
  </UCarousel>
</template>
