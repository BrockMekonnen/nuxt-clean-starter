export type NavLink = {
  label: string
  to: string
  order: number
}

export function authRoutes(): NavLink[] {
  return [{ label: 'Login', to: '/login', order: 20 }]
}

