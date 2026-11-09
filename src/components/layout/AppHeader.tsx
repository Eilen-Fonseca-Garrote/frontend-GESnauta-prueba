import { ChevronDown, LogOut, Menu as MenuIcon, Search } from 'lucide-react'
import logoHorizontal from '@/assets/logo-horizontal.jpg'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { initialsOf } from '@/lib/menu-utils'

interface Props {
  login: string
  onHome: () => void
  onSearch: () => void
  onLogout: () => void
  onOpenMobile: () => void
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function AppHeader({ login, onHome, onSearch, onLogout, onOpenMobile }: Props) {
  return (
    <header className="border-b-[3px] border-b-brand-orange bg-white lg:border-b lg:border-b-border">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobile} aria-label="Abrir menú">
          <MenuIcon />
        </Button>

        <button onClick={onHome} aria-label="Ir al inicio" className="rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
          <img src={logoHorizontal} alt="ETECSA · Empresa de Telecomunicaciones de Cuba S.A." className="h-11 w-auto" />
        </button>

        <div className="hidden border-l pl-4 md:block">
          <p className="text-sm leading-tight font-semibold text-primary">Gestión Comercial de los servicios de internet para salas de navegación</p>
          <p className="text-xs leading-tight text-muted-foreground">Accesos, roles y permisos</p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={onSearch} className="hidden w-64 justify-start text-muted-foreground sm:inline-flex">
            <Search />
            <span className="font-normal">Buscar opción…</span>
            <kbd className="ml-auto rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium">{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden" onClick={onSearch} aria-label="Buscar opción">
            <Search />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-2 ring-brand-orange/60">{initialsOf(login)}</span>
                <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">{login}</span>
                <ChevronDown className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <span className="block text-xs font-normal text-muted-foreground">Sesión iniciada como</span>
                <span className="block truncate">{login}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onSelect={onLogout}>
                <LogOut /> Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
