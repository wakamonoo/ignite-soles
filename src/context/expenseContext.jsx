"use client";
import ConfirmExpenseDeleteModal from "@/components/modals/confirmExpenseDeleteModal";
import EditExpenseModal from "@/components/modals/editExpenseModal";
import { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [showEditExpenseModal, setShowEditExpenseModal] = useState(false);
  const [showConfirmExpenseDeleteModal, setShowConfirmExpenseDeleteModal] =
    useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        setShowEditExpenseModal,
        setShowConfirmExpenseDeleteModal,
        selectedExpense,
        setSelectedExpense,
      }}
    >
      {children}
      {showEditExpenseModal && <EditExpenseModal />}
      {showConfirmExpenseDeleteModal && <ConfirmExpenseDeleteModal />}
    </ExpenseContext.Provider>
  );
};
