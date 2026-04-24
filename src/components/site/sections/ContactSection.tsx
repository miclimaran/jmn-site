"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";
import {
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_TEL,
  COMPANY_ADDRESS,
  MAP_LINK,
  WHATSAPP_PHONE,
} from "@/components/site/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactSection() {
  const t = useT();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const valid = name.trim() && /.+@.+\..+/.test(email) && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subject = encodeURIComponent("Inquiry from JMN Website");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <FadeIn>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
                {t("contact_title")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("contact_desc")}</p>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <a className="underline underline-offset-4" href={`mailto:${COMPANY_EMAIL}`}>
                    {COMPANY_EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <a className="underline underline-offset-4" href={COMPANY_PHONE_TEL}>
                    {COMPANY_PHONE_DISPLAY}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" />
                  <a
                    className="underline underline-offset-4"
                    href={MAP_LINK}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {COMPANY_ADDRESS}
                  </a>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("faq_fast")}</AccordionTrigger>
                  <AccordionContent>{t("faq_fast_a")}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("faq_ship")}</AccordionTrigger>
                  <AccordionContent>{t("faq_ship_a")}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="rounded-2xl p-6 shadow-lg">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">
                      {t("contact_name")}
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">
                      {t("contact_email")}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">
                    {t("contact_message")}
                  </label>
                  <Textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="List your part numbers / models / quantities or ask anything..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button type="submit" disabled={!valid} className="rounded-xl bg-[linear-gradient(135deg,#111827_0%,#374151_100%)] px-5 text-white shadow-[0_18px_42px_-24px_rgba(17,24,39,0.55)] hover:brightness-110">
                    {t("contact_send")}
                  </Button>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-4 py-2 font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-100"
                  >
                    <Phone className="h-4 w-4" /> {t("contact_chat")}
                  </a>
                </div>
              </form>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
