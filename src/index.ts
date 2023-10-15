const _URL = window.URL || window.webkitURL

export const storageManager = {
  get: (key: string, defaultValue?: any): any => {
    try {
      const value = JSON.parse(window.localStorage.getItem(key))
      if ([null, undefined].includes(value)) return defaultValue
      else return value
    } catch (error) {
      return defaultValue
    }
  },
  set: (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value)),
  clear: (key?: string) => (key ? window.localStorage.removeItem(key) : window.localStorage.clear())
}

export const themeManager = {
  key: 'APP_THEME',
  attribute: 'data-theme',
  get: () => {
    let preferredTheme = 'light'
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) preferredTheme = 'dark'

    let currentTheme = localStorage.getItem(themeManager.key) || preferredTheme

    if (!['light', 'dark'].includes(currentTheme)) currentTheme = 'light'

    return currentTheme
  },
  init: () => {
    const currentTheme = themeManager.get()
    document.body.setAttribute('data-theme', currentTheme)
    localStorage.setItem(themeManager.key, currentTheme)
  },
  set: (newTheme: 'light' | 'dark') => {
    document.body.setAttribute('data-theme', newTheme)
    localStorage.setItem(themeManager.key, newTheme)
  },
  toggle: () => {
    const currentTheme = themeManager.get()
    const altTheme = currentTheme === 'light' ? 'dark' : 'light'
    window.localStorage.setItem(themeManager.key, altTheme)
    document.body.setAttribute('data-theme', altTheme)
  }
}

export const qsm = {
  read: (key?: string, defaultValue?: any) => {
    try {
      const obj = JSON.parse(window.atob(window.location.search.slice('?'.length)))

      let value: any

      if (key && obj && key in obj) value = obj[key]
      else value = obj

      if ([null, undefined].includes(value)) return defaultValue
      else return value
    } catch (error) {
      return defaultValue
    }
  },
  gen: (content: object = {}, prefix: string = '') => prefix + '?' + window.btoa(JSON.stringify(content))
}

const scrollPositions: { [page: string]: number } = {}
export const scrollBack = {
  init: () => {
    setTimeout(() => {
      const page = window.location.pathname
      if (page in scrollPositions) {
        window.scrollTo(0, scrollPositions[page])
        delete scrollPositions[page]
      }
    })
  },
  save: () => (scrollPositions[window.location.pathname] = window.scrollY)
}

export const delay = (n: number, ms: boolean = false) =>
  new Promise(resolve => setTimeout(resolve, n * (ms ? 1 : 1000)))

export const addPluralSuffix = (value = 0, entity = '') => {
  if (value === 1) return entity
  else {
    if (entity.endsWith('y')) return entity.slice(0, -1) + 'ies'
    else return entity + 's'
  }
}

export const getOrdinalSuffix = (n: number) => ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th'

export function getRandomInArray<Type>(array: Type[]): Type {
  return array[Math.floor(Math.random() * array.length)]
}

export const copyText = async (text: string) => {
  const el = document.createElement('input')
  el.value = text
  el.select()
  el.setSelectionRange(0, 99999) /* For mobile devices */
  navigator.clipboard.writeText(el.value)
}

export const sortObjects = (objs = [], key = 'name') =>
  objs.sort((a: any, b: any) => {
    const _a = typeof a[key] === 'string' ? (a[key] || '').toLowerCase() : a[key] || 0
    const _b = typeof b[key] === 'string' ? (b[key] || '').toLowerCase() : a[key] || 0
    return _a > _b ? 1 : _b > _a ? -1 : 0
  })

export const arrangeObjects = (idsSequence = [], array = [], key = 'id') =>
  idsSequence.map(id => array.find(obj => obj[key] === id)).filter(x => x)

export const removeDuplicates = (array = [], key = 'id') => {
  const keyObjectMap = {}
  for (const x of array) keyObjectMap[x[key]] = x
  return Object.values(keyObjectMap)
}

export const roundNumber = (number: number, decimal: number = 2) => parseFloat(number.toFixed(decimal))

export const formatNumber = (value: number, indian?: boolean) =>
  indian ? parseFloat(value.toString()).toLocaleString('en-IN') : parseFloat(value.toString()).toLocaleString()

export const emptyCheck = <T>(value: T | undefined, defaultValue: T): T => (value === undefined ? defaultValue : value)

