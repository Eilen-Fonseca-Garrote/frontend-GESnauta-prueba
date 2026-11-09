import { ArrowLeft, FileText } from 'lucide-react'
import type { MenuNode } from '@/api/menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { labelOf, ROOT_ID } from '@/lib/menu-utils'

interface Props {
  node: MenuNode
  parent: MenuNode | null
  onOpen: (id: string) => void
}

/** Vista de una opción "hoja". Aquí se montará la pantalla real del módulo. */
export default function ModuleView({ node, parent, onOpen }: Props) {
  return (
    <Card className="max-w-2xl">
      <CardHeader className="flex-row items-start gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <FileText className="size-6" />
        </span>
        <div className="space-y-1.5">
          <CardTitle className="text-lg">{labelOf(node)}</CardTitle>
          <Badge variant="brand">Módulo</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Esta opción abre el siguiente recurso del portal:</p>
        <code className="block rounded-md border bg-muted px-3 py-2 font-mono text-sm break-all">{node.url ?? 'Sin ruta asociada'}</code>
        <p className="text-sm text-muted-foreground">Conectaré aquí la pantalla correspondiente a esta ruta.</p>
        <Button variant="outline" onClick={() => onOpen(parent?.id ?? ROOT_ID)}>
          <ArrowLeft /> Volver{parent ? ` a ${labelOf(parent)}` : ' al inicio'}
        </Button>
      </CardContent>
    </Card>
  )
}
