import { NextRequest, NextResponse } from 'next/server';
import { CV_LANG_COOKIE, isCVLang } from '@/lib/cvLanguage';

// /CV has no content of its own: send visitors to the CV language they last picked,
// and everyone else (including crawlers, which send no cookies) to the English CV.
export function proxy(request: NextRequest) {
    const preferred = request.cookies.get(CV_LANG_COOKIE)?.value;
    const lang = isCVLang(preferred) ? preferred : 'en';

    return NextResponse.redirect(new URL(`/CV/${lang}`, request.url), 307);
}

// Route paths are case-sensitive, so also accept the lowercase spelling.
export const config = {
    matcher: ['/CV', '/cv'],
};
