import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createInstance } from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { AppContent } from './App.jsx'

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

  return renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={pathname}>
        <AppContent />
      </StaticRouter>
    </I18nextProvider>,
  )
}
