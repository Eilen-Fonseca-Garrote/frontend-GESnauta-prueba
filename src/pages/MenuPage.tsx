import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMenuTree } from '../api/menu';
import type { MenuNode } from '../api/menu';
import { currentUser, logout } from '../api/auth';
import MenuTreeNode from '../components/MenuTreeNode';

// el menu se muestra como estructura de arbol y lo debo cambiar a como esta el portal


export default function MenuPage() {
  const [tree, setTree] = useState<MenuNode | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = currentUser();

  useEffect(() => {
    if (!user?.login) return;

    fetchMenuTree(user.login)
      .then(setTree)
      .catch((err: unknown) => {
        if (isAxiosError(err)) {
          const message = err.response?.data?.message;
          setError(
            typeof message === 'string'
              ? message
              : !err.response
                ? 'No se pudo conectar con el backend en http://localhost:3000.'
                : 'No se pudo cargar el menú.',
          );
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('No se pudo cargar el menú.');
        }
      });
  }, [user?.login]);

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Menú de {user?.login ?? '—'}</h2>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>

      {!user?.login && (
        <p style={{ color: 'crimson' }}>
          No se encontró el usuario de la sesión. Inicia sesión nuevamente.
        </p>
      )}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {!tree && !error && <p>Cargando menú…</p>}

      {tree && (
        <ul style={{ padding: 0 }}>
          {tree.hijos.map((h) => (
            <MenuTreeNode key={h.id} node={h} />
          ))}
        </ul>
      )}
    </div>
  );
}