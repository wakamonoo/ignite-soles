"use client";
import ConfirmExpenseDeleteModal from "@/components/modals/confirmExpenseDeleteModal";
import EditExpenseModal from "@/components/modals/editExpenseModal";
import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showConfirmExpenseDeleteModal, setShowConfirmExpenseDeleteModal] =
    useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expensesLoading, setExpensesLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      setExpensesLoading(true);
      try {
        const res = await fetch("/api/expenses/getExpenses", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("failed to fetch expenses");
        }

        const data = await res.json();
        setExpenses(data.result);
      } catch (err) {
        console.error("failed to fetch expenses", err);
        setExpenses([]);
      } finally {
        setExpensesLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        setShowEditExpenseModal,
        setShowConfirmExpenseDeleteModal,
        selectedExpense,
        setSelectedExpense,
        expensesLoading,
      }}
    >
      {children}
      {showEditExpenseModal && <EditExpenseModal />}
      {showConfirmExpenseDeleteModal && <ConfirmExpenseDeleteModal />}
    </ExpenseContext.Provider>
  );
};
