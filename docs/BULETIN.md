# Buletin Mingguan — Alur Kerja

Satu artikel per minggu di `/blog`. **Tidak ada yang tayang tanpa persetujuan
Anda.**

## Alurnya

1. Setiap Senin, draft ditulis ke `content/blog/<slug>.md` — **tidak di-commit**
2. Anda dapat ringkasannya di chat: judul, isi pokok, sumber yang dipakai
3. Anda baca, minta revisi kalau perlu
4. Baru setelah Anda bilang setuju, di-commit dan di-push

Draft yang belum disetujui aman: file-nya ada di komputer tapi tidak masuk
GitHub, jadi tidak mungkin tayang tanpa sengaja.

## Kenapa mingguan, bukan tiap 2 hari

Permintaan awal tiap 2 hari (±180 halaman/tahun). Itu ditahan karena Google
menyebut pola itu **"scaled content abuse"** — memproduksi banyak halaman
terutama untuk peringkat. Sanksinya penghapusan dari indeks, yaitu kebalikan
dari tujuannya.

Soal AI juga terbalik dari dugaan umum: AI tidak mengutip berdasarkan jumlah
halaman, tapi berdasarkan apakah sumbernya primer dan spesifik. Situs berisi
ratusan tulisan ulang berita terbaca sebagai content farm dan justru lebih
jarang dikutip.

## Aturan isi

**Setiap artikel wajib memuat minimal satu hal yang hanya JMN tahu.** Tanpa itu
artikelnya cuma menulis ulang yang sudah ada di internet, dan tidak ada
alasan bagi siapa pun — manusia atau AI — untuk mengutip jmnautoparts.com
alih-alih sumber aslinya.

Yang hanya JMN punya:

- 37 tahun sebagai distributor resmi Suzuki (sejak Oktober 1989)
- Pengalaman ekspor nyata ke Timur Tengah, Afrika, Asia Tenggara sejak 2010
- Rute, lead time, dan dokumen yang benar-benar dipakai
- Pengetahuan nomor part dan klasifikasi HS dari pekerjaan sehari-hari

**Fakta harus bersumber.** Klaim tentang regulasi, tarif, atau kejadian terkini
wajib diberi tautan sumber. Kalau tidak ketemu sumbernya, tidak ditulis.

**Tidak mengarang.** Tidak ada statistik tanpa sumber, tidak ada kutipan
pelanggan, tidak ada angka yang belum Anda konfirmasi.

## Gambar

Tidak wajib. Kebanyakan artikel cukup dengan tabel dan heading. Kalau perlu
visual, urutannya:

1. Foto gudang yang sudah ada di `public/warehouse/` — sudah ber-watermark
2. Diagram sederhana yang dibuatkan dari kode
3. Baru kalau keduanya tidak cukup, Anda diminta memotret sesuatu yang spesifik

## Antrean topik

Diambil dari atas. Tandai `[x]` kalau sudah terbit.

- [x] Certificate of Origin: form mana untuk negara mana — *terbit 2026-10-27*
- [ ] HS code untuk suku cadang: kesalahan klasifikasi yang paling sering
- [ ] LCL vs FCL untuk order suku cadang — kapan konsolidasi masuk akal
- [ ] Cara membaca nomor part Suzuki dan kenapa sufiks penting
- [ ] Dokumen yang diminta bea cukai di pelabuhan Timur Tengah
- [ ] Genuine vs OEM vs aftermarket — perbedaan yang sering disalahpahami
- [ ] Packing suku cadang bodi untuk pengiriman laut jarak jauh
- [ ] Incoterms untuk pembeli suku cadang: FOB, CIF, DAP dibandingkan
- [ ] Memperkirakan lead time dari Jakarta ke pelabuhan tujuan umum
- [ ] Kenapa nomor part yang sama bisa beda harga antar pemasok

Kalau Anda punya topik yang sering ditanya pembeli, itu kandidat terbaik —
pertanyaan nyata dari pelanggan nyata adalah bahan yang paling mungkin dicari
orang lain juga.

## Teknis

- Artikel: `content/blog/<slug>.md`, frontmatter `title`, `description`,
  `date`, `keywords`
- Structured data `Article` sudah otomatis dari komponen blog
- RSS di `/feed.xml`, terdaftar di `<head>` dan `llms.txt`
- Sitemap otomatis memasukkan artikel baru
