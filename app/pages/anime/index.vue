<script setup lang="ts">
import CardsCarousel from '~/components/CardsCarousel.vue'
import { useHomeConfig } from '~/composables/useHomeConfig'

const { carouselConfig } = useHomeConfig()
</script>

<template>
  <div>
    <GenresCarousel />
    <CardsCarousel
      v-for="item in carouselConfig"
      v-bind="item"
      :key="item.key"
    />
  </div>
</template>
