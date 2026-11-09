import { ChevronRight, Home } from 'lucide-react'
import type { MenuNode } from '@/api/menu'
import { labelOf, ROOT_ID } from '@/lib/menu-utils'

interface Props {
  path: MenuNode[]
  onOpen: (id: string) => void
}

export default function Breadcrumbs({ path, onOpen }: Props) {
  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
      <button onClick={() => onOpen(ROOT_ID)} className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-accent hover:text-primary">
        <Home className="size-3.5" /> Inicio
      </button>
      {path.map((node, i) => {
        const last = i === path.length - 1
        return (
          <span key={node.id} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 opacity-60" />
            {last ? (
              <span aria-current="page" className="px-1.5 font-medium text-foreground">
                {labelOf(node)}
              </span>
            ) : (
              <button onClick={() => onOpen(node.id)} className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-accent hover:text-primary">
                {labelOf(node)}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}
