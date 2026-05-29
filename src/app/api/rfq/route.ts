import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, destination, incoterms, parts } = body;

    // Basic validation
    if (!name || !email || !destination || !parts) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "Email service not configured. Please contact us directly." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const toAddress = process.env.RFQ_TO_EMAIL ?? "jaya_makmur_nugraha@yahoo.com";

    const { error } = await resend.emails.send({
      from: "JMN Parts RFQ <onboarding@resend.dev>",
      to: [toAddress],
      reply_to: email,
      subject: `RFQ — ${destination} — ${incoterms} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1f2937; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">📦 New RFQ Received</h2>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Company</td>
                <td style="padding: 8px 0;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Destination</td>
                <td style="padding: 8px 0;">${destination}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Incoterms</td>
                <td style="padding: 8px 0;"><strong>${incoterms}</strong></td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="color: #6b7280; margin-bottom: 8px;">Part Numbers / Quantities:</p>
              <pre style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 16px; border-radius: 6px; font-size: 13px; white-space: pre-wrap; word-break: break-word;">${parts}</pre>
            </div>

            <div style="margin-top: 24px; padding: 16px; background: #f0fdf4; border-radius: 6px; border-left: 4px solid #22c55e;">
              <p style="margin: 0; font-size: 13px; color: #166534;">
                Reply directly to this email to respond to the buyer at <strong>${email}</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send. Please try again or contact us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RFQ send error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}
