"use client";

import { useState, useEffect } from "react";
import { membersService } from "@/lib/services";
import { mapDbToMember, type Member } from "@/lib/types";

export function useMembers() {
  const [data, setData] = useState<Member[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setLoading(true);
        const members = await membersService.getAll();
        setData(members.map(mapDbToMember));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Gagal memuat anggota"));
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return { data, loading, error };
}