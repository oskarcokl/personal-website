'use client';

import Link from 'next/link';
import { CV_LANG_COOKIE, CVLang } from '@/lib/cvLanguage';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export default function CVLanguageLink({ lang, children }: { lang: CVLang; children: React.ReactNode }) {
  const rememberLanguage = () => {
    document.cookie = `${CV_LANG_COOKIE}=${lang}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`;
  };

  return (
    <Link href={`/CV/${lang}`} hrefLang={lang} lang={lang} onClick={rememberLanguage}>
      {children}
    </Link>
  );
}
