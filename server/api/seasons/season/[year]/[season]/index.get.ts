export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const cfg = useRuntimeConfig()
  const year = getRouterParam(event, 'year')
  const season = getRouterParam(event, 'season')

  return await $fetch(`/seasons/${year}/${season}`, { query, baseURL: cfg.public.apiBase })
})
