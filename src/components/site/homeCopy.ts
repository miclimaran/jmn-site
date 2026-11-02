import type { Lang } from "@/lib/i18n";

/**
 * Homepage prose, one object per language.
 *
 * Same split as aboutCopy.ts: Lang.tsx holds short reusable UI words, this file
 * holds the sentences. Keeping a section's copy together is what makes it
 * possible to read the page as a page rather than as forty scalar keys.
 *
 * RULES THIS FILE FOLLOWS — please keep them:
 *   1. Every number here must be one the owner has confirmed. The confirmed set
 *      is: founded October 1989, appointed an authorized Suzuki Genuine Parts
 *      distributor the same month, first export 2010, multi-brand from 2015,
 *      led by Solaiman Limaran. Nothing else.
 *   2. Anything not confirmed is written as `MISSING` and renders as a visible
 *      [PERLU DATA] marker. Do not replace a marker with a plausible figure —
 *      replace it with the real one or delete the sentence.
 *   3. No superlatives. "Trusted", "premium", "seamless", "one-stop" and
 *      "elevate" are banned on this site; so is any claim a buyer cannot check.
 *
 * ⚠️  Vietnamese, Arabic and Thai are careful translations, not native reviews —
 *     the same caveat as aboutCopy.ts. English and Indonesian are the two the
 *     owner can verify directly.
 */

/** Marker token. Rendered by <Missing> as a highlighted [PERLU DATA: …]. */
export const MISSING = "@@";

/** Replaces `{token}` placeholders; leaves unknown tokens visible on purpose. */
export function fillCopy(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in vars ? String(vars[key]) : whole,
  );
}

export type Step = { title: string; body: string };

export type TermRow = {
  /** Lookup key into TRADE_TERMS for the value column. */
  key: TermKey;
  label: string;
};

export type TermKey =
  | "moq"
  | "incoterms"
  | "payment"
  | "quote"
  | "lead"
  | "freight"
  | "pol"
  | "docs";

export type HomeCopy = {
  hero: {
    eyebrow: string;
    h1: string;
    body: string;
    searchLabel: string;
    searchPlaceholder: string;
    searchButton: string;
    rfq: string;
    whatsapp: string;
    note: string;
  };
  order: {
    title: string;
    lead: string;
    steps: [Step, Step, Step, Step];
  };
  terms: {
    title: string;
    lead: string;
    colItem: string;
    colDetail: string;
    rows: TermRow[];
    note: string;
  };
  brands: {
    title: string;
    lead: string;
    disclaimer: string;
    catsTitle: string;
    catsLead: string;
    modelsTitle: string;
    openCatalog: string;
  };
  proof: {
    title: string;
    lead: string;
    note: string;
    docsTitle: string;
    docsBody: string;
  };
  story: {
    title: string;
    paras: string[];
    role: string;
  };
  contact: {
    title: string;
    lead: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    hoursLabel: string;
    hours: string;
    mapLink: string;
    vcard: string;
  };
  rfq: {
    title: string;
    lead: string;
    name: string;
    email: string;
    company: string;
    destination: string;
    destinationPlaceholder: string;
    incoterms: string;
    lines: string;
    linesPlaceholder: string;
    file: string;
    fileHint: string;
    submit: string;
    sending: string;
    sentTitle: string;
    sentBody: string;
    sentAgain: string;
    orWhatsapp: string;
    fileTooBig: string;
    fileWrongType: string;
  };
  /** /parts/[partNumber] — one page per part number. */
  part: {
    home: string;
    catalog: string;
    /** `{brand}`, `{name}`, `{models}` are filled in per part. */
    lead: string;
    labelPartNumber: string;
    labelBrand: string;
    labelName: string;
    labelFits: string;
    labelCategory: string;
    labelSuperseded: string;
    labelStock: string;
    stockAsk: string;
    labelShippedFrom: string;
    shippedFrom: string;
    addToRfq: string;
    added: string;
    askWhatsapp: string;
    openRfq: string;
    related: string;
    noPhoto: string;
    notListed: string;
  };
};

