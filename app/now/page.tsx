import DefaultLayout from "@/components/DefaultLayout";

export default function Page() {
    return (
        <>
            <DefaultLayout>
                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-3xl">What I'm doing</h1>
                        <p>Exploring how to best utilise AI agents for software development.</p>
                    </div>
                    <div>
                        <h1 className="text-3xl">What I'm reading</h1>
                        <h2 className="text-xl">Technical</h2>
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
                        <h2 className="text-xl">Pleasure</h2>
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
                    </div>
                    <div>
                        <h1 className="text-3xl">What I'm learning</h1>
                        <p>How to set up environments where agents can be most successful.</p>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
