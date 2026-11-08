import type { Metadata } from 'next';
import CVPage from '@/components/CVPage';
import { OPEN_GRAPH_DEFAULTS, pageAlternates } from '@/lib/site';
import { data as cvData } from '@/public/locales/CV/sl';
import '../print.css';

export const metadata: Metadata = {
  title: 'Življenjepis',
  description: cvData.summary.text,
  alternates: pageAlternates('/cv/sl', { en: '/cv/en', sl: '/cv/sl', 'x-default': '/cv/en' }),
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    type: 'profile',
    title: 'Življenjepis | Oskar Čokl',
    description: cvData.summary.text,
    url: '/cv/sl',
    locale: 'sl_SI',
    firstName: 'Oskar',
    lastName: 'Čokl',
  },
  twitter: {
    card: 'summary',
    title: 'Življenjepis | Oskar Čokl',
    description: cvData.summary.text,
  },
};

export default function CVSL() {
  return <CVPage lang="sl" cvData={cvData} />;
}
