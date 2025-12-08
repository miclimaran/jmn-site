
import type { Metadata } from "next";
import "./globals.css";
import ClientRoot from "@/components/site/ClientRoot";

export const metadata: Metadata = {
title: "JMN — Suzuki Genuine Parts Distributor",
description: "OEM auto parts distributor based in Indonesia. Multi-brand export supplier.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en" className="h-full">
<body
        className="
          h-full
          overflow-x-hidden
          bg-background
          text-foreground
          antialiased
        "
      >
{/* ClientRoot adds language toggle, navbar, footer, and theming */}
<ClientRoot>{children}</ClientRoot>
</body>
</html>
);
}