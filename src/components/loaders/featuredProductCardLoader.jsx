export default function FeaturedProductCardLoader() {
  return (
    <div className="flex gap-2 items-stretch bg-stone rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="flex w-[40%] aspect-square  min-w-0 shrink-0 items-center justify-center bg-gray" />

      <div className="flex min-w-0 flex-1 flex-col justify-center overflow-hidden w-full p-2">
        <div className="bg-gray h-6 w-32 shrink-0 rounded" />
        <div className="mt-2 flex flex-col gap-0.5">
          <div className="w-8 h-1 bg-gray" />
          <div className="bg-gray h-7 w-18 shrink-0 rounded" />
        </div>
        <div className="mt-2 min-w-0 flex items-center divide-x divide-(--color-gray)">
          <div className="flex items-center gap-2 pr-2">
            <div className="bg-gray h-8 w-8 shrink-0 rounded" />
            <div className="flex flex-col gap-0.5">
              <div className="bg-gray h-4 w-10 shrink-0 rounded" />
              <div className="bg-gray h-5 w-8 shrink-0 rounded" />
            </div>
          </div>
          <div className="flex min-w-0 items-center gap-2 pl-2">
            <div className="bg-gray h-8 w-8 shrink-0 rounded" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <div className="bg-gray h-4 w-18 shrink-0 rounded" />
              <div className="bg-gray h-5 w-24 shrink-0 rounded" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-gray h-8 shrink-0 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
