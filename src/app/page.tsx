
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from '@/components/social-icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '@/components/header';

export default function Home() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
        router.push('/about');
    }, 5000); 

    const contentTimer = setTimeout(() => {
        setShowContent(true);
    }, 500);

    return () => {
        clearTimeout(timer);
        clearTimeout(contentTimer);
    };
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
      >
        <source src="/Pichulik-Studios-Webpage.mp4" type="video/map4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      <div className={`absolute inset-0 z-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Header />

        <main className="flex flex-col items-center justify-center h-full text-center text-white px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide">
              Make Stories That <i>Move</i>
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest">
                <Link href="/for-business">For Business</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest">
                <Link href="/for-personal">For Personal</Link>
              </Button>
            </div>
          </div>
        </main>

        <footer className="absolute bottom-8 left-0 w-full text-center text-gray-400">
          <div className="flex justify-center gap-6 mb-4">
            <Link href="#" className="text-white hover:text-gray-300"><Facebook /></Link>
            <Link href="#" className="text-white hover:text-gray-300"><Instagram /></Link>
            <Link href="#" className="text-white hover:text-gray-300"><TikTokIcon className="size-6" /></Link>
            <Link href="#" className="text-white hover:text-gray-300"><Linkedin /></Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Pichulik Studios. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
