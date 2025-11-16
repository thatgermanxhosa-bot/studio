
import Link from 'next/link';
import { Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from './social-icons';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-[#111] text-muted-foreground">
      <div className="container py-8 text-center">
        <p>&copy; {new Date().getFullYear()} PICHULIK STUDIOS. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="#" className="hover:text-foreground transition-colors">
            <Image src="/FB%20Logo.png" alt="Facebook" width={20} height={20} />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Instagram className="size-5" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><TikTokIcon className="size-5" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Linkedin className="size-5" /></Link>
        </div>
      </div>
    </footer>
  );
}
