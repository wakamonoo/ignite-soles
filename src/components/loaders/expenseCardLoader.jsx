export default function ExpenseCardLoader() {
  return (
    <div className="mt-2 p-4 rounded bg-stone shadow-md animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 p-2 rounded-full bg-gray" />
          <div className="flex flex-col gap-0.5">
            <div className="bg-gray h-6 w-32 shrink-0 rounded" />
            <div className="bg-gray h-5 w-24 shrink-0 rounded" />
          </div>
        </div>
        <div className="bg-gray h-6 w-18 shrink-0 rounded" />
      </div>
      <div className="mt-4 flex flex-col gap-0.5">
        <div className="bg-gray h-6 w-full shrink-0 rounded" />
        <div className="bg-gray h-6 w-12 shrink-0 rounded" />
      </div>
      <div className="w-full h-px bg-gray opacity-20 my-4" />
      <div className="ml-auto w-fit flex gap-2">
        <div className="w-8 h-8 p-2 rounded-full bg-gray" />
        <div className="w-8 h-8 p-2 rounded-full bg-gray" />
      </div>
    </div>
  );
}
