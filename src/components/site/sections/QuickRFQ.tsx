"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import RfqForm from "@/components/site/sections/RfqForm";
import { useHomeCopy } from "@/components/site/useHomeCopy";

/**
 * The floating RFQ panel.
 *
 * It used to carry its own copy of the form, which drifted from the one on the
 * contact page — different fields, no attachment, a different success message.
 * Now it is a drawer around the single <RfqForm />.
 */
export default function QuickRFQ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const copy = useHomeCopy();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[92vh] overflow-y-auto rounded-none border-line bg-paper px-4 pb-8 sm:px-6"
      >
        <SheetHeader className="px-0">
          <SheetTitle className="text-base font-semibold">
            {copy.rfq.title}
          </SheetTitle>
          <p className="text-sm text-ink-2">{copy.rfq.lead}</p>
        </SheetHeader>

        <div className="mx-auto w-full max-w-3xl">
          <RfqForm compact />
        </div>
      </SheetContent>
    </Sheet>
  );
}
