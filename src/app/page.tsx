"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from '@/components/social-icons';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
      >
        <source src="/Pichulik-Studios-Webpage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <header className="absolute top-0 left-0 w-full z-20 py-5">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-wider text-white">
            PICHULIK STUDIOS
          </Link>
        </div>
      </header>

      <main className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Make Stories That <i>Move</i>
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button asChild size="lg" className="bg-white text-black hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest">
              <Link href="/for-business">For Business</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest">
              <Link href="/for-personal">For Personal</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 w-full z-20 text-center text-gray-400 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <div className="flex justify-center gap-6 mb-4">
          <Link href="#" className="text-white hover:text-gray-300"><Facebook /></Link>
          <Link href="#" className="text-white hover:text-gray-300"><Instagram /></Link>
          <Link href="#" className="text-white hover:text-gray-300"><TikTokIcon className="size-6" /></Link>
          <Link href="#" className="text-white hover:text-gray-300"><Linkedin /></Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Pichulik Studios. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
