export default function Button({
  label,
  onClick,
  variant = "primary",
  type = "",
  className = "",
}) {
  const theme = {
    primary:
      "flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:shadow-lg hover:shadow-emerald-500/25",
    secondary:
      " flex-1 border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-300 backdrop-blur-sm",
  };

  const base =
    "font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${theme[variant]} ${className}`}
    >
      {label}
    </button>
  );
}
