<script setup lang="ts">
import type { ButtonProps, PageHeaderProps } from '@nuxt/ui'
import type { ResponseData } from '~/types'

const { query, header } = defineProps<{
  query: string
  header: PageHeaderProps
  buttons?: ButtonProps[]
}>()
const { apiCall } = useJikanApi()
const { data: anime } = await useAsyncData<ResponseData>(query, () => apiCall({ page: 1, params: query }))
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
    <AnimeCard :anime="item" />
  </UCarousel>
</template>
