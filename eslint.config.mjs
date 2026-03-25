// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt()
  .override('nuxt/typescript/rules', {
    rules: {
      'nuxt/nuxt-config-keys-order': 'off'
    }
  })