const en: HomeCopy = {
  hero: {
    eyebrow: "Authorized Suzuki Genuine Parts distributor · Jakarta · since October 1989",
    h1: "Send us your part number list. You get stock, price and lead time line by line.",
    body: "PT. Jaya Makmur Nugraha has distributed Suzuki Genuine Parts from Jakarta since October 1989. We also supply Toyota, Daihatsu and Mitsubishi parts, and we pack and document them for export.",
    searchLabel: "Look up a part number",
    searchPlaceholder: "16510-61A21-000",
    searchButton: "Look up",
    rfq: "Send RFQ",
    whatsapp: "WhatsApp",
    note: "The catalog on this site is a sample. If a number is not here, send the list anyway — most of what we stock is not published.",
  },
  order: {
    title: "How to order",
    lead: "Four steps. The same four for a trial box and for a full container.",
    steps: [
      {
        title: "Send the list",
        body: "Part numbers and quantities, destination port, and the Incoterms you work with. Excel, CSV or plain text in an email — whatever you already have.",
      },
      {
        title: "Get the quote",
        body: `We check every line against stock and reply within ${MISSING} hours on working days. Lines we do not hold are marked, not silently dropped.`,
      },
      {
        title: "Proforma Invoice and payment",
        body: `We issue a PI with prices, weights and carton count. Payment terms: ${MISSING}.`,
      },
      {
        title: "Packing and shipping",
        body: "Parts stay in their original cartons, boxed and marked for your mark. You get the Proforma Invoice, Packing List, Certificate of Origin and Bill of Lading.",
      },
    ],
  },
  terms: {
    title: "Trade terms",
    lead: "What a buyer usually asks before the first order.",
    colItem: "Item",
    colDetail: "Detail",
    rows: [
      { key: "moq", label: "Minimum order" },
      { key: "incoterms", label: "Incoterms" },
      { key: "payment", label: "Payment" },
      { key: "quote", label: "Quote turnaround" },
      { key: "lead", label: "Lead time" },
      { key: "freight", label: "Freight" },
      { key: "pol", label: "Port of loading" },
      { key: "docs", label: "Export documents" },
    ],
    note: "Terms are agreed per order and written on the Proforma Invoice.",
  },
  brands: {
    title: "Brands we supply",
    lead: "Genuine parts, in the manufacturer's own cartons.",
    disclaimer:
      "JMN is an appointed distributor of Suzuki Genuine Parts. Toyota, Daihatsu and Mitsubishi parts are supplied from our own stock — the logos above are the brands we sell, not an endorsement of JMN by those companies.",
    catsTitle: "Part categories",
    catsLead: "Counted from the part numbers published on this site.",
    modelsTitle: "Models in the published catalog",
    openCatalog: "Open the catalog",
  },
  proof: {
    title: "Our stock and our packing",
    lead: "Photographs from our own warehouse in Jakarta, unretouched. Open one and zoom in: the carton labels, part numbers and batch stickers are readable.",
    note: "No stock photography anywhere on this site.",
    docsTitle: "Distributor appointment and certificates",
    docsBody: `Scans of the Suzuki distributor appointment letter and company documents belong here, so a new buyer can check them before the first payment: ${MISSING}.`,
  },
  story: {
    title: "The company",
    paras: [
      "We opened in Karang Anyar, Central Jakarta, in October 1989, and were appointed an authorized distributor of Suzuki Genuine Parts the same month. The first customers were workshops and fleet owners around the city.",
      "In 2010 we shipped the first order abroad. In 2015 we added Toyota, Daihatsu and Mitsubishi, so a buyer could put several brands in one container instead of chasing three suppliers.",
      `What the first three decades were actually like — who started the company, how it got the Suzuki appointment, the orders that went wrong and what we changed — is worth telling in the owner's own words: ${MISSING}.`,
    ],
    role: "President Director",
  },
  contact: {
    title: "Contact",
    lead: "Jakarta time, UTC+7. Write in English or Indonesian.",
    emailLabel: "Email",
    phoneLabel: "WhatsApp",
    addressLabel: "Warehouse and office",
    hoursLabel: "Working hours",
    hours: MISSING,
    mapLink: "Open in Google Maps",
    vcard: "Download contact card (.vcf)",
  },
  rfq: {
    title: "Request for quotation",
    lead: "Paste your list or attach the file you already have. One reply, line by line.",
    name: "Your name",
    email: "Email",
    company: "Company",
    destination: "Destination port or city",
    destinationPlaceholder: "Manila, Philippines",
    incoterms: "Incoterms",
    lines: "Part numbers and quantities",
    linesPlaceholder: "16510-61A21-000  x 200\n17700-61M00-000  x 50",
    file: "Attach Excel or CSV",
    fileHint: "XLSX, XLS or CSV, up to 5 MB. Optional.",
    submit: "Send RFQ",
    sending: "Sending",
    sentTitle: "RFQ received",
    sentBody: "We have it. The reply goes to",
    sentAgain: "Send another",
    orWhatsapp: "Rather send it on WhatsApp?",
    fileTooBig: "That file is larger than 5 MB. Email it to us instead.",
    fileWrongType: "Attach an XLSX, XLS or CSV file.",
  },
  part: {
    home: "Home",
    catalog: "Catalog",
    lead: "{brand} genuine {name} for {models}. Supplied from our Jakarta warehouse in the manufacturer's carton, with export documents.",
    labelPartNumber: "Part number",
    labelBrand: "Brand",
    labelName: "Part name",
    labelFits: "Fits",
    labelCategory: "Category",
    labelSuperseded: "Superseded by",
    labelStock: "Stock",
    stockAsk: "Confirmed per RFQ — ask for today's quantity",
    labelShippedFrom: "Shipped from",
    shippedFrom: "Jakarta, Indonesia",
    addToRfq: "Add to RFQ",
    added: "Added to RFQ",
    askWhatsapp: "Ask on WhatsApp",
    openRfq: "Open the RFQ form",
    related: "Other parts for the same models",
    noPhoto: "No photograph of this part yet",
    notListed: "Need a number that is not on this site? Send the list — most of our stock is unpublished.",
  },
};

