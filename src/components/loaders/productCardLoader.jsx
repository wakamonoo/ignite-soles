export default function ProductCardLoader() {
  return (
    <div className="flex flex-col gap-2 items-center bg-stone rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-gray" />
      <div className="flex flex-col w-full p-2">
        <div className="bg-gray h-6 w-32 shrink-0 rounded" />
        <div className="flex justify-between items-center">
          <div className="bg-gray h-7 w-18 shrink-0 rounded" />
          <div className="flex flex-col gap-0.5 items-center justify-center w-12 h-12 p-2 rounded-lg border border-(--color-gray)">
            <div className="bg-gray h-4 w-10 shrink-0 rounded" />
            <div className="bg-gray h-5 w-8 shrink-0 rounded" />
          </div>
        </div>
        <div className="mt-2 flex gap-0.5 items-center">
          <div className="bg-gray h-3 w-3 shrink-0 rounded-full" />
          <div className="bg-gray h-4 w-12 shrink-0 rounded" />
        </div>
        <div className="mt-2">
          <div className="bg-gray h-8 shrink-0 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
