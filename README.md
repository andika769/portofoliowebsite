# Portofolio — Andika Putra Wijaya Kusuma

Situs statis (HTML/CSS/JS murni, tanpa build step) siap deploy ke Netlify.

## Isi folder

```
portfolio/
├── index.html      → seluruh konten & struktur halaman
├── style.css        → semua styling
├── script.js         → interaksi (menu mobile, animasi scroll, animasi pulse)
├── netlify.toml       → konfigurasi Netlify
├── images/             → taruh foto proyek kamu di sini (lihat di bawah)
└── README.md
```

## Menambahkan foto & video proyek

Setiap kartu proyek punya **galeri (carousel)** dengan tombol navigasi (‹ ›) dan titik indikator — pengunjung tinggal klik untuk geser antar foto/video. File yang belum ada otomatis "hilang" dari galeri, jadi kamu tidak perlu mengisi semuanya.

Cukup **taruh seluruh folder `images` kamu apa adanya** (semua file di dalamnya, dengan nama file yang sama seperti sekarang) ke dalam folder `portfolio/images/` — situs ini sudah dibuat mengacu langsung ke nama-nama file berikut:

| Proyek                                              | File di `images/`                                                  |
|--------------------------------------------------------|--------------------------------------------------------------------|
| Kamera Termal Pemantau Suhu Tubuh Bayi (Skripsi)          | `SKRIPSI1.jpg`, `SKRIPSI2.png`, `SKRIPSI3.png`, `SKRIPSI4.png`         |
| G-Track — Sepatu Biomedis Analisis Gait                  | `ASB1.jpg`, `ASB2.jpg`, `ASB3.png`                                     |
| Sonicane — Tongkat Pintar Tunanetra                       | `EMSIS1.png`, `EMSIS2.png`, `EMSIS3.png`                                |
| Wrist Orthosis — Rehabilitasi Fraktur                     | `RRM1.png`, `RRM2.jpeg`, `RRM3.jpeg`                                    |
| Alat Prediksi Muscle Aging                                | `RISET1.png`, `RISET2.jpeg`, `RISET3.jpeg`                             |
| Pendeteksi Level Cairan Infus                             | `SISPENG.mp4`                                                          |
| Sistem Keamanan Brankas Elektronik                        | `ELDIGPRAK1.jpeg`, `ELDIGPRAK2.jpeg`, `ELDIGPRAK3.jpeg`                 |
| CareConnect (Aplikasi Kesehatan Android)                  | `CARECONNECT.mp4`                                                       |
| KuBantu (Aplikasi Bantuan Darurat)                        | `KUBANTU.mp4`                                                           |
| Integrasi Sensor Suhu pada Smartphone                     | `ELOG1.png`, `ELOG2.png`                                                |
| Lampu Taman Otomatis                                       | `ELDIG1.png`, `ELDIG2.png`, `ELDIG3.png`                                |
| Sistem Survei Kepuasan Pelanggan                          | *(belum ada foto — kartu tampil kosong/placeholder sampai kamu upload)* |

Kalau nanti mau ganti file atau tambah lebih banyak foto per proyek, buka `index.html`, cari blok `<div class="gallery-track">` pada kartu terkait, lalu tambah/ubah baris `<img src="images/...">` atau `<video src="images/....mp4">` di dalamnya.

**Penting soal ukuran file video:**
- Kalau deploy lewat **drag & drop manual**, Netlify membatasi ukuran per-file sekitar **100 MB**.
- Video mentah dari HP biasanya besar. Supaya cepat loading dan aman batas ukurannya, **kompres dulu** videonya sebelum diupload — target di bawah 20–30 MB per video kalau bisa. Tools gratis: HandBrake (aplikasi desktop) atau situs seperti CloudConvert.
- Kalau tetap besar, alternatif lebih ringan: upload ke YouTube (unlisted juga bisa), nanti tinggal bilang kalau mau diganti ke embed YouTube.

## Cara deploy ke Netlify (paling gampang — drag & drop)

1. Buka https://app.netlify.com dan login/daftar.
2. Pada dashboard, cari area **"Deploy manually"** / **"Add new site" → "Deploy manually"**.
3. Drag & drop **folder `portfolio` ini** (atau isinya) ke area tersebut.
4. Tunggu beberapa detik — Netlify otomatis kasih kamu URL publik seperti `random-name-123.netlify.app`.
5. Selesai. Kamu bisa ganti nama subdomain di **Site settings → Domain management → Options → Edit site name**.

## Cara deploy via Git (kalau mau auto-update tiap kali push)

1. Buat repository baru di GitHub, lalu push folder ini ke sana:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Portofolio pertama"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Di Netlify: **Add new site → Import an existing project → GitHub** → pilih repo tadi.
3. Build command: **kosongkan**. Publish directory: **`.`** (sudah diatur otomatis lewat `netlify.toml`).
4. Klik **Deploy site**.

## Form kontak (sudah otomatis aktif)

Form di bagian "Kontak" sudah pakai atribut `data-netlify="true"`, jadi begitu website online, Netlify otomatis akan menangkap submission-nya — tidak perlu backend atau server tambahan.

Untuk melihat pesan yang masuk: buka **Site settings → Forms** di dashboard Netlify kamu. Kamu juga bisa atur notifikasi email supaya setiap ada pesan baru, kamu langsung dapat email.

## Mengedit konten

Semua teks (proyek, pengalaman, skill) ada langsung di `index.html`, dicari saja bagian yang ingin diubah — tidak ada file data terpisah. Kalau mau ganti warna atau font, semua diatur di bagian paling atas `style.css` pada blok `:root { ... }`.

## Custom domain (opsional)

Kalau nanti punya domain sendiri (misalnya `andikapwk.com`), tinggal ke **Site settings → Domain management → Add a domain** dan ikuti instruksi untuk mengarahkan DNS.
