# 📖 Penjelasan Project Website Kelas

Dokumen ini menjelaskan secara detail bagaimana project website kelas bekerja, termasuk arsitektur, flow, dan konsep-konsep yang digunakan.

---

## 📋 Daftar Isi

- [Tujuan Project](#-tujuan-project)
- [Arsitektur](#️-arsitektur)
- [Struktur Folder](#-struktur-folder)
- [Flow Aplikasi](#-flow-aplikasi)
- [Authentication](#-authentication)
- [Database](#️-database)
- [Row Level Security](#-row-level-security-rls)
- [Custom Hooks](#-custom-hooks)
- [UI Components](#-ui-components)
- [Validasi Form](#-validasi-form)
- [State Management](#-state-management)

---

## 🎯 Tujuan Project

Website ini adalah **website resmi kelas TPLE013** yang berfungsi untuk:
- Menampilkan profil anggota kelas
- Showcase proyek-proyek kelas
- Menampilkan jadwal kuliah
- Menyediakan admin panel untuk mengelola data

---

## 🏗️ Arsitektur

### Overview Sederhana

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   USER BROWSER   │────▶│   NEXT.JS APP    │────▶│    SUPABASE      │
│   (Frontend)     │◀────│   (React)        │◀────│   (Backend)      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Penjelasan

| Layer | Teknologi | Fungsi |
|-------|-----------|--------|
| Frontend | Next.js + React | Render UI, handle user interaction |
| Backend | Supabase | Database, Authentication, File Storage |
| Styling | TailwindCSS | Utility-first CSS framework |
| Validation | Zod | Schema validation untuk form |

### Arsitektur Detail

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

## 📂 Struktur Folder

### Overview

```
src/
├── app/          # ROUTING - Next.js App Router
├── lib/          # LOGIC - Semua business logic
├── modules/      # VIEWS - Komponen per fitur/halaman
└── shared/       # REUSABLE - Komponen yang dipakai banyak tempat
```

### Filosofi Struktur

| Folder | Tanggung Jawab | Contoh File |
|--------|----------------|-------------|
| `app/` | Routing & Page layout | `page.tsx`, `layout.tsx` |
| `lib/` | Business logic, API calls, utilities | `supabase.ts`, `auth.tsx` |
| `modules/` | UI per fitur | `HomeView.tsx`, `MembersView.tsx` |
| `shared/` | Komponen reusable | `Button.tsx`, `Modal.tsx` |

### Kenapa Struktur Seperti Ini?

1. **Separation of Concerns**: Tiap folder punya tanggung jawab sendiri
2. **Scalable**: Mudah menambah fitur baru tanpa merusak yang ada
3. **Maintainable**: Mudah dicari dan di-debug
4. **Testable**: Mudah di-test karena logic terpisah dari UI

### Detail Struktur

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
│   │   ├── HomeView.tsx
│   │   └── components/
│   ├── members/
│   │   ├── MembersView.tsx
│   │   └── components/
│   ├── projects/
│   ├── schedule/
│   ├── about/
│   └── admin/
│       ├── AdminView.tsx
│       └── components/
│           ├── MembersAdmin.tsx
│           ├── ProjectsAdmin.tsx
│           ├── SchedulesAdmin.tsx
│           └── UsersAdmin.tsx
│
└── shared/                   # Shared Components
    ├── components/
    │   ├── layout/          # Header, Footer
    │   ├── ui/              # Button, Modal, Input, etc.
    │   └── auth/            # ProtectedRoute
    └── hooks/
        └── useFetch.ts
```

---

## 🔄 Flow Aplikasi

### 1. Flow Halaman Publik (Contoh: /members)

```
1. User ketik: localhost:3000/members
                    │
                    ▼
2. Next.js cari: src/app/members/page.tsx
                    │
                    ▼
3. page.tsx import: MembersView dari src/modules/members/
                    │
                    ▼
4. MembersView panggil: useMembersSupabase() hook
                    │
                    ▼
5. Hook query ke: Supabase database (tabel members)
                    │
                    ▼
6. Data dikembalikan: Array of members
                    │
                    ▼
7. React render: MemberCard untuk setiap member
                    │
                    ▼
8. User lihat: Daftar anggota kelas di browser
```

### Diagram Visual

```
┌───────────────────┐
│   User Browser    │
│   /members        │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Next.js Router  │
│   app/members/    │
│   page.tsx        │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   MembersView     │
│   (Module)        │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ useMembersSupabase│  ◄── Custom Hook
│   (Lib/Hooks)     │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│   Supabase Client │  ◄── Query database
│   (lib/supabase)  │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  Supabase Backend │  ◄── PostgreSQL
│   (Cloud)         │
└───────────────────┘
```

### 2. Flow CRUD Admin

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
│   Zod Validate    │  ◄── Check input valid
└────────┬──────────┘
         │
    ┌────┴────┐
    ▼         ▼
 INVALID    VALID
 (show       │
  error)     ▼
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
        │  Refresh data     │  ◄── Re-fetch dari DB
        │  (state update)   │
        └────────┬──────────┘
                 │
                 ▼
        ┌───────────────────┐
        │  UI Update        │  ◄── Member baru muncul
        │  (React re-render)│
        └───────────────────┘
```

---

## 🔐 Authentication

### Konsep Utama

1. **Session TIDAK disimpan** (`persistSession: false`)
   - Refresh halaman = logout otomatis
   - Lebih aman untuk komputer bersama

2. **Role-based Access Control**
   - `admin`: Akses penuh ke semua fitur
   - `member`: Hanya bisa kelola data anggota

### Flow Login

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

### AuthState Interface

```typescript
interface AuthState {
  user: User | null;        // Data user dari Supabase Auth
  session: Session | null;  // Session token
  profile: Profile | null;  // Data dari tabel profiles (termasuk role)
  isAuthenticated: boolean; // True jika sudah login
}
```

### AuthContext Interface

```typescript
interface AuthContextType {
  // State
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  role: UserRole;           // 'admin' | 'member' | null
  
  // Functions
  signIn(email, password): Promise<{success, error, profile}>;
  signOut(): Promise<void>;
  refreshProfile(): Promise<void>;
}
```

### ProtectedRoute

```typescript
// Cara pakai:
<ProtectedRoute requiredRole="admin">
  <AdminContent />  {/* Hanya tampil jika role === 'admin' */}
</ProtectedRoute>

// Logic di dalam:
if (!isAuthenticated) {
  redirect('/admin/login');
}

if (requiredRole && role !== requiredRole) {
  return <AccessDenied />;
}

return children;
```

---

## 🗄️ Database

### Entity Relationship Diagram

```
┌─────────────────┐
│   auth.users    │  ← Dikelola Supabase Auth (email/password)
│   (Supabase)    │
└────────┬────────┘
         │ id (uuid)
         │
         ▼
┌─────────────────┐
│    profiles     │  ← Data tambahan user (role, nama, dll)
│                 │
│ - id (FK)       │
│ - email         │
│ - full_name     │
│ - role          │  ← admin / member
└─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    members      │  │    projects     │  │   schedules     │
│                 │  │                 │  │                 │
│ - id            │  │ - id            │  │ - id            │
│ - name          │  │ - title         │  │ - day           │
│ - photo         │  │ - description   │  │ - subject       │
│ - is_officer    │  │ - status        │  │ - time_start    │
│ - instagram     │  │ - technologies  │  │ - time_end      │
│ - linkedin      │  │ - team_members  │  │ - room          │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### Tabel profiles

Tabel ini terhubung dengan `auth.users` melalui `id`. Setiap user yang register otomatis punya row di profiles (via trigger).

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key (= auth.users.id) |
| email | text | Email user |
| full_name | text | Nama lengkap |
| avatar_url | text | URL foto profil |
| role | user_role | 'admin' atau 'member' |
| created_at | timestamp | Waktu dibuat |

### Tabel members

Data anggota kelas (berbeda dengan profiles - ini data kelas, bukan user login).

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

### Tabel projects

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

### Tabel schedules

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

## 🔒 Row Level Security (RLS)

### Apa itu RLS?

RLS adalah fitur PostgreSQL yang memungkinkan kita mengontrol akses data per baris (row) berdasarkan kondisi tertentu.

### Policy Matrix

```
┌──────────────────────────────────────────────────────────────┐
│                         RLS POLICIES                          │
├─────────────┬────────────┬────────────┬────────────┬─────────┤
│   Tabel     │   SELECT   │   INSERT   │   UPDATE   │ DELETE  │
├─────────────┼────────────┼────────────┼────────────┼─────────┤
│  members    │  Public ✓  │  Logged in │  Logged in │ Admin   │
│  projects   │  Public ✓  │  Admin     │  Admin     │ Admin   │
│  schedules  │  Public ✓  │  Admin     │  Admin     │ Admin   │
│  profiles   │  Own only  │  Auto      │  Own/Admin │ -       │
└─────────────┴────────────┴────────────┴────────────┴─────────┘
```

### Penjelasan Level Akses

| Level | Artinya |
|-------|---------|
| Public | Siapapun bisa akses (termasuk tanpa login) |
| Logged in | User yang sudah login (admin atau member) |
| Admin | Hanya user dengan role = 'admin' |
| Own only | Hanya bisa akses data milik sendiri |

### Contoh Policy SQL

```sql
-- Public bisa baca semua members
CREATE POLICY "members_select_public" ON members
  FOR SELECT USING (true);

-- Hanya logged in user bisa insert
CREATE POLICY "members_insert_authenticated" ON members
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Hanya admin bisa delete
CREATE POLICY "members_delete_admin" ON members
  FOR DELETE USING (is_admin());
```

---

## 🪝 Custom Hooks

### Kenapa Pakai Custom Hooks?

**Tanpa Hook (Kode duplikat):**

```typescript
// Di MembersPage
function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    supabase.from('members').select('*').then(({ data }) => {
      setMembers(data);
      setLoading(false);
    });
  }, []);
}

// Di AdminMembersPage - KODE YANG SAMA DIULANG!
function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... logic yang sama
}
```

**Dengan Hook (Reusable):**

```typescript
// Hook didefinisikan sekali
function useMembersSupabase() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchMembers = async () => {...};
  const addMember = async (data) => {...};
  const updateMember = async (id, data) => {...};
  const deleteMember = async (id) => {...};
  
  useEffect(() => { fetchMembers(); }, []);
  
  return { members, isLoading, error, addMember, updateMember, deleteMember };
}

// Pakai di mana saja
function MembersPage() {
  const { members, isLoading } = useMembersSupabase();
}

function AdminMembersPage() {
  const { members, addMember, deleteMember } = useMembersSupabase();
}
```

### Keuntungan

1. **DRY (Don't Repeat Yourself)**: Logic ditulis sekali, dipakai berkali-kali
2. **Separation of Concerns**: UI terpisah dari data fetching logic
3. **Testable**: Hook bisa di-test secara independen
4. **Consistent**: Semua komponen pakai logic yang sama

### Daftar Custom Hooks

| Hook | Fungsi |
|------|--------|
| `useMembersSupabase` | CRUD data members |
| `useProjectsSupabase` | CRUD data projects |
| `useSchedulesSupabase` | CRUD data schedules |

---

## 🎨 UI Components

### Kenapa Dibuat Reusable?

**Tanpa komponen reusable:**

```tsx
// Di file A
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
  Simpan
</button>

// Di file B - COPY PASTE!
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
  Tambah
</button>

// Di file C - mau ubah warna? Harus ubah di semua tempat!
```

**Dengan komponen reusable:**

```tsx
// Pakai komponen
<Button>Simpan</Button>
<Button variant="secondary">Batal</Button>
<Button variant="danger">Hapus</Button>
<Button isLoading>Memproses...</Button>

// Mau ubah style? Cukup ubah di Button.tsx
```

### Keuntungan

1. **Consistency**: Styling konsisten di seluruh app
2. **Maintainability**: Ubah di satu tempat, berubah di semua
3. **Readability**: Kode lebih mudah dibaca
4. **Props-based**: Mudah dikustomisasi via props

### Daftar UI Components

| Component | Fungsi |
|-----------|--------|
| `Button` | Tombol dengan variant (primary, secondary, danger, ghost) |
| `Modal` | Dialog popup dengan backdrop |
| `Input` | Input field dengan label dan error |
| `Textarea` | Multi-line input |
| `Select` | Dropdown select |
| `FileInput` | Input untuk upload file |
| `Checkbox` | Checkbox dengan label |
| `Card` | Container dengan styling |
| `Badge` | Label/tag kecil |
| `Skeleton` | Loading placeholder |

---

## 📋 Validasi Form

### Kenapa Pakai Zod?

**Tanpa Zod (Manual validation):**

```typescript
const handleSubmit = () => {
  if (!email) {
    setError("Email wajib diisi");
    return;
  }
  if (!email.includes("@")) {
    setError("Email tidak valid");
    return;
  }
  if (!password) {
    setError("Password wajib diisi");
    return;
  }
  if (password.length < 6) {
    setError("Password minimal 6 karakter");
    return;
  }
  // ... banyak if-else lainnya
};
```

**Dengan Zod (Declarative):**

```typescript
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const handleSubmit = () => {
  const result = loginSchema.safeParse({ email, password });
  
  if (!result.success) {
    setError(result.error.issues[0].message);
    return;
  }
  
  // Data valid, lanjut proses...
};
```

### Keuntungan Zod

1. **Type-safe**: TypeScript types otomatis dari schema
2. **Declarative**: Schema didefinisikan sekali, validasi otomatis
3. **Reusable**: Schema bisa dipakai di frontend dan backend
4. **Detailed errors**: Error message per field

### Daftar Schema

| Schema | Untuk |
|--------|-------|
| `loginSchema` | Form login (email, password) |
| `memberSchema` | Form tambah/edit member |
| `projectSchema` | Form tambah/edit project |
| `scheduleSchema` | Form tambah/edit jadwal |

---

## 🔄 State Management

### Context API

Project ini menggunakan **React Context API** untuk state management global.

```
┌─────────────────────────────────────────────────────────────┐
│                      AuthProvider                            │
│   (Membungkus seluruh app di layout.tsx)                    │
│                                                              │
│   State:                                                     │
│   - user: User | null                                       │
│   - profile: Profile | null                                 │
│   - isAuthenticated: boolean                                │
│                                                              │
│   Functions:                                                 │
│   - signIn(email, password)                                 │
│   - signOut()                                               │
│   - refreshProfile()                                        │
│                                                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │  Header │    │  Admin  │    │ Protected│
   │         │    │  Page   │    │  Route   │
   │ useAuth()│   │ useAuth()│   │ useAuth()│
   └─────────┘    └─────────┘    └─────────┘
```

### Cara Kerja

1. `AuthProvider` membungkus seluruh app di `layout.tsx`
2. State auth disimpan di provider
3. Semua child component bisa akses via `useAuth()` hook
4. Perubahan state otomatis trigger re-render di semua consumer

### Contoh Penggunaan

```typescript
// Di komponen manapun
function MyComponent() {
  const { isAuthenticated, user, role, signOut } = useAuth();
  
  if (!isAuthenticated) {
    return <p>Silakan login</p>;
  }
  
  return (
    <div>
      <p>Halo, {user.email}!</p>
      <p>Role: {role}</p>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

---

## 📚 Referensi

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)
- [React Documentation](https://react.dev)
