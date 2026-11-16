import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  SEO_CONTENT,
  getCanonicalUrl,
  getSeoContent,
} from './seoConfig'

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

export default function SiteSeo() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'

  useEffect(() => {
    const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    const canonicalPath = normalizedPath === '/classes' ? '/directions' : normalizedPath
    const routeContent = SEO_CONTENT[canonicalPath]
    const content = getSeoContent(canonicalPath, language) ?? getSeoContent('/', language)
    const canonicalUrl = getCanonicalUrl(canonicalPath)
    const isIndexable = Boolean(routeContent)

    document.documentElement.lang = language
    document.title = content.title
    upsertCanonical(canonicalUrl)

    upsertMeta('name', 'description', content.description)
    upsertMeta('name', 'robots', isIndexable ? DEFAULT_ROBOTS : 'noindex, nofollow')
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'DANCE POINT')
    upsertMeta('property', 'og:locale', language === 'pl' ? 'pl_PL' : 'en_GB')
    upsertMeta('property', 'og:title', content.title)
    upsertMeta('property', 'og:description', content.description)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', DEFAULT_OG_IMAGE)
    upsertMeta('property', 'og:image:alt', 'Logo DANCE POINT')
    upsertMeta('name', 'twitter:card', 'summary')
    upsertMeta('name', 'twitter:title', content.title)
    upsertMeta('name', 'twitter:description', content.description)
    upsertMeta('name', 'twitter:image', DEFAULT_OG_IMAGE)
    upsertMeta('name', 'twitter:image:alt', 'Logo DANCE POINT')
  }, [language, pathname])

  return null
}
