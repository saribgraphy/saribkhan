/**
 * Shown only while a page that wasn't prefetched is on its way: the same
 * shape as a case file or note, so the real page settles into place.
 */
export function PageSkeleton({ cover = false }: { cover?: boolean }) {
  return (
    <div className="fold-in" aria-busy aria-label="Loading">
      <span className="skeleton mb-8 block h-3 w-32 rounded-full" />
      <span className="skeleton block h-9 w-[80%] rounded-lg" />
      <span className="skeleton mt-3 block h-9 w-[55%] rounded-lg" />
      <span className="skeleton mt-8 block h-3.5 w-full rounded-full" />
      <span className="skeleton mt-3 block h-3.5 w-[92%] rounded-full" />
      <span className="skeleton mt-3 block h-3.5 w-[70%] rounded-full" />
      {cover ? <span className="skeleton mt-10 block aspect-[16/10] w-full rounded-[10px]" /> : null}
    </div>
  );
}
