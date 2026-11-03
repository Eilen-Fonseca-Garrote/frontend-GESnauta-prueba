import { api } from './client';

export interface MenuNode {
  id: string;
  label: string;
  url: string | null;
  father: string | null;
  hijos: MenuNode[];
}

export async function fetchMenuTree(login: string): Promise<MenuNode> {
  const { data } = await api.get<MenuNode>(`/menu/${encodeURIComponent(login)}`);
  return data;
}