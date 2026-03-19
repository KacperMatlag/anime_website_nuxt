import pThrottle from 'p-throttle'

const apiLimiter = pThrottle({
  limit: 2,
  interval: 700,
  strict: true,
  onDelay: () => {
    console.log('Poza limitem')
  }
})

const baseFetch = async <T>(...args: Parameters<typeof $fetch>): Promise<T> => {
  return await $fetch(...args)
}
export const throttledFetch = apiLimiter(baseFetch) as <T>(...args: Parameters<typeof $fetch>) => Promise<T>
export default apiLimiter
