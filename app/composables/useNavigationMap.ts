import type { NavigationMenuItem } from '@nuxt/ui'

export const useNavigationMap = () => {
  const route = useRoute()

  const createMediaSection = (type: 'anime' | 'manga', label: string, icon: string) => {
    return ({
      label,
      icon,
      active: route.path.startsWith(`/${type}`),
      to: `/${type}`,
      children: [
        {
          label: 'Top',
          to: `/${type}/top`,
          description: 'Najlepsze serie',
          icon: 'material-symbols:trophy-outline'
        },
        {
          label: 'Wyszukiwarka',
          to: `/${type}/search?order_by=score&sort=desc`,
          description: 'Poszukaj czegoś dla siebie',
          icon: 'material-symbols:search-rounded'
        },
        {
          label: 'Losuj',
          disabled: true,
          icon: 'ion:dice-outline',
          description: 'Losowy wynik'
        }
      ]
    })
  }

  const menuMap = computed<NavigationMenuItem[]>(() => [
    createMediaSection('anime', 'Anime', 'material-symbols:play-circle-outline-rounded'),
    createMediaSection('manga', 'Manga', 'material-symbols:book-5-outline'),
    {
      label: 'Sezony',
      to: '/seasons',
      icon: 'mdi:calendar',
      active: route.path.startsWith('/seasons'),
      children: [{
        label: 'Aktualny sezon',
        description: '',
        to: '/seasons/current',
        icon: 'openmoji:red-circle'
      }]
    },
    {
      label: 'Producenci',
      disabled: true,
      icon: 'mdi:company',
      active: route.path.startsWith('/producers')
    }

  ])

  return { menuMap }
}
