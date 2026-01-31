import { supabase } from "./supabase";
import type {
  DbMember,
  DbProject,
  DbSchedule,
  MemberInsert,
  MemberUpdate,
  ProjectInsert,
  ProjectUpdate,
  ScheduleInsert,
  ScheduleUpdate,
} from "./types";

// Re-export types untuk kemudahan import
export type { DbMember, DbProject, DbSchedule } from "./types";

// =====================================================
// MEMBERS SERVICE
// =====================================================
export const membersService = {
  async getAll(): Promise<DbMember[]> {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("is_officer", { ascending: false })
      .order("name");

    if (error) throw error;
    return (data as DbMember[]) || [];
  },

  async getById(id: string): Promise<DbMember | null> {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as DbMember;
  },

  async create(member: MemberInsert): Promise<DbMember> {
    const { data, error } = await supabase
      .from("members")
      .insert(member as never)
      .select()
      .single();

    if (error) throw error;
    return data as DbMember;
  },

  async update(id: string, member: MemberUpdate): Promise<DbMember> {
    const { data, error } = await supabase
      .from("members")
      .update(member as never)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as DbMember;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) throw error;
  },
};

// =====================================================
// PROJECTS SERVICE
// =====================================================
export const projectsService = {
  async getAll(): Promise<DbProject[]> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data as DbProject[]) || [];
  },

  async getById(id: string): Promise<DbProject | null> {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as DbProject;
  },

  async create(project: ProjectInsert): Promise<DbProject> {
    const { data, error } = await supabase
      .from("projects")
      .insert(project as never)
      .select()
      .single();

    if (error) throw error;
    return data as DbProject;
  },

  async update(id: string, project: ProjectUpdate): Promise<DbProject> {
    const { data, error } = await supabase
      .from("projects")
      .update(project as never)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as DbProject;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
  },
};

// =====================================================
// SCHEDULES SERVICE
// =====================================================
export const schedulesService = {
  async getAll(): Promise<DbSchedule[]> {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("day")
      .order("time_start");

    if (error) throw error;
    return (data as DbSchedule[]) || [];
  },

  async getById(id: string): Promise<DbSchedule | null> {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as DbSchedule;
  },

  async create(schedule: ScheduleInsert): Promise<DbSchedule> {
    const { data, error } = await supabase
      .from("schedules")
      .insert(schedule as never)
      .select()
      .single();

    if (error) throw error;
    return data as DbSchedule;
  },

  async update(id: string, schedule: ScheduleUpdate): Promise<DbSchedule> {
    const { data, error } = await supabase
      .from("schedules")
      .update(schedule as never)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as DbSchedule;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("schedules").delete().eq("id", id);
    if (error) throw error;
  },
};

// =====================================================
// STORAGE SERVICE
// =====================================================
export const storageService = {
  async uploadAvatar(file: File, fileName: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileNameWithExt = `${fileName}.${fileExt}`;
    const filePath = `avatars/${fileNameWithExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  async deleteAvatar(url: string): Promise<void> {
    // Extract file path from public URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const filePath = `avatars/${fileName}`;

    const { error } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (error) {
      console.warn('Failed to delete avatar:', error);
    }
  },
};
