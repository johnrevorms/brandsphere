# DRAFT PROPOSAL TUGAS AKHIR

**Judul:** Pengembangan Platform Digital B2C: Sinergi E-Commerce dan Sistem Manajemen Konten Terpusat

---

## BAB I PENDAHULUAN

### 1.1 Latar Belakang
Dalam era digitalisasi saat ini, interaksi bisnis dengan konsumen (Business-to-Consumer / B2C) menuntut kehadiran online yang terpadu. Banyak entitas bisnis menghadapi kendala karena menggunakan sistem yang terpisah-pisah untuk menjalankan operasional digital mereka; misalnya, menggunakan satu platform untuk transaksi penjualan (e-commerce), platform lain untuk publikasi profil dan artikel (blog), serta sistem lain untuk rekrutmen pegawai (portal karir).

Pemisahan sistem ini menimbulkan inefisiensi operasional, pengelolaan data yang terfragmentasi (data silos), biaya pemeliharaan server yang berlipat, dan inkonsistensi user experience (UX) bagi pelanggan. Oleh karena itu, diperlukan sebuah solusi berupa platform digital terintegrasi yang mampu menggabungkan fungsi transaksi komersial dan manajemen konten dalam satu pintu untuk mengoptimalkan proses bisnis secara terpusat.

### 1.2 Rumusan Masalah
Berdasarkan latar belakang tersebut, rumusan masalah pada penelitian ini adalah:
1. Bagaimana merancang dan membangun ekosistem digital terpusat yang menggabungkan fitur e-commerce, content management system (CMS), dan manajemen karir dalam satu platform?
2. Bagaimana mengimplementasikan arsitektur *Headless/Decoupled* menggunakan integrasi REST API dari sisi backend (Laravel) ke antarmuka frontend (React.js)?
3. Bagaimana merancang antarmuka sistem yang interaktif dan responsif (Single Page Application) guna meningkatkan kemudahan pengguna dalam mengoperasikan sistem administrasi dan e-commerce?

### 1.3 Batasan Masalah
Agar pembahasan lebih terarah, penelitian ini dibatasi pada hal-hal berikut:
1. Sistem yang dibangun mencakup fungsionalitas E-Commerce (produk, keranjang, pesanan), CMS (halaman dinamis, blog), dan Karir (lowongan kerja dan manajemen pelamar).
2. Pengembangan aplikasi menggunakan bahasa pemrograman PHP dengan *framework* Laravel sebagai backend (penyedia API) dan JavaScript dengan *library* React.js sebagai frontend.
3. Hak akses sistem dibagi menjadi sisi Pengguna Publik (Pelanggan/Pelamar) dan sisi Administrator (Manajemen toko, artikel, dan pelamar).
4. Tidak membahas algoritma enkripsi pembayaran yang kompleks dari pihak bank; pembayaran disimulasikan melalui alur konfirmasi atau *payment gateway* standar.

### 1.4 Tujuan Penelitian
Tujuan dari pelaksanaan penelitian/Tugas Akhir ini adalah:
1. Menghasilkan platform digital terintegrasi yang menyatukan aktivitas penjualan ritel dan pengelolaan konten secara efisien.
2. Menerapkan arsitektur SPA dan API-driven yang *scalable* guna mempercepat respon aplikasi dan mengurangi beban server.
3. Mempermudah administrator dalam mengelola katalog produk, pesanan, artikel blog, dan lamaran pekerjaan melalui satu dasbor terpadu.

### 1.5 Manfaat Penelitian
1. **Bagi Perusahaan/Objek Penelitian:** Mendapatkan sebuah solusi perangkat lunak yang dapat menekan biaya operasional dan menyederhanakan proses manajemen digital dari berbagai sisi.
2. **Bagi Pelanggan/Pengguna:** Memberikan pengalaman bernavigasi dan bertransaksi yang cepat, modern, dan konsisten (One-Stop Digital Platform).
3. **Bagi Peneliti:** Mengaplikasikan ilmu pengembangan perangkat lunak modern (React.js dan Laravel) secara nyata dalam memecahkan masalah sistem informasi skala menengah-besar.

---

## BAB II METODOLOGI PENELITIAN

### 2.1 Metode Pengembangan Sistem
Pengembangan perangkat lunak pada penelitian ini menggunakan model *Agile Development* (atau metode *Waterfall/Iterative* sesuai standar program studi) dengan tahapan:
1. **Requirements Gathering:** Analisis kebutuhan proses bisnis e-commerce dan CMS.
2. **Design:** Perancangan arsitektur *Decoupled*, struktur *database* relasional, rancangan antarmuka (UI/UX) berbasis komponen dengan Tailwind CSS.
3. **Development:** Implementasi kode backend (Laravel API) dan integrasi antarmuka frontend (React.js, Vite).
4. **Testing:** Pengujian sistem (*Blackbox Testing* / *UAT*) terhadap fungsionalitas transaksi, pengelolaan konten, serta responsivitas aplikasi.
5. **Deployment & Maintenance:** Instalasi sistem pada layanan *hosting/cloud*.

### 2.2 Teknologi yang Digunakan
*   **Backend & API:** PHP (Framework Laravel 11+)
*   **Frontend User & Admin:** JavaScript, React.js (dengan Vite)
*   **Styling & UI:** Tailwind CSS, Lucide Icons
*   **Database:** MySQL / PostgreSQL
*   **Architecture:** RESTful API, Single Page Application (SPA)
