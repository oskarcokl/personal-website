import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { CVLang } from "@/lib/cvLanguage";

const CV_DIR = "cv";

export interface CV {
    /** Meta description: frontmatter `description`, else the first paragraph (the summary). */
    description: string;
    /** Current employer, for structured data. */
    worksFor?: string;
    /** University, for structured data. */
    alumniOf?: string;
    /** Spoken languages, for structured data. */
    knowsLanguage: string[];
    /** The CV body as written in the file, without frontmatter. */
    markdown: string;
    htmlContent: string;
}

/** Reads cv/<lang>.md: frontmatter holds metadata, the body is the CV itself. */
export function getCV(lang: CVLang): CV {
    const parsed = matter(fs.readFileSync(path.join(CV_DIR, `${lang}.md`), "utf-8"));
    const data = parsed.data ?? {};

    return {
        description: data.description ? String(data.description) : firstParagraph(parsed.content),
        worksFor: data.worksFor,
        alumniOf: data.alumniOf,
        knowsLanguage: Array.isArray(data.knowsLanguage) ? data.knowsLanguage.map(String) : [],
        markdown: parsed.content,
        htmlContent: marked.parse(parsed.content) as string,
    };
}

function firstParagraph(markdown: string): string {
    const paragraph = marked.lexer(markdown).find((token) => token.type === "paragraph");
    return paragraph && "text" in paragraph ? paragraph.text : "";
}
