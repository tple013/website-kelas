"use client";

import { useState, useEffect } from "react";
import type { Project } from "../types";
import { projects as projectsData } from "../data";

export function useProjects() {
  const [data, setData] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(projectsData);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}