import genres from '~/assets/data/genres/export'
import statuses from '~/assets/data/statuses/export'
import types from '~/assets/data/types/export'

const useFilterData = () => {
  const router = useRouter()
  const route = useRoute()

  const urlParams = ref<SearchParams>({
    genres: [],
    genres_exclude: [],
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
        genres: ((query['genres'] as string)?.split(',')) || [],
        rating: (query['rating'] as string) || '',
        type: (query['type'] as string) || '',
        order_by: 'score',
        sort: 'desc',
        status: (query['status'] as string) || '',
        genres_exclude: (query['genres_exclude'] as string)?.split(',') || []
      }
    },
    { immediate: true }
  )

  const updateRoute = () => {
    const params = filterEmptyValueAndPrepareQuery({ ...urlParams.value })
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
    },
    genres_exclude: {
      header: 'Niechciane kategorie',
      key: 'genres_exclude',
      items: mapToCheckboxOrRadioGroup(route.path.includes('anime') ? genres[0] : genres[1]),
      single: false
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

const filterEmptyValueAndPrepareQuery = (urlParams: SearchParams) => {
  return Object.fromEntries(Object.entries(urlParams).filter(([_, v]) => {
    return (Array.isArray(v) || typeof v === 'string') && v.length > 0
  }).map(([k, v]) => {
    return Array.isArray(v) ? [k, v.join(',')] : [k, v]
  }))
}

export type SearchParams = {
  genres: string[]
  genres_exclude: string[]
  type: string
  status: string
  rating: string
  order_by: string
  sort: string
}

type SingleParamQueryKey = 'type' | 'status' | 'rating'
type MultiParamQueryKey = 'genres' | 'genres_exclude'
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
