import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import DownloadCVButton from '@/components/DownloadCVButton';
import CopyMarkdownButton from '@/components/CopyMarkdownButton';
import JsonLd from '@/components/JsonLd';
import CVLanguageLink from '@/components/CVLanguageLink';
import { AUTHOR, SITE_URL, absoluteUrl } from '@/lib/site';
import { CVLang } from '@/lib/cvLanguage';
import { getCV } from '@/lib/cv';
import styles from '@/app/cv/CV.module.css';

const LANGUAGES: { lang: CVLang; label: string }[] = [
  { lang: 'en', label: 'English' },
  { lang: 'sl', label: 'Slovenščina' },
];

const UI_TEXT: Record<
  CVLang,
  { languageNav: string; download: string; copyMarkdown: string; copied: string; newTab: string }
> = {
  en: {
    languageNav: 'CV language',
    download: 'Download',
    copyMarkdown: 'Copy as Markdown',
    copied: 'Copied!',
    newTab: '(opens in a new tab)',
  },
  sl: {
    languageNav: 'Jezik življenjepisa',
    download: 'Prenesi',
    copyMarkdown: 'Kopiraj kot Markdown',
    copied: 'Kopirano!',
    newTab: '(odpre se v novem zavihku)',
  },
};

const LINKEDIN_URL = 'https://www.linkedin.com/in/oskar-%C4%8Dokl-994b9613b/';
const GITHUB_URL = 'https://github.com/oskarcokl';

/** The whole CV as Markdown: the name and contact header, then the body of cv/<lang>.md. */
function cvMarkdown(body: string): string {
  const contact = [AUTHOR.email, `[GitHub](${GITHUB_URL})`, `[LinkedIn](${LINKEDIN_URL})`].join(' · ');
  return `# ${AUTHOR.name}\n\n${contact}\n\n${body.trim()}\n`;
}

export default function CVPage({ lang }: { lang: CVLang }) {
  const text = UI_TEXT[lang];
  const cv = getCV(lang);

  return (
    <div lang={lang}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: absoluteUrl(`/cv/${lang}`),
          inLanguage: lang,
          mainEntity: {
            '@type': 'Person',
            name: AUTHOR.name,
            url: SITE_URL,
            email: `mailto:${AUTHOR.email}`,
            jobTitle: AUTHOR.jobTitle,
            description: cv.description,
            sameAs: AUTHOR.sameAs,
            alumniOf: cv.alumniOf ? { '@type': 'CollegeOrUniversity', name: cv.alumniOf } : undefined,
            worksFor: cv.worksFor ? { '@type': 'Organization', name: cv.worksFor } : undefined,
            knowsLanguage: cv.knowsLanguage,
          },
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-print">
        <div className="flex gap-2">
          <DownloadCVButton label={text.download} />
          <CopyMarkdownButton
            markdown={cvMarkdown(cv.markdown)}
            label={text.copyMarkdown}
            copiedLabel={text.copied}
          />
        </div>
        <nav aria-label={text.languageNav} className="flex gap-3">
        {LANGUAGES.map((language) =>
          language.lang === lang ? (
            <span key={language.lang} lang={language.lang} aria-current="page" className="text-black">
              {language.label}
            </span>
          ) : (
            <CVLanguageLink key={language.lang} lang={language.lang}>
              {language.label}
            </CVLanguageLink>
          )
        )}
        </nav>
      </div>
      <div className="print:w-full print:m-0">
        <CVTitle newTabText={text.newTab} />
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: cv.htmlContent }} />
      </div>
    </div>
  );
}

function CVTitle({ newTabText }: { newTabText: string }) {
  return <header>
    <h1 className="text-2xl">{AUTHOR.name}</h1>
    <Contact newTabText={newTabText} />
  </header>
}

function Contact({ newTabText }: { newTabText: string }) {
  return (
    <ul className='flex flex-row gap-3'>
      <li>
        <FontAwesomeIcon icon={faEnvelope} />{' '}
        <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>
      </li>
      <li className='no-print'>
        <FontAwesomeIcon icon={faGithub} />{' '}
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          GitHub<span className="sr-only"> {newTabText}</span>
        </a>
      </li>
      <li className='no-print'>
        <FontAwesomeIcon icon={faLinkedin} />{' '}
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          Linkedin<span className="sr-only"> {newTabText}</span>
        </a>
      </li>
    </ul>
  )
}
