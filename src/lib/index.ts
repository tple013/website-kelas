// Supabase client
export { supabase } from "./supabase";

// Services
export { membersService, projectsService, schedulesService } from "./services";

// Types
export type {
  // Database types
  DbMember,
  DbProject,
  DbSchedule,
  // Frontend types
  Member,
  Project,
  ScheduleItem,
  // Insert/Update types
  MemberInsert,
  MemberUpdate,
  ProjectInsert,
  ProjectUpdate,
  ScheduleInsert,
  ScheduleUpdate,
} from "./types";

// Type mappers
export { mapDbToMember, mapDbToProject, mapDbToSchedule } from "./types";

// Utils
export { getAssetPath, getAvatarFallback } from "./utils";

// Auth
export { AuthProvider, useAuth } from "./auth";

// Hooks
export { useMembersSupabase } from "./hooks/useMembersSupabase";
export { useProjectsSupabase } from "./hooks/useProjectsSupabase";
export { useSchedulesSupabase } from "./hooks/useSchedulesSupabase";
