export const PUBLIC_ROUTE_CONFIG = [
  { id: 'home', path: '/' },
  { id: 'teachers', path: '/teachers' },
  { id: 'directions', path: '/directions' },
  { id: 'schedule', path: '/schedule' },
  { id: 'prices', path: '/prices' },
  { id: 'rent', path: '/rent' },
  { id: 'contacts', path: '/contacts' },
  { id: 'documents', path: '/documents' },
]

export const APP_ROUTE_CONFIG = [
  ...PUBLIC_ROUTE_CONFIG,
  { id: 'classesRedirect', path: '/classes', redirectTo: '/directions' },
]
