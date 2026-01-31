"use client";

import { useState, useEffect } from "react";
import { schedulesService } from "@/lib/services";
import { mapDbToSchedule, type ScheduleItem } from "@/lib/types";

export function useSchedule() {
  const [data, setData] = useState<ScheduleItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSchedules() {
      try {
        setLoading(true);
        const schedules = await schedulesService.getAll();
        setData(schedules.map(mapDbToSchedule));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Gagal memuat jadwal"));
      } finally {
        setLoading(false);
      }
    }

    fetchSchedules();
  }, []);

  return { data, loading, error };
}