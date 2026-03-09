import pThrottle from 'p-throttle'

const apiLimiter = pThrottle({
  limit: 3,
  interval: 1000,
  strict: true,
  onDelay: () => {
    console.log('Poza limitem')
  }
})

export default apiLimiter
