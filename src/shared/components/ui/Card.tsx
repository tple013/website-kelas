interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${hover ? "hover:shadow-lg hover:border-blue-300 transition-all duration-300" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-6 py-4 bg-slate-50 border-t border-slate-100 ${className}`}>{children}</div>;
}