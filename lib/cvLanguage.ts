export const CV_LANGUAGES = ['en', 'sl'] as const;
export type CVLang = (typeof CV_LANGUAGES)[number];

/** Cookie that remembers the CV language the visitor last picked, read by proxy.ts on /cv. */
export const CV_LANG_COOKIE = 'cv-lang';

export function isCVLang(value: string | undefined): value is CVLang {
    return CV_LANGUAGES.includes(value as CVLang);
}
