export default defineEventHandler(async (event) => {
  const { season, year, page } = getQuery(event) as { year: string, season: string, page: string }

  return await $fetch(`https://api.jikan.moe/v4/seasons/${year}/${season}?page=${page}`)
})
