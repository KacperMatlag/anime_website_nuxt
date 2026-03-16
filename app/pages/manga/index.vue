<script setup lang="ts">
import { useHomeConfig } from '~/composables/useHomeConfig'

const { carouselConfig } = useHomeConfig()
</script>

<template>
  <div>
    <GenresCarousel />
    <CardsCarousel
      v-for="value in carouselConfig"
      v-bind="value"
      :key="value.key"
    />
  </div>
</template>
