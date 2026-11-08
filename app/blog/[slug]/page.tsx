import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout from "@/components/DefaultLayout";
import JsonLd from "@/components/JsonLd";
import { getPublicImageSize } from "@/lib/imageSize";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";
import { AUTHOR, OPEN_GRAPH_DEFAULTS, SITE_NAME, SITE_URL, absoluteUrl, pageAlternates } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return {};
    }

    const url = `/blog/${post.slug}`;
    const images = post.heroImage
        ? [{ url: post.heroImage, alt: post.heroImageAlt ?? post.title, ...getPublicImageSize(post.heroImage) }]
        : undefined;

    return {
        title: post.title,
        description: post.description,
        alternates: pageAlternates(url),
        openGraph: {
            ...OPEN_GRAPH_DEFAULTS,
            type: "article",
            title: post.title,
            description: post.description,
            url,
            publishedTime: post.created ?? undefined,
            authors: [AUTHOR.name],
            images,
        },
        twitter: {
            card: images ? "summary_large_image" : "summary",
            title: post.title,
            description: post.description,
            images: images?.map((image) => image.url),
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        notFound();
    }

    const heroSize = post.heroImage ? getPublicImageSize(post.heroImage) : null;

    return (
        <DefaultLayout>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.title,
                    description: post.description,
                    url: absoluteUrl(`/blog/${post.slug}`),
                    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
                    datePublished: post.created ?? undefined,
                    image: post.heroImage ? absoluteUrl(post.heroImage) : undefined,
                    inLanguage: "en",
                    author: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
                    publisher: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
                    isPartOf: { "@type": "Blog", name: SITE_NAME, url: absoluteUrl("/blog") },
                }}
            />
            <article>
                <header>
                    <h1 className="text-center text-4xl">{post.title}</h1>
                    {post.created && (
                        <p className="text-center text-sm italic text-gray-600 mt-1">
                            Created <time dateTime={post.created}>{formatDate(post.created)}</time>
                        </p>
                    )}
                </header>
                {post.heroImage && (
                    <div className="mt-6 mb-8">
                        <Image
                            src={post.heroImage}
                            alt={post.heroImageAlt ?? ""}
                            width={heroSize?.width ?? 1200}
                            height={heroSize?.height ?? 630}
                            sizes="(min-width: 65ch) 65ch, 100vw"
                            className="w-full h-auto rounded-lg"
                            priority
                        />
                    </div>
                )}
                <div className="mt-5 prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
            </article>
            <div className="flex flex-row justify-between mt-10">
                <div>
                    <Link href="/">Back home</Link>
                </div>
            </div>
        </DefaultLayout>
    );
}