const id: HomeCopy = {
  hero: {
    eyebrow: "Distributor resmi Suzuki Genuine Parts · Jakarta · sejak Oktober 1989",
    h1: "Kirim daftar nomor part Anda. Kami balas stok, harga, dan lead time per baris.",
    body: "PT. Jaya Makmur Nugraha mendistribusikan Suzuki Genuine Parts dari Jakarta sejak Oktober 1989. Kami juga memasok part Toyota, Daihatsu, dan Mitsubishi, serta mengemas dan melengkapi dokumennya untuk ekspor.",
    searchLabel: "Cari nomor part",
    searchPlaceholder: "16510-61A21-000",
    searchButton: "Cari",
    rfq: "Kirim RFQ",
    whatsapp: "WhatsApp",
    note: "Katalog di situs ini hanya sebagian. Kalau nomornya tidak ada, kirim saja daftarnya — sebagian besar stok kami tidak ditampilkan.",
  },
  order: {
    title: "Cara order",
    lead: "Empat langkah. Sama untuk satu dus percobaan maupun satu kontainer penuh.",
    steps: [
      {
        title: "Kirim daftarnya",
        body: "Nomor part dan kuantitas, pelabuhan tujuan, dan Incoterms yang Anda pakai. Excel, CSV, atau teks biasa di email — pakai yang sudah ada.",
      },
      {
        title: "Terima penawaran",
        body: `Setiap baris kami cek ke stok dan kami balas dalam ${MISSING} jam pada hari kerja. Baris yang tidak kami pegang kami tandai, bukan kami hilangkan.`,
      },
      {
        title: "Proforma Invoice dan pembayaran",
        body: `Kami terbitkan PI berisi harga, berat, dan jumlah dus. Termin pembayaran: ${MISSING}.`,
      },
      {
        title: "Packing dan pengiriman",
        body: "Part tetap dalam dus aslinya, dikemas dan ditandai sesuai marking Anda. Anda menerima Proforma Invoice, Packing List, Certificate of Origin, dan Bill of Lading.",
      },
    ],
  },
  terms: {
    title: "Ketentuan dagang",
    lead: "Hal yang biasanya ditanyakan pembeli sebelum order pertama.",
    colItem: "Item",
    colDetail: "Keterangan",
    rows: [
      { key: "moq", label: "Minimum order" },
      { key: "incoterms", label: "Incoterms" },
      { key: "payment", label: "Pembayaran" },
      { key: "quote", label: "Waktu penawaran" },
      { key: "lead", label: "Lead time" },
      { key: "freight", label: "Pengangkutan" },
      { key: "pol", label: "Pelabuhan muat" },
      { key: "docs", label: "Dokumen ekspor" },
    ],
    note: "Ketentuan disepakati per order dan dituliskan di Proforma Invoice.",
  },
  brands: {
    title: "Merek yang kami pasok",
    lead: "Part asli, dalam dus pabrikannya sendiri.",
    disclaimer:
      "JMN adalah distributor yang ditunjuk untuk Suzuki Genuine Parts. Part Toyota, Daihatsu, dan Mitsubishi kami pasok dari stok kami sendiri — logo di atas adalah merek yang kami jual, bukan dukungan dari perusahaan tersebut terhadap JMN.",
    catsTitle: "Kategori part",
    catsLead: "Dihitung dari nomor part yang ditampilkan di situs ini.",
    modelsTitle: "Model dalam katalog yang ditampilkan",
    openCatalog: "Buka katalog",
  },
  proof: {
    title: "Stok dan packing kami",
    lead: "Foto asli dari gudang kami sendiri di Jakarta, tanpa rekayasa. Buka salah satu dan perbesar: label dus, nomor part, dan stiker batch terbaca.",
    note: "Tidak ada satu pun foto stok di situs ini.",
    docsTitle: "Surat penunjukan distributor dan sertifikat",
    docsBody: `Scan surat penunjukan distributor Suzuki dan dokumen perusahaan seharusnya ada di sini, supaya pembeli baru bisa memeriksanya sebelum pembayaran pertama: ${MISSING}.`,
  },
  story: {
    title: "Tentang perusahaan",
    paras: [
      "Kami mulai di Karang Anyar, Jakarta Pusat, pada Oktober 1989, dan ditunjuk sebagai distributor resmi Suzuki Genuine Parts pada bulan yang sama. Pelanggan pertama kami adalah bengkel dan pemilik armada di sekitar Jakarta.",
      "Tahun 2010 kami mengirim order pertama ke luar negeri. Tahun 2015 kami menambah Toyota, Daihatsu, dan Mitsubishi, supaya pembeli bisa menggabungkan beberapa merek dalam satu kontainer, bukan mengejar tiga pemasok.",
      `Bagaimana sebenarnya tiga dekade pertama itu — siapa yang mendirikan, bagaimana penunjukan Suzuki didapat, order yang pernah bermasalah dan apa yang kami perbaiki — lebih baik diceritakan dengan kata-kata pemiliknya sendiri: ${MISSING}.`,
    ],
    role: "Direktur Utama",
  },
  contact: {
    title: "Kontak",
    lead: "Waktu Jakarta, UTC+7. Silakan tulis dalam bahasa Inggris atau Indonesia.",
    emailLabel: "Email",
    phoneLabel: "WhatsApp",
    addressLabel: "Gudang dan kantor",
    hoursLabel: "Jam kerja",
    hours: MISSING,
    mapLink: "Buka di Google Maps",
    vcard: "Unduh kartu kontak (.vcf)",
  },
  rfq: {
    title: "Permintaan penawaran",
    lead: "Tempel daftarnya atau lampirkan file yang sudah Anda punya. Satu balasan, per baris.",
    name: "Nama Anda",
    email: "Email",
    company: "Perusahaan",
    destination: "Pelabuhan atau kota tujuan",
    destinationPlaceholder: "Manila, Filipina",
    incoterms: "Incoterms",
    lines: "Nomor part dan kuantitas",
    linesPlaceholder: "16510-61A21-000  x 200\n17700-61M00-000  x 50",
    file: "Lampirkan Excel atau CSV",
    fileHint: "XLSX, XLS, atau CSV, maksimal 5 MB. Opsional.",
    submit: "Kirim RFQ",
    sending: "Mengirim",
    sentTitle: "RFQ diterima",
    sentBody: "Sudah masuk. Balasan dikirim ke",
    sentAgain: "Kirim lagi",
    orWhatsapp: "Lebih suka kirim via WhatsApp?",
    fileTooBig: "File itu lebih dari 5 MB. Kirimkan lewat email saja.",
    fileWrongType: "Lampirkan file XLSX, XLS, atau CSV.",
  },
  part: {
    home: "Beranda",
    catalog: "Katalog",
    lead: "{name} {brand} genuine untuk {models}. Dikirim dari gudang kami di Jakarta dalam dus pabrikan, lengkap dengan dokumen ekspor.",
    labelPartNumber: "Nomor part",
    labelBrand: "Merek",
    labelName: "Nama part",
    labelFits: "Cocok untuk",
    labelCategory: "Kategori",
    labelSuperseded: "Diganti oleh",
    labelStock: "Stok",
    stockAsk: "Dikonfirmasi per RFQ — tanyakan jumlah hari ini",
    labelShippedFrom: "Dikirim dari",
    shippedFrom: "Jakarta, Indonesia",
    addToRfq: "Tambah ke RFQ",
    added: "Sudah ditambahkan",
    askWhatsapp: "Tanya via WhatsApp",
    openRfq: "Buka formulir RFQ",
    related: "Part lain untuk model yang sama",
    noPhoto: "Belum ada foto untuk part ini",
    notListed: "Butuh nomor yang tidak ada di situs ini? Kirim daftarnya — sebagian besar stok kami tidak ditampilkan.",
  },
};

