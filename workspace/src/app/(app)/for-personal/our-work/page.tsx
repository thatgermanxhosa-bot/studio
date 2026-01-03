
import type { Metadata } from 'next';
import OurWorkClient from './page-client';

export const metadata: Metadata = {
  title: 'Our Work | Pichulik Studios',
  description: 'A showcase of our favorite recent projects. See how we craft compelling visual stories for personal milestones and business goals.',
};


export default function OurWorkPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48 pb-20 animate-fade-in-up">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black normal-case">Stories we've built. Goals we've met.</h1>
          <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-200">
            We believe that great creative is only successful if it achieves a goal. This isn't a vast archive—it's a curated showcase of our favorite recent projects.
          </p>
          <p className="mt-4 text-white/80 animate-fade-in-up animation-delay-400">
            These are prime examples of brand stories told, business goals met, and partnerships we're proud of. See for yourself how we craft compelling visual stories.
          </p>
        </div>
      </section>
      <OurWorkClient />
    </div>
  );
}
