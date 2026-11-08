function normalizeSiteUrl(url: string | undefined): string {
    const value = url?.trim() || "https://personal-blog-teal-zeta.vercel.app";
    const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
    return withScheme.replace(/\/+$/, "");
}

/** Public origin of the site. Set NEXT_PUBLIC_SITE_URL at build time to override. */
export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME = "Oskar Čokl";
export const SITE_DESCRIPTION =
    "Oskar Čokl's little corner of the internet: a blog and the CV of a fullstack developer from Ljubljana, Slovenia.";
export const AUTHOR = {
    name: "Oskar Čokl",
    email: "oskar.cokl@gmail.com",
    jobTitle: "Fullstack developer",
    sameAs: [
        "https://github.com/oskarcokl",
        "https://www.linkedin.com/in/oskar-%C4%8Dokl-994b9613b/",
    ],
};

export function absoluteUrl(path: string): string {
    return SITE_URL + (path.startsWith("/") ? path : "/" + path);
}

/**
 * Next.js replaces (not merges) `alternates` from parent layouts, so every page
 * builds its own and re-adds the RSS feed link.
 */
export function pageAlternates(path: string, languages?: Record<string, string>) {
    return {
        canonical: path,
        languages,
        types: {
            "application/rss+xml": [{ url: "/rss.xml", title: `${SITE_NAME} blog` }],
        },
    };
}

export const OPEN_GRAPH_DEFAULTS = {
    siteName: SITE_NAME,
    locale: "en_US",
};

/**
 * Open Graph and Twitter tags for a simple page. Both objects replace the root
 * layout's versions wholesale, so the shared fields are repeated here.
 */
export function pageSocial({ title, description, path }: { title: string; description: string; path: string }) {
    return {
        openGraph: { ...OPEN_GRAPH_DEFAULTS, type: "website" as const, title, description, url: path },
        twitter: { card: "summary" as const, title, description },
    };
}
