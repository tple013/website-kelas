"use client";

import { useSchedule } from "./hooks/useSchedule";
import { ScheduleGrid } from "./components/ScheduleGrid";
import { SkeletonCard } from "@/shared/components/ui/Skeleton";
import { ErrorAlert } from "@/shared/components/ui/ErrorAlert";
import { Badge } from "@/shared/components/ui/Badge";

export function ScheduleView() {
  const { data: schedules, loading, error } = useSchedule();

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorAlert title="Gagal Memuat Jadwal" message={error.message} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="info" className="uppercase tracking-wider">Akademik Semester 1</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Jadwal Perkuliahan</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Daftar lengkap mata kuliah, waktu, dan ruang kelas untuk mahasiswa kelas TPLE013.
          </p>
        </div>

        {/* Grid */}
        <ScheduleGrid data={schedules} />
      </div>
    </div>
  );
}