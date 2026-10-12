export default function RegularButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="cursor-pointer w-full flex items-center justify-center gap-2 bg-accent group transition-all duration-200 border border-transparent hover:border-(--color-accent) active:border-(--color-accent) hover:bg-(--color-secondary) active:bg-(--color-secondary) rounded-full px-4 py-2"
    >
      {children}
    </button>
  );
}
