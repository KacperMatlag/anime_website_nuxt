<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const menuMap = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Anime',
    active: route.path.startsWith('/anime'),
    icon: 'material-symbols:play-circle-outline-rounded',
    to: '/anime',
    children: [
      {
        label: 'Top',
        description: 'Najlepsze serie',
        to: '/anime/top',
        active: route.path.startsWith('/anime/top'),
        icon: 'material-symbols:trophy-outline'
      },
      {
        label: 'Wyszukiwarka',
        to: '/anime/search',
        description: 'Poszukaj czegoś dla siebie',
        active: route.path.startsWith('/anime/search'),
        icon: 'material-symbols:search-rounded'
      },
      {
        label: 'Losuj',
        to: '/',
        description: 'Losowy wynik',
        disabled: true,
        icon: 'ion:dice-outline'
      }
    ]
  },
  {
    label: 'Manga',
    icon: 'material-symbols:book-5-outline',
    to: '/manga',
    active: route.path.startsWith('/manga')
  },
  {
    label: 'Sezony',
    to: '/seasons',
    icon: 'mdi:calendar',
    active: route.path.startsWith('/seasons')
  },
  {
    label: 'Producenci',
    disabled: true,
    icon: 'mdi:company',
    active: route.path.startsWith('/producers')
  }

])
</script>

<template>
  <UHeader
    ref="headerRef"
    title="Tytuł"
    :ui="{ center: 'hidden lg:flex lg:w-full justify-center' }"
  >
    <UNavigationMenu
      :ui="{
        list: 'flex  justify-between gap-15'
      }"
      :items="menuMap"
    />
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<style>
nav>div{width: 100%;}
</style>
