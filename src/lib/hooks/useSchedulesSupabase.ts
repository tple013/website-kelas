"use client";

import { useState, useEffect, useCallback } from "react";
import { schedulesService } from "@/lib/services";
import type { DbSchedule, ScheduleInsert, ScheduleUpdate } from "@/lib/types";

export function useSchedulesSupabase() {
  const [schedules, setSchedules] = useState<DbSchedule[]>([]);
  const [schedulesByDay, setSchedulesByDay] = useState<Record<string, DbSchedule[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await schedulesService.getAll();
      setSchedules(data);
      
      // Group by day
      const grouped = data.reduce((acc, schedule) => {
        if (!acc[schedule.day]) {
          acc[schedule.day] = [];
        }
        acc[schedule.day].push(schedule);
        return acc;
      }, {} as Record<string, DbSchedule[]>);
      setSchedulesByDay(grouped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat jadwal");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const addSchedule = async (schedule: ScheduleInsert) => {
    await schedulesService.create(schedule);
    await fetchSchedules();
  };

  const updateSchedule = async (id: string, schedule: ScheduleUpdate) => {
    await schedulesService.update(id, schedule);
    await fetchSchedules();
  };

  const deleteSchedule = async (id: string) => {
    await schedulesService.delete(id);
    await fetchSchedules();
  };

  return {
    schedules,
    schedulesByDay,
    isLoading,
    error,
    refetch: fetchSchedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
}
