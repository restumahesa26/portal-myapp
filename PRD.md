# Product Requirements Document (PRD)

**Project Name:** Personal Apps Portal (My App Hub)
**Target Audience:** Diri Sendiri (Strictly Single User)
**Tech Stack:** Next.js, Firebase (Auth & Firestore), Tailwind CSS
**Status:** Draft

## 1. Latar Belakang & Tujuan
Sebagai developer/kreator yang memiliki banyak *side project* atau website pribadi, seringkali sulit untuk melacak atau mengakses semua URL secara cepat. 

**Tujuan aplikasi ini adalah:** Membuat sebuah *centralized dashboard* (portal) eksklusif yang mengumpulkan semua tautan aplikasi pribadi dalam bentuk *Card* interaktif. Portal ini harus aman (hanya bisa diakses oleh pemilik) dan dilengkapi halaman admin untuk menambah, mengubah, atau menghapus tautan ke aplikasi lain tanpa harus menyentuh kode sumber (hardcode).

## 2. Akses & Keamanan (Crucial)
Karena portal ini hanya untuk pribadi, sistem *gatekeeping* harus sangat ketat.
*   **Authentication:** Hanya menggunakan **Login with Google** (via Firebase Auth). Tidak ada opsi pendaftaran email/password.
*   **Authorization (Email Whitelisting):** Setelah login Google berhasil, sistem (melalui Next.js Middleware atau Firebase Security Rules) akan mencocokkan email yang login dengan email utama Anda (misal: `email.anda@gmail.com`). 
*   **Penolakan:** Jika ada orang lain yang iseng login menggunakan Google mereka, sistem akan langsung menolak akses dan menampilkan halaman "Access Denied / 403 Forbidden".

## 3. Fitur Utama (Core Features)

### 3.1. Halaman Autentikasi (Login Page)
*   **Desain:** Sangat bersih dan minimalis. Hanya menampilkan logo pribadi/inisial, sapaan singkat, dan satu tombol "Sign In with Google".

### 3.2. Halaman Utama Portal (App Launcher)
*   **Tampilan Grid:** Menampilkan daftar aplikasi aktif dalam bentuk *Card* (kartu) yang tersusun secara grid (responsif: 1 kolom di HP, 3-4 kolom di Desktop).
*   **Isi Card:**
    *   Icon / Logo Aplikasi (bisa berupa gambar atau inisial teks).
    *   Judul Aplikasi.
    *   Deskripsi singkat (1-2 baris).
    *   Status Badge (opsional: misal "Production", "WIP", "Beta").
*   **Interaksi:** Mengklik seluruh area Card akan membuka aplikasi tersebut di tab baru (`target="_blank"`).

### 3.3. Halaman Admin (Content Management)
*   **Dashboard Tabel/List:** Menampilkan semua data aplikasi yang ada di database.
*   **CRUD Operations:**
    *   **Create:** Form untuk menambah aplikasi baru (Input: Nama, URL, Deskripsi, Upload Icon/URL Icon, Status Aktif).
    *   **Read:** Menarik data dari Firebase Firestore secara *real-time* atau *Server-Side Rendered*.
    *   **Update:** Mengedit informasi aplikasi jika URL atau namanya berubah.
    *   **Delete:** Menghapus atau sekadar menonaktifkan (*hide*) aplikasi dari halaman utama.
    *   **Sort:** Kemampuan untuk mengatur urutan (drag-and-drop sederhana atau input nomor urut) agar aplikasi favorit berada di atas.

## 4. Panduan Desain (UI/UX - "Not AI Slop")
Untuk menghindari kesan "AI slop" (desain yang terlihat pasaran, terlalu banyak gradien mencolok, ilustrasi 3D generik, atau tata letak berantakan khas template murahan), terapkan prinsip desain profesional berikut:

*   **Tipografi yang Kuat:** Gunakan font Sans-Serif modern dan profesional seperti *Inter*, *Geist*, atau *SF Pro*. Perhatikan *font-weight* (tebal/tipis) untuk membedakan judul dan deskripsi.
*   **Borders & Shadows:** Gunakan border tipis (`border-gray-200` atau `border-white/10` di dark mode) dengan shadow yang sangat halus. Hindari drop shadow yang tebal.
*   **Monochromatic / Minimalist Color Palette:** Gunakan warna dasar netral (Putih/Abu-abu muda untuk Light mode, atau Hitam/Zinc gelap untuk Dark mode). Gunakan satu warna aksen saja (misalnya biru kalem atau hitam pekat) untuk tombol atau status aktif.
*   **Ruang Kosong (White Space):** Berikan padding dan margin yang longgar agar elemen terlihat bernapas dan rapi (*clean aesthetic*).
*   **Micro-interactions:** Efek hover pada *Card* harus halus (misal: kartu sedikit terangkat, atau border berubah warna dengan transisi lambat), bukan animasi yang berlebihan.

## 5. Arsitektur Database (Firebase Firestore)
Hanya membutuhkan satu koleksi utama: `projects` atau `apps`.

**Skema Data (JSON):**
```json
{
  "id": "app_123",
  "title": "Personal To-Do List",
  "description": "Task manager harian dengan sistem Today/Tomorrow.",
  "url": "https://todo.domainanda.com",
  "iconUrl": "https://link-ke-icon.com/icon.png", 
  "order": 1,
  "isActive": true,
  "createdAt": "timestamp"
}
```

## 6. Security Rules Firebase (Contoh Referensi)
Aturan ini mencegah siapa pun kecuali Anda untuk membaca atau menulis ke database.
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /apps/{appId} {
      // Ganti dengan email Google Anda
      allow read, write: if request.auth != null && request.auth.token.email == "email.anda@gmail.com";
    }
  }
}
```