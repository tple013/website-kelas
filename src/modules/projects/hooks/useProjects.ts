"use client";

import { useState, useEffect } from "react";
import { projectsService } from "@/lib/services";
import { mapDbToProject, type Project } from "@/lib/types";

export function useProjects() {
  const [data, setData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const projects = await projectsService.getAll();
        setData(projects.map(mapDbToProject));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Gagal memuat proyek"));
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { data, loading, error };
}