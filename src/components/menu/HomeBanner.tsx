import { Layers, ShieldCheck } from 'lucide-react'
import logoCircular from '@/assets/logo-circular.jpg'
import { Badge } from '@/components/ui/badge'

export default function HomeBanner({ login, sections, options }: { login: string; sections: number; options: number }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-[#0a1a86] to-brand-navy p-6 text-primary-foreground shadow-md sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-white/[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -right-4 -bottom-28 size-64 rounded-full border-[28px] border-white/[0.07]" />
      <div className="relative flex flex-wrap items-center gap-6">
        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-lg ring-4 ring-brand-orange sm:size-24">
          <img src={logoCircular} alt="" className="size-full rounded-full object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/75">Bienvenido al Sistema de Gestión Comercial de los servicios de internet para salas de navegación</p>
          <h1 className="mt-0.5 truncate text-2xl font-bold tracking-tight sm:text-3xl">Hola, {login}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="gap-1.5 border-white/20 bg-white/15 py-1 text-white">
              <Layers /> {sections} {sections === 1 ? 'sección' : 'secciones'}
            </Badge>
            <Badge className="gap-1.5 border-white/20 bg-white/15 py-1 text-white">
              <ShieldCheck /> {options} {options === 1 ? 'opción disponible' : 'opciones disponibles'}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
