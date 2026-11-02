"use client";

import * as React from "react";
import { ClipboardList, X } from "lucide-react";
import QuickRFQ from "@/components/site/sections/QuickRFQ";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { WHATSAPP_CONTACTS, waLink } from "@/components/site/constants";
import { useInquiryList } from "@/components/site/InquiryListContext";

const GREETING = "Hi JMN, I'd like an export quote.";

/**
 * Two persistent actions, bottom right: WhatsApp and the RFQ drawer.
 *
 * Square and flat now, matching the rest of the site, and the badge counts the
 * parts a buyer has collected while browsing the catalog.
 */
export default function FloatingContact() {
  const copy = useHomeCopy();
  const [open, setOpen] = React.useState(false);
  const [showLines, setShowLines] = React.useState(false);
  const { items } = useInquiryList();

  const single = WHATSAPP_CONTACTS.length === 1;

  return (
    <>
      <div className="fixed bottom-0 end-0 z-50 flex flex-col items-end gap-px p-3">
        {showLines && !single && (
          <div className="mb-1 flex flex-col items-end gap-px">
            {WHATSAPP_CONTACTS.map((contact) => (
              <a
                key={contact.phone}
                href={waLink(contact.phone, GREETING)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowLines(false)}
                className="btn pn bg-paper text-xs shadow-[0_1px_0_rgba(0,0,0,0.12)]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {contact.display}
              </a>
            ))}
          </div>
        )}

        <div className="flex gap-px">
          {single ? (
            <a
              href={waLink(WHATSAPP_CONTACTS[0].phone, GREETING)}
              target="_blank"
              rel="noreferrer"
              className="btn btn--ink"
              aria-label={copy.hero.whatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setShowLines((value) => !value)}
              className="btn btn--ink"
              aria-expanded={showLines}
              aria-label={copy.hero.whatsapp}
            >
              {showLines ? (
                <X className="h-5 w-5" />
              ) : (
                <WhatsAppIcon className="h-5 w-5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn btn--accent relative"
          >
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">{copy.rfq.submit}</span>
            {items.length > 0 && (
              <span className="pn absolute -top-2 end-[-0.4rem] min-w-5 border border-ink bg-paper px-1 text-[0.6875rem] font-semibold text-ink">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <QuickRFQ open={open} onOpenChange={setOpen} />
    </>
  );
}
