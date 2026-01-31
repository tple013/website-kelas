# 🎓 TPLE013 Class Website

Website resmi kelas **TPLE013** - Universitas Pamulang. Dibangun dengan Next.js 16, React 19, TailwindCSS 4, dan Supabase.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Demo](#-demo)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Direktori](#-struktur-direktori)
- [Admin Panel](#-admin-panel)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)

---

## ✨ Fitur

- 🏠 **Beranda** - Landing page dengan visi misi kelas
- 👥 **Anggota** - Daftar seluruh anggota kelas dengan foto dan social links
- 📁 **Proyek** - Showcase proyek-proyek kelas
- 📅 **Jadwal** - Jadwal kuliah per hari
- ℹ️ **Tentang** - Informasi tentang kelas
- 🔐 **Admin Panel** - CRUD untuk mengelola data (protected)
- 🗄️ **Supabase** - Real-time database dengan Row Level Security

---

## 🌐 Demo

Website dapat diakses di: [https://tple013.github.io/website-kelas](https://tple013.github.io/website-kelas)

---

## 🚀 Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18+
- npm (sudah termasuk dengan Node.js)
- Akun [Supabase](https://supabase.com/) (gratis)

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/tple013/website-kelas.git
   cd website-kelas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Buat project baru di [Supabase](https://supabase.com/)
   - Jalankan SQL dari `supabase-setup.sql` di SQL Editor
   - Buat user admin di Authentication > Users

4. **Konfigurasi environment**
   ```bash
   cp .env.example .env.local
   ```
   Isi dengan credentials Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka di browser**: [http://localhost:3000](http://localhost:3000)

### Perintah

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Development mode |
| `npm run build` | Build production |
| `npm run start` | Jalankan build |
| `npm run lint` | Cek kualitas kode |

---

## 📁 Struktur Direktori

```
website-kelas/
├── public/                     # File statis (gambar, favicon)
│   └── avatars/                # Foto anggota
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Layout utama
│   │   ├── page.tsx            # Halaman Beranda
│   │   ├── globals.css         # Style global
│   │   ├── about/              # /about
│   │   ├── members/            # /members
│   │   ├── projects/           # /projects
│   │   ├── schedule/           # /schedule
│   │   └── admin/              # /admin (protected)
│   │       ├── page.tsx        # Admin panel
│   │       ├── login/          # Login page
│   │       └── layout.tsx      # Auth provider
│   │
│   ├── lib/                    # Core utilities
│   │   ├── index.ts            # Barrel exports
│   │   ├── types.ts            # Type definitions
│   │   ├── services.ts         # Supabase CRUD
│   │   ├── supabase.ts         # Supabase client
│   │   ├── auth.tsx            # Auth context
│   │   ├── utils.ts            # Helper functions
│   │   └── hooks/              # Admin hooks
│   │       ├── useMembersSupabase.ts
│   │       ├── useProjectsSupabase.ts
│   │       └── useSchedulesSupabase.ts
│   │
│   ├── modules/                # Feature modules
│   │   ├── admin/              # Admin panel
│   │   │   ├── AdminView.tsx
│   │   │   └── components/
│   │   ├── home/               # Beranda
│   │   │   ├── HomeView.tsx
│   │   │   └── components/
│   │   ├── members/            # Anggota
│   │   │   ├── MembersView.tsx
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── projects/           # Proyek
│   │   │   ├── ProjectsView.tsx
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── schedule/           # Jadwal
│   │   │   ├── ScheduleView.tsx
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   └── about/              # Tentang
│   │       └── AboutView.tsx
│   │
│   └── shared/                 # Shared components
│       └── components/
│           ├── ui/             # Badge, Card, Skeleton, etc.
│           ├── layout/         # Header, Footer
│           └── auth/           # ProtectedRoute
│
├── .env.example                # Template environment
├── supabase-setup.sql          # Database schema
├── ADMIN_SETUP.md              # Panduan admin
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🔐 Admin Panel

### Akses Admin
1. Klik tombol **Admin** di navbar
2. Login dengan email dan password yang sudah dibuat di Supabase

### Role-Based Access Control
Website ini menggunakan sistem role untuk mengatur akses admin panel:

- **Pengurus Kelas (admin)**: Akses penuh ke semua fitur
  - CRUD Anggota
  - CRUD Proyek  
  - CRUD Jadwal
- **Anggota (member)**: Akses terbatas
  - CRUD Anggota saja

### Membuat User Admin
```sql
-- Di Supabase Dashboard > Authentication > Users
-- Klik "Add User" dan isi email + password

-- Setelah user dibuat, update user_metadata untuk set role:
UPDATE auth.users 
SET raw_user_meta_data = '{"role": "admin"}'  -- atau "member"
WHERE email = 'user@example.com';
```

### Fitur Admin
- ✅ **CRUD Anggota** - Tambah, edit, hapus anggota
- ✅ **CRUD Proyek** - Kelola proyek kelas (hanya admin)
- ✅ **CRUD Jadwal** - Atur jadwal kuliah (hanya admin)
- ✅ **User Management** - Kelola role user (hanya admin)
- ✅ **Protected Routes** - Hanya user terautentikasi
- ✅ **Role-Based Access** - Akses berdasarkan role user
- ✅ **Row Level Security** - Data aman di Supabase

---

## 📊 Database Schema

### Members
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | TEXT | Nama anggota |
| photo | TEXT | URL foto |
| description | TEXT | Deskripsi |
| role | TEXT | Jabatan |
| is_officer | BOOLEAN | Pengurus? |
| instagram | TEXT | Link IG |
| linkedin | TEXT | Link LinkedIn |

### Projects
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| title | TEXT | Judul proyek |
| description | TEXT | Deskripsi |
| status | TEXT | completed/in-progress/planned |
| technologies | TEXT[] | Tech stack |
| team_members | TEXT[] | Kontributor |
| link | TEXT | GitHub URL |

### Schedules
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| day | TEXT | Hari |
| subject | TEXT | Mata kuliah |
| time_start | TIME | Jam mulai |
| time_end | TIME | Jam selesai |
| room | TEXT | Ruangan |
| lecturer | TEXT | Dosen |

---

## 🛠️ Teknologi

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Next.js](https://nextjs.org/) | 16 | React Framework |
| [React](https://react.dev/) | 19 | UI Library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type Safety |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Styling |
| [Supabase](https://supabase.com/) | - | Database & Auth |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | - | Icons |

---

## 🏗️ Arsitektur

Project menggunakan arsitektur **Modular Monolith**:

```
┌─────────────────────────────────────────────────┐
│                   Next.js App                    │
├─────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐ │
│  │  Home   │ │ Members │ │Projects │ │Schedule│ │
│  │ Module  │ │ Module  │ │ Module  │ │ Module │ │
│  └────┬────┘ └────┬────┘ └────┬────┘ └───┬───┘ │
│       │           │           │          │      │
│  ┌────┴───────────┴───────────┴──────────┴───┐ │
│  │              Shared Components             │ │
│  │         (UI, Layout, Auth, Hooks)          │ │
│  └────────────────────┬──────────────────────┘ │
│                       │                         │
│  ┌────────────────────┴──────────────────────┐ │
│  │                 lib/                       │ │
│  │    (Types, Services, Supabase, Utils)      │ │
│  └────────────────────┬──────────────────────┘ │
└───────────────────────┼─────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │    Supabase     │
              │  (PostgreSQL)   │
              └─────────────────┘
```

---

## 👥 Kontributor

Website ini dibuat oleh Tim Web Dev **TPLE013**.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan internal kelas TPLE013 - Universitas Pamulang.

---

<p align="center">
  Made with ❤️ by TPLE013
</p>
