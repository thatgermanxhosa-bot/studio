
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        src="/Pichulik_Studios_Webpage_3.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      
      <div className="absolute inset-0 z-20 flex flex-col transition-opacity duration-1000 opacity-100">
        <header className="w-full p-4 text-center md:text-left">
          <Link href="/" className="inline-block">
            <Image 
              src="/PS%20Logo.png" 
              alt="Pichulik Studios Logo" 
              width={225} 
              height={45}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </header>

        <main className="flex flex-col items-center justify-center flex-grow text-center text-white px-6 mt-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide animate-fade-in-up">
              MAKE STORIES THAT <em className="italic">MOVE</em>
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-1000">
              <Link href="/for-business/about" passHref>
                <Button size="lg" className="bg-white text-black hover:bg-transparent hover:text-white hover:border-white border-2 border-transparent transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest">
                  For Business
                </Button>
              </Link>
              <Link href="/for-personal/about" passHref>
                <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 uppercase px-10 py-6 font-bold tracking-widest animation-delay-200">
                  For Personal
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <footer className="relative w-full p-8 text-center text-gray-400 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex justify-center gap-4 mb-4">
            <Link href="https://facebook.com/pichulikstudios" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Image src="/FB%20Logo.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://instagram.com/pichulikstudios/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Image src="/IG%20Logo.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://tiktok.com/@pichulikstudios" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Image src="/TT%20Logo.png" alt="Tiktok" width={24} height={24} />
            </Link>
            <Link href="https://linkedin.com/company/pichulik-studios/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Image src="/LI%20Logo.png" alt="LinkedIn" width={24} height={24} />
            </Link>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Pichulik Studios. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
