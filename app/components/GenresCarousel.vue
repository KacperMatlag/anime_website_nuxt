<script setup lang="ts">
const { dropdownLists } = useFilterData()
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="dropdownLists.genres?.items"
    arrows
    :ui="{
      item: 'basis-auto shrink-0',
      container: 'ms-8 me-8 h-15 flex items-center-safe',
      prev: 'sm:inset-s-2 z-10',
      next: 'sm:inset-e-2 z-10'
    }"
  >
    <NuxtLink
      :to="{
        path: '/anime/search',
        query: { genres: [item.value], sort: 'desc', order_by: 'score' },
        force: true,
        replace: true
      }"
      class="whitespace-nowrap"
    >
      <UBadge
        size="lg"
        variant="outline"
        color="warning"
      >
        {{ item.label }}
      </UBadge>
    </NuxtLink>
  </UCarousel>
</template>
