"use client";
import AdminGuard from "@/components/guard/adminGuard";
import ExpenseCard from "@/components/layout/expenses/expenceCard";
import ExpenseCardLoader from "@/components/loaders/expenseCardLoader";
import { ExpenseContext } from "@/context/expenseContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { TbReceiptOff } from "react-icons/tb";

export default function Expenses() {
  const {
    expenses,
    setShowEditExpenseModal,
    setShowConfirmExpenseDeleteModal,
    setSelectedExpense,
    expensesLoading
  } = useContext(ExpenseContext);
  const router = useRouter();

  return (
    <AdminGuard>
      <div className="p-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
        <button onClick={() => router.back()}>
          <BiChevronLeft className="text-2xl text-normal shrink-0" />
        </button>
        <div>
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
        </div>
      </div>
    </AdminGuard>
  );
}
