<script setup>
import genres from '~/assets/data/genres.json'
</script>

<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      :items="genres.data"
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
          query: { genres: [item.mal_id], sort: 'desc', order_by: 'score' },
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
          {{ item.name }}
        </UBadge>
      </NuxtLink>
    </UCarousel>
    <CardsCarousel
      query="status=airing&order_by=score&sort=desc"
      :header="{
        title: 'Wychodzące',
        description: 'Aktualnie nadawane'
      }"
      :buttons="[{
        to: '/anime/top?filter=airing',
        label: 'Zobacz Więcej'
      }]"
    />

    <CardsCarousel
      query="order_by=popularity&sort=asc"
      :header="{
        title: 'Popularne',
        description: 'popularne serie'
      }"
      :buttons="[
        {
          to: '/anime/top?filter=bypopularity',
          label: 'Zobacz Więcej'
        }
      ]"
    />
  </div>
</template>
