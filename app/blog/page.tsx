import type { Metadata } from "next";
import DefaultLayout from "@/components/DefaultLayout";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/posts";
import { pageAlternates, pageSocial } from "@/lib/site";

const description = "Posts by Oskar Čokl about programming, AI, game development and whatever else is on my mind.";

export const metadata: Metadata = {
    title: "Blog",
    description,
    alternates: pageAlternates("/blog"),
    ...pageSocial({ title: "Blog", description, path: "/blog" }),
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-y-6">
                <div>
                    <h1 className="text-center text-4xl">Blog</h1>
                </div>
                <ul className="flex flex-col gap-y-4">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <article>
                                <h2 className="text-lg">
                                    <Link href={"/blog/" + post.slug}>{post.title}</Link>
                                </h2>
                                {post.created && (
                                    <time dateTime={post.created} className="text-sm italic text-gray-600">
                                        {formatDate(post.created)}
                                    </time>
                                )}
                                <p className="text-sm text-gray-700 mt-1">{post.description}</p>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>
        </DefaultLayout>
    );
}
