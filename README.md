# 🎓 Website Kelas TPLE013

Website resmi kelas **TPLE013** - Universitas Pamulang.  
Dibangun dengan Next.js 16, React 19, TailwindCSS 4, dan Supabase.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Arsitektur Project](#-arsitektur-project)
- [Flow Aplikasi](#-flow-aplikasi)
- [Struktur Folder](#-struktur-folder)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Cara Menjalankan](#-cara-menjalankan)
- [Environment Variables](#-environment-variables)

---

## ✨ Fitur

### Halaman Publik (Tanpa Login)
| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| 🏠 Beranda | `/` | Landing page dengan hero section dan visi misi |
| 👥 Anggota | `/members` | Daftar anggota kelas dengan foto dan social links |
| 📁 Proyek | `/projects` | Showcase proyek-proyek kelas |
| 📅 Jadwal | `/schedule` | Jadwal kuliah per hari |
| ℹ️ Tentang | `/about` | Informasi tentang kelas |

### Admin Panel (Perlu Login)
| Fitur | Deskripsi | Akses |
|-------|-----------|-------|
| 🔐 Login | Autentikasi dengan email/password | Semua user terdaftar |
| 👥 Kelola Anggota | CRUD data anggota + upload foto | Admin & Member |
| 📁 Kelola Proyek | CRUD data proyek | Admin only |
| 📅 Kelola Jadwal | CRUD jadwal kuliah | Admin only |
| 👤 Kelola Users | Ubah role user (admin/member) | Admin only |

---

## 🏗 Arsitektur Project

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Next.js App Router                    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │  Home   │  │ Members │  │ Projects│  │ Schedule│    │   │
│  │  │  Page   │  │  Page   │  │  Page   │  │  Page   │    │   │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │   │
│  │       │            │            │            │          │   │
│  │  ┌────▼────────────▼────────────▼────────────▼────┐    │   │
│  │  │              MODULES (Views)                    │    │   │
│  │  │   HomeView, MembersView, ProjectsView, etc.    │    │   │
│  │  └────────────────────┬───────────────────────────┘    │   │
│  │                       │                                 │   │
│  │  ┌────────────────────▼───────────────────────────┐    │   │
│  │  │              CUSTOM HOOKS                       │    │   │
│  │  │   useMembersSupabase, useProjectsSupabase, etc │    │   │
│  │  └────────────────────┬───────────────────────────┘    │   │
│  │                       │                                 │   │
│  │  ┌────────────────────▼───────────────────────────┐    │   │
│  │  │              SUPABASE CLIENT                    │    │   │
│  │  │   Auth, Database Queries, Storage              │    │   │
│  │  └────────────────────┬───────────────────────────┘    │   │
│  └───────────────────────┼─────────────────────────────────┘   │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SUPABASE (Backend)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │     Auth     │  │   Database   │  │   Storage    │          │
│  │  (Login/     │  │  (PostgreSQL)│  │  (Avatars)   │          │
│  │   Logout)    │  │              │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ROW LEVEL SECURITY (RLS)                    │   │
│  │   - Public: Read semua data                              │   │
│  │   - Member: CRUD members                                 │   │
│  │   - Admin: CRUD semua tabel + manage users               │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flow Aplikasi

### 1. Flow Halaman Publik

```
User mengakses website
        │
        ▼
┌───────────────────┐
│   Next.js Router  │
│   (app/page.tsx)  │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Module View     │
│   (HomeView.tsx)  │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Custom Hook     │  ◄── Fetch data dari Supabase
│ (useMembersSupabase) │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Supabase Client │  ◄── Query ke database
│   (supabase.ts)   │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Supabase Backend │  ◄── Return data (JSON)
│   (PostgreSQL)    │
└───────────────────┘
```

### 2. Flow Login Admin

```
User akses /admin/login
        │
        ▼
┌───────────────────┐
│  Login Form       │  ◄── Input email & password
│  + Zod Validation │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   AuthContext     │
│   signIn()        │
└────────┬──────────┘
         │
         ▼
┌───────────────────────────────────────┐
│  1. supabase.auth.signInWithPassword  │
│  2. Fetch profile dari tabel profiles │
│  3. Update AuthState                  │
│  4. Redirect ke /admin                │
└───────────────────────────────────────┘
```

### 3. Flow CRUD Admin

```
Admin klik "Tambah Anggota"
        │
        ▼
┌───────────────────┐
│   Modal Form      │
│   + Validation    │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Custom Hook     │
│   addMember()     │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Upload foto ke   │  ◄── Jika ada foto
│  Supabase Storage │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  INSERT ke tabel  │
│  members          │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Refresh data     │  ◄── Otomatis update UI
│  (state update)   │
└───────────────────┘
```

---

## 📁 Struktur Folder

```
src/
├── app/                      # Next.js App Router (Routes)
│   ├── layout.tsx           # Root layout (AuthProvider, Header, Footer)
│   ├── page.tsx             # Home page (/)
│   ├── globals.css          # Global styles
│   ├── members/page.tsx     # Members page (/members)
│   ├── projects/page.tsx    # Projects page (/projects)
│   ├── schedule/page.tsx    # Schedule page (/schedule)
│   ├── about/page.tsx       # About page (/about)
│   └── admin/
│       ├── layout.tsx       # Admin layout (ProtectedRoute)
│       ├── page.tsx         # Admin dashboard (/admin)
│       └── login/page.tsx   # Login page (/admin/login)
│
├── lib/                      # Core Libraries & Services
│   ├── supabase.ts          # Supabase client instance
│   ├── auth.tsx             # AuthContext & AuthProvider
│   ├── types.ts             # TypeScript type definitions
│   ├── validations.ts       # Zod schemas untuk form validation
│   ├── services.ts          # Storage service (upload foto)
│   ├── utils.ts             # Utility functions
│   └── hooks/               # Custom hooks untuk data fetching
│       ├── useMembersSupabase.ts
│       ├── useProjectsSupabase.ts
│       └── useSchedulesSupabase.ts
│
├── modules/                  # Feature Modules
│   ├── home/
│   │   ├── HomeView.tsx     # Main view component
│   │   └── components/      # Sub-components
│   │       ├── HeroSection.tsx
│   │       └── VisionMission.tsx
│   ├── members/
│   │   ├── MembersView.tsx
│   │   └── components/
│   │       ├── MemberCard.tsx
│   │       └── OfficerCard.tsx
│   ├── projects/
│   │   ├── ProjectsView.tsx
│   │   └── components/
│   │       └── ProjectCard.tsx
│   ├── schedule/
│   │   ├── ScheduleView.tsx
│   │   └── components/
│   │       ├── DayCard.tsx
│   │       └── ScheduleGrid.tsx
│   ├── about/
│   │   └── AboutView.tsx
│   └── admin/
│       ├── AdminView.tsx    # Tab container
│       └── components/
│           ├── MembersAdmin.tsx   # CRUD Anggota
│           ├── ProjectsAdmin.tsx  # CRUD Proyek
│           ├── SchedulesAdmin.tsx # CRUD Jadwal
│           └── UsersAdmin.tsx     # Manage Roles
│
└── shared/                   # Shared Components
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx   # Navigation bar
    │   │   └── Footer.tsx   # Footer
    │   ├── ui/              # Reusable UI components
    │   │   ├── Button.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Input.tsx
    │   │   ├── Card.tsx
    │   │   ├── Badge.tsx
    │   │   └── Skeleton.tsx
    │   └── auth/
    │       └── ProtectedRoute.tsx
    └── hooks/
        └── useFetch.ts
```

---

## 🗄 Database Schema

### Tabel: `profiles`
Menyimpan data user yang login (terhubung dengan Supabase Auth)

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (sama dengan auth.users.id) |
| email | text | Email user |
| full_name | text | Nama lengkap |
| avatar_url | text | URL foto profil |
| role | user_role | 'admin' atau 'member' |
| created_at | timestamp | Waktu dibuat |

### Tabel: `members`
Menyimpan data anggota kelas

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Nama anggota |
| photo | text | URL foto |
| description | text | Deskripsi/bio |
| role | text | Jabatan (Ketua, Wakil, dll) |
| is_officer | boolean | Pengurus atau bukan |
| instagram | text | Link Instagram |
| linkedin | text | Link LinkedIn |

### Tabel: `projects`
Menyimpan data proyek kelas

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Judul proyek |
| description | text | Deskripsi |
| image | text | URL gambar |
| status | text | completed/in-progress/planned |
| start_date | date | Tanggal mulai |
| end_date | date | Tanggal selesai |
| team_members | text[] | Array nama anggota tim |
| technologies | text[] | Array teknologi |
| link | text | Link proyek |

### Tabel: `schedules`
Menyimpan jadwal kuliah

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| day | text | Hari (Senin, Selasa, dll) |
| subject | text | Nama mata kuliah |
| time_start | time | Jam mulai |
| time_end | time | Jam selesai |
| room | text | Ruangan |
| lecturer | text | Nama dosen |

---

## 🔐 Authentication Flow

### Konsep Utama

1. **Session TIDAK disimpan** (`persistSession: false`)
   - Refresh halaman = logout otomatis
   - Lebih aman untuk komputer bersama

2. **Role-based Access Control**
   - `admin`: Akses penuh ke semua fitur
   - `member`: Hanya bisa kelola data anggota

### Komponen Auth

```typescript
// src/lib/auth.tsx

// 1. AuthState - Menyimpan status login
interface AuthState {
  user: User | null;        // Data user dari Supabase Auth
  session: Session | null;  // Session token
  profile: Profile | null;  // Data dari tabel profiles (termasuk role)
  isAuthenticated: boolean; // True jika sudah login
}

// 2. AuthContext - Menyediakan fungsi auth ke seluruh app
interface AuthContextType {
  ...AuthState,
  role: UserRole;           // 'admin' | 'member' | null
  signIn(): Promise<...>;   // Fungsi login
  signOut(): Promise<void>; // Fungsi logout
  refreshProfile(): Promise<void>; // Refresh data profile
}
```

### ProtectedRoute

```typescript
// src/shared/components/auth/ProtectedRoute.tsx

// Membungkus halaman yang butuh login
<ProtectedRoute requiredRole="admin">
  <AdminContent />  {/* Hanya tampil jika role === 'admin' */}
</ProtectedRoute>
```

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js 18+
- npm
- Akun Supabase (gratis)

### 1. Clone & Install

```bash
git clone <repo-url>
cd website-kelas
npm install
```

### 2. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com)
2. Jalankan SQL di `supabase-setup.sql` pada SQL Editor
3. Copy URL dan Anon Key dari Project Settings > API

### 3. Environment Variables

Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public API key | `eyJhbGci...` |

**Catatan:** Prefix `NEXT_PUBLIC_` diperlukan agar variabel bisa diakses di browser (client-side).

---

## 📚 Teknologi & Library

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 16 | Framework React dengan App Router |
| React | 19 | UI Library |
| TypeScript | 5 | Static typing |
| TailwindCSS | 4 | Utility-first CSS |
| Supabase | 2.x | Backend (Auth, DB, Storage) |
| Zod | 4.x | Schema validation |
| Bootstrap Icons | 1.x | Icon library |

---

## 🎯 Quick Reference

### Menambah Halaman Baru

1. Buat folder di `src/app/nama-halaman/`
2. Buat `page.tsx` di dalamnya
3. Buat module di `src/modules/nama-halaman/`
4. Import view di page.tsx

### Menambah Custom Hook

1. Buat file di `src/lib/hooks/useNamaHook.ts`
2. Export dari `src/lib/hooks/index.ts`
3. Import dengan `import { useNamaHook } from "@/lib/hooks"`

### Menambah Tabel Database

1. Buat tabel di Supabase Dashboard
2. Tambah type di `src/lib/types.ts`
3. Buat custom hook di `src/lib/hooks/`
4. Setup RLS policy di Supabase

---

## 👥 Kontributor

- TPLE013 - Universitas Pamulang

## 📄 License

MIT License
