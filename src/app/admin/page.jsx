"use client";
import AdminGuard from "@/components/guard/adminGuard";
import AddProductModal from "@/components/modals/addProductModal";
import { useContext, useState } from "react";
import Logo from "@/assets/main_logo.png";
import Image from "next/image";
import ActionButton from "@/components/buttons/actionButton";
import { LuLogOut } from "react-icons/lu";
import RegularButton from "@/components/buttons/regularButton";
import { CgAdd } from "react-icons/cg";
import {
  BiCheckboxChecked,
  BiCheckCircle,
  BiCheckDouble,
  BiMoneyWithdraw,
  BiShoppingBag,
  BiWalletAlt,
} from "react-icons/bi";
import { BsBox, BsMessenger } from "react-icons/bs";
import { ProductContext } from "@/context/productContext";
import { FcPicture } from "react-icons/fc";
import { SlPicture } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";
import { LoaderContext } from "@/context/loaderContext";
import { NavigationContext } from "@/context/navigationContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { FaPencil, FaTrash } from "react-icons/fa6";
import EditProductModal from "@/components/modals/editProductModal";
import ConfirmProductDeleteModal from "@/components/modals/confirmProductDeleteModal";

const availabilities = [
  { name: "All", value: "all" },
  { name: "Available", value: "available" },
  { name: "Sold", value: "sold" },
];

export default function Admin() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showConfirmProductDeleteModal, setShowConfirmProductDeleteModal] =
    useState(false);
  const { handleHomeClick } = useContext(NavigationContext);
  const { setIsLoading } = useContext(LoaderContext);
  const { products } = useContext(ProductContext);
  const [activeAvailability, setActiveAvailabilty] = useState("all");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.replace("/");
    } catch (err) {
      console.error("logout failed:", err);
    }
  };

  const filteredProducts =
    activeAvailability === "all"
      ? products
      : products.filter((product) =>
          activeAvailability === "available"
            ? product.isAvailable === true
            : product.isAvailable === false,
        );

  const totalSales = products
    .filter((product) => product.isAvailable === false)
    .reduce((total, product) => total + Number(product.price || 0), 0);

  const itemsListed = products.length;

  const itemsAvailable = products.filter(
    (product) => product.isAvailable === true,
  ).length;

  const itemsSold = products.filter(
    (product) => product.isAvailable === false,
  ).length;

  const handleSoldItem = async (product) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/products/markProductAsSold", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.productId,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to mark product as sold");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminGuard>
      <div className="w-full">
        <nav className="fixed z-100 w-full flex justify-between items-center p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 bg-second">
          <button
            onClick={handleHomeClick}
            className="cursor-pointer w-24 h-auto"
          >
            <Image
              src={Logo}
              alt="icon"
              className="w-full h-auto object-contain"
            />
          </button>
          <div>
            <ActionButton onClick={handleLogout}>
              <LuLogOut className="text-base shrink-0 text-accent transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)" />
              <p className="text-sm uppercase text-accent font-heading transition-all duration-200 group-hover:text-(--color-normal) group-active:text-(--color-normal)">
                Log-out
              </p>
            </ActionButton>
          </div>
        </nav>
        <main className="my-18 p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
          <div className="ml-auto w-fit">
            <RegularButton onClick={() => setShowAddProductModal(true)}>
              <CgAdd className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
              <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                Add New Item
              </p>
            </RegularButton>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2 bg-stone shadow-2xl p-4 rounded-md">
              <BiWalletAlt className="text-2xl shrink-0 text-normal" />
              <p className="text-sm text-normal font-semibold uppercase">
                Total Sales
              </p>
              <p className="text-base text-normal font-heading">
                ₱ {Number(totalSales).toLocaleString("en-PH")}
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-stone shadow-2xl p-4 rounded-md">
              <BsBox className="text-2xl shrink-0 text-normal" />
              <p className="text-sm text-normal font-semibold uppercase">
                Items Listed
              </p>
              <p className="text-base text-normal font-heading">
                {itemsListed}
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-stone shadow-2xl p-4 rounded-md">
              <BiShoppingBag className="text-2xl shrink-0 text-normal" />
              <p className="text-sm text-normal font-semibold uppercase">
                Available
              </p>
              <p className="text-base text-normal font-heading">
                {itemsAvailable}
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-stone shadow-2xl p-4 rounded-md">
              <BiCheckCircle className="text-2xl shrink-0 text-normal" />
              <p className="text-sm text-normal font-semibold uppercase">
                Items Sold
              </p>
              <p className="text-base text-normal font-heading">{itemsSold}</p>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-3 gap-2 max-w-4xl w-full">
              {availabilities.map((availability) => {
                const isActive = activeAvailability === availability.value;

                return (
                  <button
                    key={availability.value}
                    onClick={() => setActiveAvailabilty(availability.value)}
                    className={`cursor-pointer flex items-center justify-center gap-0.5 p-2 rounded-full transition-all duration-200 group border hover:bg-(--color-secondary) active:bg-(--color-secondary) ${isActive ? "bg-second border-transparent" : "border-(--color-secondary)"}`}
                  >
                    <span
                      className={`text-base font-bold uppercase group-hover:text-(--color-neutral) group-active:text-(--color-neutral) ${isActive ? "text-neutral" : "text-normal"}`}
                    >
                      {availability.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.productId}
                  className="relative flex flex-col gap-2 items-center bg-stone rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="absolute top-2 right-2 flex gap-0.5">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditProductModal(true);
                      }}
                      className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary)"
                    >
                      <FaPencil className="text-base text-normal transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowConfirmProductDeleteModal(true);
                      }}
                      className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary)"
                    >
                      <FaTrash className="text-base text-normal transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)" />
                    </button>
                  </div>
                  <div className="w-full aspect-square">
                    <img
                      src={product.photo}
                      about="burger"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-full p-2">
                    <h4 className="text-base font-tall uppercase leading-tight">
                      {product.name}
                    </h4>
                    <div className="flex justify-between items-center">
                      <p className="text-lg text-normal font-heading font-bold">
                        ₱ {Number(product.price).toLocaleString("en-PH")}
                      </p>
                      <div className="flex flex-col items-center justify-center w-12 h-12 p-2 rounded-lg border border-second">
                        <span className="text-xs text-normal">Size</span>
                        <span className="text-sm font-bold text-panel">
                          {product.size}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center">
                      <GoDotFill className="text-base text-accent" />
                      <p className="text-xs text-muted uppercase">
                        Condition: {product.condition}
                      </p>
                    </div>
                    <div className="mt-2">
                      {product.isAvailable ? (
                        <RegularButton onClick={() => handleSoldItem(product)}>
                          <BiMoneyWithdraw className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
                          <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                            Mark as Sold
                          </p>
                        </RegularButton>
                      ) : (
                        <div className="cursor-not-allowed flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-gray">
                          <BiCheckboxChecked className="text-base shrink-0 text-neutral" />
                          <p className="text-sm uppercase text-neutral font-heading">
                            Sold
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      {showAddProductModal && (
        <AddProductModal setShowAddProductModal={setShowAddProductModal} />
      )}
      {selectedProduct && showEditProductModal && (
        <EditProductModal
          selectedProduct={selectedProduct}
          setShowEditProductModal={setShowEditProductModal}
        />
      )}
      {selectedProduct && showConfirmProductDeleteModal && (
        <ConfirmProductDeleteModal
          selectedProduct={selectedProduct}
          setShowConfirmProductDeleteModal={setShowConfirmProductDeleteModal}
        />
      )}
    </AdminGuard>
  );
}
