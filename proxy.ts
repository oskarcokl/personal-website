import { NextRequest, NextResponse } from 'next/server';
import { CV_LANG_COOKIE, isCVLang } from '@/lib/cvLanguage';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /cv has no content of its own: send visitors to the CV language they last picked,
    // and everyone else (including crawlers, which send no cookies) to the English CV.
    if (pathname.toLowerCase() === '/cv' || pathname.toLowerCase() === '/cv/') {
        const preferred = request.cookies.get(CV_LANG_COOKIE)?.value;
        const lang = isCVLang(preferred) ? preferred : 'en';
        return NextResponse.redirect(new URL(`/cv/${lang}`, request.url), 307);
    }

    // The CV used to live at /CV/...; permanently redirect any other casing to lowercase.
    if (pathname !== pathname.toLowerCase()) {
        return NextResponse.redirect(new URL(pathname.toLowerCase(), request.url), 308);
    }

    return NextResponse.next();
}

export const config = {
    // Match /cv in any casing (/CV, /Cv, ...), with or without a sub-path.
    matcher: ['/:cv([Cc][Vv])', '/:cv([Cc][Vv])/:path*'],
};
