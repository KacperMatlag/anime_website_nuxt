export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { [key: string]: string }

  const params = new URLSearchParams(query).toString()

  return $fetch('https://api.jikan.moe/v4/anime?' + params)
})
