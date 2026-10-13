"use client";
import AdminGuard from "@/components/guard/adminGuard";
import AddProductModal from "@/components/modals/addProductModal";
import { useContext, useEffect, useState } from "react";

import RegularButton from "@/components/buttons/regularButton";
import { CgAdd } from "react-icons/cg";
import {
  BiCheckboxChecked,
  BiCheckCircle,
  BiCheckDouble,
  BiMoneyWithdraw,
  BiReceipt,
  BiShoppingBag,
  BiWalletAlt,
} from "react-icons/bi";
import { BsBox, BsMessenger, BsReceiptCutoff } from "react-icons/bs";
import { ProductContext } from "@/context/productContext";
import { FcPicture } from "react-icons/fc";
import { SlPicture } from "react-icons/sl";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";
import { LoaderContext } from "@/context/loaderContext";
import { NavigationContext } from "@/context/navigationContext";
import { useRouter } from "next/navigation";
import {
  FaMoneyBillTransfer,
  FaMoneyBillTrendUp,
  FaPencil,
  FaTrash,
} from "react-icons/fa6";
import EditProductModal from "@/components/modals/editProductModal";
import ConfirmProductDeleteModal from "@/components/modals/confirmProductDeleteModal";
import ProductCardLoader from "@/components/loaders/productCardLoader";
import { TbReceiptOff, TbShoeOff } from "react-icons/tb";
import AddExpenseModal from "@/components/modals/addExpenseModal";
import CountUp from "react-countup";
import { format, parseISO } from "date-fns";
import { ExpenseContext } from "@/context/expenseContext";
import AdminNavbar from "@/components/layout/essentials/adminNavbar";
import ExpenseCard from "@/components/layout/expenses/expenceCard";
import ExpenseCardLoader from "@/components/loaders/expenseCardLoader";

const availabilities = [
  { name: "All", value: "all" },
  { name: "Available", value: "available" },
  { name: "Sold", value: "sold" },
];

