import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const POSTS_DIR = "posts";

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
        htmlContent: marked.parse(parsed.content) as string,
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
