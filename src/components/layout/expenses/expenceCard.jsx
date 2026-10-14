import { FaPencil, FaTrash } from "react-icons/fa6";
import { format, parseISO } from "date-fns";
import { BiWallet } from "react-icons/bi";

export default function ExpenseCard({
  expense,
  setShowEditExpenseModal,
  setShowConfirmExpenseDeleteModal,
  setSelectedExpense,
}) {
  return (
    <div className="mt-2 p-4 rounded bg-stone shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 p-2 rounded-full bg-second flex items-center justify-center">
            <BiWallet className="text-2xl text-neutral shrink-0" />
          </div>
          <div className="flex flex-col">
            <p className="text-base text-normal font-semibold">
              {expense.name}
            </p>
            <p className="text-sm text-muted">
              {format(parseISO(expense.date), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <p className="text-base font-heading">₱ {expense.amount}</p>
      </div>
      {expense.note && (
        <div className="mt-4">
          <p className="text-base text-normal">{expense.note}</p>
        </div>
      )}
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
}
