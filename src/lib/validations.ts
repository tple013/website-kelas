import { z } from "zod";

// =====================================================
// FILE UPLOAD CONSTANTS
// =====================================================
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
} as const;

// =====================================================
// MEMBER VALIDATION
// =====================================================
export const memberSchema = z.object({
  name: z
    .string()
    .min(2, "Nama minimal 2 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  photo: z
    .string()
    .url("URL foto tidak valid")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
  role: z
    .string()
    .max(50, "Jabatan maksimal 50 karakter")
    .optional()
    .or(z.literal("")),
  is_officer: z.boolean(),
  instagram: z
    .string()
    .refine(
      (val) => !val || val.includes("instagram.com"),
      "URL Instagram tidak valid"
    )
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .refine(
      (val) => !val || val.includes("linkedin.com"),
      "URL LinkedIn tidak valid"
    )
    .optional()
    .or(z.literal("")),
});

export type MemberFormData = z.infer<typeof memberSchema>;

// =====================================================
// PROJECT VALIDATION
// =====================================================
export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Judul minimal 3 karakter")
    .max(100, "Judul maksimal 100 karakter"),
  description: z
    .string()
    .max(1000, "Deskripsi maksimal 1000 karakter")
    .optional()
    .or(z.literal("")),
  image: z
    .string()
    .url("URL gambar tidak valid")
    .optional()
    .or(z.literal("")),
  status: z.enum(["completed", "in-progress", "planned"]),
  start_date: z.string().optional().or(z.literal("")),
  end_date: z.string().optional().or(z.literal("")),
  team_members: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  link: z
    .string()
    .url("URL project tidak valid")
    .optional()
    .or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// =====================================================
// SCHEDULE VALIDATION
// =====================================================
export const scheduleSchema = z.object({
  day: z.string().min(1, "Hari wajib diisi"),
  subject: z.string().min(2, "Mata kuliah minimal 2 karakter"),
  time_start: z.string().min(1, "Waktu mulai wajib diisi"),
  time_end: z.string().min(1, "Waktu selesai wajib diisi"),
  room: z.string().optional().or(z.literal("")),
  lecturer: z.string().optional().or(z.literal("")),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

// =====================================================
// LOGIN VALIDATION
// =====================================================
export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// =====================================================
// FILE VALIDATION HELPER
// =====================================================
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    return {
      valid: false,
      error: `File terlalu besar. Maksimal ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`,
    };
  }

  const allowedTypes: readonly string[] = FILE_UPLOAD.ALLOWED_TYPES;
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Format file tidak didukung. Gunakan: ${FILE_UPLOAD.ALLOWED_EXTENSIONS.join(", ")}`,
    };
  }

  return { valid: true };
}

// =====================================================
// VALIDATION HELPER
// =====================================================
type ValidationSuccess<T> = { success: true; data: T };
type ValidationError = { success: false; errors: Record<string, string> };

export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationSuccess<T> | ValidationError {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  // Map all errors by field name
  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path[0]?.toString() || "form";
    errors[path] = issue.message;
  });
  
  return { success: false, errors };
}
