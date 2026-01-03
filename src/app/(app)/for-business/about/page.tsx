
import type { Metadata } from 'next';
import AboutUsClient from './page-client';

export const metadata: Metadata = {
  title: 'About Us | For Business | Pichulik Studios',
  description: 'We translate business goals into compelling visual stories. A boutique video studio helping your business connect, engage, and grow with strategic, beautiful content.',
};

export default function AboutUsPage() {
  return <AboutUsClient />;
}
