export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm border border-slate-200">
      <Skeleton className="h-24 w-24 rounded-full mx-auto" />
      <Skeleton className="h-6 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  );
}