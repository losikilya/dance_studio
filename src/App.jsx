import { Layout, ConfigProvider, App as AntApp } from 'antd'
import plPL from 'antd/locale/pl_PL'
import enUS from 'antd/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { HeaderNav } from './components/HeaderNav.jsx'
import AppRoutes from './routes.jsx'
import SiteSeo from './seo/SiteSeo.jsx'
import { themeTokens } from './theme.js'

dayjs.locale('pl')

const { Header, Content, Footer } = Layout

export function AppContent({ languageAfterHydration = null }) {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'
  const locale = language === 'pl' ? plPL : enUS

  useEffect(() => {
    dayjs.locale(language)
  }, [language])

  useEffect(() => {
    if (languageAfterHydration && languageAfterHydration !== language) {
      i18n.changeLanguage(languageAfterHydration)
    }
  }, [i18n, language, languageAfterHydration])

  const changeLocale = (nextLanguage) => {
    window.localStorage.setItem('dancepoint-language', nextLanguage)
    i18n.changeLanguage(nextLanguage)
  }

  return (
    <ConfigProvider theme={themeTokens} locale={locale}>
      <AntApp>
        <SiteSeo />
        <Layout style={{ minHeight: '100dvh' }}>
          <Header style={{ background: 'transparent', padding: 0 }}>
            <HeaderNav language={language} onLocaleChange={changeLocale} />
          </Header>
          <Content style={{ margin: '0 auto', width: '100%' }}>
            <AppRoutes />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            {t('footer', { year: new Date().getFullYear() })}
          </Footer>
        </Layout>
      </AntApp>
    </ConfigProvider>
  )
}

export default function App({ languageAfterHydration = null }) {
  return (
    <BrowserRouter>
      <AppContent languageAfterHydration={languageAfterHydration} />
    </BrowserRouter>
  )
}
