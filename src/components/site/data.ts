import { Truck, Wrench, ShieldCheck, Boxes } from "lucide-react";

// --- Products ---------------------------------------------------------------
export const PRODUCTS = [
  { id: 1, brand: "suzuki", category: "Filters", code: "16510-61J00-000", name: "Oil Filter – Genuine", oem: true, models: ["Swift", "Ertiga"], image: "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, brand: "suzuki", category: "Braking", code: "55200-65G00-000", name: "Front Brake Disc", oem: true, models: ["Baleno"], image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, brand: "toyota", category: "Engine", code: "90915-YZZE1", name: "Oil Filter – Toyota", oem: true, models: ["Avanza", "Innova"], image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, brand: "daihatsu", category: "Electrical", code: "89543-BZ010", name: "ABS Sensor", oem: true, models: ["Xenia"], image: "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, brand: "mitsubishi", category: "Filters", code: "1230A040", name: "Air Filter", oem: true, models: ["Xpander"], image: "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop" },
  { id: 7, brand: "suzuki", category: "Transmission", code: "24100-52S00-000", name: "Clutch Cover Assy", oem: true, models: ["Grand Vitara"], image: "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop" },
  { id: 8, brand: "suzuki", category: "Body & Trim", code: "71720-52S00-000", name: "Front Bumper – Painted", oem: true, models: ["Ertiga"], image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop" },
] as const;
// --- Testimonials -----------------------------------------------------------
export type Testimonial = {
  name: string;
  title_en: string;
  title_id: string;
  quote_en: string;
  quote_id: string;
  image?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Budi Santoso",
    title_en: "Owner, Mitra Motor Workshop",
    title_id: "Pemilik, Bengkel Mitra Motor", // ✅ TAMBAHKAN INI
    quote_en:
      "JMN is our #1 supplier. Their parts are always genuine, and the fulfillment accuracy saves us from costly delays. Their team is knowledgeable and incredibly responsive.",
    quote_id:
      "JMN adalah pemasok #1 kami. Suku cadangnya selalu asli, dan akurasi pemenuhannya menyelamatkan kami dari penundaan yang mahal. Tim mereka berpengetahuan luas dan sangat responsif.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ahmad Yani",
    title_en: "Lead Mechanic, Jaya Abadi Service",
    title_id: "Kepala Mekanik, Servis Jaya Abadi",
    quote_en:
      "The quality of Suzuki Genuine Parts from JMN is unmatched. Our customers notice the difference, and it has improved our workshop's reputation significantly.",
    quote_id:
      "Kualitas Suku Cadang Asli Suzuki dari JMN tidak ada tandingannya. Pelanggan kami merasakan perbedaannya, dan itu telah meningkatkan reputasi bengkel kami secara signifikan.",
    image:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Rina Wijaya",
    title_en: "Procurement Manager, Global Auto Exports",
    title_id: "Manajer Pengadaan, Global Auto Exports",
    quote_en:
      "For our international clients, JMN's export documentation is always perfect. They handle consolidation and logistics professionally, making them a reliable partner for global trade.",
    quote_id:
      "Untuk klien internasional kami, dokumentasi ekspor JMN selalu sempurna. Mereka menangani konsolidasi dan logistik secara profesional, menjadikan mereka mitra yang andal untuk perdagangan global.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Adi Nugroho",
    title_en: "Procurement Lead, Nusantara Autoparts",
    title_id: "Kepala Pengadaan, Nusantara Autoparts",
    quote_en:
      "Great consolidation and fast response times. Export docs are always correct.",
    quote_id:
      "Konsolidasi rapi dan respon cepat. Dokumen ekspor selalu benar.",
    // image optional, boleh kosong
  },
];

// --- Feature bullets used on “Why Us” --------------------------------------
export const FEATURE_ITEMS = [
  { icon: Truck,       title: "Global Shipping",     desc: "Export-ready logistics network reaching Asia, Middle East, Africa, and beyond." },
  { icon: ShieldCheck, title: "100% Genuine Parts",  desc: "OEM-certified parts with verifiable origin and consistent quality." },
  { icon: Boxes,       title: "Large Inventory",     desc: "Extensive SKUs for Suzuki Genuine Parts plus Toyota, Daihatsu, Mitsubishi." },
  { icon: Wrench,      title: "Technical Support",   desc: "Assistance for fitment compatibility and part number cross-references." },
] as const;

// --- Stats displayed in Hero ------------------------------------------------
export type StatCard = { label: string; value: number; suffix?: string };

export const STAT_CARDS: StatCard[] = [
  { label: "Years in Trade", value: 12 },
  { label: "Active SKUs", value: 12000 },
  { label: "Countries Served", value: 22 },
  { label: "Fulfillment Accuracy", value: 99.5, suffix: "%" },
];


// Add this near your other exports
export const BRANDS = [
  { name: "Suzuki",     key: "suzuki",     logo: "/logos/logo_suzuki.svg" },
  { name: "Toyota",     key: "toyota",     logo: "/logos/logo_toyota.svg" },
  { name: "Daihatsu",   key: "daihatsu",   logo: "/logos/logo_daihatsu.svg" },
  { name: "Mitsubishi", key: "mitsubishi", logo: "/logos/logo_mitsubishi.svg" },
] as const;

export type Brand = typeof BRANDS[number];   // handy type for map loops
