import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import { HeaderNav } from './components/HeaderNav.jsx'
import Home from './pages/Home.jsx'
import Classes from './pages/Classes.jsx'
import Schedule from './pages/Schedule.jsx'
import Teachers from './pages/Teachers.jsx'
import Prices from './pages/Prices.jsx'
import Rent from './pages/Rent.jsx'
import Documents from './pages/Documents.jsx'
import Contacts from './pages/Contacts.jsx'

const { Header, Content, Footer } = Layout

export default function App() {
  return (
    <Layout style={{ minHeight: '100dvh' }}>
      <Header style={{ background: 'transparent', padding: 0 }}>
        <HeaderNav />
      </Header>
      <Content style={{ padding: '24px 16px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Dance Point — Lubon
      </Footer>
    </Layout>
  )
}
