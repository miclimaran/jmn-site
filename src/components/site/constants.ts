// Contact
export const COMPANY_EMAIL = "jaya_makmur_nugraha@yahoo.com";
export const WHATSAPP_PHONE = "+6281310108525"; // E.164 format

// Friendly phone text + tel: link
export const COMPANY_PHONE_DISPLAY = "(+62) 813-1010-8525";
export const COMPANY_PHONE_TEL = `tel:${WHATSAPP_PHONE.replace(/[^\d+]/g, "")}`;

// Precompute a clean WA number (digits only, for wa.me)
export const WHATSAPP_NUMBER_DIGITS = WHATSAPP_PHONE.replace(/[^\d]/g, "");

// Social media
export const SOCIALS = {
  instagram: "https://instagram.com/jmn.parts",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER_DIGITS}`,
  wechatId: "JMN_Official",   // display as text
  wechatQr: "/wechat-qr.png", // put the QR image in /public
};

// Address
export const COMPANY_ADDRESS =
  "Jl. Karang Anyar Permai 55 Blok C1.4, Daerah Khusus Ibukota Jakarta 10740, Indonesia";

// Google Maps — ONLY the URL string from <iframe src="...">
export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.832036069077!2d106.82590521088856!3d-6.153244660287454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f554b1ef0cc7%3A0xabf6b774dbe1df71!2sPT.%20Jaya%20Makmur%20Nugraha%20(Sparepart%20Dealer%20Suzuki)!5e0!3m2!1sen!2sid!4v1760435092493!5m2!1sen!2sid";

// “View on Google Maps” link (you can keep this or replace with your Share link)
export const MAP_LINK =
  "https://maps.app.goo.gl/WsKKnHDvsYSHskJo9";
