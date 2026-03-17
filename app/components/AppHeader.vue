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
      <div class="flex flex-col text-center gap-5">
        <div
          v-for="parentLink in menuMap"
          :key="parentLink.to?.toString()"
          class="flex flex-col gap-2"
        >
          <ULink
            :to="parentLink.to"
            class="text-2xl"
          >
            {{ parentLink.label }}
          </ULink>
          <ULink
            v-for="link in parentLink.children"
            :key="link.to?.toString()"
            :to="link.to"
            class="text-md"
          >
            {{ link.label }}
          </ULink>
          <USeparator />
        </div>
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
