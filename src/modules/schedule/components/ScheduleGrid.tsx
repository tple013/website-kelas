"use client";

import { DayCard } from "./DayCard";
import type { ScheduleItem } from "@/lib/types";

const dayOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

interface ScheduleGridProps {
  data: ScheduleItem[] | null;
  emptyIcon?: string;
  emptyTitle?: string;
  emptyMessage?: string;
}

export function ScheduleGrid({ 
  data, 
  emptyIcon = "bi-calendar-x",
  emptyTitle = "Belum ada jadwal",
  emptyMessage = "Jadwal perkuliahan belum tersedia saat ini."
}: ScheduleGridProps) {
  
  // Grouping by day - logic dipindah ke sini
  const schedulesByDay = data?.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = [];
    acc[item.day].push(item);
    return acc;
  }, {} as Record<string, ScheduleItem[]>) || {};

  // Sorting days
  const sortedDays = Object.keys(schedulesByDay).sort(
    (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
  );

  // Empty state
  if (sortedDays.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className={`bi ${emptyIcon} text-4xl text-slate-300`}></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{emptyTitle}</h3>
        <p className="text-slate-500 mt-2">{emptyMessage}</p>
      </div>
    );
  }

  // Grid dengan mapping
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedDays.map((day) => (
        <DayCard key={day} day={day} items={schedulesByDay[day]} />
      ))}
    </div>
  );
}
