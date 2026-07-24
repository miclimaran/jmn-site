import { NextResponse } from "next/server";
import {
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  WHATSAPP_PHONE,
} from "@/components/site/constants";

function escapeVCard(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

export async function GET() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;JMN Parts;;;",
    "FN:JMN Parts (PT. Jaya Makmur Nugraha)",
    "ORG:PT. Jaya Makmur Nugraha",
    "TITLE:Suzuki Genuine Parts Distributor & Exporter",
    `TEL;TYPE=CELL,VOICE:${WHATSAPP_PHONE}`,
    `EMAIL:${escapeVCard(COMPANY_EMAIL)}`,
    `ADR;TYPE=WORK:;;${escapeVCard(COMPANY_ADDRESS)};;;;`,
    "URL:https://jmnautoparts.com",
    "NOTE:Authorized Suzuki Genuine Parts distributor. Export to 22+ countries.",
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jmn-parts-contact.vcf"',
    },
  });
}
