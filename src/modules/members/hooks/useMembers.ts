"use client";

import { useState, useEffect } from "react";
import type { Member } from "../types";
import { members as membersData } from "../data";

export function useMembers() {
  const [data, setData] = useState<Member[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulasi loading untuk UX yang lebih baik
    const timer = setTimeout(() => {
      setData(membersData);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}