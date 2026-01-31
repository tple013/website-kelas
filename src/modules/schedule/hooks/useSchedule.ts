"use client";

import { useFetch } from "@/shared/hooks/useFetch";
import type { ScheduleItem } from "../types";

export function useSchedule() {
  return useFetch<ScheduleItem[]>("/api/schedule");
}