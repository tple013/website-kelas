interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
}

export function ValueCard({ title, description, icon, color, bg }: ValueCardProps) {
  return (
    <div className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <i className={`bi ${icon} text-2xl ${color}`}></i>
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}