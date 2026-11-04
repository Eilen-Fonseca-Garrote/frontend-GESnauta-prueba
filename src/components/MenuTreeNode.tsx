import { useState } from 'react';
import type { MenuNode } from '../api/menu';

export default function MenuTreeNode({ node }: { node: MenuNode }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.hijos.length > 0;

  return (
    <li style={{ listStyle: 'none', marginLeft: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {hasChildren ? (
          <button
            onClick={() => setOpen((o) => !o)}
            style={{ width: 20, border: 'none', background: 'transparent', cursor: 'pointer' }}
          >
            {open ? '▾' : '▸'}
          </button>
        ) : (
          <span style={{ width: 20 }} />
        )}
        <span style={{ fontWeight: hasChildren ? 600 : 400 }}>{node.label}</span>
        {node.url && <small style={{ color: '#390' }}>({node.url})</small>}
      </div>
      {hasChildren && open && (
        <ul style={{ paddingLeft: 12, borderLeft: '1px solid #ddd' }}>
          {node.hijos.map((h) => (
            <MenuTreeNode key={h.id} node={h} />
          ))}
        </ul>
      )}
    </li>
  );
}