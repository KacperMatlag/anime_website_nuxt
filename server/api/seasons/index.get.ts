export default defineEventHandler(async () => {
  return await $fetch('https://api.jikan.moe/v4/seasons')
})
