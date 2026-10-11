export default function ActionButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center justify-center gap-2 w-full border border-accent px-4 py-2 rounded-full transition-all duration-200 group hover:bg-(--color-accent) active:bg-(--color-accent)"
    >
      {children}
    </button>
  );
}
