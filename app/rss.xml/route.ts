import { getAllPosts } from "@/lib/posts";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function GET() {
    const items = getAllPosts()
        .map((post) => {
            const url = absoluteUrl(`/blog/${post.slug}`);
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <author>${AUTHOR.email} (${escapeXml(AUTHOR.name)})</author>${post.created ? `
      <pubDate>${new Date(post.created).toUTCString()}</pubDate>` : ""}
      <content:encoded><![CDATA[${post.htmlContent.replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

    return new Response(xml, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
