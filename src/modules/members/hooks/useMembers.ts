"use client";

import { useFetch } from "@/shared/hooks/useFetch";
import type { Member } from "../types";

export function useMembers() {
  return useFetch<Member[]>("/api/members");
}