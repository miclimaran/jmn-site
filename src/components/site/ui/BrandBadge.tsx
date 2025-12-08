"use client";
import { Badge } from "@/components/ui/badge";
import { BRANDS } from "@/components/site/data";


export default function BrandBadge({ brand }: { brand: string }) {
const b = BRANDS.find((x) => x.key === brand);
return <Badge variant="secondary" className="capitalize">{b?.name || brand}</Badge>;
}