# Lampiran Laporan Proyek: Brandsphere

Berikut adalah draf isi lampiran yang disesuaikan dengan proyek perangkat lunak **Brandsphere**. Anda dapat menyalin dan melengkapi detail yang masih berupa *placeholder* (di dalam kurung siku `[...]`) sesuai dengan kondisi nyata saat pengembangan proyek.

---

## Lampiran A. Dokumen Proses Pengumpulan *Requirement*

*Bagian ini memuat bukti dan konten selama proses pengumpulan kebutuhan pengguna (requirement gathering). Fokus utama adalah konten interaksi dengan pengguna/klien.*

### 1. Notulensi Wawancara dengan *Stakeholder*
**Tanggal:** [Contoh: 15 Februari 2026]
**Metode:** Wawancara Daring (Zoom Meeting) / Tatap Muka
**Narasumber:** [Nama Pemilik Bisnis / Klien]
**Pewawancara:** [Nama Anda / Tim]

**Daftar Pertanyaan dan Jawaban Utama:**
- **Q:** Apa tujuan utama dari platform Brandsphere ini?
  **A:** Kami ingin sebuah platform terintegrasi di mana pengguna dapat membaca artikel terkait *brand* kami, mengelola keranjang belanja (*cart*), dan melakukan transaksi secara mulus.
- **Q:** Bagaimana ekspektasi alur pengguna untuk melakukan pembelian?
  **A:** Pengguna dapat membaca edukasi produk melalui *Article Detail*, menambahkan produk ke keranjang, dan melakukan *checkout* hingga menuju halaman *Payment Success*.
- **Q:** Apakah ada peran atau hak akses khusus yang dibutuhkan dalam aplikasi?
  **A:** Ya, akan ada pengguna umum (*Customer*) dan *Admin* untuk mengelola data artikel serta melacak aplikasi/pembayaran.

### 2. Kebutuhan Fungsional (Hasil Kesimpulan)
Dari hasil pengumpulan kebutuhan di atas, disepakati beberapa fitur utama sistem:
1. **Navigasi (*Navbar*):** Untuk kemudahan perpindahan halaman.
2. **Fitur Artikel:** Halaman *Article Detail* untuk menampilkan informasi *brand*.
3. **Fitur Keranjang Belanja (*Cart*):** Memungkinkan pengguna menampung pesanan sebelum *checkout*.
4. **Fitur Pembayaran:** Penanganan transaksi hingga ke halaman *Payment Success*.

*(Catatan: Anda dapat menyisipkan foto dokumentasi saat rapat dilakukan atau tautan hasil kuesioner Google Form di bawah ini sebagai bukti tambahan).*

---

## Lampiran B. Link Produk

*Bagian ini memuat tautan menuju repositori pengembangan (source code) dari aplikasi Brandsphere.*

**Repository GitHub Brandsphere**
- **Tautan Repositori:** [https://github.com/username-anda/brandsphere](https://github.com/username-anda/brandsphere)
- **Deskripsi:** Repositori ini memuat *source code* lengkap untuk proyek Brandsphere, yang mencakup pengembangan *frontend* (React.js) dan *backend* (Laravel). 
- **Hak Akses:** *(Pastikan repositori Anda sudah diatur ke status Public, atau sertakan panduan cara meminta akses jika repositori bersifat Private).*

---

## Lampiran C. Dokumen Pengujian

*Bagian ini menggunakan standar form User Acceptance Testing (UAT) / Pengujian Fungsional (Black Box) untuk memastikan fungsionalitas utama Brandsphere berjalan dengan baik.*

### Skenario Pengujian (User Acceptance Testing)
**Nama Sistem:** Brandsphere Web Application
**Tanggal Pengujian:** [Tanggal Pengujian]
**Nama Penguji:** [Nama / Peran Penguji]

| No | Modul / Fitur | Skenario Pengujian | Hasil yang Diharapkan | Status | Catatan |
|----|--------------|-------------------|----------------------|--------|---------|
| 1 | *Navbar* | Mengklik berbagai menu navigasi. | Sistem merespons dan menampilkan halaman yang sesuai tanpa *error*. | [ ] Pass<br>[ ] Fail | |
| 2 | *Article Detail* | Mengakses halaman detail salah satu artikel. | Menampilkan gambar, judul, dan teks artikel secara lengkap. | [ ] Pass<br>[ ] Fail | |
| 3 | *Cart* | Menambahkan item ke *cart* dan mengubah kuantitas. | Sistem menghitung ulang total harga dengan akurat dan menyimpan data *cart*. | [ ] Pass<br>[ ] Fail | |
| 4 | *Payment* | Menyelesaikan proses *checkout* pesanan. | Transaksi diproses ke *backend*, dan sistem mengarahkan ke halaman *Payment Success*. | [ ] Pass<br>[ ] Fail | |
| 5 | *Database* | Memastikan migrasi tabel (misal: *applications*) berjalan. | Data yang diinput melalui *frontend* berhasil tersimpan di *database backend*. | [ ] Pass<br>[ ] Fail | |

**Kesimpulan Pengujian:**
*(Beri tanda centang pada salah satu opsi)*
- [ ] Sistem telah memenuhi seluruh kriteria fungsional dan siap digunakan.
- [ ] Sistem masih memerlukan perbaikan pada fitur dengan status *Fail*.

**Tanda Tangan Penguji:**

<br><br>
*(....................................................)*
**[Nama Terang Penguji]**