const vi: HomeCopy = {
  hero: {
    eyebrow: "Nhà phân phối được chỉ định của Suzuki Genuine Parts · Jakarta · từ tháng 10 năm 1989",
    h1: "Gửi danh sách mã phụ tùng. Chúng tôi trả lời tồn kho, giá và thời gian giao theo từng dòng.",
    body: "PT. Jaya Makmur Nugraha phân phối Suzuki Genuine Parts từ Jakarta kể từ tháng 10 năm 1989. Chúng tôi cũng cung cấp phụ tùng Toyota, Daihatsu và Mitsubishi, đóng gói và làm chứng từ xuất khẩu.",
    searchLabel: "Tra mã phụ tùng",
    searchPlaceholder: "16510-61A21-000",
    searchButton: "Tra",
    rfq: "Gửi RFQ",
    whatsapp: "WhatsApp",
    note: "Danh mục trên trang này chỉ là một phần. Nếu không thấy mã, vẫn gửi cả danh sách — phần lớn hàng trong kho chưa được đăng.",
  },
  order: {
    title: "Cách đặt hàng",
    lead: "Bốn bước. Giống nhau cho một thùng thử và cho nguyên container.",
    steps: [
      {
        title: "Gửi danh sách",
        body: "Mã phụ tùng và số lượng, cảng đến, và Incoterms bạn dùng. Excel, CSV hay văn bản thường trong email — dùng thứ bạn đang có.",
      },
      {
        title: "Nhận báo giá",
        body: `Chúng tôi đối chiếu từng dòng với tồn kho và trả lời trong ${MISSING} giờ làm việc. Dòng nào không có hàng sẽ được ghi rõ, không bị bỏ đi.`,
      },
      {
        title: "Proforma Invoice và thanh toán",
        body: `Chúng tôi phát hành PI gồm giá, trọng lượng và số thùng. Điều khoản thanh toán: ${MISSING}.`,
      },
      {
        title: "Đóng gói và giao hàng",
        body: "Phụ tùng giữ nguyên thùng gốc, đóng kiện và ghi ký mã hiệu theo yêu cầu của bạn. Bạn nhận Proforma Invoice, Packing List, Certificate of Origin và Bill of Lading.",
      },
    ],
  },
  terms: {
    title: "Điều kiện thương mại",
    lead: "Những gì người mua thường hỏi trước đơn đầu tiên.",
    colItem: "Mục",
    colDetail: "Chi tiết",
    rows: [
      { key: "moq", label: "Đơn tối thiểu" },
      { key: "incoterms", label: "Incoterms" },
      { key: "payment", label: "Thanh toán" },
      { key: "quote", label: "Thời gian báo giá" },
      { key: "lead", label: "Thời gian giao" },
      { key: "freight", label: "Vận chuyển" },
      { key: "pol", label: "Cảng xếp hàng" },
      { key: "docs", label: "Chứng từ xuất khẩu" },
    ],
    note: "Điều kiện được thống nhất theo từng đơn và ghi trên Proforma Invoice.",
  },
  brands: {
    title: "Các thương hiệu chúng tôi cung cấp",
    lead: "Phụ tùng chính hãng, trong thùng của chính nhà sản xuất.",
    disclaimer:
      "JMN là nhà phân phối được chỉ định của Suzuki Genuine Parts. Phụ tùng Toyota, Daihatsu và Mitsubishi được cung cấp từ kho của chúng tôi — các logo trên là thương hiệu chúng tôi bán, không phải sự chứng nhận của các công ty đó dành cho JMN.",
    catsTitle: "Nhóm phụ tùng",
    catsLead: "Đếm từ các mã phụ tùng đã đăng trên trang này.",
    modelsTitle: "Mẫu xe trong danh mục đã đăng",
    openCatalog: "Mở danh mục",
  },
  proof: {
    title: "Kho hàng và cách đóng gói",
    lead: "Ảnh thật từ kho của chúng tôi tại Jakarta, không chỉnh sửa. Mở một ảnh và phóng to: nhãn thùng, mã phụ tùng và tem lô đều đọc được.",
    note: "Không có ảnh có sẵn nào trên trang này.",
    docsTitle: "Thư chỉ định nhà phân phối và giấy tờ",
    docsBody: `Bản scan thư chỉ định nhà phân phối của Suzuki và giấy tờ công ty nên được đặt ở đây, để người mua mới kiểm tra trước lần thanh toán đầu tiên: ${MISSING}.`,
  },
  story: {
    title: "Về công ty",
    paras: [
      "Chúng tôi mở cửa tại Karang Anyar, Trung Jakarta, vào tháng 10 năm 1989, và được chỉ định làm nhà phân phối Suzuki Genuine Parts trong cùng tháng đó. Khách hàng đầu tiên là các gara và chủ đội xe quanh thành phố.",
      "Năm 2010 chúng tôi giao đơn hàng đầu tiên ra nước ngoài. Năm 2015 chúng tôi thêm Toyota, Daihatsu và Mitsubishi, để người mua xếp nhiều thương hiệu vào một container thay vì tìm ba nhà cung cấp.",
      `Ba thập kỷ đầu thực sự đã diễn ra thế nào — ai lập công ty, làm sao có được chỉ định của Suzuki, những đơn hàng từng sai và chúng tôi đã thay đổi điều gì — nên được kể bằng chính lời của người chủ: ${MISSING}.`,
    ],
    role: "Tổng giám đốc",
  },
  contact: {
    title: "Liên hệ",
    lead: "Giờ Jakarta, UTC+7. Bạn có thể viết bằng tiếng Anh hoặc tiếng Indonesia.",
    emailLabel: "Email",
    phoneLabel: "WhatsApp",
    addressLabel: "Kho và văn phòng",
    hoursLabel: "Giờ làm việc",
    hours: MISSING,
    mapLink: "Mở trong Google Maps",
    vcard: "Tải danh thiếp (.vcf)",
  },
  rfq: {
    title: "Yêu cầu báo giá",
    lead: "Dán danh sách hoặc gửi kèm tệp bạn đang có. Một phản hồi, theo từng dòng.",
    name: "Tên của bạn",
    email: "Email",
    company: "Công ty",
    destination: "Cảng hoặc thành phố đến",
    destinationPlaceholder: "Hải Phòng, Việt Nam",
    incoterms: "Incoterms",
    lines: "Mã phụ tùng và số lượng",
    linesPlaceholder: "16510-61A21-000  x 200\n17700-61M00-000  x 50",
    file: "Gửi kèm Excel hoặc CSV",
    fileHint: "XLSX, XLS hoặc CSV, tối đa 5 MB. Không bắt buộc.",
    submit: "Gửi RFQ",
    sending: "Đang gửi",
    sentTitle: "Đã nhận RFQ",
    sentBody: "Chúng tôi đã nhận. Phản hồi sẽ gửi tới",
    sentAgain: "Gửi tiếp",
    orWhatsapp: "Muốn gửi qua WhatsApp?",
    fileTooBig: "Tệp lớn hơn 5 MB. Xin gửi qua email.",
    fileWrongType: "Hãy gửi kèm tệp XLSX, XLS hoặc CSV.",
  },
  part: {
    home: "Trang chủ",
    catalog: "Danh mục",
    lead: "{name} chính hãng {brand} cho {models}. Cung cấp từ kho của chúng tôi tại Jakarta, trong thùng của nhà sản xuất, kèm chứng từ xuất khẩu.",
    labelPartNumber: "Mã phụ tùng",
    labelBrand: "Thương hiệu",
    labelName: "Tên phụ tùng",
    labelFits: "Phù hợp với",
    labelCategory: "Nhóm",
    labelSuperseded: "Được thay bằng",
    labelStock: "Tồn kho",
    stockAsk: "Xác nhận theo từng RFQ — hỏi số lượng hôm nay",
    labelShippedFrom: "Gửi từ",
    shippedFrom: "Jakarta, Indonesia",
    addToRfq: "Thêm vào RFQ",
    added: "Đã thêm",
    askWhatsapp: "Hỏi qua WhatsApp",
    openRfq: "Mở biểu mẫu RFQ",
    related: "Phụ tùng khác cho cùng mẫu xe",
    noPhoto: "Chưa có ảnh của phụ tùng này",
    notListed: "Cần mã không có trên trang này? Hãy gửi danh sách — phần lớn hàng trong kho chưa được đăng.",
  },
};

