import { getAllGames } from "@/lib/gamedev";
import { getAllPosts } from "@/lib/posts";
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// https://llmstxt.org: a plain-text map of the site for LLMs and agents.
export function GET() {
    const posts = getAllPosts();
    const games = getAllGames();

    const sections = [
        `# ${SITE_NAME}`,
        `> ${SITE_DESCRIPTION}`,
        `Personal website of ${AUTHOR.name}, a ${AUTHOR.jobTitle.toLowerCase()}. Contact: ${AUTHOR.email}.`,
        [
            "## Pages",
            `- [Home](${absoluteUrl("/")}): Overview with recent blog posts and games`,
            `- [Now](${absoluteUrl("/now")}): What I'm currently doing, reading and learning`,
            `- [CV (English)](${absoluteUrl("/CV/en")}): Work experience, skills and education`,
            `- [CV (Slovenian)](${absoluteUrl("/CV/sl")}): The same CV in Slovenian`,
            `- [RSS feed](${absoluteUrl("/rss.xml")}): Full-text feed of all blog posts`,
        ].join("\n"),
        [
            "## Blog posts",
            ...posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`),
        ].join("\n"),
    ];

    if (games.length > 0) {
        sections.push(
            [
                "## Game development",
                ...games.map((game) => `- [${game.metadata.title}](${absoluteUrl(`/gamedev/${game.slug}`)}): ${game.metadata.description}`),
            ].join("\n")
        );
    }

    sections.push(
        ["## Elsewhere", ...AUTHOR.sameAs.map((url) => `- ${url}`)].join("\n")
    );

    return new Response(sections.join("\n\n") + "\n", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
