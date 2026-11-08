import type { Metadata } from "next";
import DefaultLayout from "@/components/DefaultLayout";
import { pageAlternates, pageSocial } from "@/lib/site";

const description = "What Oskar Čokl is doing, reading and learning right now.";

export const metadata: Metadata = {
    title: "Now",
    description,
    alternates: pageAlternates("/now"),
    ...pageSocial({ title: "Now", description, path: "/now" }),
};

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <h1 className="sr-only">Now</h1>
                <div className="flex flex-col gap-3">
                    <section>
                        <h2 className="text-3xl">What I'm doing</h2>
                        <p>Exploring how to best utilise AI agents for software development.</p>
                    </section>
                    <section>
                        <h2 className="text-3xl">What I'm reading</h2>
                        <h3 className="text-xl">Technical</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                <a
                                    href="https://www.goodreads.com/book/show/39996759-a-philosophy-of-software-design"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    A Philosophy of Software Design
                                </a>{" "}
                                by John Ousterhout
                            </li>
                        </ul>
                        <h3 className="text-xl">Pleasure</h3>
                        <ul className="list-disc list-inside">
                            <li>
                                <a
                                    href="https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    The Hitchhiker's Guide to the Galaxy
                                </a>{" "}
                                by Douglas Adams
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-3xl">What I'm learning</h2>
                        <p>How to set up environments where agents can be most successful.</p>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
