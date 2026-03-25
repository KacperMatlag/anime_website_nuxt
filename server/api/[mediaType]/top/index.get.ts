export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'mediaType')
  const query = getQuery(event)

  return await $api(`/top/${param}`, { query })
})
