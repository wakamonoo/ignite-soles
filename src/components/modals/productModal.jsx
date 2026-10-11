import { MdClose } from "react-icons/md";

export default function ProductModal({ product, setSelectedProduct }) {
  return (
    <div
      onClick={() => setSelectedProduct(null)}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-lg max-h-[90vh] overflow-hidden rounded-2xl  bg-second shadow-2xl"
      >
        <div className="flex items-center justify-end  p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(null);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) shrink-0"
          >
            <MdClose className="text-xl text-normal transition-all duration-20 group-hover:text-(--color-accent)" />
          </button>
        </div>
        <div className="px-4 overflow-y-auto custom-scroll w-full grid grid-cols-[1.5fr_2.5fr] gap-4">
          <div className="w-full aspect-square rounded-lg overflow-hidden">
            <img src={product.photo} className="w-full h-full object-cover" />
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <h4 className="text-base uppercase">{product?.name}</h4>
              <p className="text-lg text-accent font-bold font-alt">
                ₱{product?.price}
              </p>
              <p className="text-sm text-muted line-clamp-3 leading-tight">
                {product?.description}
              </p>
            </div>
            <div className="w-full h-px bg-panel my-4" />
            <div className="">
              <h4 className="text-sm uppercase">{product?.name}</h4>
              <div className="grid grid-cols-2">
                <button className="cursor-pointer flex items-center justify-center border border-panel rounded-full p-2">
                  <p className="text-xs">Regular • ₱39</p>
                </button>
                <button className="cursor-pointer flex items-center justify-center border border-accent rounded-full p-2">
                  <p className="text-xs text-accent">Regular • ₱39</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
