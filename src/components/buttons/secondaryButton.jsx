export default function SecondaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer w-full flex items-center justify-center gap-2 group transition-all duration-200 border border-panel hover:border-transparent active:border-transparent hover:bg-(--color-panel) active:bg-(--color-panel) rounded-full px-4 py-2"
    >
      {children}
    </button>
  );
}
