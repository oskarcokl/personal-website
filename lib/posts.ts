import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

const POSTS_DIR = "posts";

const renderer = new Renderer();
const renderLink = renderer.link.bind(renderer);
renderer.link = (href, title, text) => {
    const html = renderLink(href, title, text);
    // Keep in-page anchors in the same tab; everything else opens a new one.
    if (href?.startsWith("#")) {
        return html;
    }
    return html.replace(/^<a /, '<a target="_blank" rel="noopener noreferrer" ');
};

const escapeAttr = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function youTubeId(href: string): string | null {
    try {
        const url = new URL(href);
        const host = url.hostname.replace(/^(www\.|m\.)/, "");
        if (host === "youtu.be") {
            return url.pathname.slice(1) || null;
        }
        if (host === "youtube.com") {
            if (url.pathname === "/watch") {
                return url.searchParams.get("v");
            }
            const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/);
            return match?.[1] ?? null;
        }
    } catch {
        // Relative URLs (e.g. /videos/demo.mp4) aren't YouTube links.
    }
    return null;
}

// `![caption](url)` embeds a player when the URL is a video file or a YouTube link.
const renderImage = renderer.image.bind(renderer);
renderer.image = (href, title, text) => {
    const label = escapeAttr(text || title || "Video");
    const videoId = href ? youTubeId(href) : null;
    if (videoId && /^[\w-]+$/.test(videoId)) {
        return (
            `<iframe class="aspect-video w-full rounded-lg" src="https://www.youtube-nocookie.com/embed/${videoId}" ` +
            `title="${label}" loading="lazy" allowfullscreen ` +
            `allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ` +
            `referrerpolicy="strict-origin-when-cross-origin"></iframe>`
        );
    }
    if (href && /\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i.test(href)) {
        return `<video class="w-full rounded-lg" src="${escapeAttr(href)}" controls playsinline preload="metadata" aria-label="${label}"></video>`;
    }
    return renderImage(href, title, text);
};

export interface PostSummary {
    slug: string;
    title: string;
    description: string;
    created: string | null;
    heroImage?: string;
    heroImageAlt?: string;
}

export interface Post extends PostSummary {
    content: string;
    htmlContent: string;
}

function excerpt(markdown: string, maxLength = 160): string {
    const text = markdown
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/[#*_`>]/g, "")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, text.lastIndexOf(" ", maxLength)) + "…";
}

function readPost(slug: string): Post | null {
    const filePath = path.join(POSTS_DIR, slug + ".md");
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const parsed = matter(fs.readFileSync(filePath, "utf-8"));

    return {
        slug,
        title: (parsed.data?.title as string) ?? slug,
        description: (parsed.data?.description as string) ?? excerpt(parsed.content),
        created: parsed.data?.created ? String(parsed.data.created) : null,
        heroImage: parsed.data?.heroImage,
        heroImageAlt: parsed.data?.heroImageAlt,
        content: parsed.content,
        htmlContent: marked.parse(parsed.content, { renderer }) as string,
    };
}

export function getAllPosts(): Post[] {
    return fs
        .readdirSync(POSTS_DIR)
        .filter((filename) => filename.endsWith(".md"))
        .map((filename) => readPost(filename.replace(/\.md$/, "")))
        .filter((post): post is Post => post !== null)
        .sort((a, b) => new Date(b.created ?? 0).getTime() - new Date(a.created ?? 0).getTime());
}

export function getPostBySlug(slug: string): Post | null {
    if (!/^[\w-]+$/.test(slug)) {
        return null;
    }
    return readPost(slug);
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });
}
