import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, RefreshCw, SearchX } from 'lucide-react'
import { currentUser, logout } from '@/api/auth'
import AppHeader from '@/components/layout/AppHeader'
import MenuBar from '@/components/layout/MenuBar'
import MobileMenu from '@/components/layout/MobileMenu'
import SearchDialog from '@/components/layout/SearchDialog'
import Breadcrumbs from '@/components/menu/Breadcrumbs'
import ContentSkeleton from '@/components/menu/ContentSkeleton'
import HomeBanner from '@/components/menu/HomeBanner'
import ModuleView from '@/components/menu/ModuleView'
import NodeTile from '@/components/menu/NodeTile'
import PageHeader from '@/components/menu/PageHeader'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useMenuTree } from '@/hooks/use-menu-tree'
import { countLeaves, indexTree, isBranch, labelOf, ROOT_ID } from '@/lib/menu-utils'

export default function MenuPage() {
  const user = currentUser()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { status, tree, error, reload } = useMenuTree(user?.login)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const index = useMemo(() => (tree ? indexTree(tree) : null), [tree])
  const requestedId = params.get('n') ?? ROOT_ID
  const selected = index?.get(requestedId) ?? null

  const open = useCallback(
    (id: string) => {
      setParams(id === ROOT_ID ? {} : { n: id })
      setMobileOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [setParams],
  )

  // Atajo Ctrl/⌘ + K para buscar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!user?.login) return <Navigate to="/login" replace />

  const onLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const sections = tree?.hijos ?? []
  const path = selected?.path ?? []
  const activeTopId = path[0]?.id ?? null
  const activePathIds = new Set(path.map((n) => n.id))
  const loading = status === 'loading'

  return (
    <div className="flex min-h-svh flex-col">
      <AppHeader login={user.login} onHome={() => open(ROOT_ID)} onSearch={() => setSearchOpen(true)} onLogout={onLogout} onOpenMobile={() => setMobileOpen(true)} />
      <MenuBar loading={loading} sections={sections} activeTopId={activeTopId} onOpen={open} />
      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} loading={loading} sections={sections} activePathIds={activePathIds} activeId={requestedId} onOpen={open} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} index={index} sections={sections} onOpenNode={open} />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 sm:py-8">
        {loading && <ContentSkeleton hero={requestedId === ROOT_ID} />}

        {status === 'error' && (
          <Alert variant="destructive" className="max-w-xl">
            <AlertCircle />
            <AlertTitle>No se pudo cargar el menú</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
              <Button variant="outline" size="sm" onClick={reload} className="mt-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive">
                <RefreshCw /> Reintentar
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {status === 'ready' && tree && !selected && (
          <div className="max-w-xl rounded-xl border bg-card p-8 text-center shadow-xs">
            <SearchX className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-3 text-lg font-semibold">Esa opción no existe o no tienes acceso</h2>
            <p className="mt-1 text-sm text-muted-foreground">Verifica el enlace o vuelve al inicio.</p>
            <Button className="mt-5" onClick={() => open(ROOT_ID)}>
              Ir al inicio
            </Button>
          </div>
        )}

        {status === 'ready' && tree && selected && (
          <div className="space-y-6">
            {selected.node.id !== ROOT_ID && <Breadcrumbs path={selected.path} onOpen={open} />}

            {selected.node.id === ROOT_ID ? (
              <>
                <HomeBanner login={user.login} sections={tree.hijos.length} options={countLeaves(tree)} />
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Secciones</h2>
                  <TileGrid>
                    {tree.hijos.map((n) => (
                      <NodeTile key={n.id} node={n} onOpen={open} />
                    ))}
                  </TileGrid>
                </div>
              </>
            ) : isBranch(selected.node) ? (
              <>
                <PageHeader title={labelOf(selected.node)} description={`${countLeaves(selected.node)} opciones disponibles en esta sección.`} />
                <TileGrid>
                  {selected.node.hijos.map((n) => (
                    <NodeTile key={n.id} node={n} onOpen={open} />
                  ))}
                </TileGrid>
              </>
            ) : (
              <>
                <PageHeader title={labelOf(selected.node)} />
                <ModuleView node={selected.node} parent={selected.path.length > 1 ? selected.path[selected.path.length - 2] : null} onOpen={open} />
              </>
            )}
          </div>
        )}
      </main>

      <footer className="border-t bg-white/60 py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ETECSA · Empresa de Telecomunicaciones de Cuba S.A.</footer>
    </div>
  )
}

function TileGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
}
