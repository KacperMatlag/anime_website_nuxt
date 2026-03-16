import { defineNuxtPlugin, useState } from '#imports'
import {
  QueryClient,
  VueQueryPlugin,
  dehydrate,
  hydrate,
  type DehydratedState,
  type VueQueryPluginOptions
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  // Stan współdzielony między serwerem a klientem
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  // 1. Tworzymy QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 2,
        retryDelay: attempt => attempt * 2000
      }
    }
  })

  const options: VueQueryPluginOptions = { queryClient }

  // 2. Rejestrujemy plugin w aplikacji Vue
  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    // Serwer: Dehydracja stanu po wyrenderowaniu strony
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    // Klient: Hydracja stanu przy uruchomieniu
    // Używamy hooka 'app:created' lub 'vue:setup'
    nuxt.hooks.hook('app:created', () => {
      hydrate(queryClient, vueQueryState.value)
    })
  }
})
