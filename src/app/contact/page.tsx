import type { Metadata } from "next";
import ContactSection from "@/components/site/sections/ContactSection";
import MapSection from "@/components/site/sections/MapSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with PT. Jaya Makmur Nugraha for spare parts inquiries, export quotes, or business partnerships. Located in Jakarta, Indonesia.",
  alternates: {
    canonical: "https://jmnautoparts.com/contact",
  },
  openGraph: {
    title: "Contact Us | JMN Parts",
    description:
      "Reach out for parts inquiries, export quotes, or business partnerships. Jakarta, Indonesia.",
    url: "https://jmnautoparts.com/contact",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
      <MapSection />
    </main>
  );
}
