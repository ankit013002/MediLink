export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-8 w-40 bg-muted rounded" />
      </div>
      <div className="flex gap-2 max-w-sm">
        <div className="h-10 flex-1 bg-muted rounded" />
        <div className="h-10 w-20 bg-muted rounded" />
      </div>
      <div className="rounded-md border overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-3 border-b">
            <div className="h-4 w-8 bg-muted rounded" />
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-28 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
