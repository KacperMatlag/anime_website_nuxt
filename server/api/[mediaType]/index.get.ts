export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()
  const param = getRouterParam(event, 'mediaType')
  const query = getQuery(event)

  return await $fetch(`${param}`, { query: query, baseURL: cfg.public.apiBase })
})
