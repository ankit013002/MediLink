export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-4 animate-pulse">
      <div className="h-8 w-36 bg-muted rounded" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="h-4 w-24 bg-muted rounded mb-2" />
            <div className="h-8 w-16 bg-muted rounded" />
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <div className="h-9 w-28 bg-muted rounded" />
        <div className="h-9 w-36 bg-muted rounded" />
        <div className="h-9 w-44 bg-muted rounded" />
      </div>
      <div className="rounded-md border overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-3 border-b">
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
