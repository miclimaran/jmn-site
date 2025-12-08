"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { COMPANY_EMAIL } from "@/components/site/constants";

export default function QuickRFQ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [incoterms, setIncoterms] = React.useState("FOB");
  const [parts, setParts] = React.useState("");

  const valid =
    name.trim() && /.+@.+\..+/.test(email) && destination.trim() && parts.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent(`RFQ — ${destination} — ${incoterms}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : "",
        `Destination: ${destination}`,
        `Incoterms: ${incoterms}`,
        "",
        "Part numbers / Qty:",
        parts,
      ]
        .filter(Boolean)
        .join("\n")
    );
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Request a Quick Quote</SheetTitle>
        </SheetHeader>

        <form onSubmit={submit} className="mt-4 grid gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Your name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Michael Limaran" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Company (optional)</label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Jaya Makmur Nugraha" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Destination country / port</label>
              <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Jebel Ali, UAE" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Incoterms</label>
              <select
                value={incoterms}
                onChange={(e) => setIncoterms(e.target.value)}
                className="mt-1 w-full rounded-xl border bg-background px-3 py-2"
              >
                {["FOB", "CIF", "CFR", "DAP", "DDP"].map((it) => (
                  <option key={it} value={it}>{it}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground">Part numbers / quantities (one per line)</label>
            <Textarea
              rows={8}
              value={parts}
              onChange={(e) => setParts(e.target.value)}
              placeholder={`e.g.\n16510-61J00-000 x 100\n89543-BZ010 x 50`}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={!valid} className="rounded-xl">
              Send RFQ via Email
            </Button>
            <span className="text-xs text-muted-foreground">We reply within 1 business day.</span>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
