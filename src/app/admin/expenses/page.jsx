"use client";
import AdminGuard from "@/components/guard/adminGuard";
import { ExpenseContext } from "@/context/expenseContext";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function Expenses() {
  const {
    expenses,
    setShowEditExpenseModal,
    setShowConfirmExpenseDeleteModal,
    setSelectedExpense,
  } = useContext(ExpenseContext);
  const router = useRouter();

  return (
    <AdminGuard>
      <div className="p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <button onClick={() => router.back()}>
          <BiChevronLeft className="text-2xl text-normal shrink-0" />
        </button>
        <div>
          {expenses.map((expense) => {
            return (
              <div
                key={expense.expenseId}
                className="mt-2 p-4 rounded bg-stone shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-base text-normal font-semibold">
                      {expense.name}
                    </p>
                    <p className="text-sm text-muted">
                      {format(parseISO(expense.date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p className="text-base font-heading">₱ {expense.amount}</p>
                </div>
                <div className="w-full h-px bg-second opacity-20 my-4" />
                <div className="ml-auto w-fit flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedExpense(expense);
                      setShowEditExpenseModal(true);
                    }}
                    className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary)"
                  >
                    <FaPencil className="text-base text-normal transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedExpense(expense);
                      setShowConfirmExpenseDeleteModal(true);
                    }}
                    className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center group transition-all duration-200 hover:bg-(--color-secondary) active:bg-(--color-secondary)"
                  >
                    <FaTrash className="text-base text-normal transition-all duration-200 group-hover:text-(--color-neutral) group-active:text-(--color-neutral)" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminGuard>
  );
}
