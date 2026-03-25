import type { LocationQuery } from 'vue-router'

const useQueryFilters = () => {
  const route = useRoute()
  const router = useRouter()

  const defaults: SearchParams = ({
    genres: [],
    genres_exclude: [],
    rating: '',
    type: '',
    order_by: '',
    sort: '',
    status: ''
  })

  /**
  * Zmienna na parametry query w stronie z wyszukiwarka
  */
  const urlParams = ref(defaults)

  const mapQuery = (query: LocationQuery) => Object.entries(urlParams.value).reduce((accumulator, [key, _]) => {
    const queryVal = query[key] as string | undefined
    if (keyType.isMulti(key)) {
      accumulator[key] = queryVal ? queryVal.split(',') : []
    } else {
      accumulator[key] = queryVal || ''
    }
    return accumulator
  }, {} as Record<string, string | string[]>)
  /**
  * Watch na zmiane parametrow
  * Automatyczne mapowanie query na model
  */
  watch(
    () => route.query,
    (query) => {
      urlParams.value = mapQuery(query) as SearchParams
    },
    { immediate: true }
  )

  const updateRoute = () => {
    const params = filterEmptyValueAndPrepareQuery({ ...urlParams.value })
    router.push({ query: params })
  }

  return { urlParams, updateRoute }
}

export default useQueryFilters

const filterEmptyValueAndPrepareQuery = (urlParams: SearchParams) => {
  return Object.fromEntries(Object.entries(urlParams).filter(([_, v]) => {
    return (Array.isArray(v) || typeof v === 'string') && v.length > 0
  }).map(([k, v]) => {
    return Array.isArray(v) ? [k, v.join(',')] : [k, v]
  }))
}
