import { Card } from "@/shared/components/ui/Card";
import type { ScheduleItem } from "@/lib/types";

interface DayCardProps {
  day: string;
  items: ScheduleItem[];
}

export function DayCard({ day, items }: DayCardProps) {
  const sortedItems = [...items].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Card className="flex flex-col overflow-hidden group/card" hover={true}>
      {/* Header */}
      <div className="bg-slate-900 p-5 flex justify-between items-center text-white border-b border-slate-800">
        <h2 className="text-xl font-bold tracking-wide">{day}</h2>
        <div className="bg-slate-800 p-2 rounded-lg">
          <i className="bi bi-calendar-event text-blue-400"></i>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-6">
        <div className="space-y-0">
          {sortedItems.map((item, index) => (
            <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
              {/* Vertical Line */}
              {index !== sortedItems.length - 1 && (
                <div className="absolute left-[11px] top-3 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-700"></div>
              )}
              {/* Dot */}
              <div className="absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-white dark:border-slate-800 bg-slate-300 dark:bg-slate-600 group-hover/card:bg-blue-600 transition-colors shadow-sm z-10"></div>

              {/* Content */}
              <div className="relative -top-1">
                <span className="inline-block bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-[11px] font-bold px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800 mb-2">
                  {item.time}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight mb-2 group-hover/card:text-blue-700 dark:group-hover/card:text-blue-400 transition-colors">
                  {item.subject}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                    <i className="bi bi-geo-alt-fill text-blue-500 mt-0.5"></i>
                    <span>{item.location}</span>
                  </div>
                  {item.instructor && (
                    <div className="flex items-start gap-2.5 text-sm text-slate-500 dark:text-slate-400">
                      <i className="bi bi-person-workspace text-slate-400 dark:text-slate-500 mt-0.5"></i>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{item.instructor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}