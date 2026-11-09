import { ArrowUpRight, ChevronRight, FileText, Folder } from 'lucide-react'
import type { MenuNode } from '@/api/menu'
import { countLeaves, isBranch, labelOf } from '@/lib/menu-utils'

export default function NodeTile({ node, onOpen }: { node: MenuNode; onOpen: (id: string) => void }) {
  const branch = isBranch(node)
  const total = countLeaves(node)
  const preview = node.hijos.slice(0, 3).map(labelOf).join(' · ')

  return (
    <button
      onClick={() => onOpen(node.id)}
      className="group flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-xs transition-all outline-none hover:-translate-y-0.5 hover:border-brand-orange/70 hover:shadow-md focus-visible:ring-[3px] focus-visible:ring-ring/40"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {branch ? <Folder className="size-5" /> : <FileText className="size-5" />}
        </span>
        {branch ? <ChevronRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-brand-orange" /> : <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-brand-orange" />}
      </div>
      <div className="min-w-0">
        <p className="leading-snug font-semibold text-foreground">{labelOf(node)}</p>
        {branch ? (
          <>
            <p className="mt-0.5 text-xs font-medium text-[#a96400]">
              {total} {total === 1 ? 'opción' : 'opciones'}
            </p>
            <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
              {preview}
              {node.hijos.length > 3 ? ` · +${node.hijos.length - 3}` : ''}
            </p>
          </>
        ) : (
          node.url && <p className="mt-1 truncate font-mono text-xs text-muted-foreground">{node.url}</p>
        )}
      </div>
    </button>
  )
}
