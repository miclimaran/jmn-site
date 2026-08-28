import type { Lang } from "@/lib/i18n";

/**
 * Long-form copy for /about, kept out of Lang.tsx.
 *
 * That dictionary holds short, reusable UI strings; this page is prose, and
 * flattening it into ~30 scalar keys would bury the structure (four milestones,
 * four values) that the component actually renders. Shared strings — stat
 * labels, nav words, CTA buttons — still come from Lang.tsx.
 *
 * `{company}`, `{founded}` and `{years}` are filled in by `fill()` so the
 * founding date and the derived years-in-trade never drift between languages.
 *
 * ⚠️  The Vietnamese, Arabic and Thai prose is a careful translation, not a
 *     native review. Before this page carries real weight with buyers in those
 *     markets, have a speaker read it — the English and Indonesian are the two
 *     the owner can verify directly.
 */

export type Milestone = { title: string; desc: string };

export type AboutCopy = {
  /** Founding month + year, written the way each language writes it. */
  foundedLabel: string;
  breadcrumbHome: string;
  eyebrow: string;
  title: string;
  lead: string;
  intro: [string, string];
  captions: { aisle: string; panels: string; dispatch: string };
  journey: string;
  journeySub: string;
  today: string;
  milestones: [Milestone, Milestone, Milestone, Milestone];
  mission: Milestone;
  vision: Milestone;
  valuesTitle: string;
  valuesSub: string;
  values: [Milestone, Milestone, Milestone, Milestone];
  leadStatement: string;
  ledBy: string;
  ctaTitle: string;
  ctaDesc: string;
  contactCta: string;
};

