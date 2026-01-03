
import type { Metadata } from 'next';
import ServicesClient from './page-client';

export const metadata: Metadata = {
  title: 'Services & Bookings | For Personal | Pichulik Studios',
  description: 'Find the perfect package to capture your story. We offer a range of photography and videography services tailored to your personal milestones.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
