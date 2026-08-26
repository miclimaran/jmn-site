# Mengumpulkan Testimoni Asli

Testimoni di `src/components/site/data.ts` saat ini masih **placeholder** —
nama, bengkel, dan perusahaannya karangan. Kartunya menampilkan badge
"Verified Partner", jadi selama isinya masih karangan, section ini sebaiknya
jangan tayang.

Dokumen ini isinya cara mendapatkan yang asli dengan cepat.

---

## Kenapa testimoni terasa palsu (dan cara memperbaikinya)

Yang bikin pembaca curiga bukan kalimatnya kurang bagus — tapi tidak ada satu
pun detail yang bisa dicek.

| Terbaca karangan | Terbaca asli |
| --- | --- |
| "Pelayanannya memuaskan dan responsif." | "Minta 180 pcs lampu belakang Carry, dikirim 3 hari, COO beres tanpa revisi." |
| "Kualitasnya tidak ada tandingannya." | "Awalnya ragu karena harga di atas aftermarket, tapi retur kami turun jauh." |
| "Mitra yang andal untuk perdagangan global." | "Sudah 4 kali FCL ke Port Klang, belum pernah salah part number." |

Tiga bahan yang bikin kredibel:

1. **Angka** — jumlah unit, berapa hari, berapa kali order.
2. **Nama barang spesifik** — part family atau nomor part, bukan "suku cadang".
3. **Tujuan** — kota atau pelabuhan.

Kalimat yang agak berantakan justru lebih dipercaya daripada kalimat marketing
yang rapi. Jangan dipoles habis.

---

## Template minta testimoni (WhatsApp)

### Bahasa Indonesia

> Halo Pak/Bu [Nama], terima kasih sudah beberapa kali order dari JMN.
>
> Kami sedang perbarui website (jmnautoparts.com) dan mau menampilkan
> pengalaman pelanggan yang sebenarnya. Boleh minta tolong 2–3 kalimat soal
> pengalaman order di JMN?
>
> Kalau boleh, sebutkan hal spesifik — misalnya barang apa yang diorder,
> kira-kira berapa banyak, dan kirim ke mana. Itu yang paling membantu calon
> pembeli lain.
>
> Nanti kami tampilkan sebagai: **[Nama depan] — [Jabatan], [Perusahaan],
> [Kota/Negara]**. Kalau lebih nyaman namanya disamarkan (misal "B. S."),
> atau cukup nama perusahaan saja, boleh banget — tinggal bilang.
>
> Terima kasih banyak 🙏

### English

> Hi [Name], thanks for the orders you've placed with JMN.
>
> We're updating our website (jmnautoparts.com) and would like to show real
> customer experiences rather than generic copy. Could you share 2–3 sentences
> about working with us?
>
> If possible, mention something specific — what you ordered, roughly how much,
> and where it shipped. That detail is what helps other buyers most.
>
> We'd display it as: **[First name] — [Role], [Company], [Country]**. If you'd
> prefer initials only, or just the company name, that's completely fine — just
> let me know.
>
> Thank you!

---

## Aturan main

- **Jangan pernah menulis testimoni untuk pelanggan**, lalu minta mereka
  menyetujuinya. Itu tetap kata-kata Anda, bukan kata-kata mereka.
- **Simpan buktinya.** Screenshot chat atau email aslinya, arsipkan. Kalau ada
  yang mempertanyakan, Anda bisa tunjukkan.
- **Minta izin eksplisit** untuk menampilkan nama dan perusahaan. Balasan
  "boleh ditampilkan" di WhatsApp sudah cukup — simpan screenshot-nya.
- **Hormati kalau mereka mau anonim.** "Importir, Tanzania — 3 tahun order"
  masih jauh lebih kuat daripada nama karangan.
- **Jangan terjemahkan lalu poles.** Kalau aslinya bahasa Inggris seadanya,
  biarkan. Tampilkan aslinya, terjemahan boleh di bawahnya.

---

## Cara memasukkan ke website

Setelah dapat balasan, isi di `src/components/site/data.ts`:

```ts
{
  name: "Ahmad R.",                    // sesuai izin yang diberikan
  title_en: "Purchasing, Auto Karya",
  title_id: "Purchasing, Auto Karya",
  country: "Surabaya, Indonesia",
  quote_en: "…kutipan asli, apa adanya…",
  quote_id: "…kutipan asli, apa adanya…",
  context_en: "Repeat buyer — 6 orders since 2024",
  context_id: "Pelanggan berulang — 6 order sejak 2024",
  date: "2026-07",
  verified: true,                      // true HANYA kalau pesan aslinya Anda simpan
},
```

Hapus semua entri placeholder sekaligus. Lebih baik menampilkan **dua**
testimoni asli daripada enam karangan — dua yang asli akan terbaca jujur, dan
itu yang menjual.

---

## Kalau belum ada satu pun

Sementara ini, section testimoni bisa dinonaktifkan di
`src/app/page.tsx` (hapus blok `SectionFrame` dengan `id="testimonials"`).

Bukti lain yang Anda memang punya dan sifatnya faktual bisa dipakai sebagai
gantinya, tanpa mengarang siapa pun:

- Status distributor resmi Suzuki Genuine Parts
- Jumlah negara tujuan ekspor
- Foto gudang dan proses muat (sudah terpasang di section "Our Warehouse")
- Contoh dokumen ekspor dengan data pelanggan disamarkan
