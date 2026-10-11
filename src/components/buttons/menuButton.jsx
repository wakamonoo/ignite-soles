export default function MenuButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer flex items-center gap-4 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-(--color-secondary)"
    >
      {children}
    </button>
  );
}
