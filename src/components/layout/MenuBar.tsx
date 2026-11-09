import { Fragment } from 'react'
import { Home, LayoutGrid } from 'lucide-react'
import type { MenuNode } from '@/api/menu'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from '@/components/ui/menubar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { isBranch, labelOf, ROOT_ID } from '@/lib/menu-utils'

interface Props {
  loading: boolean
  sections: MenuNode[]
  activeTopId: string | null
  onOpen: (id: string) => void
}

const triggerClass = (active: boolean) =>
  cn(
    'relative h-12 shrink-0 rounded-none px-3.5 text-[0.85rem] font-medium whitespace-nowrap text-white/90 transition-colors outline-none',
    'hover:bg-white/10 hover:text-white focus-visible:bg-white/15 data-[state=open]:bg-white data-[state=open]:text-primary',
    "after:absolute after:inset-x-3 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-brand-orange after:transition-opacity after:content-['']",
    active ? 'text-white after:opacity-100' : 'after:opacity-0',
  )

const panelClass = '[scrollbar-width:thin] max-h-[min(var(--radix-menubar-content-available-height),28rem)] min-w-56 max-w-[22rem]'

/** Pinta recursivamente los hijos de un nodo como ítems / submenús del desplegable. */
function renderItems(nodes: MenuNode[], onOpen: (id: string) => void) {
  return nodes.map((n) =>
    isBranch(n) ? (
      <MenubarSub key={n.id}>
        <MenubarSubTrigger className="font-medium">{labelOf(n)}</MenubarSubTrigger>
        <MenubarSubContent className={panelClass}>{renderItems(n.hijos, onOpen)}</MenubarSubContent>
      </MenubarSub>
    ) : (
      <MenubarItem key={n.id} onSelect={() => onOpen(n.id)}>
        {labelOf(n)}
      </MenubarItem>
    ),
  )
}

export default function MenuBar({ loading, sections, activeTopId, onOpen }: Props) {
  return (
    <nav aria-label="Menú principal" className="hidden border-t-[3px] border-t-brand-orange bg-linear-to-b from-primary to-brand-navy shadow-md lg:block">
      <div className="mx-auto max-w-[1400px] px-2 sm:px-4">
        {loading ? (
          <div className="flex h-12 items-center gap-6 px-2" aria-busy="true" aria-label="Cargando menú">
            {[84, 96, 120, 80, 100, 110, 92].map((w, i) => (
              <Skeleton key={i} className="h-4 bg-white/25" style={{ width: w }} />
            ))}
          </div>
        ) : (
          <Menubar className="no-scrollbar h-12 w-full justify-start gap-0 overflow-x-auto rounded-none border-0 bg-transparent p-0 shadow-none">
            <button onClick={() => onOpen(ROOT_ID)} className={triggerClass(activeTopId === null)} aria-label="Inicio">
              <Home className="size-4" />
            </button>
            {sections.map((section) => (
              <Fragment key={section.id}>
                {isBranch(section) ? (
                  <MenubarMenu>
                    <MenubarTrigger className={triggerClass(activeTopId === section.id)}>{labelOf(section)}</MenubarTrigger>
                    <MenubarContent className={panelClass}>
                      <MenubarItem onSelect={() => onOpen(section.id)} className="font-semibold text-primary">
                        <LayoutGrid /> Ver todo en {labelOf(section)}
                      </MenubarItem>
                      <MenubarSeparator />
                      {renderItems(section.hijos, onOpen)}
                    </MenubarContent>
                  </MenubarMenu>
                ) : (
                  <button onClick={() => onOpen(section.id)} className={triggerClass(activeTopId === section.id)}>
                    {labelOf(section)}
                  </button>
                )}
              </Fragment>
            ))}
          </Menubar>
        )}
      </div>
    </nav>
  )
}
