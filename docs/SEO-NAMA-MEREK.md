# Supaya situs keluar saat orang mencari "JMN Auto Parts"

Catatan ini menjelaskan kenapa pencarian `jmnautoparts` di Google tidak
memunculkan situs ini, apa yang sudah diperbaiki di kode, dan apa yang **harus
dikerjakan sendiri oleh pemilik** di luar kode. Tanggal pemeriksaan: 3 November
2026.

---

## Apa yang sebenarnya terjadi

Tiga hal, dan hanya satu di antaranya ada di dalam kode.

### 1. Nama "JMN Auto Parts" tidak pernah tertulis di situs ini

Ini penyebab utamanya. Domainnya `jmnautoparts.com`, tetapi sampai hari ini
seluruh isi situs menyebut perusahaan ini **"JMN Parts"** atau
**"PT. Jaya Makmur Nugraha"** — tidak satu kata pun berbunyi "JMN Auto Parts".

Google tidak membaca nama domain sebagai nama merek. Ia mencocokkan kata yang
diketik pengguna dengan kata yang benar-benar ada di halaman. Karena rangkaian
huruf itu tidak ada di mana pun, Google menganggapnya salah ketik dan
mengoreksinya menjadi "jm autoparts" — lalu menampilkan toko lain yang memang
bernama begitu.

### 2. Baru 2 halaman yang terindeks Google

Pemeriksaan `site:jmnautoparts.com` di Google hanya mengembalikan dua hasil:

| Halaman | Status |
|---|---|
| Beranda | terindeks |
| `/products` | terindeks (masih versi `www.`) |
| `/about`, `/contact`, `/blog`, 4 artikel blog | **belum terindeks** |

Semuanya sudah ada di `sitemap.xml` dan `robots.txt` mengizinkan semua. Jadi
masalahnya bukan teknis — Google hanya belum diberi tahu untuk datang.

Cuplikan beranda yang ditampilkan Google juga masih teks lama, artinya Google
terakhir merayapi situs ini cukup lama yang lalu.

### 3. Google Business Profile memakai nama yang berbeda lagi

Profil bisnisnya sudah ada dan muncul di peta:

> **PT. Jaya Makmur Nugraha (Sparepart Dealer Suzuki)**
> Jl. Karang Anyar Permai 55 Blok C1.4 · 0813-1010-8525

Nama di profil itu tidak mengandung "JMN" maupun "Auto Parts". Jadi profil
bisnis pun tidak menolong pencarian nama merek.

---

## Yang sudah diperbaiki di kode

Perubahan ini membuat rangkaian kata "JMN Auto Parts" benar-benar ada di
halaman, di tempat-tempat yang dibaca Google:

- **Judul halaman (`<title>`)** — sekarang diawali "JMN Auto Parts". Ini sinyal
  tunggal terkuat untuk pencarian berdasarkan nama merek.
- **Structured data** — `alternateName` kini berisi daftar: `JMN Auto Parts`,
  `JMN Autoparts`, `JMN Parts`, `JMN`, `Jaya Makmur Nugraha`. Ini cara resmi
  memberi tahu Google bahwa semua nama itu satu perusahaan.
- **Teks halaman About** — "PT. Jaya Makmur Nugraha (JMN Auto Parts)",
  di kelima bahasa.
- **Footer** — nama pendek "JMN Auto Parts" kini tampil di atas nama PT.
- **Alt logo** di navbar dan footer — dari "JMN" menjadi "JMN Auto Parts".
- **Open Graph & Twitter card** — nama situs disamakan.

Nama "JMN Parts" tidak dibuang; ia tetap terdaftar sebagai nama alternatif,
jadi pencarian dengan nama lama tetap cocok.

---

## Yang harus dikerjakan sendiri (ini bagian yang paling menentukan)

Perubahan kode di atas tidak berarti apa-apa sampai Google merayapi ulang
situsnya. Urutannya penting.

### Langkah 1 — Daftarkan situs ke Google Search Console (paling penting)

Tanpa ini, Google merayapi situs sesuka hatinya, bisa berbulan-bulan sekali.

1. Buka <https://search.google.com/search-console>, masuk dengan akun Google.
2. Pilih **Domain** (bukan URL prefix), isi `jmnautoparts.com`.
3. Google akan memberi satu baris kode TXT. Tempel di pengaturan DNS domain
   (di tempat domain dibeli), lalu klik Verify.
4. Setelah terverifikasi, masuk menu **Sitemaps**, isi `sitemap.xml`, Submit.
5. Masuk menu **URL Inspection**, tempel satu per satu alamat ini lalu klik
   **Request indexing**:
   - `https://jmnautoparts.com`
   - `https://jmnautoparts.com/about`
   - `https://jmnautoparts.com/products`
   - `https://jmnautoparts.com/contact`
   - `https://jmnautoparts.com/blog`

Biasanya halaman beranda muncul ulang dalam 1–3 hari setelah request indexing.

### Langkah 2 — Samakan nama di Google Business Profile

Buka profil bisnis yang sudah ada, ubah:

- **Nama bisnis** → kalau papan nama/plang di toko memang bertuliskan
  "JMN Auto Parts", pakai itu. Kalau plangnya "PT. Jaya Makmur Nugraha", jangan
  dipaksakan — Google melarang menambah kata kunci ke nama bisnis dan bisa
  menangguhkan profil. Aman: **"JMN Auto Parts"** kalau itu nama dagang asli.
- **Website** → pastikan terisi `https://jmnautoparts.com` (bukan `www.`).
- **Kategori utama** → Auto parts store.

Profil bisnis yang namanya cocok adalah jalan tercepat agar pencarian
"jmn auto parts jakarta" memunculkan kotak peta dengan nama perusahaan ini.

### Langkah 3 — Tulis nama yang sama di tempat lain

Google memastikan sebuah nama merek itu nyata dengan melihat apakah nama itu
disebut di luar situsnya sendiri. Tulis **"JMN Auto Parts — jmnautoparts.com"**
di:

- Bio Instagram
- Nama/deskripsi toko di marketplace, kalau ada
- Tanda tangan email dan kop invoice
- Direktori bisnis ekspor Indonesia

Setiap penyebutan menambah bukti. Ini pekerjaan lambat tapi berpengaruh besar
untuk pencarian nama merek.

### Langkah 4 — Pastikan deploy jalan lagi

Situs live masih memuat teks lama dan sitemap-nya belum berisi halaman part.
Selama deploy belum nyambung, semua perbaikan di atas tidak sampai ke Google.
Periksa dashboard hosting, bukan kodenya.

---

## Perkiraan waktu

| Kapan | Apa yang terjadi |
|---|---|
| 1–3 hari setelah Langkah 1 | Beranda dirayapi ulang, judul baru muncul di hasil |
| 1–2 minggu | Halaman about/contact/blog mulai terindeks |
| 2–6 minggu | Pencarian "jmn auto parts" mulai memunculkan situs ini |
| 1–3 bulan | Profil bisnis + penyebutan di tempat lain memperkuat posisinya |

Pencarian nama merek adalah jenis pencarian yang paling mudah dimenangkan —
hampir tidak ada yang bersaing untuk kata "jmn auto parts". Yang dibutuhkan
hanya satu hal: Google harus tahu bahwa nama itu ada dan menunjuk ke situs ini.
