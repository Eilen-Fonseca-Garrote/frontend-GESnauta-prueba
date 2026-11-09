import { useCallback, useEffect, useState } from 'react'
import { fetchMenuTree, type MenuNode } from '@/api/menu'
import { getErrorMessage } from '@/lib/errors'

type State =
  | { status: 'loading'; tree: null; error: '' }
  | { status: 'ready'; tree: MenuNode; error: '' }
  | { status: 'error'; tree: null; error: string }

const LOADING: State = { status: 'loading', tree: null, error: '' }

export function useMenuTree(login: string | undefined) {
  const [state, setState] = useState<State>(LOADING)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!login) return
    let cancelled = false
    fetchMenuTree(login)
      .then((tree) => !cancelled && setState({ status: 'ready', tree, error: '' }))
      .catch((err: unknown) => !cancelled && setState({ status: 'error', tree: null, error: getErrorMessage(err, 'No se pudo cargar el menú.') }))
    return () => {
      cancelled = true
    }
  }, [login, attempt])

  const reload = useCallback(() => {
    setState(LOADING)
    setAttempt((a) => a + 1)
  }, [])

  return { ...state, reload }
}
