import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: 'https://api.jikan.moe/v4/'
})
