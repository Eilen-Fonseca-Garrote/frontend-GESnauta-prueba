import { Skeleton } from '@/components/ui/skeleton'

export default function ContentSkeleton({ hero = false }: { hero?: boolean }) {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Cargando contenido">
      <Skeleton className="h-4 w-48" />
      {hero ? (
        <Skeleton className="h-40 w-full rounded-2xl" />
      ) : (
        <div className="space-y-3">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-1 w-14" />
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="space-y-3 rounded-xl border bg-card p-4">
            <Skeleton className="size-10 rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
