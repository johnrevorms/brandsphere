# ARCANUM - Premium Fashion E-Commerce

**ARCANUM** adalah platform *e-commerce* premium yang dikembangkan secara modern menggunakan arsitektur *Decoupled* (Pemisahan antara Frontend dan Backend) untuk memberikan performa maksimal, skalabilitas, dan pengalaman pengguna yang luar biasa. Proyek ini dikembangkan sebagai bagian dari Tugas Akhir.

## 🚀 Teknologi Utama

Sistem ini dibangun dengan memadukan teknologi *web* terkini:

### Frontend
- **React.js & Vite**: *User Interface* yang reaktif dan super cepat.
- **Tailwind CSS**: Desain UI yang responsif, modern, dan mendukung *Dark Mode*.
- **Recharts**: Visualisasi data interaktif untuk grafik analitik Admin.
- **Lucide React**: Ikon SVG yang ringan dan bersih.

### Backend
- **Laravel 11**: *Framework* PHP modern yang tangguh untuk memproses logika bisnis dan RESTful API.
- **MySQL**: Basis data relasional untuk penyimpanan data terstruktur.
- **Midtrans API**: Integrasi gerbang pembayaran (Payment Gateway) otomatis.
- **Sanctum**: Sistem autentikasi token (API Security).

---

## ✨ Fitur Unggulan

1. **Dashboard Admin Komprehensif**
   - Laporan visual analitik tren pendapatan bulanan.
   - Pelacakan stok (*Stock Tracking*) secara *real-time*.
   - Manajemen status pesanan dengan indikator warna (*pending, paid, cancelled*).

2. **Manajemen Dinamis (CRUD)**
   - Manajemen Produk dengan dukungan *upload* gambar.
   - Manajemen Kategori dinamis (mendukung menu *hamburger* otomatis jika lebih dari 5 kategori).
   - Manajemen Kode Promo (*Voucher*) dengan logika *Minimum Quantity*.

3. **Pengalaman Belanja Pengguna**
   - Autentikasi aman (Login/Register).
   - Sistem Keranjang Belanja interaktif (pilih *item*, hitung subtotal, diskon otomatis).
   - *Checkout* instan menggunakan pop-up Midtrans (QRIS, GoPay, Bank Transfer).
   - Pelacakan riwayat pesanan (User Orders).
   - Sistem Ulasan & Penilaian Bintang (*Review & Ratings*).

---

## 🛠️ Instalasi & Pengembangan Lokal

Jika Anda ingin menjalankan proyek ini di lingkungan lokal (Localhost), ikuti langkah berikut:

### 1. Menjalankan Backend (Laravel API)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### 2. Menjalankan Frontend (React/Vite)
```bash
cd frontend
npm install
npm run dev
```
*(Secara otomatis Frontend akan berjalan di `http://localhost:5173` dan terkoneksi ke Backend di `http://localhost:8000`)*

---

## 🔒 Hak Cipta & Lisensi
Dikembangkan oleh **John Revo** untuk keperluan Tugas Akhir. Seluruh aset dan kode sumber merupakan properti intelektual yang telah disesuaikan dengan kebutuhan akademik.
