import _genres from '~/assets/data/genres.json'
import _ratings from '~/assets/data/ratings.json'
import _types from '~/assets/data/types.json'

const useFilterData = () => {
  const router = useRouter()
  const route = useRoute()
  const genres = mapTo<(typeof _genres.data)[0]>(_genres.data)
  const types = mapTo<(typeof _types.data)[0]>(_types.data)
  const ratings = mapTo<(typeof _ratings.data)[0]>(_ratings.data)

  const dropDownLists = { genres, types, ratings }

  const urlParams = ref<UrlParams>({
    genres: (route.query['genres'] as string[]) || [],
    rating: (route.query['rating'] as string) || '',
    type: (route.query['type'] as string) || '',
    order_by: 'score',
    sort: 'desc'
  })

  const updateRoute = () => {
    const params = filterKeyWithValue({ ...urlParams.value })
    router.push({ query: params })
  }

  return { dropDownLists, urlParams, updateRoute }
}

export default useFilterData

const mapTo = <TData extends { name: string, mal_id: number | string }>(
  data: TData[]
) => {
  return data.map(({ name, mal_id }) => ({
    label: name,
    value: mal_id.toString()
  }))
}

type UrlParams = {
  genres: string[]
  type: string
  rating: string
  order_by: string
  sort: string
}

const filterKeyWithValue = (urlParams: UrlParams) => {
  return Object.fromEntries(Object.entries({ ...urlParams }).filter(([_, v]) => {
    return (Array.isArray(v) || typeof v === 'string') && v.length > 0
  }))
}
