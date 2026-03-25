export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const year = getRouterParam(event, 'year')
  const season = getRouterParam(event, 'season')

  return await $api(`/seasons/${year}/${season}`, { query })
})
