"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ChevronRight, Mail, Phone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import BrandBadge from "@/components/site/ui/BrandBadge";
import { WHATSAPP_PHONE } from "@/components/site/constants";


export default function ProductCard({ p, onQuickView }: { p: any; onQuickView: (p: any) => void }) {
return (
<Card className="group overflow-hidden hover:shadow-xl transition-shadow duration-300">
<div className="relative h-44 w-full overflow-hidden">
<motion.img src={p.image} alt={p.name} className="h-full w-full object-cover" whileHover={{ scale: 1.06 }} transition={{ type: "spring", stiffness: 120, damping: 12 }} />
<div className="absolute left-2 top-2 flex gap-2">
<BrandBadge brand={p.brand} />
{p.oem && <Badge className="bg-emerald-600">OEM</Badge>}
</div>
</div>
<CardHeader className="space-y-1">
<CardTitle className="text-base flex items-center justify-between gap-2">
{p.name}
<HoverCard>
<HoverCardTrigger><ShieldCheck className="h-4 w-4" /></HoverCardTrigger>
<HoverCardContent className="text-xs">Genuine quality — backed by JMN sourcing.</HoverCardContent>
</HoverCard>
</CardTitle>
<p className="text-xs text-muted-foreground">Part No: <span className="font-mono">{p.code}</span></p>
<div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
{p.models.map((m: string) => (<span key={m} className="rounded bg-muted px-2 py-0.5">{m}</span>))}
</div>
</CardHeader>
<CardContent className="flex items-center justify-between">
<button className="inline-flex items-center gap-2 text-sm underline underline-offset-4" onClick={() => onQuickView(p)}>
Quick view <ChevronRight className="h-4 w-4" />
</button>
<a href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hi JMN, I'm interested in ${p.name} (${p.code}).`)}`}
className="text-sm inline-flex items-center gap-2 underline underline-offset-4">
Ask via WhatsApp <ChevronRight className="h-4 w-4" />
</a>
</CardContent>
</Card>
);
}