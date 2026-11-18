import type { Metadata } from 'next';
import CVPage from '@/components/CVPage';
import { OPEN_GRAPH_DEFAULTS, pageAlternates } from '@/lib/site';
import { getCV } from '@/lib/cv';
import '../print.css';

const { description } = getCV('en');

export const metadata: Metadata = {
  title: 'CV',
  description,
  alternates: pageAlternates('/cv/en', { en: '/cv/en', sl: '/cv/sl', 'x-default': '/cv/en' }),
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    type: 'profile',
    title: 'CV | Oskar Čokl',
    description,
    url: '/cv/en',
    locale: 'en_US',
    firstName: 'Oskar',
    lastName: 'Čokl',
  },
  twitter: {
    card: 'summary',
    title: 'CV | Oskar Čokl',
    description,
  },
};

export default function CVEN() {
  return <CVPage lang="en" />;
}
