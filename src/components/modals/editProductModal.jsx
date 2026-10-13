import { MdClose } from "react-icons/md";
import { RiImage2Fill } from "react-icons/ri";
import { useContext, useEffect, useRef, useState } from "react";
import ActionButton from "../buttons/actionButton";
import Swal from "sweetalert2";
import RegularButton from "../buttons/regularButton";
import { LoaderContext } from "@/context/loaderContext";
import { ProductContext } from "@/context/productContext";

export default function EditProductModal({
  selectedProduct,
  setShowEditProductModal,
}) {
  const { setProducts } = useContext(ProductContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [name, setName] = useState(selectedProduct.name ?? "");
  const [price, setPrice] = useState(selectedProduct.price ?? 0);
  const [size, setSize] = useState(selectedProduct.size ?? 0);
  const [condition, setCondition] = useState(selectedProduct.condition ?? "");
  const [category, setCategory] = useState(selectedProduct.category ?? "");
  const [file, setFile] = useState(null);

  const updateItem = async () => {
    if (
      !name.trim() ||
      price === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) <= 0 ||
      size === "" ||
      !Number.isFinite(Number(size)) ||
      Number(size) <= 0 ||
      !condition ||
      !category
    ) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Please provide required fields!",
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
      return;
    }

    setIsLoading(true);

    try {
      let url = selectedProduct.photo;

      if (file) {
        const formData = new FormData();

        formData.append("file", file);

        const uploadRes = await fetch("/api/uploads/productPhotos", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const errorData = await uploadRes.json();

          if (uploadRes.status === 413) {
            Swal.fire({
              toast: true,
              position: "bottom-start",
              title: "File exceeds the 50 MB limit!",
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
            return;
          }
          throw new Error(errorData.error || "Upload failed");
        }

        const uploadData = await uploadRes.json();
        url = uploadData.url;
      }

      const res = await fetch(
        `/api/products/updateProduct/${selectedProduct.productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
            size,
            condition,
            category,
            photo: url,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("failed to update product");
      }

      const data = await res.json();

      setProducts((prev) =>
        prev.map((product) =>
          product.productId === selectedProduct.productId
            ? data.product
            : product,
        ),
      );

      setShowEditProductModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Product updated succesfully!",
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
    <>
      <div
        onClick={() => setShowEditProductModal(false)}
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-(--color-accent)/10 bg-panel shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-(--color-accent)/10 p-4">
            <h1 className="text-base font-semibold text-neutral font-tall uppercase">
              Edit Item
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEditProductModal(false);
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-secondary) active:bg-(--color-secondary) shrink-0"
            >
              <MdClose className="text-xl text-neutral transition-all duration-20 group-hover:text-(--color-accent)" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto custom-scroll bg-stone rounded-t-2xl">
            <div className="flex flex-col gap-4">
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Product Name
                </h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="eg. Jordan 1"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>

              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Price
                </h4>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="eg. 43"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Size
                </h4>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="eg. 50"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Condition
                </h4>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                >
                  <option value="" disabled>
                    Select Condition
                  </option>
                  <option value="pre-loved" className=" text-normal">
                    Pre-Loved
                  </option>
                  <option value="brand-new" className=" text-normal">
                    Brand New
                  </option>
                </select>
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Category
                </h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="sneakers" className=" text-normal">
                    Sneakers
                  </option>
                  <option value="sports" className=" text-normal">
                    Sports
                  </option>
                  <option value="casual" className=" text-normal">
                    Casual
                  </option>
                  <option value="sliders" className=" text-normal">
                    Sliders
                  </option>
                </select>
              </div>
              <label
                htmlFor="fileUpload"
                className="w-full cursor-pointer flex gap-4 items-center justify-center p-4 border border-dashed border-(--color-panel)"
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Replacement product photo"
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                  />
                ) : selectedProduct.photo ? (
                  <img
                    src={selectedProduct.photo}
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                  />
                ) : (
                  <RiImage2Fill className="text-4xl text-normal shrink-0" />
                )}
                <div className="flex flex-col justify-center items-start flex-1 w-0 min-w-0">
                  <p className="text-base font-bold truncate w-full text-normal">
                    {file
                      ? "Replacement photo selected"
                      : "Change Product Photo"}
                  </p>
                  <span className="text-xs text-normal">
                    (Maximum size of 50mb)
                  </span>
                </div>
              </label>
              <input
                id="fileUpload"
                name="file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] ?? null;
                  setFile(selectedFile);
                }}
              />
            </div>
            <div className="mt-4 ml-auto flex w-fit">
              <RegularButton onClick={updateItem}>
                <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                  Save Changes
                </p>
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
