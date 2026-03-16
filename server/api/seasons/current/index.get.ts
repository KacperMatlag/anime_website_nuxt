export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return await $fetch('https://api.jikan.moe/v4/seasons/now', { query })
})
