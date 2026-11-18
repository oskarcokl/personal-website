import type { Metadata } from 'next';
import CVPage from '@/components/CVPage';
import { OPEN_GRAPH_DEFAULTS, pageAlternates } from '@/lib/site';
import { getCV } from '@/lib/cv';
import '../print.css';

const { description } = getCV('sl');

export const metadata: Metadata = {
  title: 'Življenjepis',
  description,
  alternates: pageAlternates('/cv/sl', { en: '/cv/en', sl: '/cv/sl', 'x-default': '/cv/en' }),
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    type: 'profile',
    title: 'Življenjepis | Oskar Čokl',
    description,
    url: '/cv/sl',
    locale: 'sl_SI',
    firstName: 'Oskar',
    lastName: 'Čokl',
  },
  twitter: {
    card: 'summary',
    title: 'Življenjepis | Oskar Čokl',
    description,
  },
};

export default function CVSL() {
  return <CVPage lang="sl" />;
}
