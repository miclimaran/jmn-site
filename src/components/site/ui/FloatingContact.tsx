"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ClipboardList, X } from "lucide-react";
import QuickRFQ from "@/components/site/sections/QuickRFQ";
import { WHATSAPP_CONTACTS, waLink } from "@/components/site/constants";
import { useInquiryList } from "@/components/site/InquiryListContext";

const GREETING = "Hi JMN, I'd like an export quote.";

export default function FloatingContact() {
  const [open, setOpen] = React.useState(false);
  const [showLines, setShowLines] = React.useState(false);
  const { items } = useInquiryList();

  // With a single line the bubble stays a one-tap link — making someone open a
  // menu to reach the only number there is would be pure friction.
  const single = WHATSAPP_CONTACTS.length === 1;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {/* Lines fan out above the bubble so the bubble itself keeps its spot. */}
        {showLines && !single && (
          <div className="flex flex-col items-end gap-2">
            {WHATSAPP_CONTACTS.map((contact) => (
              <a
                key={contact.phone}
                href={waLink(contact.phone, GREETING)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowLines(false)}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-white px-4 py-2.5 text-sm font-medium text-emerald-700 shadow-lg transition hover:bg-emerald-50"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                {contact.display}
              </a>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {single ? (
            <a
              href={waLink(WHATSAPP_CONTACTS[0].phone, GREETING)}
              target="_blank"
              rel="noreferrer"
            >
              <Button className="h-12 w-12 rounded-full" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </a>
          ) : (
            <Button
              onClick={() => setShowLines((v) => !v)}
              className="h-12 w-12 rounded-full"
              aria-expanded={showLines}
              aria-label={
                showLines ? "Close WhatsApp numbers" : "Show WhatsApp numbers"
              }
            >
              {showLines ? (
                <X className="h-5 w-5" />
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button
            onClick={() => setOpen(true)}
            className="relative inline-flex h-12 items-center gap-2 rounded-full px-4"
          >
            <ClipboardList className="h-5 w-5" />
            <span className="hidden sm:inline">Quick RFQ</span>
            {items.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-semibold text-white">
                {items.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      <QuickRFQ open={open} onOpenChange={setOpen} />
    </>
  );
}
