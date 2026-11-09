import type { MenuNode } from '@/api/menu'

export const ROOT_ID = 'root_node'

export interface IndexedNode {
  node: MenuNode
  /** Camino desde la sección de primer nivel hasta el propio nodo (la raíz queda fuera). */
  path: MenuNode[]
}
export type MenuIndex = Map<string, IndexedNode>

/** Las etiquetas del backend pueden traer espacios sobrantes ("Supervisión "). */
export const labelOf = (n: MenuNode) => n.label.trim()

export function indexTree(root: MenuNode): MenuIndex {
  const index: MenuIndex = new Map()
  index.set(root.id, { node: root, path: [] })
  const visit = (node: MenuNode, path: MenuNode[]) => {
    index.set(node.id, { node, path })
    node.hijos.forEach((h) => visit(h, [...path, h]))
  }
  root.hijos.forEach((h) => visit(h, [h]))
  return index
}

export const isBranch = (n: MenuNode) => n.hijos.length > 0

/** Cantidad de opciones "hoja" (pantallas reales) bajo un nodo. */
export function countLeaves(n: MenuNode): number {
  return isBranch(n) ? n.hijos.reduce((acc, h) => acc + countLeaves(h), 0) : 1
}

export function normalizeText(s: string) {
  return s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
}

export function initialsOf(login: string) {
  return login.slice(0, 2).toUpperCase()
}
