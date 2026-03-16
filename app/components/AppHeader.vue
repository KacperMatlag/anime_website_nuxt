<script setup lang="ts">
import { useNavigationMap } from '~/composables/useNavigationMap'

const { menuMap } = useNavigationMap()
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
    <template #body>
      <div class="flex flex-col text-center gap-3 text-2xl">
        <ULink
          v-for="item in menuMap"
          :key="item.to?.toString()"
          :to="item.to"
        >
          {{ item.label }}
        </ULink>
      </div>
    </template>
    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>

<style scoped>
nav>div{width: 100%;}
</style>