const ar: HomeCopy = {
  hero: {
    eyebrow: "موزّع معتمد لقطع سوزوكي الأصلية · جاكرتا · منذ أكتوبر 1989",
    h1: "أرسل قائمة أرقام القطع، ونرد عليك بالتوفر والسعر ومدة التسليم سطراً بسطر.",
    body: "تُوزّع PT. Jaya Makmur Nugraha قطع سوزوكي الأصلية من جاكرتا منذ أكتوبر 1989. ونوفّر كذلك قطع تويوتا ودايهاتسو وميتسوبيشي، ونتولى التغليف ومستندات التصدير.",
    searchLabel: "ابحث برقم القطعة",
    searchPlaceholder: "16510-61A21-000",
    searchButton: "ابحث",
    rfq: "أرسل طلب تسعير",
    whatsapp: "واتساب",
    note: "الكتالوج على هذا الموقع عيّنة فقط. إن لم يكن الرقم موجوداً فأرسل القائمة كاملة — معظم ما لدينا غير منشور.",
  },
  order: {
    title: "كيف تطلب",
    lead: "أربع خطوات، هي نفسها لصندوق تجريبي ولحاوية كاملة.",
    steps: [
      {
        title: "أرسل القائمة",
        body: "أرقام القطع والكميات، وميناء الوصول، وشروط Incoterms التي تعمل بها. Excel أو CSV أو نص عادي في بريد — بأي صيغة لديك.",
      },
      {
        title: "استلم العرض",
        body: `نطابق كل سطر مع المخزون ونرد خلال ${MISSING} ساعة في أيام العمل. والأسطر غير المتوفرة نؤشّر عليها ولا نحذفها.`,
      },
      {
        title: "الفاتورة الأولية والدفع",
        body: `نصدر فاتورة أولية تضم الأسعار والأوزان وعدد الكراتين. شروط الدفع: ${MISSING}.`,
      },
      {
        title: "التغليف والشحن",
        body: "تبقى القطع في كراتينها الأصلية، تُحزم وتُعلّم بعلامتك. وتستلم الفاتورة الأولية وقائمة التعبئة وشهادة المنشأ وبوليصة الشحن.",
      },
    ],
  },
  terms: {
    title: "شروط التعامل",
    lead: "ما يسأل عنه المشتري عادةً قبل الطلب الأول.",
    colItem: "البند",
    colDetail: "التفصيل",
    rows: [
      { key: "moq", label: "أدنى كمية للطلب" },
      { key: "incoterms", label: "Incoterms" },
      { key: "payment", label: "الدفع" },
      { key: "quote", label: "مدة إصدار العرض" },
      { key: "lead", label: "مدة التسليم" },
      { key: "freight", label: "الشحن" },
      { key: "pol", label: "ميناء الشحن" },
      { key: "docs", label: "مستندات التصدير" },
    ],
    note: "تُتفق الشروط لكل طلب وتُكتب في الفاتورة الأولية.",
  },
  brands: {
    title: "العلامات التي نوردها",
    lead: "قطع أصلية، في كراتين الشركة الصانعة نفسها.",
    disclaimer:
      "JMN موزّع معيَّن لقطع سوزوكي الأصلية. أما قطع تويوتا ودايهاتسو وميتسوبيشي فنوردها من مخزوننا — والشعارات أعلاه هي العلامات التي نبيعها، وليست تزكية من تلك الشركات لـ JMN.",
    catsTitle: "فئات القطع",
    catsLead: "محسوبة من أرقام القطع المنشورة على هذا الموقع.",
    modelsTitle: "الطرازات في الكتالوج المنشور",
    openCatalog: "افتح الكتالوج",
  },
  proof: {
    title: "مخزوننا وتغليفنا",
    lead: "صور من مستودعنا في جاكرتا، بلا تعديل. افتح صورة وكبّرها: ملصقات الكراتين وأرقام القطع وملصقات الدفعات كلها مقروءة.",
    note: "لا توجد أي صورة جاهزة على هذا الموقع.",
    docsTitle: "خطاب تعيين الموزّع والشهادات",
    docsBody: `ينبغي أن توضع هنا نسخ خطاب تعيين الموزّع من سوزوكي ومستندات الشركة، ليتحقق منها المشتري الجديد قبل أول دفعة: ${MISSING}.`,
  },
  story: {
    title: "عن الشركة",
    paras: [
      "بدأنا في كارانج أنيار بوسط جاكرتا في أكتوبر 1989، وعُيّنا موزّعاً معتمداً لقطع سوزوكي الأصلية في الشهر نفسه. وكان أول عملائنا ورش ومالكي أساطيل في المدينة.",
      "في 2010 شحنّا أول طلب إلى الخارج. وفي 2015 أضفنا تويوتا ودايهاتسو وميتسوبيشي، ليضع المشتري عدة علامات في حاوية واحدة بدل متابعة ثلاثة موردين.",
      `أما كيف كانت العقود الثلاثة الأولى فعلاً — من أسّس الشركة، وكيف جاء تعيين سوزوكي، والطلبات التي أخطأنا فيها وما غيّرناه بعدها — فالأفضل أن تُروى بكلمات المالك نفسه: ${MISSING}.`,
    ],
    role: "المدير العام",
  },
  contact: {
    title: "التواصل",
    lead: "بتوقيت جاكرتا UTC+7. اكتب بالإنجليزية أو الإندونيسية.",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "واتساب",
    addressLabel: "المستودع والمكتب",
    hoursLabel: "ساعات العمل",
    hours: MISSING,
    mapLink: "افتح في خرائط Google",
    vcard: "تنزيل بطاقة التواصل (.vcf)",
  },
  rfq: {
    title: "طلب تسعير",
    lead: "الصق قائمتك أو أرفق الملف الذي لديك. رد واحد، سطراً بسطر.",
    name: "اسمك",
    email: "البريد الإلكتروني",
    company: "الشركة",
    destination: "ميناء أو مدينة الوصول",
    destinationPlaceholder: "جبل علي، الإمارات",
    incoterms: "Incoterms",
    lines: "أرقام القطع والكميات",
    linesPlaceholder: "16510-61A21-000  x 200\n17700-61M00-000  x 50",
    file: "أرفق Excel أو CSV",
    fileHint: "XLSX أو XLS أو CSV، حتى 5 ميجابايت. اختياري.",
    submit: "أرسل الطلب",
    sending: "جارٍ الإرسال",
    sentTitle: "تم استلام الطلب",
    sentBody: "وصلنا طلبك. وسيصل الرد إلى",
    sentAgain: "أرسل طلباً آخر",
    orWhatsapp: "تفضّل الإرسال عبر واتساب؟",
    fileTooBig: "حجم الملف يتجاوز 5 ميجابايت. أرسله بالبريد الإلكتروني.",
    fileWrongType: "أرفق ملف XLSX أو XLS أو CSV.",
  },
  part: {
    home: "الرئيسية",
    catalog: "الكتالوج",
    lead: "{name} أصلية من {brand} لـ {models}. تُورّد من مستودعنا في جاكرتا في كرتون الشركة الصانعة، مع مستندات التصدير.",
    labelPartNumber: "رقم القطعة",
    labelBrand: "العلامة",
    labelName: "اسم القطعة",
    labelFits: "تناسب",
    labelCategory: "الفئة",
    labelSuperseded: "استُبدل بـ",
    labelStock: "المخزون",
    stockAsk: "يُؤكَّد مع كل طلب تسعير — اسأل عن الكمية اليوم",
    labelShippedFrom: "تُشحن من",
    shippedFrom: "جاكرتا، إندونيسيا",
    addToRfq: "أضف إلى الطلب",
    added: "أُضيفت",
    askWhatsapp: "اسأل عبر واتساب",
    openRfq: "افتح نموذج التسعير",
    related: "قطع أخرى للطرازات نفسها",
    noPhoto: "لا توجد صورة لهذه القطعة بعد",
    notListed: "تحتاج رقماً غير موجود على الموقع؟ أرسل القائمة — معظم مخزوننا غير منشور.",
  },
};

