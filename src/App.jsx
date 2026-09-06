import { Navigate, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { HeaderNav } from "./components/HeaderNav.jsx";
import Home from "./pages/Home.jsx";
import Classes from "./pages/Classes.jsx";
import Teachers from "./pages/Teachers.jsx";
import Prices from "./pages/Prices.jsx";
import Rent from "./pages/Rent.jsx";
import Documents from "./pages/Documents.jsx";
import Contacts from "./pages/Contacts.jsx";
import plPL from "antd/locale/pl_PL";
import enUS from "antd/locale/en_US";

import dayjs from "dayjs";
import { themeTokens } from "./theme.js";

import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";

import "dayjs/locale/pl";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ScheduleLight from "./pages/ScheduleLight.jsx";
import SiteSeo from "./seo/SiteSeo.jsx";

dayjs.locale("pl");

const { Header, Content, Footer } = Layout;

export default function App() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl';
  const locale = language === 'pl' ? plPL : enUS;

  useEffect(() => {
    dayjs.locale(language);
  }, [language]);

  const changeLocale = (nextLanguage) => {
    window.localStorage.setItem('dancepoint-language', nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };
  return (
    <ConfigProvider theme={themeTokens} locale={locale}>
      <AntApp>
        <BrowserRouter>
          <SiteSeo />
          <Layout style={{ minHeight: "100dvh" }}>
            <Header style={{ background: "transparent", padding: 0 }}>
              <HeaderNav language={language} onLocaleChange={changeLocale} />
            </Header>
            <Content
              style={{
                margin: "0 auto",
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directions" element={<Classes />} />
                <Route path="/classes" element={<Navigate to="/directions" replace />} />
                <Route path="/schedule" element={<ScheduleLight />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              {t('footer', { year: new Date().getFullYear() })}
            </Footer>
          </Layout>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
