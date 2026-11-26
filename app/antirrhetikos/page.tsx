import type { Metadata } from "next";
import AntirrhetikosTable from "@/components/AntirrhetikosTable";
import { getAntirrhetikos } from "@/lib/antirrhetikos";

export function generateMetadata(): Metadata {
    const data = getAntirrhetikos();
    return {
        title: data.title,
        description: data.subtitle,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function AntirrhetikosPage() {
    const data = getAntirrhetikos();

    return (
        <section className="max-w-5xl mx-auto pb-12 text-base">
            <header className="mb-8 text-center">
                <h1 className="text-4xl">{data.title}</h1>
                <p className="mt-2 text-base italic text-gray-600">{data.subtitle}</p>
            </header>
            <AntirrhetikosTable entries={data.entries} />
        </section>
    );
}
