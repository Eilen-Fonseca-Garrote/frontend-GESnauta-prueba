import type { ReactElement } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from '@/api/auth'
import LoginPage from '@/pages/LoginPage'
import MenuPage from '@/pages/MenuPage'

function Private({ children }: { children: ReactElement }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

/** Si ya hay sesión, /login redirige al menú. */
function PublicOnly({ children }: { children: ReactElement }) {
  return isAuthenticated() ? <Navigate to="/menu" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicOnly><LoginPage /></PublicOnly>} />
        <Route path="/menu" element={<Private><MenuPage /></Private>} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
