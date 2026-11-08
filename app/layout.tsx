import "./globals.css"
import '../public/styles.css';
import { Noto_Serif_Georgian, Lora } from "next/font/google"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { AUTHOR, OPEN_GRAPH_DEFAULTS, SITE_DESCRIPTION, SITE_NAME, SITE_URL, pageAlternates } from "@/lib/site";

config.autoAddCss = false;

const georgian = Noto_Serif_Georgian({
    subsets: ['latin'],
    weight: ['400', '700']
})

const lora = Lora({
    subsets: ['latin'],
    weight: ['400', '700'],
})

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    // Pages set their own canonical URL via pageAlternates(); one here would be inherited everywhere.
    alternates: { types: pageAlternates("/").types },
    openGraph: {
        ...OPEN_GRAPH_DEFAULTS,
        type: "website",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: "/",
    },
    twitter: {
        card: "summary",
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={'print:m-0 print:p-0 mx-auto min-h-screen bg-stone-50 ' + lora.className + ' ' + georgian.className}>
                <Navigation />
                <hr className="max-w-prose my-3 mx-auto h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10 no-print" />
                <main className="print:m-0 print:p-0">{children}</main>
                <footer className="no-print mb-6">
                    <p className="text-center text-gray-600">
                        contact: <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
                    </p>
                </footer>
            </body>
        </html>
    );
}
