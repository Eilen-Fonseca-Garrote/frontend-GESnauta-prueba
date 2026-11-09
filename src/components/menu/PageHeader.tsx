import type { ReactNode } from 'react'

export default function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary sm:text-[1.65rem]">{title}</h1>
        <div className="mt-2 h-[3px] w-14 rounded-full bg-brand-orange" />
        {description && <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions}
    </div>
  )
}
