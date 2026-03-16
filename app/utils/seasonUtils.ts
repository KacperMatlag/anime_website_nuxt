const getIcon = (season: string) => {
  switch (season) {
    case 'winter':
      return 'lets-icons:winter-light'
    case 'summer':
      return 'mage:sun'
    case 'fall':
      return 'icon-park-outline:leaves-two'
    case 'spring':
      return 'ph:flower-light'
    default:
      return ''
  }
}

const translateSeason = (name: string) => {
  switch (name) {
    case 'winter':
      return 'Zima'
    case 'spring':
      return 'Wiosna'
    case 'summer':
      return 'Lato'
    case 'fall':
      return 'Jesień'
    default:
      break
  }
}

export { getIcon, translateSeason }
