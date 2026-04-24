"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Globe2 } from "lucide-react";
import FadeIn from "@/components/site/ui/FadeIn";
import { useT } from "@/components/site/Lang";


export default function ExportSection() {
const t = useT();
return (
<section id="export" className="py-20">
<div className="container max-w-7xl mx-auto px-4">
<div className="grid md:grid-cols-2 gap-10 items-center">
<FadeIn>
<h2 className="text-2xl md:text-4xl font-semibold tracking-tight">{t("export_title")}</h2>
<p className="mt-3 text-muted-foreground">{t("export_desc")}</p>
<ul className="mt-4 space-y-3 text-sm">
<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" /> {t("export_b1")}</li>
<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" /> {t("export_b2")}</li>
<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" /> {t("export_b3")}</li>
</ul>
<div className="mt-6"><a href="/contact"><Button className="rounded-2xl bg-[linear-gradient(135deg,#1f2937_0%,#111827_100%)] px-6 text-white shadow-[0_18px_42px_-22px_rgba(17,24,39,0.6)] hover:brightness-110">{t("discuss_shipment")}</Button></a></div>
</FadeIn>
<FadeIn delay={0.05}>
<div className="relative aspect-[4/3] rounded-3xl border grid place-items-center overflow-hidden">
<Globe2 className="h-20 w-20" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.15),transparent_50%)]" />
</div>
</FadeIn>
</div>
</div>
</section>
);
}
