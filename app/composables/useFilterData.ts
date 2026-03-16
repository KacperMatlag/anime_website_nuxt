import genres from '~/assets/data/genres/export'
import statuses from '~/assets/data/statuses/export'
import types from '~/assets/data/types/export'

const useFilterData = () => {
  const router = useRouter()
  const route = useRoute()

  const urlParams = ref<SearchParams>({
    genres: [],
    rating: '',
    type: '',
    order_by: 'score',
    sort: 'desc',
    status: ''
  })

  watch(
    () => route.query,
    (query) => {
      urlParams.value = {
        genres: (query['genres'] as string[]) || [],
        rating: (query['rating'] as string) || '',
        type: (query['type'] as string) || '',
        order_by: 'score',
        sort: 'desc',
        status: (query['status'] as string) || ''
      }
    },
    { immediate: true }
  )

  const updateRoute = () => {
    const params = filterKeyWithValue({ ...urlParams.value })
    router.push({ query: params })
  }

  const dropdownLists = computed<Record<string, FilterConfig>>(() => ({
    genres: {
      header: 'Kategorie',
      key: 'genres',
      items: mapToCheckboxOrRadioGroup(route.path.includes('anime') ? genres[0] : genres[1]),
      single: false

    },
    types: {
      header: 'Typy',
      key: 'type',
      items: mapToCheckboxOrRadioGroup(route.path.includes('anime') ? types[0] : types[1]),
      single: true
    },
    statuses: {
      header: 'Statusy',
      key: 'status',
      items: mapToCheckboxOrRadioGroup(route.path.includes('anime') ? statuses[0] : statuses[1]),
      single: true
    }
  }))

  return { dropdownLists, urlParams, updateRoute }
}

export default useFilterData

const mapToCheckboxOrRadioGroup = (
  data: { data: { name: string, mal_id: number | string }[] } | undefined
) => {
  return data!.data.map(({ name, mal_id }) => ({
    label: name,
    value: mal_id.toString()
  }))
}

const filterKeyWithValue = (urlParams: SearchParams) => {
  return Object.fromEntries(Object.entries(urlParams).filter(([_, v]) => {
    return (Array.isArray(v) || typeof v === 'string') && v.length > 0
  }))
}

export type SearchParams = {
  genres: string[]
  type: string
  status: string
  rating: string
  order_by: string
  sort: string
}

type SingleParamQueryKey = 'type' | 'status' | 'rating'
type MultiParamQueryKey = 'genres'
interface MultiSelectFilter {
  header: string
  key: MultiParamQueryKey
  items: { label: string, value: string }[]
  single: false
}

interface SingleSelectFilter {
  header: string
  key: SingleParamQueryKey
  items: { label: string, value: string }[]
  single: true
}

type FilterConfig = MultiSelectFilter | SingleSelectFilter
