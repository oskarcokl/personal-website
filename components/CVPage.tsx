import Link from 'next/link';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import WorkTitle from '@/components/WorkTitle';
import WorkDescription from '@/components/WorkDescription';
import SectionTitle from '@/components/SectionTitle';
import DownloadCVButton from '@/components/DownloadCVButton';
import JsonLd from '@/components/JsonLd';
import { data as enData } from '@/public/locales/CV/en';
import { AUTHOR, SITE_URL, absoluteUrl } from '@/lib/site';

export type CVData = typeof enData;
export type CVLang = 'en' | 'sl';

const LANGUAGES: { lang: CVLang; label: string }[] = [
  { lang: 'en', label: 'English' },
  { lang: 'sl', label: 'Slovenščina' },
];

const UI_TEXT: Record<CVLang, { languageNav: string; download: string; newTab: string }> = {
  en: { languageNav: 'CV language', download: 'Download', newTab: '(opens in a new tab)' },
  sl: { languageNav: 'Jezik življenjepisa', download: 'Prenesi', newTab: '(odpre se v novem zavihku)' },
};

export default function CVPage({ lang, cvData }: { lang: CVLang; cvData: CVData }) {
  const text = UI_TEXT[lang];

  return (
    <div lang={lang}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: absoluteUrl(`/CV/${lang}`),
          inLanguage: lang,
          mainEntity: {
            '@type': 'Person',
            name: AUTHOR.name,
            url: SITE_URL,
            email: `mailto:${AUTHOR.email}`,
            jobTitle: AUTHOR.jobTitle,
            description: cvData.summary.text,
            sameAs: AUTHOR.sameAs,
            alumniOf: { '@type': 'CollegeOrUniversity', name: cvData.education.university },
            worksFor: cvData.workExperience.jobs[0]
              ? { '@type': 'Organization', name: cvData.workExperience.jobs[0].company }
              : undefined,
            knowsLanguage: cvData.languageSkills.languages.map((language) => language.language),
          },
        }}
      />
      <nav aria-label={text.languageNav} className="flex justify-end gap-3 mb-4 no-print">
        {LANGUAGES.map((language) =>
          language.lang === lang ? (
            <span key={language.lang} lang={language.lang} aria-current="page" className="text-black">
              {language.label}
            </span>
          ) : (
            <Link key={language.lang} href={`/CV/${language.lang}`} hrefLang={language.lang} lang={language.lang}>
              {language.label}
            </Link>
          )
        )}
      </nav>
      <div className="print:w-full print:m-0">
        <CVTitle newTabText={text.newTab} />
        <div className="mt-1 flex flex-col gap-2">
          <Summary title={cvData.summary.title} text={cvData.summary.text} />
          <Skills title={cvData.skills.title} mainSkills={cvData.skills.mainSkills} otherRelevantSkills={cvData.skills.otherRelevantSkills} workFlowSkills={cvData.skills.workFlowSkills} />
          <WorkExperience title={cvData.workExperience.title} jobs={cvData.workExperience.jobs} />
          <Education title={cvData.education.title} degree={cvData.education.degree} school={cvData.education.school} university={cvData.education.university} location={cvData.education.location} from={cvData.education.from} to={cvData.education.to} />
          <LanguageSkills title={cvData.languageSkills.title} languages={cvData.languageSkills.languages} />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <DownloadCVButton label={text.download} />
      </div>
    </div>
  );
}

function Summary(props: CVData['summary']) {
  return (
    <section>
      <SectionTitle title={props.title} />
      <p>{props.text}</p>
    </section>
  )
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
        <a href={'https://github.com/oskarcokl'} target="_blank" rel="noopener noreferrer">
          GitHub<span className="sr-only"> {newTabText}</span>
        </a>
      </li>
      <li className='no-print'>
        <FontAwesomeIcon icon={faLinkedin} />{' '}
        <a
          href={'https://www.linkedin.com/in/oskar-%C4%8Dokl-994b9613b/'}
          target="_blank"
          rel="noopener noreferrer">
          Linkedin<span className="sr-only"> {newTabText}</span>
        </a>
      </li>
    </ul>
  )
}

function WorkExperience(props: { title: string, jobs: CVData['workExperience']['jobs'] }) {
  return (
    <section>
      <SectionTitle title={props.title} />
      {props.jobs.map((job, index) => (
        <div key={index}>
          <WorkTitle
            period={job.period}
            position={job.position}
            company={job.company}
          />
          <WorkDescription descriptions={job.description} />
        </div>
      ))}
    </section>
  )
}

function Education(props: { title: string, degree: string, school: string, university: string, location: string, from: string, to: string }) {
  return (
    <section>
      <SectionTitle title={props.title} />
      <p>
        <b>{props.degree}</b>, {props.school}, {props.university}
      </p>
      <p>
        {props.location} {props.from}-
        {props.to}
      </p>
    </section>
  )
}

function Skills(props: CVData['skills']) {
  return (
    <div className='flex flex-col gap-2'>
      <SkillSection title={props.mainSkills.title} skills={props.mainSkills.skills} />
      <SkillSection title={props.otherRelevantSkills.title} skills={props.otherRelevantSkills.skills} />
      <SkillSection title={props.workFlowSkills.title} skills={props.workFlowSkills.skills} />
    </div>
  )
}

function SkillSection(props: { title: string, skills: { name: string, comment: string | string[] }[] }) {
  // One dt/dd pair per skill keeps each name next to its detail when read linearly
  // (screen readers, text extraction), while the grid still renders two columns.
  return <section>
    <SectionTitle title={props.title} />
    <dl className='grid grid-cols-2'>
      {props.skills.map((skill) => (
        <div key={skill.name} className='contents'>
          <dt>{skill.name}</dt>
          <dd>{Array.isArray(skill.comment) ? skill.comment.join(', ') : skill.comment}</dd>
        </div>
      ))}
    </dl>
  </section>
}

function LanguageSkills(props: { title: string, languages: { language: string, level: string }[] }) {
  return (
    <section>
      <SectionTitle title={props.title} />
      {props.languages.map((language) => (
        <p key={language.language}>
          <b>{language.language}:</b> {language.level}
        </p>
      ))}
    </section>
  )
}
