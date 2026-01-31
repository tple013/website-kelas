# 🔐 Setup Admin Panel dengan Supabase

Panduan lengkap untuk mengaktifkan fitur CRUD dengan autentikasi.

## 📋 Langkah-langkah Setup

### Step 1: Setup Project Supabase

1. Buka **https://supabase.com**
2. Login dengan GitHub
3. Klik **"New Project"**
4. Isi:
   - **Name:** `website-kelas`
   - **Database Password:** (buat password yang kuat)
   - **Region:** Singapore
5. Klik **"Create new project"**
6. Tunggu ~2 menit sampai siap

### Step 2: Buat Tabel Database

1. Buka **SQL Editor** di sidebar Supabase
2. Copy-paste isi file `supabase-setup.sql` dari project ini
3. Klik **"Run"**

### Step 3: Buat User Admin

1. Buka **Authentication** > **Users** di Supabase
2. Klik **"Add User"** > **"Create new user"**
3. Isi:
   - **Email:** email-admin-anda@gmail.com
   - **Password:** password-yang-kuat
4. Klik **"Create User"**

### Step 4: Konfigurasi Environment

1. Buka **Project Settings** > **API** di Supabase
2. Copy **Project URL** dan **anon public key**
3. Edit file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### Step 5: Test Admin Panel

```bash
npm run dev
```

1. Buka **http://localhost:3000/admin**
2. Anda akan diarahkan ke halaman login
3. Login dengan email/password yang dibuat di Step 3
4. Selamat! Anda bisa mengelola data

---

## 🔒 Keamanan

### Row Level Security (RLS)
- ✅ **SELECT (Read):** Siapa saja bisa membaca data (untuk website publik)
- ✅ **INSERT/UPDATE/DELETE:** Hanya user yang login bisa mengubah data

### Protected Routes
- Halaman `/admin` dilindungi dengan autentikasi
- User yang tidak login akan diarahkan ke `/admin/login`

---

## 📱 Cara Menggunakan Admin Panel

### Mengelola Anggota
1. Login ke admin panel
2. Klik tab "Anggota"
3. Klik "Tambah Anggota" untuk menambah
4. Klik icon pensil untuk edit
5. Klik icon sampah untuk hapus

### Mengelola Proyek
1. Klik tab "Proyek"
2. Isi detail proyek (judul, deskripsi, status, dll)
3. Teknologi dipisahkan dengan koma (React, Node.js, dll)

### Mengelola Jadwal
1. Klik tab "Jadwal"
2. Pilih hari dan isi mata kuliah
3. Jadwal otomatis dikelompokkan per hari

---

## 🚀 Deploy ke Production

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di Vercel
3. Tambahkan Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### GitHub Pages

Untuk GitHub Pages, admin panel tidak bisa digunakan karena static export.
Gunakan Vercel atau platform lain yang support server-side.

---

## ❓ Troubleshooting

### "Email atau password salah"
- Pastikan user sudah dibuat di Supabase Authentication
- Pastikan email/password benar

### "Failed to fetch"
- Cek koneksi internet
- Pastikan Supabase URL dan Key benar di `.env.local`
- Restart dev server setelah edit `.env.local`

### Data tidak muncul
- Pastikan sudah menjalankan SQL di `supabase-setup.sql`
- Cek apakah ada error di console browser (F12)
