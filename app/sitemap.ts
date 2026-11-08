import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/gamedev";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const games = getAllGames();
    const cvAlternates = {
        languages: { en: absoluteUrl("/CV/en"), sl: absoluteUrl("/CV/sl") },
    };

    return [
        { url: absoluteUrl("/"), lastModified: posts[0]?.created ?? undefined },
        { url: absoluteUrl("/blog"), lastModified: posts[0]?.created ?? undefined },
        { url: absoluteUrl("/gamedev") },
        { url: absoluteUrl("/now") },
        { url: absoluteUrl("/CV/en"), alternates: cvAlternates },
        { url: absoluteUrl("/CV/sl"), alternates: cvAlternates },
        ...posts.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: post.created ?? undefined,
        })),
        ...games.map((game) => ({
            url: absoluteUrl(`/gamedev/${game.slug}`),
            lastModified: game.metadata.date,
        })),
    ];
}
