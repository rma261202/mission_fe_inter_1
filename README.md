
# Mission Frontend Advance - Chill Movie App

Website ini merupakan tugas lanjutan (Mission Advance) untuk membangun aplikasi Movie App yang dinamis menggunakan React, Redux, dan integrasi API.

Fitur yang tersedia (CRUD Lengkap):
- **Create:** Menambah film baru (Modal Form).
- **Read:** Menampilkan daftar film dari API (Redux State Management).
- **Update:** Mengedit data film (Rating, Judul, Poster).
- **Delete:** Menghapus film dari database.

---

## ⚠️ PENTING: Cara Menjalankan (Local Server)

Dikarenakan server **MockAPI sedang mengalami gangguan (Error 503/Down)**, project ini dialihkan menggunakan **JSON Server (Localhost)** agar fitur CRUD tetap berjalan lancar saat penilaian.

Anda memerlukan **2 Terminal** untuk menjalankan aplikasi ini:

### 1. Terminal 1: Menyalakan Backend (Data)
Jalankan perintah ini agar database lokal aktif:
```bash
npx json-server db.json --port 3000

```

*Pastikan terminal ini tetap berjalan (jangan ditutup).*

### 2. Terminal 2: Menyalakan Frontend (React)

Buka terminal baru, lalu jalankan:

```bash
npm install
npm run dev

```

Buka browser di: `http://localhost:5173`

---

## Tech Stack

* React + Vite
* Redux Toolkit (State Management)
* Axios (API Fetching)
* Json-Server (Mock Backend Local)

## Catatan Tambahan

Data film disimpan secara lokal di file `db.json`. Jika ingin mereset data, cukup edit file `db.json` kembali ke format awal.

```

Setelah di-save, jangan lupa kirim ke GitHub:

