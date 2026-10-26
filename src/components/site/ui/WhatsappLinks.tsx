"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_CONTACTS, waLink } from "@/components/site/constants";

/**
 * One WhatsApp button per line.
 *
 * The number itself is the label rather than "Chat on WhatsApp" repeated twice,
 * which would leave the reader guessing what separates the two buttons. Numbers
 * stay in +62 form: a buyer in Dubai or Lagos cannot dial 0813.
 *
 * Renders a single button automatically when only one line is configured, so
 * call sites never need to branch on the count.
 */
export default function WhatsappLinks({
  message,
  className = "",
}: {
  /** Pre-filled chat message. */
  message?: string;
  /** Classes for each button. */
  className?: string;
}) {
  return (
    <>
      {WHATSAPP_CONTACTS.map((contact) => (
        <a
          key={contact.phone}
          href={waLink(contact.phone, message)}
          target="_blank"
          rel="noreferrer"
          className={className}
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          {contact.display}
        </a>
      ))}
    </>
  );
}
