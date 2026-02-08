import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { HeaderNav } from "./components/HeaderNav.jsx";
import Home from "./pages/Home.jsx";
import Classes from "./pages/Classes.jsx";
import Schedule from "./pages/Schedule.jsx";
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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScheduleLight from "./pages/ScheduleLight.jsx";

dayjs.locale("pl");

const { Header, Content, Footer } = Layout;

export default function App() {
  const [locale, setLocal] = useState(plPL);
    const { i18n } = useTranslation();


  const changeLocale = (e) => {
    console.log(locale)
    const isPlLocale = e;
    i18n.changeLanguage
    if (isPlLocale) {
      setLocal(plPL);
      i18n.changeLanguage('pl')
      dayjs.locale("pl");
    } else {
      setLocal(enUS);
      i18n.changeLanguage('en')
      dayjs.locale("en");
    }
  };
  return (
    <ConfigProvider theme={themeTokens} locale={locale}>
      <AntApp>
        <BrowserRouter>
          <Layout style={{ minHeight: "100dvh" }}>
            <Header style={{ background: "transparent", padding: 0 }}>
              <HeaderNav onLocaleChange={changeLocale} />
            </Header>
            <Content
              style={{
                // padding: "24px 16px",
                // maxWidth: 1200,
                margin: "0 auto",
                width: "100%",
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/schedule" element={<ScheduleLight />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              © {new Date().getFullYear()} Dance Point — Lubon
            </Footer>
          </Layout>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}