export default function Admin() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showConfirmProductDeleteModal, setShowConfirmProductDeleteModal] =
    useState(false);
  const { setIsLoading } = useContext(LoaderContext);
  const { products, setProducts, productsLoading } = useContext(ProductContext);
  const [activeAvailability, setActiveAvailabilty] = useState("all");
  const {
    expenses,
    setSelectedExpense,
    setShowEditExpenseModal,
    setShowConfirmExpenseDeleteModal,
    expensesLoading,
  } = useContext(ExpenseContext);
  const router = useRouter();

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

  const totalExpenses = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0,
  );

  const totalProfit = totalSales - totalExpenses;

  const itemsListed = products.length;

  const itemsAvailable = products.filter(
    (product) => product.isAvailable === true,
  ).length;

  const itemsSold = products.filter(
    (product) => product.isAvailable === false,
  ).length;

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

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

      setProducts((prev) =>
        prev.map((item) =>
          item.productId === product.productId
            ? { ...item, isAvailable: false }
            : item,
        ),
      );

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Product marked as sold!",
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
        title: "Product failed to mark as sold!",
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
    <AdminGuard>
      <div className="w-full">
        <AdminNavbar />
        <div className="my-18 p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 grid gap-8 grid-cols-1 lg:grid-cols-[3fr_1fr]">
          <main>
            <div className="ml-auto w-fit flex gap-2">
              <RegularButton onClick={() => setShowAddExpenseModal(true)}>
                <CgAdd className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
                <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                  Add Expense
                </p>
              </RegularButton>
              <RegularButton onClick={() => setShowAddProductModal(true)}>
                <CgAdd className="text-base shrink-0 text-normal transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent)" />
                <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                  Add New Item
                </p>
              </RegularButton>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <FaMoneyBillTrendUp className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Profit
                </p>
                <div className="flex items-center gap-0.5">
                  <p
                    className={`text-base font-heading ${totalProfit < 0 ? "text-coral" : "text-normal"}`}
                  >
                    ₱
                  </p>
                  <CountUp
                    end={totalProfit}
                    duration={1.5}
                    className={`text-base font-heading ${totalProfit < 0 ? "text-coral" : "text-normal"}`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <FaMoneyBillTransfer className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Expenses
                </p>
                <div className="flex items-center gap-0.5">
                  <p className="text-base text-normal font-heading">₱</p>
                  <CountUp
                    end={totalExpenses}
                    duration={1.5}
                    className="text-base text-normal font-heading"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <BiWalletAlt className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Total Sales
                </p>
                <div className="flex items-center gap-0.5">
                  <p className="text-base text-normal font-heading">₱</p>
                  <CountUp
                    end={totalSales}
                    duration={1.5}
                    className="text-base text-normal font-heading"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <BsBox className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Items Listed
                </p>
                <CountUp
                  end={itemsListed}
                  duration={1.5}
                  className="text-base text-normal font-heading"
                />
              </div>
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <BiShoppingBag className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Available
                </p>
                <CountUp
                  end={itemsAvailable}
                  duration={1.5}
                  className="text-base text-normal font-heading"
                />
              </div>
              <div className="flex flex-col gap-2 bg-stone shadow-md p-4 rounded-md">
                <BiCheckCircle className="text-2xl shrink-0 text-normal" />
                <p className="text-sm text-normal font-semibold uppercase">
                  Items Sold
                </p>
                <CountUp
                  end={itemsSold}
                  duration={1.5}
                  className="text-base text-normal font-heading"
                />
              </div>
            </div>

            <div className="block lg:hidden">
              <div className="mt-8 w-full ">
                <div className="flex items-center justify-between">
                  <p className="text-base text-normal font-tall">
                    Recent Expences
                  </p>
                  <button
                    onClick={() => router.push("/admin/expenses")}
                    className="cursor-pointer"
                  >
                    <p className="text-sm text-normal">View all</p>
                  </button>
                </div>
              </div>

              {expensesLoading ? (
                <>
                  <ExpenseCardLoader />
                  <ExpenseCardLoader />
                  <ExpenseCardLoader />
                </>
              ) : recentExpenses.length === 0 ? (
                <div className="py-16 flex w-full justify-center">
                  <div className="flex flex-col items-center justify-center max-w-md">
                    <TbReceiptOff className="text-normal text-4xl shrink-0" />
                    <h2 className="text-base font-tall uppercase text-normal mt-2">
                      No Expenses Yet
                    </h2>
                    <p className="text-sm text-muted text-center leading-none">
                      Your expenses will appear here once you add one.
                    </p>
                  </div>
                </div>
              ) : (
                recentExpenses.map((expense) => {
                  return (
                    <ExpenseCard
                      key={expense.expenseId}
                      expense={expense}
                      setShowEditExpenseModal={setShowEditExpenseModal}
                      setShowConfirmExpenseDeleteModal={
                        setShowConfirmExpenseDeleteModal
                      }
                      setSelectedExpense={setSelectedExpense}
                    />
                  );
                })
              )}
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
            {productsLoading ? (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
                <ProductCardLoader />
                <ProductCardLoader />
                <ProductCardLoader />
                <ProductCardLoader />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-16 flex w-full justify-center">
                <div className="flex flex-col items-center justify-center max-w-md">
                  <TbShoeOff className="text-normal text-4xl shrink-0" />
                  <h2 className="text-base font-tall uppercase text-normal mt-2">
                    Empty Shoe Catalog
                  </h2>
                  <p className="text-sm text-muted text-center leading-none">
                    No available products in this category right now.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
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
                            <RegularButton
                              onClick={() => handleSoldItem(product)}
                            >
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
            )}
          </main>
          <aside className="hidden lg:block">
            <p className="text-base text-normal font-tall">Recent Expences</p>
            {expensesLoading ? (
              <>
                <ExpenseCardLoader />
                <ExpenseCardLoader />
                <ExpenseCardLoader />
              </>
            ) : expenses.length === 0 ? (
              <div className="py-16 flex w-full justify-center">
                <div className="flex flex-col items-center justify-center max-w-md">
                  <TbReceiptOff className="text-normal text-4xl shrink-0" />
                  <h2 className="text-base font-tall uppercase text-normal mt-2">
                    No Expenses Yet
                  </h2>
                  <p className="text-sm text-muted text-center leading-none">
                    Your expenses will appear here once you add one.
                  </p>
                </div>
              </div>
            ) : (
              expenses.map((expense) => {
                return (
                  <ExpenseCard
                    key={expense.expenseId}
                    expense={expense}
                    setShowEditExpenseModal={setShowEditExpenseModal}
                    setShowConfirmExpenseDeleteModal={
                      setShowConfirmExpenseDeleteModal
                    }
                    setSelectedExpense={setSelectedExpense}
                  />
                );
              })
            )}
          </aside>
        </div>
      </div>
      {showAddProductModal && (
        <AddProductModal setShowAddProductModal={setShowAddProductModal} />
      )}
      {showAddExpenseModal && (
        <AddExpenseModal setShowAddExpenseModal={setShowAddExpenseModal} />
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
