import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { renderToString } from 'react-dom/server'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import { StaticRouter } from 'react-router-dom'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { AppContent } from './App.jsx'
import { PUBLIC_ROUTE_CONFIG } from './routeConfig.js'

const pageLoaders = import.meta.glob(['./pages/*.jsx', '!./pages/Home.jsx'])

async function createPolishI18n() {
  const translationPath = path.resolve('public/locales/pl/translation.json')
  const translation = JSON.parse(await readFile(translationPath, 'utf8'))
  const instance = createInstance()

  await instance.use(initReactI18next).init({
    lng: 'pl',
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en'],
    resources: { pl: { translation } },
    initImmediate: false,
    showSupportNotice: false,
    interpolation: { escapeValue: false },
  })

  return instance
}

export async function render(pathname) {
  const i18n = await createPolishI18n()
  const cache = createCache()

  // Resolve the current route before rendering. The browser still uses lazy
  // routes, but static HTML must never contain a fallback or hidden segments.
  const route = PUBLIC_ROUTE_CONFIG.find(route => route.path === pathname)
  const pageOverrides = {}
  if (route?.module) {
    const page = await pageLoaders[route.module.replace(/^src\//, './')]()
    pageOverrides[route.id] = page.default
  }
  const html = renderToString(
    <StyleProvider cache={cache}>
      <I18nextProvider i18n={i18n}>
        <StaticRouter location={pathname}>
          <AppContent pageOverrides={pageOverrides} />
        </StaticRouter>
      </I18nextProvider>
    </StyleProvider>,
  )
  return { html, styles: extractStyle(cache) }
}