/** Replaces `{token}` placeholders; leaves unknown tokens visible on purpose. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key) =>
    key in vars ? String(vars[key]) : whole,
  );
}

const en: AboutCopy = {
  foundedLabel: "October 1989",
  breadcrumbHome: "Home",
  eyebrow: "Our Story",
  title: "Genuine parts, global trust",
  lead: "{company} (JMN Parts) is an authorized distributor of Suzuki Genuine Parts based in Jakarta, Indonesia — supplying OEM auto parts for Suzuki, Toyota, Daihatsu, and Mitsubishi to buyers around the world.",
  intro: [
    "{company} opened in Central Jakarta in {founded} and was appointed an authorized distributor of Suzuki Genuine Parts in the same month. For {years} years the focus has not changed: genuine parts, accurate part numbers, and delivery you can plan around.",
    "In 2010 we shipped our first order abroad. In 2015 the catalog grew beyond Suzuki to Toyota, Daihatsu, and Mitsubishi, so buyers could consolidate several brands into a single shipment. Today we supply importers, distributors, and workshops here and overseas — with the export documentation to move the goods across borders.",
  ],
  captions: {
    aisle: "Main picking aisle, Jakarta",
    panels: "Body panels in original cartons",
    dispatch: "Loading for dispatch",
  },
  journey: "Our journey",
  journeySub: "Milestones that shaped who we are today.",
  today: "Today",
  milestones: [
    {
      title: "Founded as an authorized Suzuki distributor",
      desc: "{company} opens in Central Jakarta and is appointed an authorized distributor of Suzuki Genuine Parts in the same month, supplying local workshops and fleet owners.",
    },
    {
      title: "First international export",
      desc: "JMN ships its first order abroad, adding full export documentation — Proforma Invoice, Packing List, and Certificate of Origin.",
    },
    {
      title: "Multi-brand supply",
      desc: "The catalog expands beyond Suzuki to Toyota, Daihatsu, and Mitsubishi, letting buyers consolidate several brands into one shipment.",
    },
    {
      title: "{years} years in the trade",
      desc: "An OEM parts partner shipping to buyers across the Middle East, Africa, and Southeast Asia, backed by a stocked Jakarta warehouse and a growing digital catalog.",
    },
  ],
  mission: {
    title: "Our mission",
    desc: "To make genuine OEM auto parts easy to source and trust — delivering the right part, verified and documented, to every customer at home and abroad.",
  },
  vision: {
    title: "Our vision",
    desc: "To be the most reliable bridge between Indonesian OEM parts and the world — the first name importers think of when they need genuine quality they can count on.",
  },
  valuesTitle: "What we stand for",
  valuesSub: "The principles behind every order we fulfill.",
  values: [
    {
      title: "Authenticity first",
      desc: "100% genuine OEM parts with verifiable origin — no counterfeits, ever.",
    },
    {
      title: "Long-term partnership",
      desc: "We treat every workshop, reseller, and importer as a partner, not a one-off order.",
    },
    {
      title: "Reliable fulfillment",
      desc: "Accurate picking, clean export documentation, and dependable lead times.",
    },
    {
      title: "Global reach",
      desc: "Export-ready logistics that connect Indonesian OEM parts to buyers worldwide.",
    },
  ],
  leadStatement:
    "An authorized Suzuki Genuine Parts distributor since {founded} — {years} years supplying genuine parts from Central Jakarta.",
  ledBy: "Led by",
  ctaTitle: "Let's work together",
  ctaDesc:
    "Send us your part numbers, quantities, and destination — our team replies within one business day.",
  contactCta: "Contact us",
};

const id: AboutCopy = {
  foundedLabel: "Oktober 1989",
  breadcrumbHome: "Beranda",
  eyebrow: "Kisah Kami",
  title: "Suku cadang asli, kepercayaan global",
  lead: "{company} (JMN Parts) adalah distributor resmi Suzuki Genuine Parts yang berbasis di Jakarta, Indonesia — memasok suku cadang OEM untuk Suzuki, Toyota, Daihatsu, dan Mitsubishi ke pembeli di seluruh dunia.",
  intro: [
    "{company} berdiri di Jakarta Pusat pada {founded} dan pada bulan yang sama ditunjuk sebagai distributor resmi Suzuki Genuine Parts. Selama {years} tahun fokusnya tidak berubah: suku cadang asli, nomor part yang akurat, dan pengiriman yang bisa Anda andalkan.",
    "Pada 2010 kami mengirim pesanan pertama ke luar negeri. Pada 2015 katalog berkembang melampaui Suzuki ke Toyota, Daihatsu, dan Mitsubishi, sehingga pembeli bisa menggabungkan beberapa merek dalam satu pengiriman. Kini kami memasok importir, distributor, dan bengkel di dalam maupun luar negeri — lengkap dengan dokumen ekspor untuk melintas batas negara.",
  ],
  captions: {
    aisle: "Lorong pengambilan utama, Jakarta",
    panels: "Panel bodi dalam dus asli",
    dispatch: "Pemuatan untuk pengiriman",
  },
  journey: "Perjalanan kami",
  journeySub: "Tonggak yang membentuk kami hingga hari ini.",
  today: "Kini",
  milestones: [
    {
      title: "Berdiri sebagai distributor resmi Suzuki",
      desc: "{company} berdiri di Jakarta Pusat dan pada bulan yang sama ditunjuk sebagai distributor resmi Suzuki Genuine Parts, melayani bengkel lokal dan pemilik armada.",
    },
    {
      title: "Ekspor pertama ke luar negeri",
      desc: "JMN mengirim pesanan pertamanya ke luar negeri, lengkap dengan dokumen ekspor — Proforma Invoice, Packing List, dan Certificate of Origin.",
    },
    {
      title: "Pasokan multi-merek",
      desc: "Katalog berkembang dari Suzuki ke Toyota, Daihatsu, dan Mitsubishi, sehingga pembeli dapat menggabungkan beberapa merek dalam satu pengiriman.",
    },
    {
      title: "{years} tahun di industri ini",
      desc: "Mitra suku cadang OEM yang mengirim ke pembeli di Timur Tengah, Afrika, dan Asia Tenggara, didukung gudang Jakarta yang terisi dan katalog digital yang terus bertambah.",
    },
  ],
  mission: {
    title: "Misi kami",
    desc: "Membuat suku cadang OEM asli mudah didapat dan dipercaya — mengirimkan part yang tepat, terverifikasi dan berdokumen, kepada setiap pelanggan di dalam maupun luar negeri.",
  },
  vision: {
    title: "Visi kami",
    desc: "Menjadi jembatan paling andal antara suku cadang OEM Indonesia dan dunia — nama pertama yang diingat importir saat membutuhkan kualitas asli yang bisa diandalkan.",
  },
  valuesTitle: "Yang kami pegang",
  valuesSub: "Prinsip di balik setiap pesanan yang kami penuhi.",
  values: [
    {
      title: "Keaslian di atas segalanya",
      desc: "Suku cadang OEM 100% asli dengan asal-usul yang dapat diverifikasi — tidak pernah ada barang palsu.",
    },
    {
      title: "Kemitraan jangka panjang",
      desc: "Kami memperlakukan setiap bengkel, reseller, dan importir sebagai mitra, bukan pesanan sekali jalan.",
    },
    {
      title: "Pemenuhan yang andal",
      desc: "Pengambilan barang yang akurat, dokumen ekspor yang rapi, dan waktu pengiriman yang bisa diandalkan.",
    },
    {
      title: "Jangkauan global",
      desc: "Logistik siap ekspor yang menghubungkan suku cadang OEM Indonesia dengan pembeli di seluruh dunia.",
    },
  ],
  leadStatement:
    "Distributor resmi Suzuki Genuine Parts sejak {founded} — {years} tahun memasok suku cadang asli dari Jakarta Pusat.",
  ledBy: "Dipimpin oleh",
  ctaTitle: "Mari bekerja sama",
  ctaDesc:
    "Kirimkan nomor part, jumlah, dan tujuan pengiriman Anda — tim kami membalas dalam satu hari kerja.",
  contactCta: "Hubungi kami",
};

const vi: AboutCopy = {
  foundedLabel: "tháng 10 năm 1989",
  breadcrumbHome: "Trang chủ",
  eyebrow: "Câu chuyện của chúng tôi",
  title: "Phụ tùng chính hãng, niềm tin toàn cầu",
  lead: "{company} (JMN Parts) là nhà phân phối được ủy quyền của Suzuki Genuine Parts, có trụ sở tại Jakarta, Indonesia — cung cấp phụ tùng OEM cho Suzuki, Toyota, Daihatsu và Mitsubishi tới khách hàng trên toàn thế giới.",
  intro: [
    "{company} thành lập tại Trung tâm Jakarta vào {founded} và ngay trong tháng đó được chỉ định làm nhà phân phối ủy quyền của Suzuki Genuine Parts. Suốt {years} năm, trọng tâm không thay đổi: phụ tùng chính hãng, mã phụ tùng chính xác và giao hàng đúng kế hoạch.",
    "Năm 2010, chúng tôi xuất khẩu đơn hàng đầu tiên. Năm 2015, danh mục mở rộng ngoài Suzuki sang Toyota, Daihatsu và Mitsubishi, giúp người mua gộp nhiều thương hiệu vào một lô hàng. Ngày nay chúng tôi cung cấp cho nhà nhập khẩu, nhà phân phối và gara trong nước lẫn nước ngoài — kèm đầy đủ chứng từ xuất khẩu.",
  ],
  captions: {
    aisle: "Lối lấy hàng chính, Jakarta",
    panels: "Tấm thân xe trong thùng nguyên bản",
    dispatch: "Xếp hàng để giao",
  },
  journey: "Hành trình của chúng tôi",
  journeySub: "Những cột mốc đã tạo nên chúng tôi hôm nay.",
  today: "Hiện nay",
  milestones: [
    {
      title: "Thành lập với tư cách nhà phân phối Suzuki ủy quyền",
      desc: "{company} mở tại Trung tâm Jakarta và ngay trong tháng đó được chỉ định làm nhà phân phối ủy quyền của Suzuki Genuine Parts, phục vụ các gara và chủ đội xe địa phương.",
    },
    {
      title: "Lô hàng xuất khẩu đầu tiên",
      desc: "JMN xuất khẩu đơn hàng đầu tiên, kèm đầy đủ chứng từ — Proforma Invoice, Packing List và Certificate of Origin.",
    },
    {
      title: "Cung ứng đa thương hiệu",
      desc: "Danh mục mở rộng từ Suzuki sang Toyota, Daihatsu và Mitsubishi, cho phép người mua gộp nhiều thương hiệu vào một lô hàng.",
    },
    {
      title: "{years} năm trong ngành",
      desc: "Đối tác phụ tùng OEM giao hàng tới khách ở Trung Đông, châu Phi và Đông Nam Á, với kho hàng đầy đủ tại Jakarta và danh mục số ngày càng mở rộng.",
    },
  ],
  mission: {
    title: "Sứ mệnh của chúng tôi",
    desc: "Giúp việc tìm mua phụ tùng OEM chính hãng trở nên dễ dàng và đáng tin cậy — giao đúng phụ tùng, đã kiểm chứng và có chứng từ, tới mọi khách hàng trong và ngoài nước.",
  },
  vision: {
    title: "Tầm nhìn của chúng tôi",
    desc: "Trở thành cầu nối đáng tin cậy nhất giữa phụ tùng OEM Indonesia và thế giới — cái tên đầu tiên nhà nhập khẩu nghĩ đến khi cần chất lượng chính hãng.",
  },
  valuesTitle: "Giá trị chúng tôi theo đuổi",
  valuesSub: "Nguyên tắc đằng sau mỗi đơn hàng chúng tôi thực hiện.",
  values: [
    {
      title: "Chính hãng là trên hết",
      desc: "Phụ tùng OEM 100% chính hãng với nguồn gốc kiểm chứng được — không bao giờ có hàng giả.",
    },
    {
      title: "Hợp tác lâu dài",
      desc: "Chúng tôi xem mọi gara, đại lý và nhà nhập khẩu là đối tác, không phải một đơn hàng lẻ.",
    },
    {
      title: "Giao hàng đáng tin cậy",
      desc: "Soạn hàng chính xác, chứng từ xuất khẩu rõ ràng và thời gian giao hàng ổn định.",
    },
    {
      title: "Phạm vi toàn cầu",
      desc: "Hậu cần sẵn sàng xuất khẩu, kết nối phụ tùng OEM Indonesia với người mua toàn thế giới.",
    },
  ],
  leadStatement:
    "Nhà phân phối ủy quyền của Suzuki Genuine Parts từ {founded} — {years} năm cung cấp phụ tùng chính hãng từ Trung tâm Jakarta.",
  ledBy: "Dẫn dắt bởi",
  ctaTitle: "Hãy hợp tác cùng nhau",
  ctaDesc:
    "Gửi cho chúng tôi mã phụ tùng, số lượng và điểm đến — đội ngũ của chúng tôi phản hồi trong vòng một ngày làm việc.",
  contactCta: "Liên hệ với chúng tôi",
};

const ar: AboutCopy = {
  foundedLabel: "أكتوبر 1989",
  breadcrumbHome: "الرئيسية",
  eyebrow: "قصتنا",
  title: "قطع غيار أصلية، ثقة عالمية",
  lead: "{company} (JMN Parts) موزّع معتمد لقطع غيار سوزوكي الأصلية ومقرها جاكرتا، إندونيسيا — تورّد قطع غيار OEM لسيارات سوزوكي وتويوتا ودايهاتسو وميتسوبيشي لمشترين حول العالم.",
  intro: [
    "تأسست {company} في وسط جاكرتا في {founded}، وعُيّنت في الشهر نفسه موزّعاً معتمداً لقطع غيار سوزوكي الأصلية. وعلى مدى {years} عاماً لم يتغيّر التركيز: قطع غيار أصلية، وأرقام قطع دقيقة، وتسليم يمكن الاعتماد عليه.",
    "في عام 2010 شحنّا أول طلبية إلى الخارج. وفي عام 2015 توسّع الكتالوج من سوزوكي ليشمل تويوتا ودايهاتسو وميتسوبيشي، ليتمكّن المشترون من دمج عدة علامات في شحنة واحدة. واليوم نورّد للمستوردين والموزّعين والورش داخل البلاد وخارجها — مع مستندات التصدير اللازمة لعبور الحدود.",
  ],
  captions: {
    aisle: "ممر التجهيز الرئيسي، جاكرتا",
    panels: "ألواح الهيكل في كراتينها الأصلية",
    dispatch: "التحميل للشحن",
  },
  journey: "مسيرتنا",
  journeySub: "محطات صنعت ما نحن عليه اليوم.",
  today: "اليوم",
  milestones: [
    {
      title: "التأسيس كموزّع معتمد لسوزوكي",
      desc: "تفتح {company} أبوابها في وسط جاكرتا، وتُعيَّن في الشهر نفسه موزّعاً معتمداً لقطع غيار سوزوكي الأصلية، لخدمة الورش المحلية وأصحاب الأساطيل.",
    },
    {
      title: "أول تصدير دولي",
      desc: "تشحن JMN أول طلبية إلى الخارج، مع مستندات تصدير كاملة — فاتورة مبدئية وقائمة تعبئة وشهادة منشأ.",
    },
    {
      title: "التوريد متعدد العلامات",
      desc: "يتوسّع الكتالوج من سوزوكي إلى تويوتا ودايهاتسو وميتسوبيشي، ما يتيح للمشترين دمج عدة علامات في شحنة واحدة.",
    },
    {
      title: "{years} عاماً في هذا المجال",
      desc: "شريك لقطع غيار OEM يشحن لمشترين في الشرق الأوسط وأفريقيا وجنوب شرق آسيا، مدعوماً بمستودع مجهّز في جاكرتا وكتالوج رقمي متنامٍ.",
    },
  ],
  mission: {
    title: "مهمتنا",
    desc: "أن نجعل الحصول على قطع غيار OEM الأصلية سهلاً وموثوقاً — بتسليم القطعة الصحيحة، موثّقة ومتحقّقاً منها، لكل عميل في الداخل والخارج.",
  },
  vision: {
    title: "رؤيتنا",
    desc: "أن نكون الجسر الأكثر موثوقية بين قطع غيار OEM الإندونيسية والعالم — الاسم الأول الذي يتبادر لذهن المستوردين عند حاجتهم لجودة أصلية.",
  },
  valuesTitle: "ما نلتزم به",
  valuesSub: "المبادئ وراء كل طلبية ننفّذها.",
  values: [
    {
      title: "الأصالة أولاً",
      desc: "قطع غيار OEM أصلية 100% بمصدر يمكن التحقق منه — ولا مكان للتقليد أبداً.",
    },
    {
      title: "شراكة طويلة الأمد",
      desc: "نتعامل مع كل ورشة وموزّع ومستورد كشريك، لا كطلبية عابرة.",
    },
    {
      title: "تنفيذ موثوق",
      desc: "تجهيز دقيق، ومستندات تصدير سليمة، ومهل تسليم يُعتمد عليها.",
    },
    {
      title: "انتشار عالمي",
      desc: "خدمات لوجستية جاهزة للتصدير تربط قطع غيار OEM الإندونيسية بالمشترين حول العالم.",
    },
  ],
  leadStatement:
    "موزّع معتمد لقطع غيار سوزوكي الأصلية منذ {founded} — {years} عاماً من توريد القطع الأصلية من وسط جاكرتا.",
  ledBy: "بقيادة",
  ctaTitle: "لنعمل معاً",
  ctaDesc:
    "أرسل لنا أرقام القطع والكميات وجهة الشحن — يرد فريقنا خلال يوم عمل واحد.",
  contactCta: "اتصل بنا",
};

const th: AboutCopy = {
  foundedLabel: "ตุลาคม 1989",
  breadcrumbHome: "หน้าแรก",
  eyebrow: "เรื่องราวของเรา",
  title: "อะไหล่แท้ ความไว้วางใจระดับโลก",
  lead: "{company} (JMN Parts) เป็นผู้จัดจำหน่ายอะไหล่แท้ Suzuki ที่ได้รับการแต่งตั้ง ตั้งอยู่ในจาการ์ตา ประเทศอินโดนีเซีย — จัดหาอะไหล่ OEM สำหรับ Suzuki, Toyota, Daihatsu และ Mitsubishi ให้ผู้ซื้อทั่วโลก",
  intro: [
    "{company} ก่อตั้งขึ้นในใจกลางจาการ์ตาเมื่อ {founded} และได้รับแต่งตั้งเป็นผู้จัดจำหน่ายอะไหล่แท้ Suzuki ในเดือนเดียวกัน ตลอด {years} ปีที่ผ่านมา จุดมุ่งหมายไม่เคยเปลี่ยน: อะไหล่แท้ หมายเลขอะไหล่ที่ถูกต้อง และการจัดส่งที่วางแผนได้",
    "ในปี 2010 เราส่งออกคำสั่งซื้อแรกไปต่างประเทศ ปี 2015 แคตตาล็อกขยายจาก Suzuki ไปสู่ Toyota, Daihatsu และ Mitsubishi ทำให้ผู้ซื้อรวมหลายแบรนด์ไว้ในการจัดส่งเดียวได้ ปัจจุบันเราจัดหาให้ผู้นำเข้า ผู้จัดจำหน่าย และอู่ซ่อมทั้งในและต่างประเทศ พร้อมเอกสารส่งออกครบถ้วน",
  ],
  captions: {
    aisle: "ทางเดินหยิบสินค้าหลัก จาการ์ตา",
    panels: "แผงตัวถังในกล่องเดิมจากโรงงาน",
    dispatch: "การบรรทุกเพื่อจัดส่ง",
  },
  journey: "เส้นทางของเรา",
  journeySub: "หมุดหมายที่หล่อหลอมเราจนถึงวันนี้",
  today: "ปัจจุบัน",
  milestones: [
    {
      title: "ก่อตั้งในฐานะผู้จัดจำหน่าย Suzuki ที่ได้รับแต่งตั้ง",
      desc: "{company} เปิดดำเนินการในใจกลางจาการ์ตา และได้รับแต่งตั้งเป็นผู้จัดจำหน่ายอะไหล่แท้ Suzuki ในเดือนเดียวกัน เพื่อให้บริการอู่ซ่อมและเจ้าของรถในท้องถิ่น",
    },
    {
      title: "การส่งออกครั้งแรก",
      desc: "JMN ส่งคำสั่งซื้อแรกไปต่างประเทศ พร้อมเอกสารส่งออกครบถ้วน — Proforma Invoice, Packing List และ Certificate of Origin",
    },
    {
      title: "จัดหาหลายแบรนด์",
      desc: "แคตตาล็อกขยายจาก Suzuki ไปสู่ Toyota, Daihatsu และ Mitsubishi ทำให้ผู้ซื้อรวมหลายแบรนด์ไว้ในการจัดส่งเดียวได้",
    },
    {
      title: "{years} ปีในวงการนี้",
      desc: "พันธมิตรด้านอะไหล่ OEM ที่จัดส่งให้ผู้ซื้อในตะวันออกกลาง แอฟริกา และเอเชียตะวันออกเฉียงใต้ ด้วยคลังสินค้าในจาการ์ตาที่มีของพร้อมและแคตตาล็อกดิจิทัลที่เติบโตต่อเนื่อง",
    },
  ],
  mission: {
    title: "พันธกิจของเรา",
    desc: "ทำให้การจัดหาอะไหล่ OEM แท้เป็นเรื่องง่ายและน่าเชื่อถือ — ส่งมอบอะไหล่ที่ถูกต้อง ผ่านการตรวจสอบและมีเอกสารครบ ให้ลูกค้าทุกรายทั้งในและต่างประเทศ",
  },
  vision: {
    title: "วิสัยทัศน์ของเรา",
    desc: "เป็นสะพานที่น่าเชื่อถือที่สุดระหว่างอะไหล่ OEM ของอินโดนีเซียกับโลก — ชื่อแรกที่ผู้นำเข้านึกถึงเมื่อต้องการคุณภาพแท้ที่พึ่งพาได้",
  },
  valuesTitle: "สิ่งที่เรายึดมั่น",
  valuesSub: "หลักการเบื้องหลังทุกคำสั่งซื้อที่เราดำเนินการ",
  values: [
    {
      title: "ของแท้มาก่อน",
      desc: "อะไหล่ OEM แท้ 100% ตรวจสอบแหล่งที่มาได้ — ไม่มีของปลอมเด็ดขาด",
    },
    {
      title: "ความร่วมมือระยะยาว",
      desc: "เรามองทุกอู่ซ่อม ตัวแทนจำหน่าย และผู้นำเข้าเป็นพันธมิตร ไม่ใช่คำสั่งซื้อครั้งเดียว",
    },
    {
      title: "การจัดส่งที่เชื่อถือได้",
      desc: "หยิบสินค้าแม่นยำ เอกสารส่งออกเรียบร้อย และระยะเวลาส่งมอบที่ไว้ใจได้",
    },
    {
      title: "เครือข่ายทั่วโลก",
      desc: "ระบบโลจิสติกส์พร้อมส่งออก เชื่อมอะไหล่ OEM อินโดนีเซียกับผู้ซื้อทั่วโลก",
    },
  ],
  leadStatement:
    "ผู้จัดจำหน่ายอะไหล่แท้ Suzuki ที่ได้รับแต่งตั้งตั้งแต่ {founded} — {years} ปีของการจัดหาอะไหล่แท้จากใจกลางจาการ์ตา",
  ledBy: "นำโดย",
  ctaTitle: "มาร่วมงานกับเรา",
  ctaDesc:
    "ส่งหมายเลขอะไหล่ จำนวน และปลายทางมาให้เรา — ทีมงานตอบกลับภายในหนึ่งวันทำการ",
  contactCta: "ติดต่อเรา",
};

export const ABOUT_COPY: Record<Lang, AboutCopy> = { en, id, vi, ar, th };
