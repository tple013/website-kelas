// =====================================================
// CENTRALIZED TYPE DEFINITIONS
// Single source of truth untuk semua tipe data
// =====================================================

// Database types (snake_case - sesuai Supabase)
export interface DbMember {
  id: string;
  name: string;
  photo: string | null;
  description: string | null;
  role: string | null;
  is_officer: boolean;
  instagram: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
  created_at: string;
}

export interface DbProject {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  status: "completed" | "in-progress" | "planned";
  start_date: string | null;
  end_date: string | null;
  team_members: string[] | null;
  technologies: string[] | null;
  features: string[] | null;
  link: string | null;
  created_at: string;
}

export interface DbSchedule {
  id: string;
  day: string;
  subject: string;
  time_start: string;
  time_end: string;
  room: string | null;
  lecturer: string | null;
  created_at: string;
}

// Frontend types (camelCase - untuk komponen React)
export interface Member {
  id: string;
  name: string;
  photo: string;
  description: string;
  role?: string;
  isOfficer: boolean;
  instagram?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  features: string[];
  status: "completed" | "in-progress" | "planned";
  teamMembers: string[];
  githubUrl?: string;
}

export interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  subject: string;
  location: string;
  instructor?: string;
}

// Type mappers
export function mapDbToMember(db: DbMember): Member {
  return {
    id: db.id,
    name: db.name,
    photo: db.photo || "",
    description: db.description || "",
    role: db.role || undefined,
    isOfficer: db.is_officer,
    instagram: db.instagram || undefined,
    linkedin: db.linkedin || undefined,
    github: db.github || undefined,
    portfolio: db.portfolio || undefined,
  };
}

export function mapDbToProject(db: DbProject): Project {
  return {
    id: db.id,
    title: db.title,
    description: db.description || "",
    image: db.image || undefined,
    status: db.status,
    teamMembers: db.team_members || [],
    technologies: db.technologies || [],
    features: db.features || [],
    githubUrl: db.link || undefined,
  };
}

export function mapDbToSchedule(db: DbSchedule): ScheduleItem {
  return {
    id: db.id,
    day: db.day,
    subject: db.subject,
    time: `${db.time_start.slice(0, 5)} - ${db.time_end.slice(0, 5)}`,
    location: db.room || "",
    instructor: db.lecturer || undefined,
  };
}

// Insert types (tanpa id dan created_at)
export type MemberInsert = Omit<DbMember, "id" | "created_at">;
export type ProjectInsert = Omit<DbProject, "id" | "created_at">;
export type ScheduleInsert = Omit<DbSchedule, "id" | "created_at">;

// Update types
export type MemberUpdate = Partial<MemberInsert>;
export type ProjectUpdate = Partial<ProjectInsert>;
export type ScheduleUpdate = Partial<ScheduleInsert>;