export const getImgDetails = (file: Blob) =>
  new Promise<{ width: number; height: number; size: number }>((resolve, reject) => {
    const img = new Image()
    const objectUrl = _URL.createObjectURL(file)
    img.onload = () => {
      resolve({ width: img.width, height: img.height, size: file.size })
      _URL.revokeObjectURL(objectUrl)
    }
    img.onerror = error => reject(error)
    img.src = objectUrl
  })

export const audioPlayer = (() => {
  const urls: any = {}

  const setupSound = () => {
    const audioEl = document.createElement('audio')
    audioEl.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
    audioEl.play()
    window.removeEventListener('click', setupSound)
  }
  window.addEventListener('click', setupSound)

  return (url: string = '', status?: 'load' | 'play' | 'pause' | 'stop') => {
    if (!url) return

    if (!(url in urls)) {
      const audioEl = document.createElement('audio')
      audioEl.src = url
      urls[url] = audioEl
    }

    if (!status) status = 'play'

    if (status === 'load') return

    if (status === 'play') urls[url].play()
    else if (status === 'pause') urls[url].pause()
    else if (status === 'stop') {
      urls[url].pause()
      urls[url].currentTime = 0
    }
  }
})()

interface meta {
  title?: string
  description?: string
  img?: string
  keywords?: string[]
  canonical?: string
}

const injectHeadEl = (tag: string, attributes: object = {}) => {
  const el = document.createElement(tag)
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value))
  document.head.append(el)
}

export const setMeta = ({
  title = '',
  description = '',
  img = '',
  keywords = [],
  canonical = window.location.href
}: meta) => {
  // title
  if (!document.querySelector('title')) injectHeadEl('title')
  const titleEl = document.querySelector('title')
  if (titleEl) titleEl.innerHTML = title

  // og:title
  if (!document.querySelector('meta[property="og:title"]')) injectHeadEl('meta', { property: 'og:title' })
  const ogTitleEl = document.querySelector('meta[property="og:title"]')
  if (ogTitleEl) ogTitleEl.setAttribute('content', title)

  // description
  if (!document.querySelector('meta[name="description"]')) injectHeadEl('meta', { name: 'description' })
  const descriptionEl = document.querySelector('meta[name="description"]')
  if (descriptionEl) descriptionEl.setAttribute('content', description)

  // og:description
  if (!document.querySelector('meta[property="og:description"]')) injectHeadEl('meta', { property: 'og:description' })
  const ogDescriptionEl = document.querySelector('meta[property="og:description"]')
  if (ogDescriptionEl) ogDescriptionEl.setAttribute('content', description)

  // og:image
  if (!document.querySelector('meta[property="og:image"]')) injectHeadEl('meta', { property: 'og:image' })
  const ogImgEl = document.querySelector('meta[property="og:image"]')
  if (ogImgEl) ogImgEl.setAttribute('content', img)

  // canonical
  if (!document.querySelector('link[rel="canonical"]')) injectHeadEl('link', { rel: 'canonical' })
  const canonicalEl = document.querySelector('link[rel="canonical"]')
  if (canonicalEl) canonicalEl.setAttribute('href', canonical)

  // keywords
  if (!document.querySelector('meta[name="keywords"]')) injectHeadEl('meta', { name: 'keywords' })
  const keywordsEl = document.querySelector('meta[name="keywords"]')
  if (keywordsEl) keywordsEl.setAttribute('content', keywords.join(','))
}

// Extended functionalities

declare global {
  interface Window {
    axios: any
    Fuse: any
  }
}

export const request = ({
  method = 'get',
  host = '',
  path = '',
  args = {},
  headers = {},
  params = {},
  data = {},
  clean = true
}) =>
  window
    .axios({
      baseURL: host,
      url: path,
      path,
      method,
      headers,
      ...(method === 'get' ? { params: Object.assign(args, params) } : { data: Object.assign(args, data) })
    })
    .then((res: any) => (clean ? (res.data !== undefined ? res.data : {}) : res.data))
    .catch((error: any) => error?.response?.data || {})

export const fuse = (array: object[], keys: string[], search: string, options = {}) => {
  if (!search) return array
  const Fuse = new window.Fuse(array, { keys, ...options })
  return Fuse.search(search).map(({ item }: any) => item)
}
