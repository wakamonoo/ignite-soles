import { MdClose } from "react-icons/md";
import { RiImage2Fill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import ActionButton from "../buttons/actionButton";
import Swal from "sweetalert2";
import RegularButton from "../buttons/regularButton";

export default function AddProductModal({ setShowAddProductModal }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState(0);
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const AddItem = async () => {
    if (
      !name.trim() ||
      price === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0 ||
      size === "" ||
      !Number.isFinite(Number(size)) ||
      Number(size) < 0 ||
      !condition ||
      !category ||
      !file
    ) {
      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Please provide required fields!",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-accent)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title: "!text-base !font-semibold !text-(--color-text) !leading-4.5",
        },
      });
      return;
    }

    try {
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
            title: "File too large, 50 MB maximum per file!",
            icon: "error",
            timer: 2000,
            showConfirmButton: false,
            background: "var(--color-secondary)",
            iconColor: "var(--color-accent)",
            customClass: {
              popup:
                "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
              title:
                "!text-base !font-semibold !text-(--color-text) !leading-4.5",
            },
          });
          return;
        }
        throw new Error(errorData.error || "Upload failed");
      }

      const { url } = await uploadRes.json();

      const res = await fetch("/api/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          size,
          condition,
          category,
          url,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to add story");
      }

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Story now live!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "var(--color-secondary)",
        iconColor: "var(--color-olive)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title: "!text-base !font-semibold !text-(--color-text) !leading-4.5",
        },
      });

      setShowAddProductModal(false);
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
        iconColor: "var(--color-accent)",
        customClass: {
          popup:
            "!w-full !max-w-xs !inline-flex !items-center !justify-center !border !border-(--color-panel) !text-normal !rounded-lg !shadow-lg !px-4 !py-2",
          title: "!text-base !font-semibold !text-(--color-text) !leading-4.5",
        },
      });
    }
  };

  return (
    <>
      <div
        onClick={() => setShowAddProductModal(false)}
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-(--color-accent)/10 bg-second shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-(--color-accent)/10 p-4">
            <h1 className="text-base font-semibold text-neutral font-tall uppercase">
              Add Item
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddProductModal(false);
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 group hover:bg-(--color-panel) shrink-0"
            >
              <MdClose className="text-xl text-neutral transition-all duration-20 group-hover:text-(--color-accent)" />
            </button>
          </div>
          <div className="px-4 overflow-y-auto custom-scroll">
            <div className="flex flex-col gap-4">
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-neutral font-tall uppercase">
                  Product Name
                </h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="eg. Jordan 1"
                  className="bg-accent p-2 rounded w-full outline-none text-base text-normal"
                />
              </div>

              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-neutral font-tall uppercase">
                  Price
                </h4>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="eg. 43"
                  className="bg-accent p-2 rounded w-full outline-none text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-neutral font-tall uppercase">
                  Size
                </h4>
                <input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="eg. 50"
                  className="bg-accent p-2 rounded w-full outline-none text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-neutral font-tall uppercase">
                  Condition
                </h4>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="bg-accent p-2 rounded w-full outline-none text-base text-normal"
                >
                  <option value="" disabled>
                    Select Condition
                  </option>
                  <option value="preloved" className="bg-accent text-normal">
                    Pre-Loved
                  </option>
                  <option value="brandnew" className="bg-accent text-normal">
                    Brand New
                  </option>
                </select>
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-neutral font-tall uppercase">
                  Category
                </h4>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="bg-accent p-2 rounded w-full outline-none text-base text-normal"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="sneakers" className="bg-accent text-normal">
                    Sneakers
                  </option>
                  <option value="sports" className="bg-accent text-normal">
                    Sports
                  </option>
                  <option value="casual" className="bg-accent text-normal">
                    Casual
                  </option>
                  <option value="sliders" className="bg-accent text-normal">
                    Sliders
                  </option>
                </select>
              </div>
              <label
                htmlFor="fileUpload"
                className="w-full cursor-pointer flex gap-4 items-center justify-center p-4 border border-dashed border-(--color-accent)"
              >
                <RiImage2Fill className="text-4xl text-neutral shrink-0" />
                <div className="flex flex-col justify-center items-start flex-1 w-0 min-w-0">
                  <p className="text-base font-bold truncate w-full text-neutral">
                    {file ? file.name : "Add Photo"}
                  </p>
                  <span className="text-xs text-neutral">
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
          </div>
          <div className="ml-auto flex w-fit p-4">
            <ActionButton onClick={AddItem}>
              <p className="text-base uppercase font-semibold text-neutral transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal) whitespace-nowrap">
                Add Item
              </p>
            </ActionButton>
          </div>
        </div>
      </div>
    </>
  );
}
