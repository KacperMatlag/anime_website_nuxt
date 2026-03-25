import useStaticData from './useStaticData'

export type SearchParams = {
  genres: string[]
  genres_exclude: string[]
  type: string
  status: string
  rating: string
  order_by: string
  sort: string
}

type FilterConfig = {
  header: string
  key: MultiParamQueryKey | SingleParamQueryKey
  items: { label: string, value: string }[]
}

type JSONData = {
  data: {
    name: string
    mal_id: number | string
  }[]
}

type FilterContext
  = | { type: 'multi', value: string[], key: MultiParamQueryKey }
    | { type: 'single', value: string, key: SingleParamQueryKey }

const useFilterData = () => {
  const route = useRoute()
  const { urlParams } = useQueryFilters()
  const { base, animeSpecyfic } = useStaticData()

  const filterQueries = reactive<Record<MultiParamQueryKey, string>>({
    genres: '',
    genres_exclude: ''
  })

  const getFilterContext = (key: string): FilterContext | null => {
    if (!(key in urlParams.value)) return null

    if (keyType.isMulti(key)) {
      return {
        type: 'multi',
        key: key as MultiParamQueryKey,
        value: urlParams.value[key]
      }
    }

    if (keyType.isSingle(key)) {
      return {
        type: 'single',
        key: key as SingleParamQueryKey,
        value: urlParams.value[key]
      }
    }
    return null
  }

  const selectSet = (data: JSONData[], key?: MultiParamQueryKey) => {
    const isAnime = route.path.includes('anime')
    const set = isAnime ? data[0] : data[1]
    const map = mapToCheckboxOrRadioGroup(set)

    if (key && filterQueries[key]) {
      const query = filterQueries[key].toLowerCase()
      return map.filter(z => z.label.toLowerCase().includes(query))
    }
    return map
  }

  const dropdownLists = computed<Partial<Record<keyof SearchParams, FilterConfig>>>(() => {
    const _base: Partial<Record<keyof SearchParams, FilterConfig>> = {
      genres: {
        header: 'Kategorie',
        key: 'genres',
        items: selectSet(base.genres, 'genres')
      },
      type: {
        header: 'Typy',
        key: 'type',
        items: selectSet(base.types)
      },
      status: {
        header: 'Statusy',
        key: 'status',
        items: selectSet(base.statuses)
      },
      genres_exclude: {
        header: 'Niechciane kategorie',
        key: 'genres_exclude',
        items: selectSet(base.genres, 'genres_exclude')
      },
      sort: {
        header: 'Rodzaj Sortowanie',
        key: 'sort',
        items: mapToCheckboxOrRadioGroup(base.sort)
      },
      order_by: {
        header: 'Sortowanie Po',
        key: 'order_by',
        items: selectSet(base.orderBys)
      }
    }

    if (route.path.includes('anime')) {
      _base.rating = {
        header: 'Rating',
        items: mapToCheckboxOrRadioGroup(animeSpecyfic.ratings),
        key: 'rating'
      }
    }
    return _base
  })

  const activeFilters = computed(() => {
    return Object.keys(dropdownLists.value).flatMap((k) => {
      const config = dropdownLists.value[k as keyof SearchParams]
      const ctx = getFilterContext(k)

      if (!config || !ctx) return []

      if (ctx.type === 'multi') {
        return config.items
          .filter(item => ctx.value.includes(item.value))
          .map(item => ({
            key: k,
            label: item.label,
            value: item.value
          }))
      } else {
        const item = config.items.find(z => String(z.value) === String(ctx.value))
        if (!item || item.value === '') return []
        return [{
          key: k,
          label: item.label,
          value: item.value
        }]
      }
    })
  })

  return {
    dropdownLists,
    filterQueries,
    activeFilters,
    getFilterContext
  }
}

export default useFilterData

const mapToCheckboxOrRadioGroup = (data: JSONData | undefined) => {
  if (!data) return []
  return data.data.map(({ name, mal_id }) => ({
    label: name,
    value: mal_id.toString()
  }))
}
