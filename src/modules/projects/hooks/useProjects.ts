"use client";

import { useFetch } from "@/shared/hooks/useFetch";
import type { Project } from "../types";

export function useProjects() {
  return useFetch<Project[]>("/api/projects");
}