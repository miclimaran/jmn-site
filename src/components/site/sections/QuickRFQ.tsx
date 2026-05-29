"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { COMPANY_EMAIL } from "@/components/site/constants";

type Status = "idle" | "loading" | "success" | "error";

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
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  const valid =
    name.trim() && /.+@.+\..+/.test(email) && destination.trim() && parts.trim();

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setDestination("");
    setIncoterms("FOB");
    setParts("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = (v: boolean) => {
    if (!v && status === "success") resetForm();
    onOpenChange(v);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, destination, incoterms, parts }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send. Please try again.";
      setErrorMsg(message);
      setStatus("error");
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Request a Quick Quote</SheetTitle>
        </SheetHeader>

        {/* ── Success state ── */}
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <div className="rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold">RFQ Sent Successfully!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We will reply to <strong>{email}</strong> within 1 business day.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2 rounded-xl"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={submit} className="mt-4 grid gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Your name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Michael Limaran"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Company (optional)</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Jaya Makmur Nugraha"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Destination country / port</label>
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Jebel Ali, UAE"
                  disabled={status === "loading"}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Incoterms</label>
                <select
                  value={incoterms}
                  onChange={(e) => setIncoterms(e.target.value)}
                  disabled={status === "loading"}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 disabled:opacity-50"
                >
                  {["FOB", "CIF", "CFR", "DAP", "DDP"].map((it) => (
                    <option key={it} value={it}>{it}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">
                Part numbers / quantities (one per line)
              </label>
              <Textarea
                rows={8}
                value={parts}
                onChange={(e) => setParts(e.target.value)}
                placeholder={`e.g.\n16510-61J00-000 x 100\n89543-BZ010 x 50`}
                disabled={status === "loading"}
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {errorMsg}{" "}
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="underline hover:no-underline"
                  >
                    Email us directly
                  </a>
                  .
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button
                type="submit"
                disabled={!valid || status === "loading"}
                className="rounded-xl"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Send RFQ"
                )}
              </Button>
              <span className="text-xs text-muted-foreground">
                We reply within 1 business day.
              </span>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
