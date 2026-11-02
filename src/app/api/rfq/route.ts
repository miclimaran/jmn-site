import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * RFQ intake.
 *
 * Accepts multipart/form-data so a buyer can attach the spreadsheet they
 * already keep their requirements in (xlsx/xls/csv, 5 MB cap), and still
 * accepts a JSON body for any older client.
 *
 * Every value is escaped before it goes into the HTML mail: these fields are
 * attacker-controlled and the mail lands in the owner's inbox.
 */

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXT = /\.(xlsx|xls|csv)$/i;

type Payload = {
  name: string;
  email: string;
  company: string;
  destination: string;
  incoterms: string;
  parts: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const str = (value: FormDataEntryValue | undefined | null) =>
  typeof value === "string" ? value.trim() : "";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") ?? "";
    let data: Payload;
    let attachment: { filename: string; content: Buffer } | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      data = {
        name: str(form.get("name")),
        email: str(form.get("email")),
        company: str(form.get("company")),
        destination: str(form.get("destination")),
        incoterms: str(form.get("incoterms")) || "FOB",
        parts: str(form.get("parts")),
      };

      const file = form.get("file");
      if (file && typeof file !== "string") {
        if (!ALLOWED_EXT.test(file.name)) {
          return NextResponse.json(
            { error: "Attach an XLSX, XLS or CSV file." },
            { status: 400 },
          );
        }
        if (file.size > MAX_BYTES) {
          return NextResponse.json(
            { error: "That file is larger than 5 MB." },
            { status: 400 },
          );
        }
        attachment = {
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        };
      }
    } else {
      const body = await req.json();
      data = {
        name: str(body.name),
        email: str(body.email),
        company: str(body.company),
        destination: str(body.destination),
        incoterms: str(body.incoterms) || "FOB",
        parts: str(body.parts),
      };
    }

    // A list is required, unless the list came as the attachment.
    if (!data.name || !data.email || !data.destination) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }
    if (!data.parts && !attachment) {
      return NextResponse.json(
        { error: "Add your part numbers, or attach the file." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const toAddress = process.env.RFQ_TO_EMAIL ?? "jaya_makmur_nugraha@yahoo.com";

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:6px 16px 6px 0;color:#807e77;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:6px 0;color:#171716;">${value}</td>
      </tr>`;

    const { error } = await resend.emails.send({
      from: "JMN Parts RFQ <onboarding@resend.dev>",
      to: [toAddress],
      replyTo: data.email,
      subject: `RFQ — ${data.destination} — ${data.incoterms} — ${data.name}`,
      ...(attachment ? { attachments: [attachment] } : {}),
      html: `
        <div style="font-family:ui-sans-serif,system-ui,Arial,sans-serif;max-width:640px;margin:0 auto;color:#171716;">
          <p style="margin:0 0 16px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#807e77;">
            Request for quotation
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row("Name", escapeHtml(data.name))}
            ${row("Email", `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`)}
            ${data.company ? row("Company", escapeHtml(data.company)) : ""}
            ${row("Destination", escapeHtml(data.destination))}
            ${row("Incoterms", `<strong>${escapeHtml(data.incoterms)}</strong>`)}
            ${attachment ? row("Attachment", escapeHtml(attachment.filename)) : ""}
          </table>

          ${
            data.parts
              ? `<p style="margin:24px 0 8px;font-size:13px;color:#807e77;">Part numbers and quantities</p>
                 <pre style="margin:0;padding:16px;border:1px solid #ddddd7;background:#f6f6f4;font-size:13px;font-family:ui-monospace,SFMono-Regular,monospace;white-space:pre-wrap;word-break:break-word;">${escapeHtml(
                   data.parts,
                 )}</pre>`
              : ""
          }

          <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #ddddd7;font-size:13px;color:#55544f;">
            Reply to this email to answer ${escapeHtml(data.email)} directly.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send. Please try again or contact us directly." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RFQ send error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again or contact us directly." },
      { status: 500 },
    );
  }
}
