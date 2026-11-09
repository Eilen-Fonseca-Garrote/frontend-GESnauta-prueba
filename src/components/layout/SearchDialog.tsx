import { FileText, Folder } from 'lucide-react'
import type { MenuNode } from '@/api/menu'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { isBranch, labelOf, normalizeText, type MenuIndex } from '@/lib/menu-utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  index: MenuIndex | null
  sections: MenuNode[]
  onOpenNode: (id: string) => void
}

/** Filtro que ignora tildes/mayúsculas y exige que aparezcan TODAS las palabras escritas. */
function accentInsensitiveFilter(_value: string, search: string, keywords?: string[]) {
  const haystack = normalizeText((keywords ?? []).join(' '))
  return normalizeText(search)
    .split(/\s+/)
    .every((token) => haystack.includes(token))
    ? 1
    : 0
}

function flatten(node: MenuNode): MenuNode[] {
  return node.hijos.flatMap((h) => [h, ...flatten(h)])
}

export default function SearchDialog({ open, onOpenChange, index, sections, onOpenNode }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} filter={accentInsensitiveFilter} title="Buscar opción" description="Escribe el nombre de una opción del menú">
      <CommandInput placeholder="Buscar en el menú…  (ej. cajas contables)" />
      <CommandList>
        <CommandEmpty>No hay opciones que coincidan.</CommandEmpty>
        {sections.map((section) => (
          <CommandGroup key={section.id} heading={labelOf(section)}>
            {[section, ...flatten(section)].map((node) => {
              const path = index?.get(node.id)?.path ?? []
              const trail = path.slice(0, -1).map(labelOf).join(' › ')
              return (
                <CommandItem
                  key={node.id}
                  value={node.id}
                  keywords={[labelOf(node), ...path.map(labelOf)]}
                  onSelect={() => {
                    onOpenChange(false)
                    onOpenNode(node.id)
                  }}
                >
                  {isBranch(node) ? <Folder className="text-primary" /> : <FileText className="text-muted-foreground" />}
                  <span className="truncate">{labelOf(node)}</span>
                  {trail && <span className="ml-auto truncate pl-3 text-xs text-muted-foreground">{trail}</span>}
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