const th: HomeCopy = {
  hero: {
    eyebrow: "ผู้จัดจำหน่ายที่ได้รับแต่งตั้งของ Suzuki Genuine Parts · จาการ์ตา · ตั้งแต่ตุลาคม 1989",
    h1: "ส่งรายการหมายเลขอะไหล่มา เราตอบสต็อก ราคา และระยะเวลาส่งมอบทีละบรรทัด",
    body: "PT. Jaya Makmur Nugraha จัดจำหน่าย Suzuki Genuine Parts จากจาการ์ตาตั้งแต่เดือนตุลาคม 1989 เราจำหน่ายอะไหล่ Toyota, Daihatsu และ Mitsubishi ด้วย พร้อมบรรจุและจัดเอกสารส่งออก",
    searchLabel: "ค้นหมายเลขอะไหล่",
    searchPlaceholder: "16510-61A21-000",
    searchButton: "ค้นหา",
    rfq: "ส่ง RFQ",
    whatsapp: "WhatsApp",
    note: "แคตตาล็อกในเว็บนี้เป็นเพียงตัวอย่าง ถ้าไม่พบหมายเลขที่ต้องการ ส่งรายการมาได้เลย — สต็อกส่วนใหญ่ของเรายังไม่ได้ลงเว็บ",
  },
  order: {
    title: "วิธีสั่งซื้อ",
    lead: "สี่ขั้นตอน เหมือนกันทั้งกล่องทดลองและตู้คอนเทนเนอร์เต็ม",
    steps: [
      {
        title: "ส่งรายการ",
        body: "หมายเลขอะไหล่และจำนวน ท่าเรือปลายทาง และ Incoterms ที่คุณใช้ ส่งเป็น Excel, CSV หรือข้อความในอีเมลก็ได้ ใช้รูปแบบที่คุณมีอยู่",
      },
      {
        title: "รับใบเสนอราคา",
        body: `เราตรวจทุกบรรทัดกับสต็อกและตอบกลับภายใน ${MISSING} ชั่วโมงในวันทำการ บรรทัดที่เราไม่มีจะระบุไว้ ไม่ตัดออกเงียบ ๆ`,
      },
      {
        title: "Proforma Invoice และการชำระเงิน",
        body: `เราออก PI ระบุราคา น้ำหนัก และจำนวนกล่อง เงื่อนไขการชำระเงิน: ${MISSING}`,
      },
      {
        title: "บรรจุและจัดส่ง",
        body: "อะไหล่คงอยู่ในกล่องเดิมจากโรงงาน บรรจุและตีตราตามมาร์กของคุณ คุณจะได้รับ Proforma Invoice, Packing List, Certificate of Origin และ Bill of Lading",
      },
    ],
  },
  terms: {
    title: "เงื่อนไขการค้า",
    lead: "สิ่งที่ผู้ซื้อมักถามก่อนสั่งครั้งแรก",
    colItem: "รายการ",
    colDetail: "รายละเอียด",
    rows: [
      { key: "moq", label: "ยอดสั่งขั้นต่ำ" },
      { key: "incoterms", label: "Incoterms" },
      { key: "payment", label: "การชำระเงิน" },
      { key: "quote", label: "เวลาเสนอราคา" },
      { key: "lead", label: "ระยะเวลาส่งมอบ" },
      { key: "freight", label: "การขนส่ง" },
      { key: "pol", label: "ท่าเรือต้นทาง" },
      { key: "docs", label: "เอกสารส่งออก" },
    ],
    note: "เงื่อนไขตกลงกันเป็นรายคำสั่งซื้อ และระบุไว้ใน Proforma Invoice",
  },
  brands: {
    title: "แบรนด์ที่เราจำหน่าย",
    lead: "อะไหล่แท้ ในกล่องของผู้ผลิตเอง",
    disclaimer:
      "JMN เป็นผู้จัดจำหน่ายที่ได้รับแต่งตั้งสำหรับ Suzuki Genuine Parts อะไหล่ Toyota, Daihatsu และ Mitsubishi เราจำหน่ายจากสต็อกของเราเอง — โลโก้ด้านบนคือแบรนด์ที่เราขาย ไม่ใช่การรับรอง JMN จากบริษัทเหล่านั้น",
    catsTitle: "หมวดอะไหล่",
    catsLead: "นับจากหมายเลขอะไหล่ที่เผยแพร่บนเว็บนี้",
    modelsTitle: "รุ่นรถในแคตตาล็อกที่เผยแพร่",
    openCatalog: "เปิดแคตตาล็อก",
  },
  proof: {
    title: "สต็อกและการบรรจุของเรา",
    lead: "ภาพถ่ายจากคลังสินค้าของเราเองในจาการ์ตา ไม่ตกแต่ง เปิดภาพแล้วซูมดูได้: ฉลากกล่อง หมายเลขอะไหล่ และสติกเกอร์ล็อต อ่านได้ทั้งหมด",
    note: "ไม่มีภาพสต็อกแม้แต่ภาพเดียวบนเว็บนี้",
    docsTitle: "หนังสือแต่งตั้งผู้จัดจำหน่ายและใบรับรอง",
    docsBody: `สำเนาหนังสือแต่งตั้งผู้จัดจำหน่ายจาก Suzuki และเอกสารบริษัทควรอยู่ที่นี่ เพื่อให้ผู้ซื้อรายใหม่ตรวจสอบได้ก่อนชำระเงินครั้งแรก: ${MISSING}`,
  },
  story: {
    title: "เกี่ยวกับบริษัท",
    paras: [
      "เราเริ่มต้นที่ Karang Anyar จาการ์ตากลาง ในเดือนตุลาคม 1989 และได้รับแต่งตั้งเป็นผู้จัดจำหน่าย Suzuki Genuine Parts ในเดือนเดียวกัน ลูกค้ากลุ่มแรกคืออู่ซ่อมและเจ้าของรถหลายคันในเมือง",
      "ปี 2010 เราส่งคำสั่งซื้อแรกออกนอกประเทศ ปี 2015 เราเพิ่ม Toyota, Daihatsu และ Mitsubishi เพื่อให้ผู้ซื้อรวมหลายแบรนด์ไว้ในตู้เดียว ไม่ต้องตามหาผู้ขายสามราย",
      `สามทศวรรษแรกเป็นอย่างไรจริง ๆ — ใครก่อตั้งบริษัท ได้รับแต่งตั้งจาก Suzuki มาอย่างไร คำสั่งซื้อที่เคยผิดพลาดและเราแก้อะไรไป — ควรเล่าด้วยคำพูดของเจ้าของเอง: ${MISSING}`,
    ],
    role: "กรรมการผู้จัดการ",
  },
  contact: {
    title: "ติดต่อ",
    lead: "เวลาจาการ์ตา UTC+7 เขียนมาเป็นภาษาอังกฤษหรืออินโดนีเซียได้",
    emailLabel: "อีเมล",
    phoneLabel: "WhatsApp",
    addressLabel: "คลังสินค้าและสำนักงาน",
    hoursLabel: "เวลาทำการ",
    hours: MISSING,
    mapLink: "เปิดใน Google Maps",
    vcard: "ดาวน์โหลดนามบัตร (.vcf)",
  },
  rfq: {
    title: "ขอใบเสนอราคา",
    lead: "วางรายการของคุณ หรือแนบไฟล์ที่มีอยู่ ตอบกลับครั้งเดียว ทีละบรรทัด",
    name: "ชื่อของคุณ",
    email: "อีเมล",
    company: "บริษัท",
    destination: "ท่าเรือหรือเมืองปลายทาง",
    destinationPlaceholder: "แหลมฉบัง ประเทศไทย",
    incoterms: "Incoterms",
    lines: "หมายเลขอะไหล่และจำนวน",
    linesPlaceholder: "16510-61A21-000  x 200\n17700-61M00-000  x 50",
    file: "แนบ Excel หรือ CSV",
    fileHint: "XLSX, XLS หรือ CSV ไม่เกิน 5 MB ไม่บังคับ",
    submit: "ส่ง RFQ",
    sending: "กำลังส่ง",
    sentTitle: "ได้รับ RFQ แล้ว",
    sentBody: "เราได้รับแล้ว คำตอบจะส่งไปที่",
    sentAgain: "ส่งอีกรายการ",
    orWhatsapp: "ต้องการส่งทาง WhatsApp ไหม?",
    fileTooBig: "ไฟล์ใหญ่กว่า 5 MB กรุณาส่งทางอีเมล",
    fileWrongType: "กรุณาแนบไฟล์ XLSX, XLS หรือ CSV",
  },
  part: {
    home: "หน้าแรก",
    catalog: "แคตตาล็อก",
    lead: "{name} แท้ {brand} สำหรับ {models} จัดส่งจากคลังของเราในจาการ์ตา ในกล่องของผู้ผลิต พร้อมเอกสารส่งออก",
    labelPartNumber: "หมายเลขอะไหล่",
    labelBrand: "แบรนด์",
    labelName: "ชื่ออะไหล่",
    labelFits: "ใช้กับ",
    labelCategory: "หมวด",
    labelSuperseded: "เปลี่ยนเป็น",
    labelStock: "สต็อก",
    stockAsk: "ยืนยันรายคำขอ — สอบถามจำนวนวันนี้",
    labelShippedFrom: "ส่งจาก",
    shippedFrom: "จาการ์ตา อินโดนีเซีย",
    addToRfq: "เพิ่มใน RFQ",
    added: "เพิ่มแล้ว",
    askWhatsapp: "สอบถามทาง WhatsApp",
    openRfq: "เปิดแบบฟอร์ม RFQ",
    related: "อะไหล่อื่นสำหรับรุ่นเดียวกัน",
    noPhoto: "ยังไม่มีภาพของอะไหล่นี้",
    notListed: "ต้องการหมายเลขที่ไม่มีบนเว็บนี้? ส่งรายการมาได้ — สต็อกส่วนใหญ่ของเรายังไม่ได้ลงเว็บ",
  },
};

export const HOME_COPY: Record<Lang, HomeCopy> = { en, id, vi, ar, th };
