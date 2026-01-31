# 🎓 TPLE013 Class Website

Website resmi kelas **TPLE013** - Universitas Pamulang. Dibangun dengan Next.js 15, React 19, dan TailwindCSS 4.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Direktori](#-struktur-direktori)
- [Penjelasan Folder](#-penjelasan-folder)
- [Cara Menambah Data](#-cara-menambah-data)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)

---

## ✨ Fitur

- 🏠 **Beranda** - Landing page dengan visi misi kelas
- 👥 **Anggota** - Daftar seluruh anggota kelas dengan foto dan peran
- 📁 **Proyek** - Showcase proyek-proyek kelas
- 📅 **Jadwal** - Jadwal kuliah per hari
- ℹ️ **Tentang** - Informasi tentang kelas

---

## 🚀 Cara Menjalankan

### Prasyarat
Pastikan sudah menginstall:
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- npm (sudah termasuk dengan Node.js)

### Langkah-langkah

1. **Clone atau download repository ini**
   ```bash
   git clone https://github.com/tple013/website-kelas.git
   cd website-kelas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka di browser**
   
   Kunjungi [http://localhost:3000](http://localhost:3000)

### Perintah Lainnya

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan mode development |
| `npm run build` | Build untuk production |
| `npm run start` | Jalankan hasil build |
| `npm run lint` | Cek kualitas kode |

---

## 📁 Struktur Direktori

```
website-kelas/
├── public/                     # File statis (gambar, favicon)
├── src/
│   ├── app/                    # Halaman-halaman website
│   │   ├── layout.tsx          # Layout utama (Header + Footer)
│   │   ├── page.tsx            # Halaman Beranda
│   │   ├── globals.css         # Style global
│   │   ├── about/page.tsx      # Halaman Tentang
│   │   ├── members/page.tsx    # Halaman Anggota
│   │   ├── projects/page.tsx   # Halaman Proyek
│   │   ├── schedule/page.tsx   # Halaman Jadwal
│   │   └── api/                # API Routes
│   │       ├── members/route.ts
│   │       ├── projects/route.ts
│   │       └── schedule/route.ts
│   │
│   ├── modules/                # Modul fitur (terpisah per fitur)
│   │   ├── home/               # Modul Beranda
│   │   │   ├── components/     # Komponen khusus home
│   │   │   └── index.ts        # Export modul
│   │   ├── members/            # Modul Anggota
│   │   │   ├── components/     # MemberCard, OfficerCard, dll
│   │   │   ├── hooks/          # useMembers hook
│   │   │   ├── types.ts        # Tipe data Member
│   │   │   ├── data.ts         # Data anggota kelas
│   │   │   └── index.ts
│   │   ├── projects/           # Modul Proyek
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types.ts
│   │   │   ├── data.ts
│   │   │   └── index.ts
│   │   ├── schedule/           # Modul Jadwal
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types.ts
│   │   │   ├── data.ts
│   │   │   └── index.ts
│   │   └── about/              # Modul Tentang
│   │       ├── components/
│   │       └── index.ts
│   │
│   └── shared/                 # Komponen & utilitas bersama
│       ├── components/
│       │   ├── ui/             # Komponen UI dasar
│       │   │   ├── Badge.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Skeleton.tsx
│       │   │   ├── ErrorAlert.tsx
│       │   │   └── index.ts
│       │   └── layout/         # Komponen layout
│       │       ├── Header.tsx
│       │       ├── Footer.tsx
│       │       └── index.ts
│       └── hooks/              # Custom hooks bersama
│           └── useFetch.ts
│
├── package.json                # Dependencies & scripts
├── tsconfig.json               # Konfigurasi TypeScript
├── tailwind.config.ts          # Konfigurasi TailwindCSS
└── next.config.ts              # Konfigurasi Next.js
```

---

## 📖 Penjelasan Folder

### `src/app/` - Halaman Website
Folder ini menggunakan **App Router** dari Next.js. Setiap folder = 1 halaman.

| File/Folder | URL | Fungsi |
|-------------|-----|--------|
| `page.tsx` | `/` | Halaman Beranda |
| `about/page.tsx` | `/about` | Halaman Tentang |
| `members/page.tsx` | `/members` | Halaman Anggota |
| `projects/page.tsx` | `/projects` | Halaman Proyek |
| `schedule/page.tsx` | `/schedule` | Halaman Jadwal |
| `api/*/route.ts` | `/api/*` | API endpoint |

### `src/modules/` - Modul Fitur
Setiap fitur dipisahkan ke folder sendiri agar mudah di-maintain.

```
modules/members/
├── components/       # Komponen UI khusus anggota
│   ├── MemberCard.tsx
│   ├── OfficerCard.tsx
│   └── MembersView.tsx
├── hooks/
│   └── useMembers.ts # Hook untuk fetch data anggota
├── types.ts          # Interface/type untuk Member
├── data.ts           # Data anggota (nama, foto, peran)
└── index.ts          # Export semua untuk kemudahan import
```

### `src/shared/` - Komponen Bersama
Komponen yang digunakan di banyak tempat.

- **`ui/`** - Komponen UI primitif (Badge, Card, Skeleton)
- **`layout/`** - Header dan Footer
- **`hooks/`** - Custom hooks yang bisa dipakai ulang

---

## ✏️ Cara Menambah Data

### Menambah Anggota Baru

Edit file `src/modules/members/data.ts`:

```typescript
export const members: Member[] = [
  // ...anggota lama...
  
  // Tambahkan anggota baru:
  {
    id: 29,
    name: "Nama Lengkap",
    role: "Anggota",
    photo: "/avatars/nama.jpg",  // Taruh foto di public/avatars/
    github: "username-github",   // Opsional
    instagram: "username-ig",    // Opsional
  },
];
```

### Menambah Proyek Baru

Edit file `src/modules/projects/data.ts`:

```typescript
export const projects: Project[] = [
  // ...proyek lama...
  
  {
    id: 5,
    title: "Nama Proyek",
    description: "Deskripsi singkat proyek",
    tech: ["Next.js", "React", "TailwindCSS"],
    status: "ongoing",  // "completed" | "ongoing" | "planned"
    github: "https://github.com/...",
    demo: "https://...",
  },
];
```

### Menambah Jadwal Baru

Edit file `src/modules/schedule/data.ts`:

```typescript
export const schedules: Schedule[] = [
  // ...jadwal lama...
  
  {
    id: 10,
    day: "Jumat",
    subject: "Nama Mata Kuliah",
    time: "08:00 - 10:00",
    room: "Ruang 101",
    lecturer: "Nama Dosen",
  },
];
```

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Next.js](https://nextjs.org/) | 15 | Framework React dengan SSR |
| [React](https://react.dev/) | 19 | Library UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Styling |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | - | Icon library |

---

## 👥 Kontributor

Website ini dibuat oleh Tim Web Dev **TPLE013**.

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan internal kelas TPLE013 - Universitas Pamulang.

---

<p align="center">
  Dibuat dengan ❤️ oleh TPLE013
</p>
