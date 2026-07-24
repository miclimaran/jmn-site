import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Export & Spare Parts Insights",
  description:
    "Guides on importing spare parts from Indonesia, HS codes, Incoterms, and Suzuki genuine parts — from PT. Jaya Makmur Nugraha (JMN Parts).",
  alternates: {
    canonical: "https://jmnautoparts.com/blog",
  },
  openGraph: {
    title: "Blog | JMN Parts",
    description:
      "Guides on importing spare parts from Indonesia, HS codes, Incoterms, and Suzuki genuine parts.",
    url: "https://jmnautoparts.com/blog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main>
      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]">
        <div className="container mx-auto max-w-7xl px-4 pb-10 pt-24 md:pt-28">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">Blog</span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Export &amp; Spare Parts Insights
          </h1>
          <p className="mt-2 max-w-xl text-base text-slate-600">
            Practical guides on importing spare parts from Indonesia, export
            documentation, and sourcing genuine OEM parts.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm transition hover:border-primary/30 hover:shadow-md"
              >
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {formatDate(post.date)} · {post.readingTimeMinutes} min read
                </div>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
