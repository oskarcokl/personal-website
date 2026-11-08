import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts();
    const cvAlternates = {
        languages: { en: absoluteUrl("/cv/en"), sl: absoluteUrl("/cv/sl") },
    };

    return [
        { url: absoluteUrl("/"), lastModified: posts[0]?.created ?? undefined },
        { url: absoluteUrl("/blog"), lastModified: posts[0]?.created ?? undefined },
        { url: absoluteUrl("/now") },
        { url: absoluteUrl("/cv/en"), alternates: cvAlternates },
        { url: absoluteUrl("/cv/sl"), alternates: cvAlternates },
        ...posts.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: post.created ?? undefined,
        })),
    ];
}
