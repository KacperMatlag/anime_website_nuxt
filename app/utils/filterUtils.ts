const _multiParamKeys = ['genres', 'genres_exclude'] as const
const _singleParamKeys = ['type', 'status', 'rating', 'sort', 'order_by'] as const

export type SingleParamQueryKey = (typeof _singleParamKeys)[number]
export type MultiParamQueryKey = (typeof _multiParamKeys)[number]

const isMulti = (key: string): key is MultiParamQueryKey => {
  return _multiParamKeys.includes(key as MultiParamQueryKey)
}
const isSingle = (key: string): key is SingleParamQueryKey => {
  return _singleParamKeys.includes(key as SingleParamQueryKey)
}

const keyType = { isMulti, isSingle }

export { keyType }
