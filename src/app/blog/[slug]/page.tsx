import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Mail, Phone } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { WHATSAPP_PHONE } from "@/components/site/constants";

const SITE_URL = "https://jmnautoparts.com";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

const markdownComponents: Components = {
  a({ href, children }) {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-primary underline underline-offset-4">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    );
  },
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<ReactNode> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: { "@type": "Organization", name: "PT. Jaya Makmur Nugraha" },
    publisher: {
      "@type": "Organization",
      name: "JMN Parts",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/branding/logo_jmn2.svg`,
      },
    },
    mainEntityOfPage: url,
    image: `${SITE_URL}/opengraph-image`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="border-b border-border/60 bg-[linear-gradient(180deg,rgba(248,250,252,0.98)_0%,rgba(241,245,249,0.98)_100%)]">
        <div className="container mx-auto max-w-3xl px-4 pb-10 pt-24 md:pt-28">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{post.title}</span>
          </nav>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Published {formatDate(post.date)}
          </p>
        </div>
      </section>

      <article className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Need a quote for your export?</h2>
            <p className="mt-2 text-muted-foreground">
              Send us your required part numbers, quantities, and destination —
              we&apos;ll reply within 1 business day.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#111827_0%,#374151_100%)] px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_42px_-24px_rgba(17,24,39,0.55)] hover:brightness-110"
              >
                <Mail className="h-4 w-4" /> Contact Sales
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-50 px-5 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
              >
                <Phone className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
