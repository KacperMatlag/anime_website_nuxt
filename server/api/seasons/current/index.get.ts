export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  return await $fetch('/seasons/now', { query, baseURL: config.public.apiBase })
})
