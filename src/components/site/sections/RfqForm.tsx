"use client";

import * as React from "react";
import { Paperclip, X } from "lucide-react";
import { useHomeCopy } from "@/components/site/useHomeCopy";
import { useInquiryList } from "@/components/site/InquiryListContext";
import {
  COMPANY_EMAIL,
  WHATSAPP_PRIMARY,
  waLink,
} from "@/components/site/constants";

type Status = "idle" | "sending" | "sent" | "error";

const INCOTERMS = ["FOB", "CFR", "CIF", "DAP", "FCA", "EXW"] as const;

const MAX_BYTES = 5 * 1024 * 1024;
const ACCEPT = ".xlsx,.xls,.csv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const ALLOWED_EXT = /\.(xlsx|xls|csv)$/i;

/**
 * The one RFQ form on the site.
 *
 * Used inline on the homepage and inside the floating sheet, so a buyer never
 * meets two different forms that ask for different things. Posts multipart —
 * importers keep their requirements in a spreadsheet, and asking them to retype
 * 200 lines into a textarea is how an RFQ turns into "I'll ask someone else".
 *
 * Parts already added to the inquiry list prefill the textarea.
 */
export default function RfqForm({ compact = false }: { compact?: boolean }) {
  const copy = useHomeCopy();
  const { items, clear } = useInquiryList();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [incoterms, setIncoterms] = React.useState<string>(INCOTERMS[0]);
  const [lines, setLines] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState("");

  const fileInput = React.useRef<HTMLInputElement>(null);
  const prefilled = React.useRef(false);

  // Prefill once from the inquiry list, and never overwrite typing.
  React.useEffect(() => {
    if (prefilled.current || items.length === 0 || lines.trim() !== "") return;
    setLines(items.map((item) => `${item.code}  x `).join("\n"));
    prefilled.current = true;
  }, [items, lines]);

  const valid =
    name.trim() !== "" &&
    /.+@.+\..+/.test(email) &&
    destination.trim() !== "" &&
    (lines.trim() !== "" || file !== null);

  const pickFile = (chosen: File | null) => {
    setError("");
    if (!chosen) {
      setFile(null);
      return;
    }
    if (!ALLOWED_EXT.test(chosen.name)) {
      setError(copy.rfq.fileWrongType);
      return;
    }
    if (chosen.size > MAX_BYTES) {
      setError(copy.rfq.fileTooBig);
      return;
    }
    setFile(chosen);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!valid || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const payload = new FormData();
      payload.set("name", name);
      payload.set("email", email);
      payload.set("company", company);
      payload.set("destination", destination);
      payload.set("incoterms", incoterms);
      payload.set("parts", lines);
      if (file) payload.set("file", file);

      const res = await fetch("/api/rfq", { method: "POST", body: payload });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Failed to send.");

      setStatus("sent");
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send.");
      setStatus("error");
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setCompany("");
    setDestination("");
    setIncoterms(INCOTERMS[0]);
    setLines("");
    setFile(null);
    setStatus("idle");
    setError("");
    prefilled.current = false;
  };

  if (status === "sent") {
    return (
      <div className="hair bg-paper p-6">
        <p className="text-[0.9375rem] font-semibold">{copy.rfq.sentTitle}</p>
        <p className="mt-2 text-sm text-ink-2">
          {copy.rfq.sentBody} <span className="pn">{email}</span>.
        </p>
        <button type="button" onClick={reset} className="btn mt-5">
          {copy.rfq.sentAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "" : "hair bg-paper p-5 sm:p-6"}>
      {!compact && (
        <>
          <h3 className="text-[0.9375rem] font-semibold">{copy.rfq.title}</h3>
          <p className="mt-1.5 text-sm text-ink-2">{copy.rfq.lead}</p>
        </>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="rfq-name">
            {copy.rfq.name}
          </label>
          <input
            id="rfq-name"
            className="field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="rfq-email">
            {copy.rfq.email}
          </label>
          <input
            id="rfq-email"
            type="email"
            className="field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="rfq-company">
            {copy.rfq.company}
          </label>
          <input
            id="rfq-company"
            className="field"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            autoComplete="organization"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="rfq-dest">
            {copy.rfq.destination}
          </label>
          <input
            id="rfq-dest"
            className="field"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            placeholder={copy.rfq.destinationPlaceholder}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="rfq-incoterms">
            {copy.rfq.incoterms}
          </label>
          <select
            id="rfq-incoterms"
            className="field pn"
            value={incoterms}
            onChange={(event) => setIncoterms(event.target.value)}
          >
            {INCOTERMS.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col justify-end">
          {file ? (
            <div className="flex items-center justify-between gap-3 border border-line-strong px-3 py-2">
              <span className="truncate text-sm">{file.name}</span>
              <button
                type="button"
                onClick={() => pickFile(null)}
                aria-label="Remove attachment"
                className="text-ink-3 hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="btn btn--quiet w-full"
            >
              <Paperclip className="h-4 w-4" />
              {copy.rfq.file}
            </button>
          )}
          <input
            ref={fileInput}
            type="file"
            accept={ACCEPT}
            className="hidden"
            onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
          />
          <p className="mt-1.5 text-xs text-ink-3">{copy.rfq.fileHint}</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="field-label" htmlFor="rfq-lines">
          {copy.rfq.lines}
        </label>
        <textarea
          id="rfq-lines"
          rows={compact ? 6 : 8}
          className="field pn text-sm"
          value={lines}
          onChange={(event) => setLines(event.target.value)}
          placeholder={copy.rfq.linesPlaceholder}
          spellCheck={false}
        />
      </div>

      {error && (
        <p className="mt-3 border-s-2 border-accent bg-accent-wash px-3 py-2 text-sm text-ink">
          {error}{" "}
          <a
            href={`mailto:${COMPANY_EMAIL}`}
            className="pn underline underline-offset-2"
          >
            {COMPANY_EMAIL}
          </a>
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn btn--accent"
          disabled={!valid || status === "sending"}
        >
          {status === "sending" ? `${copy.rfq.sending}…` : copy.rfq.submit}
        </button>
        <a
          href={waLink(WHATSAPP_PRIMARY.phone, "Hi JMN, I have an RFQ.")}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-ink-2 underline underline-offset-4 hover:text-accent"
        >
          {copy.rfq.orWhatsapp}
        </a>
      </div>
    </form>
  );
}
