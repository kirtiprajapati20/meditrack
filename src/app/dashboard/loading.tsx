import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Main Content Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg" />
        <Skeleton className="h-48 rounded-lg lg:col-span-2" />
        <Skeleton className="h-48 rounded-lg" />
      </div>
    </div>
  );
}
