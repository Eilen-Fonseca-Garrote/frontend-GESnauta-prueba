import type { ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';

function Private({ children }: { children: ReactElement }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<Private><MenuPage /></Private>} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
    </BrowserRouter>
  );
}