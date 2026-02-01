"use client";

import { useMembers } from "./hooks/useMembers";
import { OfficerCard } from "./components/OfficerCard";
import { MemberCard } from "./components/MemberCard";
import { SkeletonCard } from "@/shared/components/ui/Skeleton";
import { ErrorAlert } from "@/shared/components/ui/ErrorAlert";
import { Badge } from "@/shared/components/ui/Badge";

export function MembersView() {
  const { data: members, loading, error } = useMembers();

  // Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="animate-pulse space-y-12">
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorAlert message={error.message} />
      </div>
    );
  }

  const officers = members?.filter((m) => m.isOfficer) || [];
  const students = members?.filter((m) => !m.isOfficer) || [];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        
        {/* Section: Pengurus */}
        <section className="space-y-10">
          <div className="text-center">
            <Badge variant="info" className="mb-4 uppercase tracking-wider">Struktur Organisasi</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Pengurus Kelas <span className="text-blue-600">TPLE013</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Dedikasi dan kepemimpinan untuk kemajuan bersama.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officers.map((officer) => <OfficerCard key={officer.id} officer={officer} />)}
          </div>
        </section>

        {/* Section: Anggota */}
        <section>
          <div className="flex items-center space-x-4 mb-10">
            <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daftar Anggota Aktif ({students.length})</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {students.map((student) => <MemberCard key={student.id} member={student} />)}
          </div>
        </section>
      </div>
    </div>
  );
}