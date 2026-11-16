import { Navigate, Route, Routes } from 'react-router-dom'
import { APP_ROUTE_CONFIG } from './routeConfig'
import Classes from './pages/Classes.jsx'
import Contacts from './pages/Contacts.jsx'
import Documents from './pages/Documents.jsx'
import Home from './pages/Home.jsx'
import Prices from './pages/Prices.jsx'
import Rent from './pages/Rent.jsx'
import ScheduleLight from './pages/ScheduleLight.jsx'
import Teachers from './pages/Teachers.jsx'

const PAGE_COMPONENTS = {
  home: Home,
  teachers: Teachers,
  directions: Classes,
  schedule: ScheduleLight,
  prices: Prices,
  rent: Rent,
  contacts: Contacts,
  documents: Documents,
}

export default function AppRoutes() {
  return (
    <Routes>
      {APP_ROUTE_CONFIG.map((route) => {
        if (route.redirectTo) {
          return (
            <Route
              key={route.id}
              path={route.path}
              element={<Navigate to={route.redirectTo} replace />}
            />
          )
        }

        const Page = PAGE_COMPONENTS[route.id]
        if (!Page) throw new Error(`No page component configured for route "${route.id}"`)

        return <Route key={route.id} path={route.path} element={<Page />} />
      })}
    </Routes>
  )
}
