import { ChevronRight, FileText, Folder, Home } from 'lucide-react'
import logoHorizontal from '@/assets/logo-horizontal.jpg'
import type { MenuNode } from '@/api/menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { isBranch, labelOf, ROOT_ID } from '@/lib/menu-utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  sections: MenuNode[]
  /*ids de los nodos del camino activo, para dejarlos desplegados */
  activePathIds: Set<string>
  activeId: string
  onOpen: (id: string) => void
}

function MobileNode({ node, depth, activePathIds, activeId, onOpen }: { node: MenuNode; depth: number } & Pick<Props, 'activePathIds' | 'activeId' | 'onOpen'>) {
  const pad = { paddingLeft: 12 + depth * 14 }
  if (!isBranch(node)) {
    return (
      <button onClick={() => onOpen(node.id)} style={pad} className={cn('flex w-full items-center gap-2 rounded-md py-2 pr-3 text-left text-sm hover:bg-accent', activeId === node.id && 'bg-accent font-medium text-primary')}>
        <FileText className="size-4 shrink-0 text-muted-foreground" />
        <span>{labelOf(node)}</span>
      </button>
    )
  }
  return (
    <Collapsible defaultOpen={activePathIds.has(node.id)} className="group/collapsible">
      <CollapsibleTrigger style={pad} className="flex w-full items-center gap-2 rounded-md py-2 pr-3 text-left text-sm font-medium hover:bg-accent">
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/collapsible:rotate-90" />
        <Folder className="size-4 shrink-0 text-primary" />
        <span>{labelOf(node)}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=open]:animate-in data-[state=open]:fade-in-0">
        {node.hijos.map((h) => (
          <MobileNode key={h.id} node={h} depth={depth + 1} activePathIds={activePathIds} activeId={activeId} onOpen={onOpen} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function MobileMenu({ open, onOpenChange, loading, sections, activePathIds, activeId, onOpen }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="gap-0">
        <SheetHeader className="border-b border-t-[3px] border-t-brand-orange bg-white">
          <img src={logoHorizontal} alt="ETECSA" className="h-10 w-fit" />
          <SheetTitle className="sr-only">Menú</SheetTitle>
          <SheetDescription className="sr-only">Navegación del portal</SheetDescription>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto p-2">
          <button onClick={() => onOpen(ROOT_ID)} className={cn('flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-accent', activeId === ROOT_ID && 'bg-accent text-primary')}>
            <Home className="size-4 text-primary" /> Inicio
          </button>
          {loading ? (
            <div className="space-y-3 p-3">
              {[70, 55, 80, 60, 75].map((w, i) => (
                <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} />
              ))}
            </div>
          ) : (
            sections.map((s) => <MobileNode key={s.id} node={s} depth={0} activePathIds={activePathIds} activeId={activeId} onOpen={onOpen} />)
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
