// Site
export const SITE_URL = "https://jmnautoparts.com";
export const SITE_NAME = "PT. Jaya Makmur Nugraha";

// Contact
export const COMPANY_EMAIL = "jaya_makmur_nugraha@yahoo.com";

export type WhatsappContact = {
  /** E.164, leading + included. */
  phone: string;
  /** Human-readable form for on-page text. */
  display: string;
};

/**
 * WhatsApp lines, in priority order.
 *
 * Surfaces that list ways to reach us (contact page, footer) show every entry.
 * Single-action buttons — the floating bubble, the per-product enquiry links —
 * deliberately use `WHATSAPP_PRIMARY` only: making someone choose a number
 * before they can ask a question costs more enquiries than a second line wins.
 */
export const WHATSAPP_CONTACTS: WhatsappContact[] = [
  { phone: "+6281310108525", display: "(+62) 813-1010-8525" },
  { phone: "+6281289968210", display: "(+62) 812-8996-8210" },
];

export const WHATSAPP_PRIMARY = WHATSAPP_CONTACTS[0];

/** wa.me rejects the leading +, so strip to digits for every link. */
export const waDigits = (phone: string) => phone.replace(/[^\d]/g, "");

/** Builds a wa.me link, optionally pre-filling the message. */
export const waLink = (phone: string, text?: string) =>
  `https://wa.me/${waDigits(phone)}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

/** tel: href for a contact. */
export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

// Primary-line aliases. Existing call sites keep working unchanged, and
// anything that needs both lines reads WHATSAPP_CONTACTS instead.
export const WHATSAPP_PHONE = WHATSAPP_PRIMARY.phone;
export const COMPANY_PHONE_DISPLAY = WHATSAPP_PRIMARY.display;
export const COMPANY_PHONE_TEL = telLink(WHATSAPP_PRIMARY.phone);
export const WHATSAPP_NUMBER_DIGITS = waDigits(WHATSAPP_PRIMARY.phone);

// Social media
export const SOCIALS = {
  instagram: "https://instagram.com/jmn.parts",
  whatsapp: `https://wa.me/${WHATSAPP_NUMBER_DIGITS}`,
  zalo: `https://zalo.me/${WHATSAPP_NUMBER_DIGITS}`,
  wechatId: "JMN_Official", // display as text
  wechatQr: "/wechat-qr.png", // put the QR image in /public
};

// Address
export const COMPANY_ADDRESS =
  "Jl. Karang Anyar Permai 55 Blok C1.4, Daerah Khusus Ibukota Jakarta 10740, Indonesia";

// Google Maps - ONLY the URL string from <iframe src="...">
export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.832036069077!2d106.82590521088856!3d-6.153244660287454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f554b1ef0cc7%3A0xabf6b774dbe1df71!2sPT.%20Jaya%20Makmur%20Nugraha%20(Sparepart%20Dealer%20Suzuki)!5e0!3m2!1sen!2sid!4v1760435092493!5m2!1sen!2sid";

// "View on Google Maps" link (you can keep this or replace with your Share link)
export const MAP_LINK =
  "https://maps.app.goo.gl/WsKKnHDvsYSHskJo9";

// Company history
// JMN was founded and became an authorized Suzuki Genuine Parts distributor in
// the same month, October 1989.
export const FOUNDED_YEAR = 1989;
export const FOUNDED_MONTH = 10; // October
export const FOUNDED_LABEL = "October 1989";

/**
 * Completed years in business, counted from the founding month so the figure is
 * never overstated. Derived rather than hardcoded — the previous "12" had gone
 * stale by more than two decades.
 */
export function yearsInTrade(now: Date = new Date()): number {
  const years = now.getFullYear() - FOUNDED_YEAR;
  const beforeAnniversary = now.getMonth() + 1 < FOUNDED_MONTH;
  return beforeAnniversary ? years - 1 : years;
}

// Leadership
export const COMPANY_DIRECTOR = "Solaiman Limaran";
export const COMPANY_DIRECTOR_TITLE_EN = "President Director";
export const COMPANY_DIRECTOR_TITLE_ID = "Direktur Utama";
