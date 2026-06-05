# Panduan Deployment Arcanum Store (cPanel / Shared Hosting)

Halo! Sebagai eksekutor, saya telah menyusun panduan lengkap dan skrip yang Anda butuhkan untuk mendeploy Arcanum Store ke environment production. 

> [!WARNING]
> **PENTING: Masalah Hardcode Localhost di Frontend**
> Sebelum Anda melakukan build, Anda **wajib** mengubah semua URL `http://localhost:8000` yang *hardcoded* di source code React Anda menjadi Environment Variable. Jika tidak, website Anda akan blank (gagal mengambil data) saat diakses di internet. 
> *Jika Anda ingin saya mengubah semua hardcode tersebut secara otomatis di kode Anda sekarang, cukup balas: **"Tolong sekalian refactor kode frontend localhost saya."***

Berikut adalah 4 poin konfigurasi dan skrip yang diminta:

---

## 1. Konfigurasi Environment (`.env`) Backend

Buat file `.env` di folder `/public_html/arcanum-backend` (di server) dengan konfigurasi yang aman untuk produksi.

```ini
APP_NAME=ArcanumStore
APP_ENV=production
APP_KEY=base64:xAT9hXp+++3RXrH21J35/jFLrmj0W2flfMqeFGS2rNs= # (Pastikan sama dengan app_key lokal Anda)
APP_DEBUG=false
APP_URL=https://api.arcanumcloth.com

# Konfigurasi Database cPanel
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=[prefix_cpanel]_revo
DB_USERNAME=[prefix_cpanel]_revo
DB_PASSWORD=password_database_anda

# Konfigurasi Session & CORS
SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_DOMAIN=.arcanumcloth.com

# Integrasi Pihak Ketiga (Ganti dengan API Key Asli)
RAJAONGKIR_API_KEY=kunci_api_rajaongkir_anda

MIDTRANS_SERVER_KEY=Mid-server-kunci_asli_anda
MIDTRANS_CLIENT_KEY=Mid-client-kunci_asli_anda
MIDTRANS_IS_PRODUCTION=true
```

---

## 2. Pengaturan CORS (`config/cors.php`)

Karena frontend dan backend berbeda subdomain, pengaturan CORS ini **sangat vital** agar React bisa mengambil data dari Laravel API tanpa terblokir.

Buka file `config/cors.php` di backend, dan ubah bagian `paths` dan `allowed_origins`:

```php
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    // Mengizinkan semua endpoint API dan rute Sanctum
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // HANYA Izinkan domain utama Arcanum
    'allowed_origins' => [
        'https://arcanumcloth.com',
        'https://www.arcanumcloth.com'
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Set true jika Anda menggunakan autentikasi cookie/Sanctum
    'supports_credentials' => true,
```

---

## 3. Build Script Lokal (Frontend)

Sebelum melakukan build, buat file `.env.production` di folder root frontend Anda:
```ini
VITE_API_BASE_URL=https://api.arcanumcloth.com/api
VITE_STORAGE_URL=https://api.arcanumcloth.com/storage/
```

Setelah kode frontend disesuaikan untuk membaca `.env` tersebut, jalankan urutan perintah berikut di terminal (VS Code):

```bash
# 1. Pastikan semua dependency terinstall
npm install

# 2. Build project untuk production
npm run build
```
Setelah selesai, sebuah folder bernama `dist` akan tercipta. Jadikan seluruh **isi dari folder `dist`** (bukan folder dist-nya) menjadi format ZIP, lalu upload dan ekstrak langsung ke dalam folder `/public_html` di cPanel Anda.

---

## 4. Perintah SSH Server (Backend)

Setelah Anda mengunggah source code backend Laravel (tanpa folder `/vendor` dan `/.git`) ke `/public_html/arcanum-backend`, login ke terminal SSH cPanel Anda dan jalankan perintah berikut secara berurutan:

```bash
# 1. Masuk ke direktori backend
cd public_html/arcanum-backend

# 2. Install dependency khusus produksi (tanpa paket dev)
composer install --optimize-autoloader --no-dev

# 3. Buat symlink agar gambar/aset dari storage bisa diakses publik
php artisan storage:link

# 4. Jalankan migrasi database (opsi --force wajib di production)
php artisan migrate --force

# 5. Optimasi sistem dengan caching (Penting untuk kecepatan)
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

> [!TIP]
> Jika di kemudian hari Anda mengubah isi `.env` atau rute di server, pastikan Anda selalu menjalankan `php artisan config:clear` dan `php artisan route:clear` agar perubahannya terbaca oleh Laravel.
