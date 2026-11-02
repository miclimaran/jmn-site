# Data & foto yang masih dibutuhkan (redesign 2026-11)

Situs sudah dibangun ulang dengan gaya katalog industri. Semua tempat yang
datanya belum ada **tidak diisi karangan** — di halaman muncul penanda kuning
`[PERLU DATA]`, dan di kode ditandai konstanta `MISSING`.

Urutannya sudah disusun dari yang paling berpengaruh ke penjualan.

---

## A. Empat angka ketentuan dagang (PALING PENTING)

Ini yang ditanyakan importir sebelum order pertama. Tanpa ini, tabel
"Trade terms" di halaman depan masih berlubang empat baris.

| Yang dibutuhkan | Contoh jawaban yang cukup | File |
|---|---|---|
| **MOQ** | "Tidak ada MOQ per part number; minimum USD 1.000 per order" | `src/components/site/tradeTerms.ts` → `moq` |
| **Termin pembayaran** | "T/T 50% di muka, 50% lawan copy B/L" | idem → `payment` |
| **Waktu penawaran** | "24 jam kerja" | idem → `quote` |
| **Lead time** | "Stok: 3–5 hari kerja. Indent: 3–4 minggu" | idem → `lead` |
| **Pelabuhan muat** | kemungkinan "Tanjung Priok, Jakarta (IDTPP)" — tolong konfirmasi | idem → `pol` |

Begitu lima baris ini diisi, penanda `[PERLU DATA]` otomatis hilang.

## B. Foto yang belum ada

| Foto | Dipakai di | Catatan |
|---|---|---|
| **Pemilik / tim** (di kantor atau gudang) | Bagian "The company" | Sekarang masih kotak putus-putus bertanda `[PERLU FOTO]`. Cukup 1 foto, tidak perlu studio. |
| **Surat penunjukan distributor Suzuki** (scan) | Bagian "Our stock and our packing" | Boleh sebagian diburamkan (nomor, nilai kontrak). Ini bukti paling kuat untuk pembeli baru. |
| **Dokumen perusahaan** (NIB / akta / NPWP, scan) | idem | Opsional, tapi menambah kepercayaan. |
| **Foto part satuan** | Halaman `/parts/<nomor>` | Semua 106 halaman part sekarang menampilkan plat "NO PHOTO YET". Taruh file di `public/products/<NOMOR-PART>.jpg`, contoh `public/products/16510-61J00-000.jpg`, dan foto langsung muncul. Mulai dari 10–20 part paling laku saja. |
| **Proses packing & marking** | Galeri | Yang ada sekarang foto rak dan truk. Yang belum: proses mengemas, menempel marking pembeli, menyegel dus. |

## C. Jam kerja

Bagian "Contact" masih `[PERLU DATA]`.
Contoh: "Senin–Jumat 08.30–17.00, Sabtu 08.30–13.00 (WIB, UTC+7)".
File: `src/components/site/homeCopy.ts` → `contact.hours` (lima bahasa).

## D. Cerita perusahaan dari pemilik

Paragraf ketiga di bagian "The company" sengaja dibiarkan kosong. Yang dicari
bukan paragraf perusahaan yang halus, tapi jawaban pendek atas:

1. Siapa yang mendirikan JMN pada Oktober 1989, dan sebelumnya usaha apa?
2. Bagaimana penunjukan distributor Suzuki itu didapat?
3. Satu order yang pernah bermasalah — dan apa yang diubah setelahnya.
4. Pelanggan ekspor pertama (2010): negara mana, barang apa?

Tulis apa adanya dalam bahasa Indonesia; nanti diterjemahkan.

## E. Angka yang DIHAPUS dan belum boleh kembali

Empat klaim ini dicabut dari seluruh situs karena belum pernah dikonfirmasi:

- **12.000+ SKU aktif**
- **22+ negara tujuan ekspor**
- **99,5% akurasi pemenuhan**
- **4 testimoni pelanggan** (Budi Santoso, Ahmad Yani, Rina Wijaya, Adi Nugroho —
  semuanya karangan, dan tampil dengan lencana "Verified Partner")

Boleh dipasang lagi kalau ada buktinya:
- SKU: jumlah baris di pricelist/EPC yang benar-benar aktif.
- Negara: daftar dari dokumen ekspor (COO / B/L) 3 tahun terakhir — ini sekalian
  bisa dipakai untuk bagian "ke mana kami sudah mengirim".
- Akurasi: dasar hitungannya apa (klaim/komplain dibagi baris terkirim).
- Testimoni: pesan atau email asli dari pembeli + izin tertulis. Caranya ada di
  `docs/TESTIMONI.md`.

## F. Katalog lengkap (Excel/CSV)

Situs sekarang punya **106 nomor part** (hanya Suzuki: APV, New Carry, Ertiga,
XL7) dan setiap nomor punya halamannya sendiri di `/parts/<nomor>`.

Kalau ada export pricelist (xlsx/csv) dengan kolom:

```
part_number | nama part | merek | model yang cocok | kategori | superseded number
```

maka halaman per part akan bertambah otomatis sebanyak isinya — ini jalur SEO
paling besar yang masih kosong. Tidak perlu kolom harga.

Juga masih kosong: **superseded number** (nomor pengganti). Barisnya sudah
disiapkan di halaman part dan hanya muncul kalau datanya ada.

## G. Toyota, Daihatsu, Mitsubishi

Logo tiga merek ini ada di bagian "Brands we supply", tapi **belum ada satu pun
nomor part**-nya di katalog. Tolong kirim nomor part asli untuk ketiganya
(cukup 20–30 per merek untuk mulai), supaya filter merek di katalog tidak
mentok ke hasil kosong.

---

## Yang belum dikerjakan di redesign ini

1. **Halaman /about** — baru dibersihkan angkanya; tampilannya masih versi lama
   (hero gelap, animasi scroll, timeline). Belum disesuaikan dengan gaya baru.
2. **Halaman /blog** — belum disentuh.
3. **hreflang EN/ID** — belum dipasang, dan memang belum bisa: hreflang menuntut
   satu URL per bahasa, sedangkan bahasa di situs ini disimpan di cookie
   sehingga semua bahasa memakai URL yang sama. Supaya benar, perlu pindah ke
   `/en/...` dan `/id/...`. Ini pekerjaan tersendiri.
4. **FAQ structured data** — dihapus dari halaman depan karena jawabannya
   memuat angka-angka di bagian E. Bisa dipasang lagi setelah bagian A diisi.
5. **Form RFQ** — sudah bisa menerima lampiran Excel/CSV (maks. 5 MB), tapi
   belum pernah dites kirim sungguhan supaya tidak mengirim email percobaan ke
   kotak masuk Anda. Tolong dites sekali sebelum dipublikasikan.
