"use client";

import { useProjects } from "./hooks/useProjects";
import { ProjectCard } from "./components/ProjectCard";
import { SkeletonCard } from "@/shared/components/ui/Skeleton";
import { ErrorAlert } from "@/shared/components/ui/ErrorAlert";
import { Badge } from "@/shared/components/ui/Badge";

export function ProjectsView() {
  const { data: projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 min-h-screen">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-1/4 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ErrorAlert message={error.message} />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="info" className="mb-4 uppercase tracking-wider">Portfolio</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Proyek Unggulan</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Hasil karya inovatif dan kolaboratif dari anggota TPLE013 dalam menjawab tantangan teknologi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
}