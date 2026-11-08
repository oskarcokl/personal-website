import type { Metadata } from 'next';
import CVPage from '@/components/CVPage';
import { OPEN_GRAPH_DEFAULTS, pageAlternates } from '@/lib/site';
import { data as cvData } from '@/public/locales/CV/en';
import '../print.css';

export const metadata: Metadata = {
  title: 'CV',
  description: cvData.summary.text,
  alternates: pageAlternates('/cv/en', { en: '/cv/en', sl: '/cv/sl', 'x-default': '/cv/en' }),
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    type: 'profile',
    title: 'CV | Oskar Čokl',
    description: cvData.summary.text,
    url: '/cv/en',
    locale: 'en_US',
    firstName: 'Oskar',
    lastName: 'Čokl',
  },
  twitter: {
    card: 'summary',
    title: 'CV | Oskar Čokl',
    description: cvData.summary.text,
  },
};

export default function CVEN() {
  return <CVPage lang="en" cvData={cvData} />;
}
