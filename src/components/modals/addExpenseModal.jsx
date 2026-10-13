import { MdClose } from "react-icons/md";
import { RiImage2Fill } from "react-icons/ri";
import { useContext, useEffect, useRef, useState } from "react";
import ActionButton from "../buttons/actionButton";
import Swal from "sweetalert2";
import RegularButton from "../buttons/regularButton";
import { LoaderContext } from "@/context/loaderContext";
import { ProductContext } from "@/context/productContext";
import { ExpenseContext } from "@/context/expenseContext";

export default function AddExpenseModal({ setShowAddExpenseModal }) {
  const { setExpenses } = useContext(ExpenseContext);
  const { setIsLoading } = useContext(LoaderContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(() => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  });

  const AddExpense = async () => {
    if (
      !name.trim() ||
      amount === "" ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0 ||
      !date
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
      const res = await fetch("/api/expenses/addExpense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          amount,
          date,
        }),
      });

      if (!res.ok) {
        throw new Error("failed to add product");
      }

      const data = await res.json();

      setExpenses((prev) => [data.newExpense, ...prev]);

      setShowAddExpenseModal(false);

      Swal.fire({
        toast: true,
        position: "bottom-start",
        title: "Product succesfully added!",
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
        title: "Something went wrong try again later!",
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
        onClick={() => setShowAddExpenseModal(false)}
        className="fixed inset-0 z-150 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-(--color-accent)/10 bg-panel shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-(--color-accent)/10 p-4">
            <h1 className="text-base font-semibold text-neutral font-tall uppercase">
              Add Expense
            </h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAddExpenseModal(false);
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
                  Expense Name
                </h4>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Bulk Shoes Purchase"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <h4 className="text-base whitespace-nowrap text-normal font-tall uppercase">
                  Amount
                </h4>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="eg. 43"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>
              <div className="py-2 flex flex-col flex-1">
                <label htmlFor="expenseDate">Expense Date</label>
                <input
                  id="expenseDate"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="eg. 43"
                  className=" p-2 rounded w-full outline outline-(--color-panel) text-base text-normal"
                />
              </div>
            </div>
            <div className="mt-4 ml-auto flex w-fit">
              <RegularButton onClick={AddExpense}>
                <p className="text-sm uppercase text-normal font-heading transition-all duration-200 group-hover:text-(--color-accent) group-active:text-(--color-accent) whitespace-nowrap">
                  Add Expense
                </p>
              </RegularButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
