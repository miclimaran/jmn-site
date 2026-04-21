import { Truck, Wrench, ShieldCheck, Boxes } from "lucide-react";

// --- Products ---------------------------------------------------------------
// --- Products (Starter catalog / demo) ------------------------------------
// NOTE:
// - Use this as website starter content.
// - Verify each P/N with your pricelist/EPC before quoting customers.
// - Images are placeholders (Unsplash). Replace with your real product photos/CDN later.

export const PRODUCTS = [
  // =========================
  // SUZUKI (30 items)
  // =========================
  {
    id: 1,
    brand: "suzuki",
    category: "Filters",
    code: "16510-61J00-000",
    name: "Oil Filter Assy (Genuine)",
    oem: true,
    models: ["APV", "Ertiga", "Carry"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    brand: "suzuki",
    category: "Filters",
    code: "13780-73R00-000",
    name: "Air Filter Element (Genuine)",
    oem: true,
    models: ["Ertiga", "XL7", "Baleno"],
    image:
      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    brand: "suzuki",
    category: "Filters",
    code: "95860-62R00-000",
    name: "Cabin Filter / Pollen Filter (Verify by model)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    brand: "suzuki",
    category: "Braking",
    code: "55200-65G00-000",
    name: "Front Brake Disc (Genuine)",
    oem: true,
    models: ["Baleno"],
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    brand: "suzuki",
    category: "Braking",
    code: "55810-59R00-000",
    name: "Front Brake Pad Set (Verify by model)",
    oem: true,
    models: ["Ertiga", "XL7", "Swift"],
    image:
      "https://images.unsplash.com/photo-1600716051809-e997e11a5d52?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    brand: "suzuki",
    category: "Transmission",
    code: "24100-52S00-000",
    name: "Clutch Cover Assy (Genuine)",
    oem: true,
    models: ["Grand Vitara"],
    image:
      "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    brand: "suzuki",
    category: "Transmission",
    code: "22400-52S00-000",
    name: "Clutch Disc (Verify by model)",
    oem: true,
    models: ["Grand Vitara"],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    brand: "suzuki",
    category: "Body & Trim",
    code: "71720-52S00-000",
    name: "Front Bumper – Painted (Genuine)",
    oem: true,
    models: ["Ertiga"],
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop",
  },

  // From your real Suzuki P/N style (good for “export fast movers” demo)
  {
    id: 9,
    brand: "suzuki",
    category: "Drivetrain",
    code: "41800M68P31-000",
    name: "Drive Shaft Assy (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 10,
    brand: "suzuki",
    category: "Drivetrain",
    code: "41800M83K00-000",
    name: "Drive Shaft Assy (Verify description)",
    oem: true,
    models: ["Carry", "Ertiga"],
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 11,
    brand: "suzuki",
    category: "Transmission",
    code: "22100M86J40-000",
    name: "Clutch Cover Assy (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 12,
    brand: "suzuki",
    category: "Transmission",
    code: "22400M86J43-000",
    name: "Clutch Disc (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 13,
    brand: "suzuki",
    category: "Suspension",
    code: "48500M66R02-000",
    name: "Rear Shock Absorber Assy (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 14,
    brand: "suzuki",
    category: "Cooling",
    code: "11610M68P02-000",
    name: "Cooling Part (Radiator/Hose/Tube) — Verify",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 15,
    brand: "suzuki",
    category: "Cooling",
    code: "11620M68P01-000",
    name: "Cooling Part (Radiator/Hose/Tube) — Verify",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 16,
    brand: "suzuki",
    category: "Suspension",
    code: "41601M68P60-000",
    name: "Front Shock Absorber RH (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 17,
    brand: "suzuki",
    category: "Suspension",
    code: "41602M68P60-000",
    name: "Front Shock Absorber LH (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 18,
    brand: "suzuki",
    category: "Suspension",
    code: "41601M66R00-000",
    name: "Front Shock Absorber RH (Verify description)",
    oem: true,
    models: ["Ertiga"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 19,
    brand: "suzuki",
    category: "Suspension",
    code: "41602M66R00-000",
    name: "Front Shock Absorber LH (Verify description)",
    oem: true,
    models: ["Ertiga"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 20,
    brand: "suzuki",
    category: "Steering",
    code: "45201M66R01-000",
    name: "Steering / Joint Part (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 21,
    brand: "suzuki",
    category: "Steering",
    code: "45202M66R01-000",
    name: "Steering / Joint Part (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 22,
    brand: "suzuki",
    category: "Electrical",
    code: "33920M83K11-000",
    name: "ECU / Control Unit (Verify description)",
    oem: true,
    models: ["Carry", "Ertiga"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 23,
    brand: "suzuki",
    category: "Filters",
    code: "22400M83K02-000",
    name: "Service Part (Verify description)",
    oem: true,
    models: ["Carry"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 24,
    brand: "suzuki",
    category: "Transmission",
    code: "22100M83K40-000",
    name: "Transmission Part (Verify description)",
    oem: true,
    models: ["Carry"],
    image:
      "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 25,
    brand: "suzuki",
    category: "Transmission",
    code: "22100M67KC0-000",
    name: "Transmission Part (Verify description)",
    oem: true,
    models: ["Ertiga", "Carry"],
    image:
      "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 26,
    brand: "suzuki",
    category: "Body & Trim",
    code: "72110M67LD0-0PG",
    name: "Door / Body Part (Verify description)",
    oem: true,
    models: ["Ertiga", "XL7"],
    image:
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1200&auto=format&fit=crop",
  },
  // Extra “safe” demo items (verify PN before quoting)
  {
    id: 27,
    brand: "suzuki",
    category: "Filters",
    code: "15620-61J00-000",
    name: "Fuel Filter (Verify by model)",
    oem: true,
    models: ["Carry", "APV"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 28,
    brand: "suzuki",
    category: "Ignition",
    code: "09482-00610-000",
    name: "Spark Plug (Verify by engine)",
    oem: true,
    models: ["Ertiga", "Swift"],
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 29,
    brand: "suzuki",
    category: "Cooling",
    code: "17670-61J00-000",
    name: "Radiator Cap (Verify by model)",
    oem: true,
    models: ["Ertiga", "Carry", "APV"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 30,
    brand: "suzuki",
    category: "Electrical",
    code: "38720M66R00-000",
    name: "A/C Controller / Electrical Part (Verify description)",
    oem: true,
    models: ["Ignis", "Ertiga"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },

  // =========================
  // TOYOTA (10 items)
  // =========================
  {
    id: 31,
    brand: "toyota",
    category: "Filters",
    code: "90915-YZZE1",
    name: "Oil Filter (Toyota)",
    oem: true,
    models: ["Avanza", "Innova", "Yaris"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 32,
    brand: "toyota",
    category: "Filters",
    code: "17801-0H050",
    name: "Air Cleaner Filter Element",
    oem: true,
    models: ["Camry", "Venza"],
    image:
      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 33,
    brand: "toyota",
    category: "Filters",
    code: "87139-07010",
    name: "Cabin Air Filter (Verify by model)",
    oem: true,
    models: ["Avanza", "Innova"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 34,
    brand: "toyota",
    category: "Filters",
    code: "23300-0L041",
    name: "Fuel Filter (Verify by model)",
    oem: true,
    models: ["Hilux", "Fortuner", "Innova"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 35,
    brand: "toyota",
    category: "Braking",
    code: "04465-0K160",
    name: "Front Brake Pad Kit (Verify by model)",
    oem: true,
    models: ["Hilux", "Fortuner"],
    image:
      "https://images.unsplash.com/photo-1600716051809-e997e11a5d52?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 36,
    brand: "toyota",
    category: "Braking",
    code: "43512-0K050",
    name: "Front Brake Disc (Verify by model)",
    oem: true,
    models: ["Hilux", "Fortuner"],
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 37,
    brand: "toyota",
    category: "Ignition",
    code: "90919-01210",
    name: "Spark Plug (Verify by engine)",
    oem: true,
    models: ["Avanza", "Yaris"],
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 38,
    brand: "toyota",
    category: "Wiper",
    code: "85212-0K020",
    name: "Wiper Blade (Verify by length/model)",
    oem: true,
    models: ["Avanza", "Innova"],
    image:
      "https://images.unsplash.com/photo-1616893232470-2e0b2b2b85d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 39,
    brand: "toyota",
    category: "Cooling",
    code: "16401-0H010",
    name: "Radiator Cap (Verify by model)",
    oem: true,
    models: ["Avanza", "Innova"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 40,
    brand: "toyota",
    category: "Electrical",
    code: "89465-0D240",
    name: "Oxygen Sensor (Verify by model)",
    oem: true,
    models: ["Innova", "Fortuner"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },

  // =========================
  // DAIHATSU (10 items)
  // =========================
  {
    id: 41,
    brand: "daihatsu",
    category: "Filters",
    code: "15601-BZ010-001",
    name: "Oil Filter (Daihatsu)",
    oem: true,
    models: ["Xenia", "Terios", "Gran Max"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 42,
    brand: "daihatsu",
    category: "Filters",
    code: "17801-BZ010-008",
    name: "Air Filter (Verify by model)",
    oem: true,
    models: ["Xenia", "Ayla", "Sigra"],
    image:
      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 43,
    brand: "daihatsu",
    category: "Filters",
    code: "87139-BZ020",
    name: "Cabin Air Filter (Verify by model)",
    oem: true,
    models: ["Xenia", "Terios"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 44,
    brand: "daihatsu",
    category: "Braking",
    code: "04465-BZ010",
    name: "Front Brake Pad (Verify by model)",
    oem: true,
    models: ["Xenia", "Terios", "Gran Max"],
    image:
      "https://images.unsplash.com/photo-1600716051809-e997e11a5d52?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 45,
    brand: "daihatsu",
    category: "Electrical",
    code: "89543-BZ010",
    name: "ABS Sensor (Genuine)",
    oem: true,
    models: ["Xenia"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 46,
    brand: "daihatsu",
    category: "Filters",
    code: "23300-BZ010",
    name: "Fuel Filter (Verify by model)",
    oem: true,
    models: ["Xenia", "Gran Max"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 47,
    brand: "daihatsu",
    category: "Suspension",
    code: "D48510-BZ110-001",
    name: "Front Shock Absorber (Verify RH/LH)",
    oem: true,
    models: ["Xenia", "Terios"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 48,
    brand: "daihatsu",
    category: "Transmission",
    code: "D31210-BZ160-001",
    name: "Clutch Cover (Verify by model)",
    oem: true,
    models: ["Gran Max", "Xenia"],
    image:
      "https://images.unsplash.com/photo-1585011661362-3797a54b9beb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 49,
    brand: "daihatsu",
    category: "Wiper",
    code: "85214-BZ010",
    name: "Wiper Blade (Verify by length/model)",
    oem: true,
    models: ["Xenia", "Ayla"],
    image:
      "https://images.unsplash.com/photo-1616893232470-2e0b2b2b85d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 50,
    brand: "daihatsu",
    category: "Cooling",
    code: "16401-BZ010",
    name: "Radiator Cap (Verify by model)",
    oem: true,
    models: ["Xenia", "Terios"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },

  // =========================
  // MITSUBISHI (10 items)
  // =========================
  {
    id: 51,
    brand: "mitsubishi",
    category: "Filters",
    code: "MD360935",
    name: "Oil Filter (Mitsubishi)",
    oem: true,
    models: ["Xpander", "Pajero Sport", "L300"],
    image:
      "https://images.unsplash.com/photo-1610893396510-df6f0050a17b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 52,
    brand: "mitsubishi",
    category: "Filters",
    code: "1500A023",
    name: "Engine Air Filter",
    oem: true,
    models: ["Outlander", "ASX", "Delica"],
    image:
      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 53,
    brand: "mitsubishi",
    category: "Filters",
    code: "7803A005",
    name: "Cabin Air Filter / Air Refresher Assy",
    oem: true,
    models: ["Delica D:5", "Outlander"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 54,
    brand: "mitsubishi",
    category: "Ignition",
    code: "MN163807",
    name: "Spark Plug (Iridium/Long Life — Verify by engine)",
    oem: true,
    models: ["Xpander", "Outlander"],
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 55,
    brand: "mitsubishi",
    category: "Braking",
    code: "4605A336",
    name: "Front Brake Pad Set (Verify by model)",
    oem: true,
    models: ["Xpander", "Pajero Sport"],
    image:
      "https://images.unsplash.com/photo-1600716051809-e997e11a5d52?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 56,
    brand: "mitsubishi",
    category: "Braking",
    code: "4615A125",
    name: "Front Brake Disc (Verify by model)",
    oem: true,
    models: ["Xpander", "Pajero Sport"],
    image:
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 57,
    brand: "mitsubishi",
    category: "Suspension",
    code: "4060A512",
    name: "Front Shock Absorber (Verify RH/LH)",
    oem: true,
    models: ["Xpander"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 58,
    brand: "mitsubishi",
    category: "Electrical",
    code: "1860A057",
    name: "Oxygen Sensor (Verify by model)",
    oem: true,
    models: ["Xpander", "Outlander"],
    image:
      "https://images.unsplash.com/photo-1586878340761-8a62f3a75b2b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 59,
    brand: "mitsubishi",
    category: "Wiper",
    code: "8250A314",
    name: "Wiper Blade (Verify by length/model)",
    oem: true,
    models: ["Xpander", "Pajero Sport"],
    image:
      "https://images.unsplash.com/photo-1616893232470-2e0b2b2b85d7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 60,
    brand: "mitsubishi",
    category: "Cooling",
    code: "1300A083",
    name: "Thermostat / Cooling Part (Verify by engine)",
    oem: true,
    models: ["Xpander", "Outlander"],
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1200&auto=format&fit=crop",
  },
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
