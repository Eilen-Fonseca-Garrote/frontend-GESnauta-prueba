import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Eye, EyeOff, Loader2, Lock, User } from 'lucide-react'
import { loginApi } from '@/api/auth'
import logoCircular from '@/assets/logo-circular.jpg'
import logoHorizontal from '@/assets/logo-horizontal.jpg'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getErrorMessage } from '@/lib/errors'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginApi(login.trim(), password)
      navigate('/menu', { replace: true })
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'Usuario o contraseña incorrectos.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      {/* Panel de marca */}
      <aside className="relative hidden overflow-hidden bg-linear-to-br from-primary via-[#0a1a86] to-brand-navy text-primary-foreground lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div aria-hidden className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-white/[0.05]" />
        <div aria-hidden className="absolute -right-24 -bottom-32 size-[26rem] rounded-full border-[44px] border-white/[0.06]" />
        <div className="relative flex max-w-md flex-col items-center text-center">
          <div className="flex size-52 items-center justify-center rounded-full bg-white p-2 shadow-2xl ring-[6px] ring-brand-orange">
            <img src={logoCircular} alt="ETECSA" className="size-full rounded-full object-contain" />
          </div>
          <h2 className="mt-10 text-3xl font-bold tracking-tight">GESnauta</h2>
          <div className="mt-3 h-[3px] w-16 rounded-full bg-brand-orange" />
          <p className="mt-5 text-base text-white/80">Gestión Comercial de los servicios de internet para salas de navegación de la Empresa de Telecomunicaciones de Cuba S.A.</p>
        </div>
      </aside>

      {/* Formulario */}
      <main className="flex flex-col justify-center bg-background px-6 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <img src={logoHorizontal} alt="ETECSA" className="mb-8 h-12 w-auto rounded-md lg:hidden" />

          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-primary">Iniciar sesión</h1>
            <div className="mt-2 h-[3px] w-12 rounded-full bg-brand-orange" />
            <p className="mt-3 text-sm text-muted-foreground">Ingresa con tu usuario corporativo para acceder al portal.</p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5" noValidate>
            <div className="grid gap-2">
              <Label htmlFor="login">Usuario</Label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="login" autoFocus autoComplete="username" placeholder="tu.usuario" value={login} onChange={(e) => setLogin(e.target.value)} required className="pl-9" aria-invalid={Boolean(error) || undefined} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-9" aria-invalid={Boolean(error) || undefined} />
                <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-primary">
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" size="lg" disabled={loading || !login || !password} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Entrando…
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <p className="mt-10 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} ETECSA · Empresa de Telecomunicaciones de Cuba S.A.</p>
        </div>
      </main>
    </div>
  )
}
