"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ClipboardList } from "lucide-react";
import QuickRFQ from "@/components/site/sections/QuickRFQ";
import { WHATSAPP_PHONE } from "@/components/site/constants";

export default function FloatingContact() {
  const [open, setOpen] = React.useState(false);
  const waNumber = WHATSAPP_PHONE.replace(/[^\d]/g, "");
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hi JMN, I'd like an export quote."
  )}`;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex gap-2">
        <a href={waHref} target="_blank" rel="noreferrer">
          <Button className="rounded-full h-12 w-12" aria-label="WhatsApp">
            <MessageCircle className="h-5 w-5" />
          </Button>
        </a>
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full h-12 px-4 inline-flex items-center gap-2"
        >
          <ClipboardList className="h-5 w-5" />
          <span className="hidden sm:inline">Quick RFQ</span>
        </Button>
      </div>
      <QuickRFQ open={open} onOpenChange={setOpen} />
    </>
  );
}
