interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

const variants = {
  default: "bg-slate-100 text-slate-600 border-slate-200",
  success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  warning: "bg-amber-100 text-amber-700 border-amber-200",
  info: "bg-blue-100 text-blue-700 border-blue-200",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}