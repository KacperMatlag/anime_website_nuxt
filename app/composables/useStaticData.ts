import genres from '~/assets/data/genres/export'
import orderBys from '~/assets/data/orderBys'
import ratings from '~/assets/data/ratings.json'
import sort from '~/assets/data/sort.json'
import statuses from '~/assets/data/statuses/export'
import types from '~/assets/data/types/export'

const useStaticData = () => {
  const base = {
    genres,
    types,
    statuses,
    sort,
    orderBys
  }

  const animeSpecyfic = {
    ratings
  }

  return { base, animeSpecyfic }
}

export default useStaticData
