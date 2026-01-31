import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validasi environment variables saat build/runtime
if (!supabaseUrl || !supabaseAnonKey) {
  // Di production, throw error jika env tidak ada
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  // Di development, log warning
  console.warn(
    "⚠️ Supabase environment variables not set. Database features will not work."
  );
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);
