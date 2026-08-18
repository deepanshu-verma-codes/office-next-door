

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-stone/20 ${className || ""}`}
      {...props}
    />
  );
}

export function ProfileSkeleton() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-surface py-12 px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="card-base p-8 flex items-start justify-between">
          <div className="space-y-4 w-1/2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="flex gap-4 mt-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="card-base p-8 space-y-4">
              <Skeleton className="h-8 w-1/3 mb-6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="card-base p-6 space-y-4">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center pt-20 px-8">
      <Skeleton className="h-10 w-64 mb-4" />
      <Skeleton className="h-4 w-96 mb-12" />
      <div className="card-base p-8 w-full max-w-2xl space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
        <Skeleton className="h-12 w-48 mt-8" />
      </div>
    </div>
  );
}
