export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return await $api('/seasons/now', { query })
})
