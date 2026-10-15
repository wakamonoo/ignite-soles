import { MdClose } from "react-icons/md";
import RegularButton from "../buttons/regularButton";
import Swal from "sweetalert2";
import { useContext } from "react";
import { LoaderContext } from "@/context/loaderContext";
import SecondaryButton from "../buttons/secondaryButton";
import { ProductContext } from "@/context/productContext";

export default function ConfirmProductDeleteModal({
  selectedProduct,
  setShowConfirmProductDeleteModal,
}) {
  const { setProducts} = useContext(ProductContext)
  const { setIsLoading } = useContext(LoaderContext);

  const deleteProduct = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/products/deleteProduct/${selectedProduct.productId}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((product) => product.productId !== selectedProduct.productId))

      setShowConfirmProductDeleteModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Product deleted!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-accent)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !uppercase !font-[family-name:var(--font-tall)] !font-semibold !text-(--color-neutral) !leading-4.5",
        },
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Something went wrong, please try again later!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-coral)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title:
            "!text-base !uppercase !font-[family-name:var(--font-tall)] !font-semibold !text-(--color-neutral) !leading-4.5",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowConfirmProductDeleteModal(false)}
      className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-md max-h-[90vh] overflow-hidden rounded-2xl border border-(--color-accent)/10 bg-panel shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-(--color-accent)/10 p-4">
          <h1 className="text-base font-semibold text-neutral font-tall uppercase">
            Delete Product
          </h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmProductDeleteModal(false);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-secondary) active:bg-(--color-secondary) shrink-0"
          >
            <MdClose className="text-xl text-neutral transition-all duration-20 group-hover:text-(--color-accent)" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto custom-scroll bg-stone rounded-t-2xl">
          <p className="text-left text-base text-normal font-medium leading-5">
            Are you sure you want to delete this product?
          </p>
          <div className="mt-4 ml-auto flex w-fit gap-2">
            <SecondaryButton onClick={deleteProduct}>
              <p className="text-sm uppercase text-panel font-heading transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)">
                Confirm
              </p>
            </SecondaryButton>
            <RegularButton
              onClick={() => setShowConfirmProductDeleteModal(false)}
            >
              <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                Cancel
              </p>
            </RegularButton>
          </div>
        </div>
      </div>
    </div>
  );
}
