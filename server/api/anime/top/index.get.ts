export default defineEventHandler(async (event) => {
  const filter = getQuery(event)

  const params = new URLSearchParams(
    Object.entries(filter) as [string, string][]
  ).toString()

  return await $fetch('https://api.jikan.moe/v4/top/anime?' + params)
})
