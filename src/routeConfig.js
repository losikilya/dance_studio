export const PUBLIC_ROUTE_CONFIG = [
  { id: 'home', path: '/' },
  { id: 'teachers', path: '/teachers', module: 'src/pages/Teachers.jsx' },
  { id: 'directions', path: '/directions', module: 'src/pages/Classes.jsx' },
  { id: 'schedule', path: '/schedule', module: 'src/pages/ScheduleLight.jsx' },
  { id: 'prices', path: '/prices', module: 'src/pages/Prices.jsx' },
  { id: 'rent', path: '/rent', module: 'src/pages/Rent.jsx' },
  { id: 'contacts', path: '/contacts', module: 'src/pages/Contacts.jsx' },
  { id: 'documents', path: '/documents', module: 'src/pages/Documents.jsx' },
]

export const APP_ROUTE_CONFIG = [
  ...PUBLIC_ROUTE_CONFIG,
  { id: 'classesRedirect', path: '/classes', redirectTo: '/directions' },
]
