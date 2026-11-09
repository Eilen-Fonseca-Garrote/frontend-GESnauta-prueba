import { isAxiosError } from 'axios'

/** Convierte cualquier error en un mensaje legible para el usuario. */
export function getErrorMessage(err: unknown, fallback: string): string {
  if (isAxiosError(err)) {
    const message = err.response?.data?.message
    if (typeof message === 'string') return message
    if (Array.isArray(message)) return message.join(', ')
    if (!err.response) return 'No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.'
    return fallback
  }
  return err instanceof Error ? err.message : fallback
}
