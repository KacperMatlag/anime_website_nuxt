import type CardsCarousel from '~/components/CardsCarousel.vue'
import type { Anime } from '~/types/anime'
import type { ApiMediaResponse } from '~/types/global'
import type { Manga } from '~/types/manga'

type CardsCarouselProps = Parameters<typeof CardsCarousel>['0'] & { key: string }

const ANIME_CAROUSEL_CONFIG: CardsCarouselProps[] = [
  {
    key: 'AiringAnime',
    fn: () => $fetch<ApiMediaResponse<Anime>>('/api/anime?status=airing&sort=desc'),
    header: {
      title: 'Wychodzące',
      description: 'Aktualnie nadawane'
    },
    buttons: [{
      to: '/anime/top?filter=airing',
      label: 'Zobacz Więcej'
    }]
  },
  {
    key: 'PopularAnime',
    fn: () => $fetch<ApiMediaResponse<Anime>>('/api/anime?order_by=score&sort=desc'),
    header: {
      title: 'Popularne',
      description: 'popularne serie'
    },
    buttons: [
      {
        to: '/anime/top?filter=bypopularity',
        label: 'Zobacz Więcej'
      }
    ]
  }
]
const MANGA_CAROUSEL_CONFIG: CardsCarouselProps[] = [
  {
    key: 'PublishingManga',
    fn: () => $fetch<ApiMediaResponse<Manga>>('/api/manga?status=publishing&sort=desc'),
    header: {
      title: 'Wychodzące',
      description: 'Aktualnie nadawane'
    },
    buttons: [{
      to: '/anime/top?filter=airing',
      label: 'Zobacz Więcej'
    }]
  },
  {
    key: 'PopularManga',
    fn: () => $fetch<ApiMediaResponse<Manga>>('/api/manga?order_by=score&sort=desc'),
    header: {
      title: 'Popularne',
      description: 'popularne serie'
    },
    buttons: [
      {
        to: '/anime/top?filter=bypopularity',
        label: 'Zobacz Więcej'
      }
    ]
  }
]

export const useHomeConfig = () => {
  const route = useRoute()

  const carouselConfig = route.path.includes('anime') ? ANIME_CAROUSEL_CONFIG : MANGA_CAROUSEL_CONFIG

  return {
    carouselConfig
  }
}
