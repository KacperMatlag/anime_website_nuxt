<script setup>
import genres from '~/assets/data/genres.json'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Nuxt Starter Template'
const description
  = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <Header />
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
          path: '/search',
          query: { genres: [item.mal_id] },
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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
