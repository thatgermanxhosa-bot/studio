
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from './social-icons';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-[#111] text-muted-foreground">
      <div className="container py-8 text-center">
        <p>&copy; {new Date().getFullYear()} PICHULIK STUDIOS. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="#" className="hover:text-foreground transition-colors"><Facebook className="size-5" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Instagram className="size-5" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><TikTokIcon className="size-5" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Linkedin className="size-5" /></Link>
        </div>
      </div>
    </footer>
  );
}
