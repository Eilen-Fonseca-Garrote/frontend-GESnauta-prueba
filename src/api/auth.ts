import { api } from './client'

export interface SessionUser {
  // En la base migrada USERS.ID es VARCHAR (UUID), no número.
  id: string | number
  login: string
}

export interface LoginResponse {
  access_token: string
  user: SessionUser
}

export async function loginApi(login: string, password: string) {
  const { data } = await api.post<LoginResponse>('/auth/login', { login, password })
  localStorage.setItem('token', data.access_token)
  localStorage.setItem('user', JSON.stringify(data.user))
  return data
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export function currentUser(): SessionUser | null {
  try {
    const raw = localStorage.getItem('user')
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem('token'))
}
