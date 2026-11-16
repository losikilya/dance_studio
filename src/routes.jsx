import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { APP_ROUTE_CONFIG, PUBLIC_ROUTE_CONFIG } from './routeConfig'
import Home from './pages/Home.jsx'

const pageLoaders = import.meta.glob(['./pages/*.jsx', '!./pages/Home.jsx'])
const PAGE_COMPONENTS = {
  home: Home,
  ...Object.fromEntries(PUBLIC_ROUTE_CONFIG.filter(route => route.module).map(route => [
    route.id, lazy(pageLoaders[route.module.replace(/^src\//, './')]),
  ])),
}

export default function AppRoutes({ pageOverrides = {} }) {
  return (
    <Suspense fallback={<div className="page-loading" role="status" aria-label="Loading" />}>
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

        const Page = pageOverrides[route.id] ?? PAGE_COMPONENTS[route.id]
        if (!Page) throw new Error(`No page component configured for route "${route.id}"`)

        return <Route key={route.id} path={route.path} element={<Page />} />
      })}
      </Routes>
    </Suspense>
  )
}
