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
                        <p>
                            Currently I'm thinking about starting an online marketplace where people
                            can sell and buy used clothes.
                            <br />
                            Also I'm working on my personal website. Adding some mor content and
                            adding a CV.
                        </p>
                    </section>
                    <section>
                        <h2 className="text-3xl">What I'm reading</h2>
                        <p>I'm mostly focusing on technical and learning books right now</p>
                        <ul className="list-disc list-inside">
                            <li>Let's Go</li>
                            <li>
                                Zero to Sold: How to Start, Run and Sell a Bootstrapped business
                            </li>
                            <li>Start With Why</li>
                        </ul>
                    </section>
                    <section>
                        <h2 className="text-3xl">What I'm learning</h2>
                        <p>
                            Currently learning about Go on the backend and React and Next.js on the
                            frontend
                        </p>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}