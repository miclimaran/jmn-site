"use client";

import Section from "@/components/site/sections/Section";
import RfqForm from "@/components/site/sections/RfqForm";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { withMissing } from "@/components/site/ui/Missing";
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  MAP_EMBED_SRC,
  MAP_LINK,
  WHATSAPP_CONTACTS,
  waLink,
} from "@/components/site/constants";

/**
 * Contact and RFQ, in one section.
 *
 * They used to be two separate blocks ("Contact Us" and "Our Location") with a
 * heading each and a generic message box. A buyer wants one place: who to write
 * to, where the warehouse is, and the form that takes a part-number list.
 */
export default function ContactRfq({ index }: { index?: string }) {
  const copy = useHomeCopy();

  return (
    <Section
      id="rfq"
      index={index}
      title={copy.contact.title}
      lead={copy.contact.lead}
    >
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <table className="spec">
            <tbody>
              <tr>
                <th scope="row">{copy.contact.emailLabel}</th>
                <td>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="pn text-ink underline underline-offset-4 hover:text-accent"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">{copy.contact.phoneLabel}</th>
                <td>
                  {WHATSAPP_CONTACTS.map((contact) => (
                    <a
                      key={contact.phone}
                      href={waLink(contact.phone, "Hi JMN, I have an RFQ.")}
                      target="_blank"
                      rel="noreferrer"
                      className="pn block text-ink underline underline-offset-4 hover:text-accent"
                    >
                      {contact.display}
                    </a>
                  ))}
                </td>
              </tr>
              <tr>
                <th scope="row">{copy.contact.addressLabel}</th>
                <td>
                  {COMPANY_ADDRESS}
                  <br />
                  <a
                    href={MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink underline underline-offset-4 hover:text-accent"
                  >
                    {copy.contact.mapLink}
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">{copy.contact.hoursLabel}</th>
                <td>{withMissing(copy.contact.hours)}</td>
              </tr>
            </tbody>
          </table>

          <a
            href="/api/vcard"
            download="jmn-parts-contact.vcf"
            className="btn mt-6"
          >
            {copy.contact.vcard}
          </a>

          <div className="mt-8 aspect-[4/3] w-full overflow-hidden border border-line">
            <iframe
              src={MAP_EMBED_SRC}
              title={copy.contact.addressLabel}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <RfqForm />
      </div>
    </Section>
  );
}
