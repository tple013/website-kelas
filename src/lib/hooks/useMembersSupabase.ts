"use client";

import { useState, useEffect, useCallback } from "react";
import { membersService } from "@/lib/services";
import type { DbMember, MemberInsert, MemberUpdate } from "@/lib/types";

export function useMembersSupabase() {
  const [members, setMembers] = useState<DbMember[]>([]);
  const [officers, setOfficers] = useState<DbMember[]>([]);
  const [regularMembers, setRegularMembers] = useState<DbMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await membersService.getAll();
      setMembers(data);
      setOfficers(data.filter((m) => m.is_officer));
      setRegularMembers(data.filter((m) => !m.is_officer));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat anggota");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const addMember = async (member: MemberInsert) => {
    await membersService.create(member);
    await fetchMembers();
  };

  const updateMember = async (id: string, member: MemberUpdate) => {
    await membersService.update(id, member);
    await fetchMembers();
  };

  const deleteMember = async (id: string) => {
    await membersService.delete(id);
    await fetchMembers();
  };

  return {
    members,
    officers,
    regularMembers,
    isLoading,
    error,
    refetch: fetchMembers,
    addMember,
    updateMember,
    deleteMember,
  };
}
