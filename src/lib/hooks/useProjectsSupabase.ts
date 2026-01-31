"use client";

import { useState, useEffect, useCallback } from "react";
import { projectsService } from "@/lib/services";
import type { DbProject, ProjectInsert, ProjectUpdate } from "@/lib/types";

export function useProjectsSupabase() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await projectsService.getAll();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat proyek");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const addProject = async (project: ProjectInsert) => {
    await projectsService.create(project);
    await fetchProjects();
  };

  const updateProject = async (id: string, project: ProjectUpdate) => {
    await projectsService.update(id, project);
    await fetchProjects();
  };

  const deleteProject = async (id: string) => {
    await projectsService.delete(id);
    await fetchProjects();
  };

  return {
    projects,
    isLoading,
    error,
    refetch: fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  };
}
