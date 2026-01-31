"use client";

import { useState, useEffect } from "react";
import type { ScheduleItem } from "../types";
import { schedules as scheduleData } from "../data";

export function useSchedule() {
  const [data, setData] = useState<ScheduleItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(scheduleData);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}