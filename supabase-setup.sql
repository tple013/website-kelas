-- =====================================================
-- SUPABASE SETUP SCRIPT
-- Jalankan script ini di Supabase SQL Editor
-- =====================================================

-- 1. Buat Tabel Members (Anggota)
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

-- 2. Buat Tabel Projects (Proyek)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  status TEXT DEFAULT 'ongoing',
  start_date DATE,
  end_date DATE,
  team_members TEXT[],
  technologies TEXT[],
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Buat Tabel Schedules (Jadwal)
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

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public read members" ON members;
DROP POLICY IF EXISTS "Auth manage members" ON members;
DROP POLICY IF EXISTS "Public read projects" ON projects;
DROP POLICY IF EXISTS "Auth manage projects" ON projects;
DROP POLICY IF EXISTS "Public read schedules" ON schedules;
DROP POLICY IF EXISTS "Auth manage schedules" ON schedules;

-- MEMBERS Policies
-- Siapa saja bisa membaca (untuk website publik)
CREATE POLICY "Public read members" ON members
  FOR SELECT USING (true);

-- Hanya user yang login bisa insert/update/delete
CREATE POLICY "Auth insert members" ON members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update members" ON members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete members" ON members
  FOR DELETE USING (auth.role() = 'authenticated');

-- PROJECTS Policies
CREATE POLICY "Public read projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Auth insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- SCHEDULES Policies
CREATE POLICY "Public read schedules" ON schedules
  FOR SELECT USING (true);

CREATE POLICY "Auth insert schedules" ON schedules
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Auth update schedules" ON schedules
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth delete schedules" ON schedules
  FOR DELETE USING (auth.role() = 'authenticated');

-- =====================================================
-- DONE!
-- Selanjutnya buat user admin di:
-- Supabase Dashboard > Authentication > Users > Add User
-- =====================================================
