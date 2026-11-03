import { api } from './client';

export interface LoginResponse {
  access_token: string;
  user: { id: number; login: string };
}

export async function loginApi(login: string, password: string) {
  const { data } = await api.post<LoginResponse>('/auth/login', { login, password });
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function currentUser() {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
}