<script setup>
import AppHeader from './components/AppHeader.vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'Strona z Anime i Mangą'
const description
  = 'Poszukaj czegoś dla siebie'

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
    <AppHeader />
    <NuxtLayout>
      <UMain class="w-full lg:w-[80%] mx-auto p-3">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
    <AppFooter />
  </UApp>
</template>
