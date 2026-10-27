import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_NAME, COMPANY_EMAIL } from "@/components/site/constants";

/**
 * RSS 2.0 feed for the blog.
 *
 * Worth having beyond human subscribers: feed readers, news aggregators and
 * several AI crawlers discover new writing through RSS rather than by
 * re-crawling the sitemap, so a feed shortens the gap between publishing and
 * being citable.
 *
 * Content is deliberately the description only, not the full article. A feed
 * carrying the whole text invites scrapers to republish it, and the point of
 * writing this is for jmnautoparts.com to be the page that gets cited.
 */
export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const updated = posts[0]?.date ?? new Date().toISOString().slice(0, 10);

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
${post.keywords.map((k) => `      <category>${escapeXml(k)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Export &amp; OEM Parts Notes</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Practical notes on sourcing and exporting genuine OEM auto parts from Indonesia, written by an authorized Suzuki distributor trading since 1989.</description>
    <language>en</language>
    <managingEditor>${COMPANY_EMAIL} (${escapeXml(SITE_NAME)})</managingEditor>
    <lastBuildDate>${new Date(`${updated}T00:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
