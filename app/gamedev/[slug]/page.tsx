import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DefaultLayout from "@/components/DefaultLayout";
import ScreenshotGallery from "@/components/ScreenshotGallery";
import JsonLd from "@/components/JsonLd";
import { getGameBySlug, generateGameParams } from "@/lib/gamedev";
import { AUTHOR, OPEN_GRAPH_DEFAULTS, SITE_URL, absoluteUrl, pageAlternates } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
    return generateGameParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const game = getGameBySlug(slug);
    if (!game) {
        return {};
    }

    const { title, description, hero, thumbnail } = game.metadata;
    const url = `/gamedev/${slug}`;
    const image = hero ?? thumbnail;

    return {
        title,
        description,
        alternates: pageAlternates(url),
        openGraph: {
            ...OPEN_GRAPH_DEFAULTS,
            type: "website",
            title,
            description,
            url,
            images: image ? [{ url: image, alt: title }] : undefined,
        },
        twitter: {
            card: image ? "summary_large_image" : "summary",
            title,
            description,
            images: image ? [image] : undefined,
        },
    };
}

export default async function GameDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const game = getGameBySlug(slug);

    if (!game) {
        notFound();
    }

    const { metadata, htmlContent } = game;

    return (
        <>
            {metadata.hero && (
                <div className="relative w-full h-64 md:h-80 mb-6">
                    <Image
                        src={metadata.hero}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <DefaultLayout>
                <JsonLd
                    data={{
                        "@context": "https://schema.org",
                        "@type": "VideoGame",
                        name: metadata.title,
                        description: metadata.description,
                        url: absoluteUrl(`/gamedev/${slug}`),
                        image: metadata.hero || metadata.thumbnail ? absoluteUrl((metadata.hero ?? metadata.thumbnail)!) : undefined,
                        datePublished: metadata.date,
                        keywords: metadata.tags?.join(", "),
                        author: { "@type": "Person", name: AUTHOR.name, url: SITE_URL },
                        sameAs: Object.values(metadata.links ?? {}),
                    }}
                />
                <div className="mb-6">
                    <Link
                        href="/gamedev"
                        className="text-blue-600 hover:underline"
                    >
                        &larr; Back to GameDev
                    </Link>
                </div>

                <h1 className="text-4xl font-bold">{metadata.title}</h1>

                {metadata.tags && metadata.tags.length > 0 && (
                    <ul aria-label="Tags" className="flex flex-wrap gap-2 mt-3">
                        {metadata.tags.map((tag) => (
                            <li
                                key={tag}
                                className="text-sm px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}

                {metadata.links && Object.keys(metadata.links).length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                        {metadata.links.itch && (
                            <a
                                href={metadata.links.itch}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 bg-[#c93030] text-white! rounded hover:bg-[#a82828] transition-colors no-underline"
                            >
                                itch.io
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                        {metadata.links.steam && (
                            <a
                                href={metadata.links.steam}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 bg-[#1b2838] text-white! rounded hover:bg-[#2a475e] transition-colors no-underline"
                            >
                                Steam
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                        {metadata.links.github && (
                            <a
                                href={metadata.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 bg-[#24292e] text-white! rounded hover:bg-[#3a3f44] transition-colors no-underline"
                            >
                                GitHub
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                        {metadata.links.play && (
                            <a
                                href={metadata.links.play}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-4 py-2 bg-green-700 text-white! rounded hover:bg-green-800 transition-colors no-underline"
                            >
                                Play Now
                                <span className="sr-only"> (opens in a new tab)</span>
                            </a>
                        )}
                    </div>
                )}

                <article
                    className="mt-8 prose prose-neutral max-w-none"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {metadata.screenshots && metadata.screenshots.length > 0 && (
                    <section className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">
                            Screenshots
                        </h2>
                        <ScreenshotGallery
                            screenshots={metadata.screenshots}
                            title={metadata.title}
                        />
                    </section>
                )}
            </DefaultLayout>
        </>
    );
}
