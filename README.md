# Aplikasi Sewa Mobil Online Berbasis Android

## Ringkasan Proyek
Proyek ini merupakan sistem **sewa mobil online** yang terdiri dari:
1. **Aplikasi Android (React Native)** untuk pelanggan,
2. **Backend API (Laravel + MySQL)** sebagai layanan utama (autentikasi, katalog, pemesanan, pembayaran, penalti), dan
3. **Panel Admin Web** untuk staf operasional dalam mengelola data dan transaksi.

Aplikasi dirancang untuk membantu pelanggan melakukan proses sewa mobil secara lebih cepat dan terstruktur, sementara admin dapat memonitor serta mengelola data mobil, pesanan, pembayaran, dan penalti.

---

## Fitur Utama

### Pelanggan (Android App)
- **Registrasi & Login**
- **Katalog Mobil**
  - Menampilkan daftar mobil dan detail (spesifikasi, foto, harga)
  - Pencarian/filter dasar
- **Pencarian Ketersediaan Berdasarkan Tanggal**
  - Pengguna memilih tanggal sewa dan tanggal kembali
  - Sistem menampilkan mobil yang tersedia pada periode tersebut
- **Booking/Pemesanan**
  - Membuat pesanan sewa berdasarkan mobil yang tersedia
  - Menampilkan status pesanan
- **Pembayaran Online**
  - Integrasi payment gateway (mis. Midtrans/Xendit) untuk proses pembayaran
- **Riwayat Pesanan**
  - Pengguna dapat melihat daftar/riwayat pesanan beserta detailnya
  - Jika ada, penalti pada pesanan akan ditampilkan pada riwayat/detail

### Admin (Panel Admin Web)
- **Manajemen Mobil**
  - Tambah, ubah, hapus data mobil
- **Manajemen Pesanan**
  - Melihat detail pesanan, mengubah status pesanan (sesuai aturan status)
- **Manajemen Pengguna**
  - Melihat dan mengelola data pengguna terdaftar
- **Manajemen Penalti**
  - Menambahkan penalti pada pesanan (mis. keterlambatan/kerusakan)
  - Data penalti tersimpan dan dapat dilihat pengguna pada riwayat pesanan

---

## Arsitektur Singkat
- **Frontend Mobile**: React Native
- **Backend**: Laravel (REST API)
- **Database**: MySQL
- **Admin Web**: Web-based Admin Panel (terhubung ke API)
- **Integrasi Pihak Ketiga**: Payment Gateway, (opsional) Google Maps API

---

## Alur Bisnis Inti (High-Level)
1. Pengguna registrasi/login
2. Pengguna memilih tanggal sewa dan tanggal kembali
3. Sistem menampilkan mobil yang tersedia pada periode tersebut
4. Pengguna memilih mobil dan membuat booking
5. Pengguna melakukan pembayaran via payment gateway
6. Admin memonitor pesanan dan mengelola status (konfirmasi/batal, dsb.)
7. Jika diperlukan, admin
