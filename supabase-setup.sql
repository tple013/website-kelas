-- =====================================================
-- 🚀 SUPABASE SETUP - OPTIMIZED VERSION
-- Website Kelas TPLE013
-- 
-- Jalankan SELURUH script ini di SQL Editor Supabase
-- =====================================================

-- =====================================================
-- BAGIAN 1: HAPUS POLICIES LAMA (RESET)
-- =====================================================

-- Hapus semua policy profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users read own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON profiles;
DROP POLICY IF EXISTS "Admins update profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON profiles;
DROP POLICY IF EXISTS "Anyone authenticated can view own profile" ON profiles;
DROP POLICY IF EXISTS "Allow users to read own profile" ON profiles;
DROP POLICY IF EXISTS "Allow admins to read all" ON profiles;
DROP POLICY IF EXISTS "Allow admins to update all" ON profiles;

-- =====================================================
-- BAGIAN 2: CREATE TABLES
-- =====================================================

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo TEXT,
  description TEXT,
  role TEXT,
  is_officer BOOLEAN DEFAULT false,
  instagram TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  status TEXT DEFAULT 'in-progress' CHECK (status IN ('completed', 'in-progress', 'planned')),
  start_date DATE,
  end_date DATE,
  team_members TEXT[],
  technologies TEXT[],
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL,
  subject TEXT NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  room TEXT,
  lecturer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role enum
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'member');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'member' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast role lookup
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- =====================================================
-- BAGIAN 3: ENABLE RLS
-- =====================================================

ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- BAGIAN 4: TRIGGER AUTO-CREATE PROFILE
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, 'member')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- BAGIAN 5: RLS POLICIES - PROFILES (SIMPLE & FAST)
-- =====================================================

-- Semua authenticated user bisa baca profile sendiri
CREATE POLICY "Select own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Admin bisa baca semua (simple check)
CREATE POLICY "Admin select all"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Admin bisa update semua
CREATE POLICY "Admin update all"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================================================
-- BAGIAN 6: RLS POLICIES - MEMBERS
-- =====================================================

DROP POLICY IF EXISTS "Public can view members" ON members;
DROP POLICY IF EXISTS "Authenticated can insert members" ON members;
DROP POLICY IF EXISTS "Authenticated can update members" ON members;
DROP POLICY IF EXISTS "Authenticated can delete members" ON members;

CREATE POLICY "Public read members"
  ON members FOR SELECT USING (true);

CREATE POLICY "Auth insert members"
  ON members FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Auth update members"
  ON members FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Auth delete members"
  ON members FOR DELETE TO authenticated
  USING (true);

-- =====================================================
-- BAGIAN 7: RLS POLICIES - PROJECTS (Admin only)
-- =====================================================

DROP POLICY IF EXISTS "Public can view projects" ON projects;
DROP POLICY IF EXISTS "Admins can insert projects" ON projects;
DROP POLICY IF EXISTS "Admins can update projects" ON projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON projects;

CREATE POLICY "Public read projects"
  ON projects FOR SELECT USING (true);

CREATE POLICY "Admin insert projects"
  ON projects FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin update projects"
  ON projects FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin delete projects"
  ON projects FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================================================
-- BAGIAN 8: RLS POLICIES - SCHEDULES (Admin only)
-- =====================================================

DROP POLICY IF EXISTS "Public can view schedules" ON schedules;
DROP POLICY IF EXISTS "Admins can insert schedules" ON schedules;
DROP POLICY IF EXISTS "Admins can update schedules" ON schedules;
DROP POLICY IF EXISTS "Admins can delete schedules" ON schedules;

CREATE POLICY "Public read schedules"
  ON schedules FOR SELECT USING (true);

CREATE POLICY "Admin insert schedules"
  ON schedules FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin update schedules"
  ON schedules FOR UPDATE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admin delete schedules"
  ON schedules FOR DELETE TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- =====================================================
-- BAGIAN 9: STORAGE POLICIES
-- Buat bucket 'avatars' di Dashboard > Storage dulu!
-- =====================================================

DROP POLICY IF EXISTS "Public avatar access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete avatars" ON storage.objects;

CREATE POLICY "Avatar public read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Avatar auth upload"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Avatar auth update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Avatar auth delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'avatars');

-- =====================================================
-- BAGIAN 10: SYNC PROFILES & SET ADMIN
-- =====================================================

-- Insert profile untuk user yang belum punya
INSERT INTO profiles (id, email, role)
SELECT id, email, 'member'
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- SET ADMIN - GANTI EMAIL INI!
UPDATE profiles SET role = 'admin' WHERE email = 'psyalbanna@gmail.com';

-- =====================================================
-- VERIFIKASI
-- =====================================================

SELECT '=== PROFILES ===' as info;
SELECT id, email, role FROM profiles;

SELECT '=== POLICIES ===' as info;
SELECT tablename, policyname FROM pg_policies 
WHERE tablename IN ('profiles', 'members', 'projects', 'schedules')
ORDER BY tablename, policyname;
