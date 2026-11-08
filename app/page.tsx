import type { Metadata } from 'next';
import DefaultLayout from '@/components/DefaultLayout';
import GameCard from '@/components/GameCard';
import JsonLd from '@/components/JsonLd';
import { getAllGames } from '@/lib/gamedev';
import { formatDate, getAllPosts } from '@/lib/posts';
import { AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageAlternates } from '@/lib/site';
import Link from 'next/link';

export const metadata: Metadata = {
    alternates: pageAlternates('/'),
};

export default function Home() {
    const posts = getAllPosts();
    const recentGames = getAllGames().slice(0, 3);

    return (
        <DefaultLayout>
            <JsonLd
                data={{
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    name: SITE_NAME,
                    url: SITE_URL,
                    description: SITE_DESCRIPTION,
                    author: {
                        '@type': 'Person',
                        name: AUTHOR.name,
                        url: SITE_URL,
                        email: `mailto:${AUTHOR.email}`,
                        jobTitle: AUTHOR.jobTitle,
                        sameAs: AUTHOR.sameAs,
                    },
                }}
            />
            <div className="flex flex-col gap-y-20">
                <div>
                    <h1 className="text-center text-5xl">Oskar Čokl</h1>
                    <p className="text-center text-1xl mt-1">My little corner of the internet.</p>
                </div>
                <section aria-labelledby="blog-heading">
                    <h2 id="blog-heading" className="text-4xl">Blog</h2>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.slug} className="text-lg">
                                <Link href={'/blog/' + post.slug}>{post.title}</Link>
                                {post.created && (
                                    <time dateTime={post.created} className="ml-2 text-sm text-gray-600">
                                        {formatDate(post.created)}
                                    </time>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
                {recentGames.length > 0 && (
                    <section aria-labelledby="gamedev-heading">
                        <div className="flex justify-between items-baseline mb-3">
                            <h2 id="gamedev-heading" className="text-4xl">Game Development</h2>
                            <Link href="/gamedev" className="text-blue-600 hover:underline">
                                View all games
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recentGames.map((game) => (
                                <GameCard key={game.slug} game={game} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </DefaultLayout>
    );
}
